import { hash } from 'bcrypt';

export async function createHash(value: string) {
  return hash(value, 3);
}
