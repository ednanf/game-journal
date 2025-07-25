// Generic API response types for the backend
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data: T;
}

export interface GenericSuccess {
  message: string;
}

export interface ApiError {
  error: string;
  message: string;
}

// User-related API response types
export interface RegisterUserSuccess {
  user: string;
  token: string;
  message: string;
}

export interface LoginUserSuccess {
  token: string;
  message: string;
}

export interface LogoutUserSuccess {
  message: string;
}

export interface DeleteUserSuccess {
  message: string;
}

// Journal entry-related API response types
export interface JournalEntry {
  _id: string;
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped';
  rating: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // User ID of the creator
  __v: number; // Version key for Mongoose documents
}

export interface GetJournalEntriesSuccess {
  entries: JournalEntry[];
  message: string;
  totalCount?: number; // You'll probably want pagination info
}

export interface GetJournalEntrySuccess {
  entry: JournalEntry;
  message: string;
}

export interface CreateJournalEntrySuccess {
  entry: JournalEntry;
  message: string;
}

export interface PatchJournalEntrySuccess {
  entry: JournalEntry;
  message: string;
}

export interface DeleteJournalEntrySuccess {
  message: string;
  deletedId: string;
}
