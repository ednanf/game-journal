// Utility function to retrieve the authentication token

export function getAuthToken(): string | null {
  return localStorage.getItem('token');
}
