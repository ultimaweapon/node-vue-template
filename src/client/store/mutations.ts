import { Source, Payload } from './payload';
import { State } from './state';
import { key } from './util';

export const enum Mutation {
  AddErrors = 'addErrors',
  ClearErrors = 'clearErrors',
  Message = 'message'
}

export class AddErrors extends Payload {
  constructor(source: Source, readonly message: string, readonly error: Error) {
    super(key(Mutation.AddErrors), source);
  }
}

export class ClearErrors extends Payload {
  constructor(source: Source) {
    super(key(Mutation.ClearErrors), source);
  }
}

export class Message extends Payload {
  constructor(source: Source, readonly data: string) {
    super(key(Mutation.Message), source);
  }
}

export default {
  [Mutation.AddErrors]: function (state: State, payload: AddErrors) {
    state.errors.push(payload);
  },
  [Mutation.ClearErrors]: function (state: State) {
    state.errors = [];
  },
  [Mutation.Message]: function (state: State, payload: Message) {
    state.message = payload.data;
  }
};
