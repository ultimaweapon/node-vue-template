export const enum Path {
  Api = '/api'
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
