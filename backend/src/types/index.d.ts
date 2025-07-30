declare namespace Express {
  export interface Request {
    // By making user optional with the ?, we're acknowledging that it might not exist on every request (like public, unauthenticated routes), which is good practice.
    user?: {
      userId: string;
    };
  }
}

// This empty export is needed to treat this file as a module.
export {};
