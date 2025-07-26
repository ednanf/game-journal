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
// This is the response structure, not the model structure!
// It should onl contain the fields that the frontend needs to display
export interface JournalEntryResponse {
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped';
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetJournalEntriesSuccess {
  entries: JournalEntryResponse[];
  message: string;
  totalCount?: number; // You'll probably want pagination info
}

export interface GetJournalEntrySuccess {
  entry: JournalEntryResponse;
  message: string;
}

export interface CreateJournalEntrySuccess {
  entry: JournalEntryResponse;
  message: string;
}

export interface PatchJournalEntrySuccess {
  entry: JournalEntryResponse;
  message: string;
}

export interface DeleteJournalEntrySuccess {
  message: string;
  deletedId: string;
}
