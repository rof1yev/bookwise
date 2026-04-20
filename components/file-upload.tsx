"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import config from "@/lib/config";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  folder: string;
  value?: string;
  onChange?: (url: string) => void;
}

const {
  env: {
    imageKit: { publicKey, uploadUrl },
  },
} = config;

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

const FileUpload = ({
  type,
  accept,
  folder,
  value,
  onChange,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileUrl, setFileUrl] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFile = (file: File) => {
    if (type === "image" && file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be less than 20MB");
      return false;
    }

    if (type === "video" && file.size > MAX_VIDEO_SIZE) {
      toast.error("Video must be less than 50MB");
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    setUploading(true);
    setProgress(0);

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
      formData.append("folder", folder);

      const xhr = new XMLHttpRequest();

      xhr.open("POST", uploadUrl!);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        const data = JSON.parse(xhr.response);

        if (!data.url) {
          toast.error("Upload failed");
          return;
        }

        setFileUrl(data.url);
        onChange?.(data.url);

        toast.success(`${type} uploaded successfully`);
      };

      xhr.onerror = () => {
        toast.error("Upload error");
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = useCallback(() => {
    setFileUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.("");
  }, [onChange]);

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        hidden
        onChange={handleUpload}
      />

      <div
        onClick={() => !fileUrl && fileInputRef.current?.click()}
        className="relative flex items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden bg-light-300 hover:bg-primary-admin/90 transition-colors"
      >
        {fileUrl ? (
          <>
            {type === "image" ? (
              <Image
                src={fileUrl}
                alt="uploaded"
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={fileUrl}
                controls
                className="w-full h-full object-cover"
              />
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-md"
            >
              <XIcon size={16} />
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-sm">
              {uploading ? "Uploading..." : "Click to upload"}
            </p>
            <span className="text-xs text-gray-400">
              {type === "image"
                ? "PNG, JPG, WEBP (max 20MB)"
                : "MP4 (max 50MB)"}
            </span>
          </div>
        )}
      </div>

      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full text-xs text-white text-center"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
