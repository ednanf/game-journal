import express from 'express';
import journalEntriesController from '../controllers/journalEntriesController.js';

const router = express.Router();
const {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} = journalEntriesController;

router.route('/').get(getJournalEntries).post(createJournalEntry);

router.route('/:id').get(getJournalEntryById).patch(updateJournalEntry).delete(deleteJournalEntry);

export default router;
