"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@user/services/user.service";
import { getDeckById } from "@deck/services/deck.service";
import { Deck } from "db/types/models.types";

interface UseDeckLoaderResult {
  deck: Deck | null;
  userIdRef: React.MutableRefObject<string | null>;
  initialMasteryRef: React.MutableRefObject<number>;
  isLoading: boolean;
  noPermission: boolean;
}

/**
 * Loads the current user and deck, handles redirects and permission checks.
 * Centralizes the repeated logic used by study mode pages.
 */
export function useDeckLoader(deckId: string | null): UseDeckLoaderResult {
  const router = useRouter();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noPermission, setNoPermission] = useState<boolean>(false);

  const userIdRef = useRef<string | null>(null);
  const initialMasteryRef = useRef<number>(0);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) {
        router.push("/workspace/library");
        return;
      }

      try {
        const { data: user } = await getUser();
        if (!user) {
          router.push("/auth/login");
          return;
        }

        userIdRef.current = user.id;
        const deckResponse = await getDeckById(deckId, user.id);

        if (!deckResponse.data) {
          router.push("/workspace/library");
          return;
        }

        if (
          deckResponse.data.visibility !== "public" &&
          deckResponse.data.userId !== user.id
        ) {
          setNoPermission(true);
          return;
        }

        setDeck(deckResponse.data as unknown as Deck);
        initialMasteryRef.current = deckResponse.data.progress?.mastery || 0;
      } catch (error) {
        console.error("Error fetching deck:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeck();
  }, [deckId, router]);

  return { deck, userIdRef, initialMasteryRef, isLoading, noPermission };
}

