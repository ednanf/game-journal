import bcrypt from 'bcryptjs';

// Hash a password using bcrypt
// This function generates a salt and hashes the password with it.
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export default hashPassword;
