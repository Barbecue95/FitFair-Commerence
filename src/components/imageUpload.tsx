"use client";

import { ChevronLeft, ChevronRight, UploadCloud, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

export function MultipleImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

    // Limit check
    if (files.length + droppedFiles.length > 5) {
      setError("You can upload up to 10 images.");
      return;
    }

    for (const file of droppedFiles) {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return;
      }
    }

    setFiles((prev) => [...prev, ...droppedFiles].slice(0, 10));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);

    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // Limit check
      if (files.length + selectedFiles.length > 5) {
        setError("You can upload up to 10 images.");
        return;
      }

      for (const file of selectedFiles) {
        const error = validateFile(file);
        if (error) {
          setError(error);
          return;
        }
      }

      setFiles((prev) => [...prev, ...selectedFiles].slice(0, 10));
    }
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (currentImageIndex >= index && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentImageIndex < files.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Images</h2>
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
          <UploadCloud className="h-12 w-12 text-blue-400" />
          <div className="text-sm">
            <span className="font-semibold">Drag your file(s) or </span>
            <span className="text-primary font-semibold text-blue-400">
              browse
            </span>
          </div>
          <p className="text-xs text-gray-500">Max 10 MB per file</p>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-500 text-center" role="alert">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <div className="relative" {...handlers}>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(files[currentImageIndex])}
                alt={`Preview ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(currentImageIndex);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label={`Remove image ${currentImageIndex + 1}`}
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            {files.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
                  }
                  className="absolute top-1/2 left-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors -translate-y-1/2"
                  disabled={currentImageIndex === 0}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      Math.min(files.length - 1, currentImageIndex + 1)
                    )
                  }
                  className="absolute top-1/2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors -translate-y-1/2"
                  disabled={currentImageIndex === files.length - 1}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </>
            )}
          </div>
          <div className="mt-2 flex justify-center items-center">
            <p className="text-sm text-gray-500 mr-2">
              {currentImageIndex + 1} of {files.length}
            </p>
            <div className="flex-1 overflow-x-auto whitespace-nowrap flex justify-center">
              {files.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`inline-block w-2 h-2 rounded-full mx-1 ${
                    index === currentImageIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
