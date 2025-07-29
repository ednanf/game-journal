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
export interface JournalEntryResponseDTO {
  id: string; // This is the ID from the database, converted to a string
  createdBy: string; // User ID as a string
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped';
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJournalEntryDTO {
  title: string;
  platform: string;
  status?: 'started' | 'completed' | 'dropped';
  rating?: number;
}

export interface PatchJournalEntryDTO {
  title?: string;
  platform?: string;
  status?: 'started' | 'completed' | 'dropped';
  rating?: number;
}

// Journal entry-related API response types

export interface GetJournalEntriesSuccess {
  message: string;
  entries: JournalEntryResponseDTO[];
  nextCursor: string | null;
}

export interface GetJournalEntrySuccess {
  message: string;
  entry: JournalEntryResponseDTO;
}

export interface CreateJournalEntrySuccess {
  message: string;
  entry: JournalEntryResponseDTO;
}

export interface PatchJournalEntrySuccess {
  message: string;
  entry: JournalEntryResponseDTO;
}

export interface DeleteJournalEntrySuccess {
  message: string;
}
