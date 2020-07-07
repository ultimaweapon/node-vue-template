import { Request, Response } from 'express';
import { GetMessageResponse, UpdateMessageRequest } from '@/messages';

export function get(req: Request<{}, any, Partial<any> | undefined, Partial<{}>>, res: Response<GetMessageResponse>) {
  res.json('Hello, world!');
}

export function put(req: Request<{}, any, Partial<UpdateMessageRequest> | undefined, Partial<{}>>, res: Response<any>) {
  const body = req.body;

  if (typeof body !== 'object' || typeof body.message !== 'string') {
    return res.status(400).end();
  }

  console.log(body.message);
}
