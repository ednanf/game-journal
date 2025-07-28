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

router.get('/', getJournalEntries);
router.get('/:id', getJournalEntryById);
router.post('/', createJournalEntry);
router.patch('/:id', updateJournalEntry);
router.delete('/:id', deleteJournalEntry);

export default router;
