import express from 'express';
import sanitizeInput from '../middlewares/sanitizeInput.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import journalEntriesController from '../controllers/journalEntriesController.js';
import validateZodSchemas from '../middlewares/validateZodSchemas.js';
import {
  createJournalEntryBodySchema,
  patchJournalEntryBodySchema,
} from '../schemas/journalEntrySchemas.js';

const router = express.Router();
const {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getJournalEntriesStatistics,
} = journalEntriesController;

router
  .route('/')
  .get(getJournalEntries)
  .post(sanitizeInput(), validateZodSchemas(createJournalEntryBodySchema), createJournalEntry);

router.get('/statistics', getJournalEntriesStatistics);

router
  .route('/:id')
  .get(validateObjectId('id'), getJournalEntryById)
  .patch(
    validateObjectId('id'),
    sanitizeInput(),
    validateZodSchemas(patchJournalEntryBodySchema),
    updateJournalEntry,
  )
  .delete(validateObjectId('id'), deleteJournalEntry);

export default router;
