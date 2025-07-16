import { Request, Response } from 'express';

const getJournalEntries = (req: Request, res: Response) => {
  res.status(200).json({ message: 'get journal entries' });
};

const getJournalEntry = (req: Request, res: Response) => {
  res.status(200).json({ message: 'get journal entry' });
};

const createJournalEntry = (req: Request, res: Response) => {
  res.status(201).json({ message: 'create journal entry' });
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
