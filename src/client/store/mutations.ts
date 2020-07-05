import { Source, Payload } from './payload';
import { Alert, State } from './state';
import { key } from './util';

export const enum Mutation {
  AddAlert = 'addAlert',
  RemoveAlert = 'removeAlert',
  ClearAlert = 'clearAlert',
  Message = 'message'
}

export class AddAlert extends Payload {
  constructor(source: Source, readonly alert: Alert) {
    super(key(Mutation.AddAlert), source);
  }
}

export class RemoveAlert extends Payload {
  constructor(source: Source, readonly index: number) {
    super(key(Mutation.RemoveAlert), source);
  }
}

export class ClearAlert extends Payload {
  constructor(source: Source) {
    super(key(Mutation.ClearAlert), source);
  }
}

export class Message extends Payload {
  constructor(source: Source, readonly data: string) {
    super(key(Mutation.Message), source);
  }
}

export default {
  [Mutation.AddAlert]: function (state: State, payload: AddAlert) {
    state.alerts.push(payload.alert);
  },
  [Mutation.RemoveAlert]: function (state: State, payload: RemoveAlert) {
    state.alerts.splice(payload.index, 1);
  },
  [Mutation.ClearAlert]: function (state: State) {
    state.alerts = [];
  },
  [Mutation.Message]: function (state: State, payload: Message) {
    state.message = payload.data;
  }
};
