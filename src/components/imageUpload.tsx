"use client";

import { UploadCloud, X } from "lucide-react";
import React, { useRef, useState } from "react";

export function MultipleImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }
    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const droppedFiles = Array.from(e.dataTransfer.files);

    for (const file of droppedFiles) {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return;
      }
    }

    setFiles((prev) => [...prev, ...droppedFiles].slice(0, 9));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);

    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      for (const file of selectedFiles) {
        const error = validateFile(file);
        if (error) {
          setError(error);
          return;
        }
      }

      setFiles((prev) => [...prev, ...selectedFiles].slice(0, 9));
    }
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          aria-label="File upload"
        />

        <div className="flex flex-col items-center gap-4">
          <UploadCloud className="h-12 w-12 text-gray-400" />
          <div className="text-sm">
            <span className="font-semibold">Drag your file(s) or </span>
            <span className="text-primary font-semibold">browse</span>
          </div>
          <p className="text-xs text-gray-500">Max 10 MB files are allowed</p>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-500 text-center" role="alert">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label={`Remove image ${index + 1}`}
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ))}
          {[...Array(Math.max(0, 3 - files.length))].map((_, index) => (
            <div
              key={`empty-${index}`}
              className="aspect-square bg-gray-100 rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}
