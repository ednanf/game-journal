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

// This interface contains fields that the frontend needs to display.
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
  totalCount?: number; // You'll probably want pagination info
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
