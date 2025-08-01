import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import JournalEntry, { IJournalEntry } from '../models/JournalEntry.js';
import {
  ApiResponse,
  CreateJournalEntrySuccess,
  JournalEntryResponseDTO,
  GetJournalEntriesSuccess,
  GetJournalEntrySuccess,
  PatchJournalEntrySuccess,
  DeleteJournalEntrySuccess,
} from '../types/api.js';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js';
import performCursorPagination from '../utils/performCursorPagination.js';

// Convert a JournalEntry model to a JournalEntryResponseDTO
const toJournalEntryResponseDTO = (entry: IJournalEntry): JournalEntryResponseDTO => ({
  // eslint-disable-next-line no-underscore-dangle
  id: entry._id.toString(),
  createdBy: entry.createdBy.toString(),
  title: entry.title,
  platform: entry.platform,
  status: entry.status,
  rating: entry.rating ?? 5,
  createdAt: entry.createdAt.toISOString(),
  updatedAt: entry.updatedAt.toISOString(),
});

const getJournalEntries = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user) {
    next(new UnauthenticatedError('User not authenticated.'));
    return;
  }
  const { userId } = req.user; // Validated by authentication middleware

  // Pull the limit and cursor from the query parameters
  // The frontend should send the parameter "?limit=X"!!
  const { cursor } = req.query;
  const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided

  if (limit <= 0) {
    next(new BadRequestError('Limit must be a positive number.'));
    return;
  }

  try {
    // Perform cursor pagination
    const { documents, nextCursor } = await performCursorPagination(
      JournalEntry,
      limit,
      cursor as string | undefined,
      { createdBy: userId }, // Filter by the authenticated user!
    );

    // If no documents are found, return an empty array with a message
    if (documents.length === 0) {
      const response: ApiResponse<GetJournalEntriesSuccess> = {
        status: 'success',
        data: {
          message: 'No journal entries found.',
          entries: [],
          nextCursor: null, // No more entries to paginate
        },
      };
      res.status(StatusCodes.OK).json(response);
      return;
    }

    // Map the DB model to the API response Data Transfer Object
    const journalEntries = documents.map(toJournalEntryResponseDTO);

    const response: ApiResponse<GetJournalEntriesSuccess> = {
      status: 'success',
      data: {
        message: 'Journal entries retrieved successfully.',
        entries: journalEntries,
        nextCursor, // Used for pagination in the frontend
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getJournalEntryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user) {
    next(new UnauthenticatedError('User not authenticated.'));
    return;
  }
  const { userId } = req.user; // Validated by authentication middleware
  const entryId: string = req.params.id; // Validated by the route middleware

  try {
    const journalEntry = await JournalEntry.findOne({ _id: entryId, createdBy: userId });
    if (!journalEntry) {
      next(new NotFoundError('Journal entry not found.'));
      return;
    }

    // Map the DB model to the API response Data Transfer Object
    const entry: JournalEntryResponseDTO = toJournalEntryResponseDTO(journalEntry);

    const response: ApiResponse<GetJournalEntrySuccess> = {
      status: 'success',
      data: {
        message: 'Journal entry retrieved successfully.',
        entry,
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const createJournalEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user) {
    next(new UnauthenticatedError('User not authenticated.'));
    return;
  }
  const { userId } = req.user; // Validated by authentication middleware

  try {
    const newJournalEntry = await JournalEntry.create({
      ...req.body, // Validated by Zod schemas in the route middleware
      createdBy: userId,
    });

    // Map the DB model to the API response Data Transfer Object
    const entry: JournalEntryResponseDTO = toJournalEntryResponseDTO(newJournalEntry);

    const response: ApiResponse<CreateJournalEntrySuccess> = {
      status: 'success',
      data: {
        message: 'Journal entry created successfully.',
        entry,
      },
    };

    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};

const updateJournalEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user) {
    next(new UnauthenticatedError('User not authenticated.'));
    return;
  }
  const { userId } = req.user; // Validated by authentication middleware
  const entryId: string = req.params.id; // Validated by the route middleware

  // Build a payload only with the keys that are provided in the request body
  const updatePayload = req.body; // Validated by Zod schemas in the route middleware

  // Remove any keys starting with '$' to prevent NoSQL injection
  const sanitizedPayload: Record<string, any> = {};
  for (const key of Object.keys(updatePayload)) {
    if (!key.startsWith('$')) {
      sanitizedPayload[key] = updatePayload[key];
    }
  }

  if (Object.keys(sanitizedPayload).length === 0) {
    next(new BadRequestError('No update data provided.'));
    return;
  }

  try {
    const updatedJournalEntry = await JournalEntry.findOneAndUpdate(
      { _id: entryId, createdBy: userId },
      sanitizedPayload, // Pass the sanitized payload.
      { new: true, runValidators: true },
    );

    if (!updatedJournalEntry) {
      next(new NotFoundError(`No journal entry found with id: ${entryId}`));
      return;
    }

    // Map the DB model to the API response Data Transfer Object
    const entry: JournalEntryResponseDTO = toJournalEntryResponseDTO(updatedJournalEntry);

    const response: ApiResponse<PatchJournalEntrySuccess> = {
      status: 'success',
      data: {
        message: 'Journal entry updated successfully.',
        entry,
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteJournalEntry = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    next(new UnauthenticatedError('User not authenticated.'));
    return;
  }
  const { userId } = req.user; // Validated by authentication middleware
  const entryId = req.params.id; // Validated by the route middleware

  try {
    const deletedJournalEntry = await JournalEntry.findOneAndDelete({
      _id: entryId,
      createdBy: userId,
    });
    if (!deletedJournalEntry) {
      next(new NotFoundError(`No journal entry found with id: ${entryId}`));
      return;
    }

    const response: ApiResponse<DeleteJournalEntrySuccess> = {
      status: 'success',
      data: {
        message: `Journal entry deleted successfully.`,
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export default {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};
