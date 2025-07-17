import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/HttpError.js';
import JournalEntry from '../models/JournalEntry.js';

const getJournalEntries = async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
  }

  const entries = await JournalEntry.find({ createdBy: req.user.userId });

  return res.status(StatusCodes.OK).json({
    status: 'success',
    data: { journalEntries: entries },
  });
};

const getJournalEntry = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const entryId = req.params.id;

  const entry = await JournalEntry.findOne({ _id: entryId, createdBy: userId });

  if (!entry) {
    throw new HttpError(
      StatusCodes.UNAUTHORIZED,
      `Entry with id ${entryId} not found or you do not have access to it`,
    );
  }

  return res.status(StatusCodes.OK).json({ status: 'success', data: entry });
};

const createJournalEntry = async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
  }

  // Don't modify req.body, create a new object
  const journalData = {
    ...req.body,
    createdBy: req.user.userId,
  };

  const newJournalEntry = await JournalEntry.create(journalData);

  return res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: { journalEntry: newJournalEntry },
  });
};

const updateJournalEntry = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const entryId = req.params.id;

  const contents = req.body;

  const updatedEntry = await JournalEntry.findOneAndUpdate(
    {
      _id: entryId,
      createdBy: userId,
    },
    contents,
    { new: true, runValidators: true },
  );

  if (!updatedEntry) {
    throw new HttpError(
      StatusCodes.UNAUTHORIZED,
      `Entry with id ${entryId} not found or you do not have access to it`,
    );
  }

  return res.status(StatusCodes.OK).json({
    status: 'success',
    data: updatedEntry,
  });
};

const deleteJournalEntry = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const entryId = req.params.id;

  const entryToDelete = await JournalEntry.findOneAndDelete({
    _id: entryId,
    createdBy: userId,
  });

  if (!entryToDelete) {
    throw new HttpError(
      StatusCodes.NOT_FOUND,
      `Entry with id ${entryId} not found or you do not have access to it`,
    );
  }

  return res.status(StatusCodes.OK).json({ status: 'success' });
};

export default {
  getJournalEntries,
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};
