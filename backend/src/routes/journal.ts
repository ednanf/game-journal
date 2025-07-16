import express from 'express';
import { xss } from 'express-xss-sanitizer';
import journalController from '../controllers/journal.js';

const router = express.Router();
const {
  getJournalEntries,
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} = journalController;

router.get('/', getJournalEntries);
router.get('/:id', getJournalEntry);
router.post('/', xss(), createJournalEntry);
router.patch('/:id', xss(), updateJournalEntry);
router.delete('/:id', deleteJournalEntry);

export default router;
