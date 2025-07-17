import bcrypt from 'bcryptjs';

const comparePasswords = async (candidate: string, hash: string) => {
  return bcrypt.compare(candidate, hash);
};

export default comparePasswords;
