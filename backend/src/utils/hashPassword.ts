import bcrypt from 'bcryptjs';

// Hashes a password using bcrypt.
// This function generates a salt and hashes the password with it.
// It returns a promise that resolves to the hashed password.
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export default hashPassword;
