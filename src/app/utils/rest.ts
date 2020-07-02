const BASE_URL = process.env.API_URL
const JSON_CONTENT_TYPE = 'application/json';

async function addAuthenticationHeaders(options: { [k: string]: any }) {
  // const accessToken = await getAccessToken();
  return {
    ...options,
    headers: {
      ...options.headers,
      // Authorization: `Bearer ${accessToken}`
    }
  };
}

function buildUrl(url: string, params: {}) {
  const searchParams = new URLSearchParams(params).toString();
  return `${BASE_URL}${url}${searchParams === "" ? `?${searchParams}` : ""}`;
}


// export function ensureValidResponse(response: Response, json: object | string) {
//   const handler = statusesHandlers.get(response.status);
//   if (!handler) {
//     return response;
//   }
//   return handler(response.url, json);
// }

function ensureValidContentType(
  contentType: string,
  response: Response
): Response | null {
  const responseContentType: string = (
    response.headers.get('content-type') || ''
  ).toLocaleLowerCase();
  if (responseContentType.includes(contentType.toLocaleLowerCase())) {
    return response;
  }
  return null;
}


export async function putJson(url: string, data = {}): Promise<any> {
  const request: RequestInit = await addAuthenticationHeaders({
    body: JSON.stringify(data),
    method: 'PUT'
  });
  try {
    const response = await fetch(url, request);
    const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
    const json = validJson ? await response.json() : {};
    // ensureValidResponse(response, json);
    return json;
  } catch (err) {
    // processError({
    //   message: 'Unable to complete PUT JSON request',
    //   err,
    //   url,
    //   details: { data }
    // });
  }
}
export async function patchJson(url: string, data = {}): Promise<any> {
  const request: RequestInit = await addAuthenticationHeaders({
    body: JSON.stringify(data),
    method: 'PATCH'
  });
  try {
    const response = await fetch(url, request);
    const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
    const json = validJson ? await response.json() : {};
    // ensureValidResponse(response, json);
    return json;
  } catch (err) {
    // processError({
    //   message: 'Unable to complete PATCH JSON request',
    //   err,
    //   url,
    //   details: { data: data }
    // });
  }
}
export async function postJson(
  url: string,
  data = {},
  params = {}
): Promise<any> {
  const request: RequestInit = await addAuthenticationHeaders({
    body: JSON.stringify(data),
    method: 'POST'
  });
  try {
    const response = await fetch(buildUrl(url, params), request);
    const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
    const json = validJson ? await response.json() : {};
    // ensureValidResponse(response, json);
    return json;
  } catch (err) {
    // processError({
    //   message: 'Unable to complete POST JSON request',
    //   err,
    //   url,
    //   details: { data }
    // });
  }
}
export async function getJson(url: string, params = {}): Promise<any> {
  const request: RequestInit = await addAuthenticationHeaders({
    method: 'GET'
  });
  try {
    const response = await fetch(buildUrl(url, params), request);
    const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
    const json = validJson ? await response.json() : {};
    // ensureValidResponse(response, json);
    return json;
  } catch (err) {
    // processError({
    //   message: 'Unable to complete GET JSON request',
    //   err,
    //   url,
    //   details: { params }
    // });
  }
}