import { createClient } from '@sanity/client';

export const config = {
  dataset: "production",
  projectId: "1m4gkzov",
  apiVersion: '2023-11-08',
  useCdn: false,
};

export const sanity = createClient(config);
