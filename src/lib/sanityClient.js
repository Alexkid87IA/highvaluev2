import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Vient du fichier .env
  dataset: import.meta.env.VITE_SANITY_DATASET,     // Vient du fichier .env
  useCdn: false, // Mettre à `false` pour toujours avoir les données les plus fraîches pendant le développement
  apiVersion: '2025-05-06', // Utilisez la date d'aujourd'hui ou une date de version d'API Sanity récente
});

