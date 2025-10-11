"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";
import { X, ZoomIn } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export function ImageModal({ src, alt, children }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      handleClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleClose();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const modalContent =
    isOpen && mounted ? (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
        onClick={handleBackdropClick}
      >
        <div className="relative max-w-4xl max-h-[90vh] mx-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain max-h-[90vh] rounded-lg"
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    ) : null;

  return (
    <>
      <div
        className="cursor-pointer group relative"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        {children}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
          <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
