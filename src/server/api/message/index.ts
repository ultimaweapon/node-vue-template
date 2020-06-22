import { Request, Response } from 'express';

export function get(request: Request, response: Response) {
  response.send('Hello, world!');
}
