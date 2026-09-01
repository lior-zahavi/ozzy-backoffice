import { postJson } from './apiClient';

const LOGIN_API_URL =import.meta.env.VITE_AUTH_LOGIN_API_URL;

const RESET_API_URL =import.meta.env.VITE_AUTH_RESET_API_URL;

export async function signInRequest(email,password,)
 {
  const data = await postJson(
LOGIN_API_URL,
    {
      email,
      password,
    },
  );

  const token = data?.idToken;

  if (!token) {
    throw new Error('The authentication response did not include a token.',);
  }

  return {
    ...data,
    token,
  };
}

export function requestPasswordReset(email) {
  return postJson(
    RESET_API_URL,
    {
      email,
    },
  );
}