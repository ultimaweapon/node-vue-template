export interface Alert {
  readonly message: string;
}

export interface State {
  alerts: Alert[],
  message: string;
}

export class ErrorAlert implements Alert {
  constructor(readonly message: string, readonly error?: Error) {
  }
}
