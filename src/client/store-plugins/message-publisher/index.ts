import { MutationPayload, Store } from 'vuex';
import { rest } from '@/client';
import { AddAlert, ErrorAlert, LoadMessage, Message, Mutation, Source, State } from '@/store';

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
    const alert = new ErrorAlert('Failed to load a message from the server.', err);
    store.commit(new AddAlert(Source.App, alert));
  });
}
