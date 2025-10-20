"use client";

import { cn } from "src/lib/cn";
import { ImageModal } from "./image-modal";

interface FlashcardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function FlashcardImage({ src, alt, className }: FlashcardImageProps) {
  return (
    <ImageModal src={src} alt={alt}>
      <div
        className={cn(
          "aspect-square relative overflow-hidden rounded-lg bg-white",
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    </ImageModal>
  );
}
