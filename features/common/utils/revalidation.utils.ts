/**
 * Utility functions for revalidating Next.js cache paths
 */

export const revalidateDeckPaths = async (deckId: string) => {
  const paths = [
    '/library',
    '/explore',
    `/decks/edit/${deckId}`,
    `/decks/${deckId}`,
  ];

  await Promise.all(
    paths.map(path => fetch(`/api/revalidate?path=${path}`))
  );
};

export const revalidateDeckWithFlashcards = async (deckId: string) => {
  const paths = [
    '/library',
    '/explore',
    `/decks/edit/${deckId}`,
    `/decks/${deckId}`,
    `/decks/${deckId}/flashcards`,
  ];

  await Promise.all(
    paths.map(path => fetch(`/api/revalidate?path=${path}`))
  );
};

export const revalidateLibrary = async () => {
  await fetch('/api/revalidate?path=/library');
};

export const revalidateExplore = async () => {
  await fetch('/api/revalidate?path=/explore');
};

export const revalidateStudyPaths = async (deckId: string) => {
  const paths = [
    '/library',
    '/explore',
    `/decks/${deckId}`,
    `/deck/edit/${deckId}`,
    '/study/challenge',
    '/study/flip',
    '/study/quiz',
  ];

  await Promise.all(
    paths.map(path => fetch(`/api/revalidate?path=${path}`))
  );
};
