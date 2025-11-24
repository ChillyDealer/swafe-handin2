import { AuthService } from '@/app/services/auth.service';
import { ApiBaseUrl } from '@/app/_consts/api-consts';

export async function fetchBase(path: string, init?: RequestInit) {
  const token = await AuthService.getToken();

  if (!token) {
    throw new Error('No token');
  }

  const baseInit: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return await fetch(ApiBaseUrl + path, { ...baseInit, ...init });
}
