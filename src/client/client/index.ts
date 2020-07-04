import { Path } from '@/app-config';
import { RestClient } from './rest';

export { ResponseError } from './rest';

export const rest = new RestClient(Path.Api);
