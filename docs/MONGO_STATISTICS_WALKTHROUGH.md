# Journal Entry Statistics with MongoDB Aggregation

This guide walks you through how we built the journal entry statistics endpoint using MongoDB’s Aggregation Pipeline with Mongoose. It’s written for beginners and explains both the “why” and the “how,” with TypeScript examples and a few ASCII diagrams.

You’ll learn to compute:
- Lifetime count of entries by status (started, completed, revisited, paused, dropped)
- Year-by-year totals by status (for 2024, 2025, 2026, …)

## What we’re building

Endpoint:
- Method: GET
- Path: `/api/v1/journal-entries/statistics`
- Auth: requires an authenticated user (we count only their entries)

Example response:
```json
{
  "status": "success",
  "data": {
    "lifetime": {
      "started": 12,
      "completed": 7,
      "revisited": 4,
      "paused": 2,
      "dropped": 3
    },
    "byYear": {
      "2024": { "started": 3, "completed": 2, "revisited": 1, "paused": 0, "dropped": 0 },
      "2025": { "started": 9, "completed": 5, "revisited": 3, "paused": 2, "dropped": 3 }
    }
  }
}
```

---

## Big picture: Aggregation pipeline

We’ll use a pipeline to transform our documents into grouped counts. Here’s the mental model:

```
[Collection: journalentries]
   |
   |  $match  (filter: createdBy == current user)
   v
[Only this user's docs]
   |
   |  $project (derive year from createdAt, keep status)
   v
[Docs shaped like: { year: 2025, status: 'completed' }]
   |
   |  $group   (group by year+status, count)
   v
[Counts per {year, status}]
   |
   |  (format in Node.js to { byYear: { '2025': { completed: 5, ... } } })
   v
[JSON response]
```

We’ll also run a simpler pipeline for the lifetime counts (group by status only).

---

## 1) Model and indexes

We already have a Mongoose model with timestamps (createdAt, updatedAt) and a status enum that includes all values.

Relevant parts from `backend/src/models/JournalEntry.ts`:

```typescript
import mongoose, { Schema, model, Document } from 'mongoose';

export interface IJournalEntry extends Document {
  _id: mongoose.Types.ObjectId;
  createdBy: mongoose.ObjectId;
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped' | 'revisited' | 'paused';
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const journalEntrySchema = new Schema<IJournalEntry>(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, 'User ID is required.'],
      ref: 'User',
    },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    platform: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ['started', 'completed', 'revisited', 'paused', 'dropped'],
      default: 'started',
    },
    rating: { type: Number, min: 0, max: 10, default: 5 },
  },
  { timestamps: true },
);

// Indexes for fast stats
journalEntrySchema.index({ createdBy: 1 });
journalEntrySchema.index({ createdAt: 1 });
journalEntrySchema.index({ status: 1 });
journalEntrySchema.index({ createdBy: 1, createdAt: 1, status: 1 }); // Composite for stats

const JournalEntry =
  mongoose.models.JournalEntry || model<IJournalEntry>('JournalEntry', journalEntrySchema);

export default JournalEntry;
```

Why indexes? Because our stats always filter by `createdBy` and often read `createdAt` and `status`. Without these, MongoDB scans the whole collection. With them, queries stay fast as your data grows.

---

## 2) Controller: build the stats with aggregation

We add a controller function that:
- Ensures there’s an authenticated user (`req.user.userId`)
- Casts the `userId` to `ObjectId` (important!)
- Runs two aggregation pipelines
- Shapes the result into a clean JSON structure

`backend/src/controllers/journalEntriesController.ts` (simplified excerpt):

```typescript
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import JournalEntry from '../models/JournalEntry.js';
import UnauthenticatedError from '../errors/UnauthenticatedError.js';

// Optional: keep a single source of truth for valid statuses
const STATUSES = ['started', 'completed', 'revisited', 'paused', 'dropped'] as const;
type Status = (typeof STATUSES)[number];

export const getJournalEntriesStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user?.userId) {
      throw new UnauthenticatedError('User not authenticated.');
    }

    // Always cast string -> ObjectId before matching against an ObjectId field
    const userObjectId = new mongoose.Types.ObjectId(req.user.userId);

    // Lifetime stats: count by status for this user
    const lifetimeRaw = await JournalEntry.aggregate<{
      _id: Status;
      count: number;
    }>([
      { $match: { createdBy: userObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Year-by-year stats: group by year and status
    const yearlyRaw = await JournalEntry.aggregate<{
      _id: { year: number; status: Status };
      count: number;
    }>([
      { $match: { createdBy: userObjectId } },
      { $project: { year: { $year: '$createdAt' }, status: 1 } },
      { $group: { _id: { year: '$year', status: '$status' }, count: { $sum: 1 } } },
    ]);

    // Build lifetime object, ensuring all statuses appear (0 if none)
    const lifetime: Record<Status, number> = {
      started: 0,
      completed: 0,
      revisited: 0,
      paused: 0,
      dropped: 0,
    };
    for (const row of lifetimeRaw) lifetime[row._id] = row.count;

    // Build byYear object, ensuring each seen year has all statuses
    const byYear: Record<string, Record<Status, number>> = {};
    for (const row of yearlyRaw) {
      const year = String(row._id.year);
      const status = row._id.status;
      if (!byYear[year]) {
        byYear[year] = { started: 0, completed: 0, revisited: 0, paused: 0, dropped: 0 };
      }
      byYear[year][status] = row.count;
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { lifetime, byYear },
    });
  } catch (err) {
    next(err);
  }
};
```

Key points:
- Casting to `ObjectId` is critical (string vs ObjectId mismatch returns no results).
- `$year` extracts the UTC year from `createdAt`. If you need local timezones, see the Advanced section.
- We initialize missing statuses to `0` so the frontend always gets a stable shape.

---

## 3) Route: expose the endpoint

Add the route in `backend/src/routes/journalEntriesRoutes.ts`:

```typescript
import express from 'express';
import journalEntriesController from '../controllers/journalEntriesController.js';
// If not globally applied, also import and use authenticate middleware here
// import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

const { getJournalEntriesStatistics } = journalEntriesController;

// If auth isn’t global, enable it for this router:
// router.use(authenticate);

router.get('/statistics', getJournalEntriesStatistics);

export default router;
```

Make sure your authentication middleware runs (globally in `app.ts` or applied to this router) so `req.user.userId` is set.

---

## 4) Test it

- Seed or create some entries with different statuses
- Call `GET /api/v1/journal-entries/statistics` with an authenticated request (e.g., Postman with your Bearer token)
- You should see non-empty `lifetime` and `byYear` objects for your user

---

## Troubleshooting

- “lifetime and byYear are empty, but I have data”
  - Ensure you cast `req.user.userId` to `new mongoose.Types.ObjectId(...)` in `$match`.
  - Confirm your auth middleware populates `req.user.userId` for this route.
  - Verify your `createdBy` field truly stores an ObjectId (not a string).
- “Years look off by one”
  - `$year` uses UTC. If you need local time zone grouping, see the Advanced section below.
- “Performance is slow with lots of data”
  - Confirm indexes exist: `{ createdBy }`, `{ createdAt }`, `{ status }`, and the composite `{ createdBy, createdAt, status }`.
  - Check in Mongo shell: `db.journalentries.getIndexes()` and make sure they’ve been built.
- “Some statuses are missing in the response”
  - That’s normal if there are zero for that status. We prefilled zeros in the controller to keep shape stable.

---

## Advanced: time zones, monthly trends, filters

- Local time zone grouping:
  - Replace `$year: '$createdAt'` with `$dateToParts` or `$dateTrunc` (MongoDB 5.0+) if you need a specific time zone.
  - Example (UTC+offset):

```typescript
{ 
  $project: {
    parts: { $dateToParts: { date: '$createdAt', timezone: 'America/New_York' } },
    status: 1,
  }
},
{ $group: { _id: { year: '$parts.year', status: '$status' }, count: { $sum: 1 } } }
```

- Monthly breakdown:

```typescript
{ $project: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, status: 1 } },
{ $group: { _id: { year: '$year', month: '$month', status: '$status' }, count: { $sum: 1 } } }
```

- Filters via query params:
  - Add `?from=2024&to=2025` and apply an extra `$match` on `createdAt` range.

```typescript
const from = req.query.from ? new Date(`${req.query.from}-01-01`) : undefined;
const to = req.query.to ? new Date(`${req.query.to}-12-31T23:59:59.999Z`) : undefined;
const dateMatch = from || to ? { createdAt: { ...(from && { $gte: from }), ...(to && { $lte: to }) } } : {};

const matchStage = { $match: { createdBy: userObjectId, ...dateMatch } };
```

---

## Recap

- We used MongoDB’s aggregation pipeline to compute per-user stats entirely on the server.
- We added the right indexes to keep it fast as data grows.
- We handled common pitfalls (ObjectId casting, missing statuses, time zones).
- We exposed a clean, stable JSON API for the frontend.

That’s it—you now have a robust and scalable statistics endpoint! 🚀
