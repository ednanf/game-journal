import bcrypt from 'bcryptjs';

// Compare a candidate password with a hashed password.
const comparePasswords = async (
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> => bcrypt.compare(candidatePassword, hashedPassword);

export default comparePasswords;
