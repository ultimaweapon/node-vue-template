export class ResponseError extends Error {
  constructor(message: string, readonly response: Response) {
    super(message);
  }
}
