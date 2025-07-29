import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import JournalEntry from '../models/JournalEntry.js';
import {
  ApiResponse,
  CreateJournalEntrySuccess,
  JournalEntryResponse,
  GetJournalEntriesSuccess,
} from '../types/api.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import performCursorPagination from '../utils/performCursorPagination.js';

const getJournalEntries = async (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is authenticated
  if (!req.user?.userId) {
    next(
      new UnauthenticatedError('User not authenticated. Please log in to view journal entries.'),
    );
    return;
  }

  // Pull the limit and cursor from the query parameters
  // The frontend should send these parameters!!
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
      { createdBy: req.user.userId }, // Filter by the authenticated user!
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

    // Map the DB entries to the API response structure
    const journalEntries: JournalEntryResponse[] = documents.map((entry) => ({
      title: entry.title,
      platform: entry.platform,
      status: entry.status,
      rating: entry.rating ?? 5,
      createdAt: entry.createdAt.toISOString(),
      updatedAt: entry.updatedAt.toISOString(),
    }));

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

const getJournalEntryById = async (req: Request, res: Response) => {
  res.status(200).json({ message: `Get journal entry with ID ${req.params.id}` });
};

const createJournalEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user?.userId) {
    next(
      new UnauthenticatedError('User not authenticated. Please log in to create a journal entry.'),
    );
    return;
  }

  try {
    // Map the user ID to the correct field
    const journalEntryData = {
      ...req.body,
      createdBy: req.user.userId,
    };

    const newJournalEntry = await JournalEntry.create(journalEntryData);

    // Map the DB model to the API response Data Transfer Object
    const entry: JournalEntryResponse = {
      title: newJournalEntry.title,
      platform: newJournalEntry.platform,
      status: newJournalEntry.status,
      rating: newJournalEntry.rating ?? 5,
      createdAt: newJournalEntry.createdAt.toISOString(),
      updatedAt: newJournalEntry.updatedAt.toISOString(),
    };

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

const updateJournalEntry = async (req: Request, res: Response) => {
  res.status(200).json({
    message: `Update journal entry with ID ${req.params.id}`,
    data: req.body,
  });
};

const deleteJournalEntry = async (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete journal entry with ID ${req.params.id}` });
};

export default {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};
