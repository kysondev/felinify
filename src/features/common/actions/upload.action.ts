import { authClient } from "@auth/auth-client";
import toast from "react-hot-toast";

export const upload = async (selectedFile: File) => {
  try {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const sigRes = await fetch("/api/cloudinary/signature");
    if (!sigRes.ok) throw new Error("Failed to get signature");
    const { signature, timestamp } = await sigRes.json();

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
      await authClient.updateUser({ image: data.secure_url });
    } else {
      console.error("Cloudinary upload error:", data);
      toast.error(data.error?.message || "Upload failed");
    }
  } catch (err) {
    console.error("Upload error:", err);
    toast.error("Unexpected upload error");
  }
};
