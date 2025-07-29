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
  CreateJournalEntryDTO,
  PatchJournalEntryDTO,
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
  const userId: string | undefined = req.user?.userId;
  if (!userId) {
    next(
      new UnauthenticatedError('User not authenticated. Please log in to view journal entries.'),
    );
    return;
  }

  const entryId: string = req.params.id; // Validated by the route middleware

  try {
    const journalEntry = await JournalEntry.findOne({ _id: entryId, createdBy: userId });
    if (!journalEntry) {
      next(new NotFoundError('Journal entry not found.'));
      return;
    }

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
  if (!req.user?.userId) {
    next(
      new UnauthenticatedError('User not authenticated. Please log in to create a journal entry.'),
    );
    return;
  }

  try {
    // Validate and construct the data
    const journalEntryData: CreateJournalEntryDTO = {
      title: req.body.title,
      platform: req.body.platform,
      status: req.body.status,
      rating: req.body.rating,
    };

    const newJournalEntry = await JournalEntry.create({
      ...journalEntryData,
      createdBy: req.user.userId,
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
  const userId: string | undefined = req.user?.userId;
  if (!userId) {
    next(
      new UnauthenticatedError('User not authenticated. Please log in to edit journal entries.'),
    );
    return;
  }

  const entryId: string = req.params.id; // Validated by the route middleware

  // Limit the fields that can be updated
  const { title, platform, status, rating }: PatchJournalEntryDTO = req.body;
  const updatePayload = { title, platform, status, rating };
  if (Object.keys(updatePayload).length === 0) {
    next(new BadRequestError('No update data provided.'));
    return;
  }

  try {
    const updatedJournalEntry = await JournalEntry.findOneAndUpdate(
      { _id: entryId, createdBy: userId },
      updatePayload, // Pass the clean, validated payload.
      { new: true, runValidators: true },
    );

    if (!updatedJournalEntry) {
      next(new NotFoundError(`No journal entry found with id: ${entryId}`));
      return;
    }

    // Use the new helper function for mapping. Clean and reusable.
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
