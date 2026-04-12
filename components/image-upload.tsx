"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import config from "@/lib/config";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { FILE_IMAGE_MAX_SIZE } from "@/lib/constants";

const {
  env: {
    imageKit: { publicKey },
  },
} = config;

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value || "");

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    if (file.size > FILE_IMAGE_MAX_SIZE) return toast.error("Max size 5MB");

    setUploading(true);

    try {
      const authRes = await fetch("/api/auth/imagekit");
      const { signature, expire, token } = await authRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", publicKey!);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("token", token);
      formData.append("folder", "/university-card");

      const res = await fetch(config.env.imageKit.uploadUrl!, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.url) {
        console.error(data);
        return;
      }

      setImageUrl(data.url);
      onChange?.(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = useCallback(() => {
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.("");
  }, [onChange]);

  return (
    <div className="space-y-4">
      <input type="file" ref={fileInputRef} hidden onChange={handleUpload} />
      <div
        onClick={() => !imageUrl && fileInputRef.current?.click()}
        className="relative flex items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition hover:border-black bg-dark-300 hover:bg-dark-300/80"
      >
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="uploaded"
              fill
              className="object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md hover:bg-black"
            >
              <XIcon width={16} height={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center px-4">
            <button className="upload-btn">
              <Image
                src="/icons/upload.svg"
                alt="upload icon"
                width={20}
                height={20}
                className="object-contain"
              />
              <p>Upload a file</p>
            </button>
            <p className="text-sm font-medium text-muted-foreground">
              {uploading ? "Uploading..." : "Click to upload image"}
            </p>
            <span className="text-xs text-gray-500">
              PNG, JPG, WEBP (max 5MB)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
