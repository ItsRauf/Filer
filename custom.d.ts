interface filerRequest {
  destination: string;
  password?: string;
}

declare namespace Express {
  export interface Request {
    filer: filerRequest;
  }
}
