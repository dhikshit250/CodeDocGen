import { getServerSession } from 'next-auth/next';
import { authOptions } from './nextauth-options';

export async function auth() {
  return await getServerSession(authOptions);
}
