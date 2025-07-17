import { Request, Response } from 'express';
import { StatusCodes} from 'http-status-codes';
import JournalEntry from '../models/JournalEntry.js';

const getJournalEntries = (req: Request, res: Response) => {
  res.status(200).json({ message: 'get journal entries' });
};

const getJournalEntry = (req: Request, res: Response) => {
  res.status(200).json({ message: 'get journal entry' });
};

const createJournalEntry = async (req: Request, res: Response) => {
  req.body.createdBy = req.params.userId;
  const contents = req.body;
  const newJournalEntry = await JournalEntry.create(contents);

  res.status(StatusCodes.CREATED).json({status: 'success', data: { journalEntry: newJournalEntry } });
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
