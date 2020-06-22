import { Path } from '@/app-config';
import { ResponseError } from '@/services';

function createUnexpectedStatusError(response: Response): ResponseError {
  return new ResponseError('Unexpected status code.', response);
}

function request(path: string, options?: RequestInit): Promise<Response> {
  return fetch(`${Path.Api}/${path}`, options);
}

export class Client {
  async loadMessage(): Promise<string> {
    const res = await request('message');
    if (!res.ok) {
      throw createUnexpectedStatusError(res);
    }
    return await res.text();
  }

  async updateMessage(message: string) {
    const res = await request('message', { method: 'PUT', body: message });
    if (!res.ok) {
      throw createUnexpectedStatusError(res);
    }
  }
}
