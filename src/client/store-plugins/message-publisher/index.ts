import { MutationPayload, Store } from 'vuex';
import { rest } from '@/client';
import { AddErrors, LoadMessage, Message, Mutation, Source, State } from '@/store';

function messageChanged(payload: Message, state: State) {
  if (payload.source !== Source.Server) {
    rest.updateMessage(state.message);
  }
}

function mutationListener(mutation: MutationPayload, state: State) {
  if (mutation.type === Mutation.Message) {
    messageChanged(mutation.payload, state);
  }
}

export function create(store: Store<State>) {
  store.dispatch(new LoadMessage(Source.App)).then(() => {
    store.subscribe(mutationListener);
  }, err => {
    store.commit(new AddErrors(Source.App, 'Failed to load a message from the server.', err));
  });
}
