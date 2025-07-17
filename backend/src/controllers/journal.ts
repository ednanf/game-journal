import { Request, Response } from 'express';
import { StatusCodes} from 'http-status-codes';
import JournalEntry from '../models/JournalEntry.js';

const getJournalEntries = async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'User not authenticated' });
  }

  const entries = await JournalEntry.find({ createdBy: req.user.userId });

  return res.status(StatusCodes.OK).json({status: 'success', data: { journalEntries: entries } });
};

const getJournalEntry = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const entryId = req.params.id;

  const entry = await JournalEntry.findOne({_id: entryId, createdBy: userId });

  if (!entry) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: `Entry with id ${entryId} not found` });
  }

  return res.status(StatusCodes.OK).json({status: 'success', data: entry});
};

const createJournalEntry = async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    return res.status(400).json({ error: 'User not authenticated' });
  }

  // Don't modify req.body, create a new object
  const journalData = {
    ...req.body,
    createdBy: req.user.userId
  };

  const newJournalEntry = await JournalEntry.create(journalData);

  return res.status(StatusCodes.CREATED).json({status: 'success', data: { journalEntry: newJournalEntry } });
};

const updateJournalEntry = (req: Request, res: Response) => {
  res.status(200).json({ message: 'update journal entry' });
};

const deleteJournalEntry = (req: Request, res: Response) => {
  res.status(200).json({ message: 'delete journal entry' });
};

export default {
  getJournalEntries,
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};
