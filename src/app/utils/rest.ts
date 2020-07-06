import { getJwtToken } from "app/services/auth";

const BASE_URL = process.env.API_URL
const JSON_CONTENT_TYPE = 'application/json';

async function addAuthenticationHeaders(options: { [k: string]: any }) {
  const jwtToken = getJwtToken();
  return {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": JSON_CONTENT_TYPE,
      Authorization: `JWT ${jwtToken}`
    }
  };
}

function buildUrl(url: string, params: {}) {
  const searchParams = new URLSearchParams(params).toString();
  return `${BASE_URL}${url}${searchParams === "" ? `?${searchParams}` : ""}`;
}

function handleErrors(response: Response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
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

  const response = await fetch(url, request);
  handleErrors(response);
  const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
  const json = validJson ? await response.json() : {};
  // ensureValidResponse(response, json);
  return json;
}

export async function patchJson(url: string, data = {}): Promise<any> {
  const request: RequestInit = await addAuthenticationHeaders({
    body: JSON.stringify(data),
    method: 'PATCH'
  });

  const response = await fetch(url, request);
  handleErrors(response);
  const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
  const json = validJson ? await response.json() : {};
  // ensureValidResponse(response, json);
  return json; 
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
  const response = await fetch(buildUrl(url, params), request);
  handleErrors(response);
  const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
  const json = validJson ? await response.json() : {};
  // ensureValidResponse(response, json);
  return json;
}

export async function getJson(url: string, params = {}): Promise<any> {
  const request: RequestInit = await addAuthenticationHeaders({
    method: 'GET'
  });

  const response = await fetch(buildUrl(url, params), request);
  handleErrors(response);
  const validJson = ensureValidContentType(JSON_CONTENT_TYPE, response);
  const json = validJson ? await response.json() : {};
  // ensureValidResponse(response, json);
  return json;
}