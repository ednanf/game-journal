import { Request, Response } from 'express';

// Use _req or _res to avoid unused variable warnings when unused!

const register = (req: Request, res: Response) => {
  console.log('register route hit');
};

const login = (req: Request, res: Response) => {
  console.log('login route hit');
};

const logout = (req: Request, res: Response) => {
  console.log('logout route hit');
};

export default {
  register,
  login,
  logout,
};
