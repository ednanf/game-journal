import express from 'express';
import validateObjectId from '../middlewares/validateObjectId.js';
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

router
  .route('/:id')
  .get(validateObjectId('id'), getJournalEntryById)
  .patch(validateObjectId('id'), updateJournalEntry)
  .delete(validateObjectId('id'), deleteJournalEntry);

export default router;
