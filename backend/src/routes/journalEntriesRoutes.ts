import express from 'express';
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
} = journalEntriesController;

router
  .route('/')
  .get(getJournalEntries)
  .post(validateZodSchemas(createJournalEntryBodySchema), createJournalEntry);

router
  .route('/:id')
  .get(validateObjectId('id'), getJournalEntryById)
  .patch(
    validateObjectId('id'),
    validateZodSchemas(patchJournalEntryBodySchema),
    updateJournalEntry,
  )
  .delete(validateObjectId('id'), deleteJournalEntry);

export default router;
