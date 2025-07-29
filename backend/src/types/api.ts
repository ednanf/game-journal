// Generic API response types for the backend
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data: T;
}

export interface GenericSuccess {
  message: string;
}

export interface ApiError {
  message: string;
}

// User-related API response types
export interface RegisterUserSuccess {
  message: string;
  user: string;
  token: string;
}

export interface LoginUserSuccess {
  message: string;
  user: string;
  token: string;
}

export interface LogoutUserSuccess {
  message: string;
}

export interface DeleteUserSuccess {
  message: string;
}

// Data Transfer Object (DTO) for journal entries.
// It maps the database model to the API response structure.
// This is the response structure, not the model structure!
export interface JournalEntryResponse {
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped';
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// Journal entry-related API response types

export interface GetJournalEntriesSuccess {
  message: string;
  entries: JournalEntryResponse[];
  nextCursor: string | null;
}

export interface GetJournalEntrySuccess {
  message: string;
  entry: JournalEntryResponse;
}

export interface CreateJournalEntrySuccess {
  message: string;
  entry: JournalEntryResponse;
}

export interface PatchJournalEntrySuccess {
  message: string;
  entry: JournalEntryResponse;
}

export interface DeleteJournalEntrySuccess {
  message: string;
  deletedId: string;
}
