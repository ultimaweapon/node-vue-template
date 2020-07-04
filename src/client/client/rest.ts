import { GetMessageResponse, UpdateMessageRequest } from '@/messages';

export class ResponseError extends Error {
  constructor(message: string, readonly response: Response) {
    super(message);
  }
}

export class RestClient {
  constructor(readonly prefix: string) {
  }

  async loadMessage(): Promise<GetMessageResponse> {
    const res = await this.invoke('/message', 'GET');
    return await res.json();
  }

  async updateMessage(message: string) {
    await this.invoke<UpdateMessageRequest>('/message', 'PUT', { message });
  }

  private async invoke<T = any>(path: string, method: string, body?: T): Promise<Response> {
    const headers = new Headers();
    let req: string | undefined;

    if (body !== undefined) {
      req = JSON.stringify(body);
      headers.append('Content-Type', 'application/json');
    }

    const res = await fetch(this.prefix + path, { method, headers, body: req });

    if (!res.ok) {
      throw new ResponseError('Unexpected status code.', res);
    }

    return res;
  }
}
