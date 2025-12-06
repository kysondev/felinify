/**
 * Utility functions for revalidating Next.js cache paths
 */

export const revalidateDeckPaths = async (deckId: number) => {
  const paths = [
    "/library",
    "/explore",
    `/decks/edit/${deckId}`,
    `/decks/${deckId}`,
  ];

  await Promise.all(
    paths.map((path) =>
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=${path}`)
    )
  );
};

export const revalidateDeckWithFlashcards = async (deckId: number) => {
  const paths = [
    "/library",
    "/explore",
    `/decks/edit/${deckId}`,
    `/decks/${deckId}`,
    `/decks/${deckId}/flashcards`,
  ];

  await Promise.all(
    paths.map((path) =>
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=${path}`)
    )
  );
};

export const revalidateLibrary = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/library`
  );
};

export const revalidateExplore = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/explore`
  );
};

export const revalidateSettings = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/settings`
  );
};

export const revalidateStudyPaths = async (deckId: number) => {
  const paths = [
    "/library",
    "/explore",
    `/decks/${deckId}`,
    `/deck/edit/${deckId}`,
    "/study/challenge",
    "/study/flip",
    "/study/quiz",
  ];

  await Promise.all(
    paths.map((path) =>
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=${path}`)
    )
  );
};
