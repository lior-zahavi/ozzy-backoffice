async function requestJson(
  url,
  {
    method = 'GET',
    body,
    token,
    signal,
  } = {},
) {
  if (!url) {
    const error = new Error("API endpoint is not configured.",);

    error.status = 0;
    throw error;
  }

  const response = await fetch(url, {
    method,
    signal,
    headers: {
      Accept: 'application/json',

      ...(body
        ? {
            'Content-Type': 'application/json',
          }
        : {}),

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },

    ...(body
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  });

  const contentType =response.headers.get('content-type');

  const data = contentType?.includes('application/json',)
    ? await response.json(): null;

  if (!response.ok) {
    const error = new Error(
      data?.message|| data?.error ||"Unable to complete the request.",);

    error.status = response.status;
    throw error;
  }

  return data;
}

export function getJson(
  url,
  token,
  signal,
) {
  return requestJson(url, {
    method: 'GET',
    token,
    signal,
  });
}

export function postJson(
  url,
  body,
  token,
  signal,
) {
  return requestJson(url, {
    method: 'POST',
    body,
    token,
    signal,
  });
}