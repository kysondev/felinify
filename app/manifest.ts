import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Clami - AI Flashcards For Focused, Fast Learning',
    short_name: 'Clami',
    description: 'Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#C96442',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/clami.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/clami.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}