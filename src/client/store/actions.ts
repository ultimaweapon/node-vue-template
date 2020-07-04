import { ActionContext } from 'vuex';
import { rest } from '@/client';
import { Message } from './mutations';
import { Payload, Source } from './payload';
import { State } from './state';
import { key } from './util';

type Context = ActionContext<State, State>;

export const enum Action {
  LoadMessage = 'loadMessage'
}

export class LoadMessage extends Payload {
  constructor(source: Source) {
    super(key(Action.LoadMessage), source);
  }
}

export default {
  [Action.LoadMessage]: async function (context: Context) {
    const res = await rest.loadMessage();
    context.commit(new Message(Source.Server, res));
  }
};
