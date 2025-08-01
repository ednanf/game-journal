import axios from 'axios';
import { z } from 'zod';
import type { AxiosRequestConfig } from 'axios';
import { getAuthToken } from './getAuthToken';
import { EnvelopeSchema } from '../schemas/envelopeSchema.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    config.headers = config.headers ?? {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// This function parses the response envelope and throws an error if the message is 'error'.
const parseEnvelope = <T>(schema: z.ZodSchema<T>, response: unknown): T => {
  const envelope = EnvelopeSchema(schema).parse(response);
  if (envelope.message === 'error') {
    throw new Error('Backend returned error: ' + JSON.stringify(envelope.data));
  }
  return envelope.data;
};

// This function is used to parse the response envelope for GET requests.
// It ensures that the response data conforms to the expected schema and throws an error if it does not.
export const getSafe = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.get(url, config);
  return parseEnvelope(schema, response.data);
};

// This function is used to parse the response envelope for POST requests.
// It ensures that the response data conforms to the expected schema and throws an error if it does not.
// It also validates the payload data against the provided schema before sending the request.
export const postSafe = async <T, U>(
  url: string,
  data: U,
  responseSchema: z.ZodSchema<T>,
  payloadSchema: z.ZodSchema<U>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  payloadSchema.parse(data);
  const response = await api.post(url, data, config);
  return parseEnvelope(responseSchema, response.data);
};

// This function is used to parse the response envelope for PATCH requests.
// It ensures that the response data conforms to the expected schema and throws an error if it does not.
// It also validates the payload data against the provided schema before sending the request.
export const patchSafe = async <T, U>(
  url: string,
  data: U,
  responseSchema: z.ZodSchema<T>,
  payloadSchema: z.ZodSchema<U>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  payloadSchema.parse(data);
  const response = await api.patch(url, data, config);
  return parseEnvelope(responseSchema, response.data);
};

// This function is used to parse the response envelope for DELETE requests.
// It ensures that the response data conforms to the expected schema and throws an error if it does not.
export const delSafe = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.delete(url, config);
  return parseEnvelope(schema, response.data);
};

export default api;
