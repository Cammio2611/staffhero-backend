// src/types/express/index.d.ts
import 'express';

declare module 'express' {
  export interface Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
}
