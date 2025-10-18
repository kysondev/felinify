"use client";

import {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button } from "./button";
import { Card } from "./card";
import { ImageModal } from "./image-modal";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  disabled?: boolean;
  className?: string;
}

export interface ImageUploadRef {
  uploadImage: () => Promise<string | null>;
  reset: () => void;
}

export const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  ({ value, onChange, disabled, className }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file format
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a PNG, JPG, or GIF image");
        return;
      }

      // Store the file and create preview
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange(url); // Set preview URL temporarily
    };

    const uploadImage = async (): Promise<string | null> => {
      if (!selectedFile) return value || null;

      try {
        // Get Cloudinary signature
        const sigRes = await fetch("/api/cloudinary/signature");
        if (!sigRes.ok) throw new Error("Failed to get signature");
        const { signature, timestamp } = await sigRes.json();

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          // Clean up preview URL
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          setSelectedFile(null);
          setPreviewUrl(null);
          return data.secure_url;
        } else {
          console.error("Cloudinary upload error:", data);
          throw new Error(data.error?.message || "Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
        throw error;
      }
    };

    const reset = () => {
      // Clean up preview URL if it exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl(null);
      onChange(null);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    // Expose upload function to parent
    useImperativeHandle(ref, () => ({
      uploadImage,
      reset,
    }));

    const handleRemoveImage = () => {
      // Clean up preview URL if it exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl(null);
      onChange(null);
    };

    const handleClick = () => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    };

    // Use preview URL if available, otherwise use the value
    const displayUrl = previewUrl || value;

    return (
      <div className={className}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        {displayUrl ? (
          <Card className="relative group border-2 border-dashed border-primary/30 rounded-lg overflow-hidden">
            <div className="relative max-h-32 min-h-20">
              <ImageModal src={displayUrl} alt="Flashcard image">
                <img
                  src={displayUrl}
                  alt="Flashcard image"
                  className="w-full h-full object-contain"
                />
              </ImageModal>
              <div className="absolute bottom-2 left-2 right-2 flex gap-2 sm:hidden">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                  disabled={disabled}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Replace
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  disabled={disabled}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center hidden sm:flex">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                    disabled={disabled}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card
            className={`border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary/50 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleClick}
          >
            <div className="flex flex-col items-center gap-4">
              <ImageIcon className="h-8 w-8 text-primary/50" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Upload Image
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }
);
