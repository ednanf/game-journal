import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import JournalEntry from '../models/JournalEntry.js';
import { ApiResponse, CreateJournalEntrySuccess, JournalEntryResponse } from '../types/api.js';
import { UnauthenticatedError } from '../errors/index.js';

const getJournalEntries = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all journal entries' });
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
    // Don’t let the function keep running after an error!
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
