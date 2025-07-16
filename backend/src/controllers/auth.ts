import { Request, Response } from 'express';

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
