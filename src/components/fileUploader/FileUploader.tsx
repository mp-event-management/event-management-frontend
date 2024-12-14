"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "../ui/Button";
import { useDropzone } from "@uploadthing/react";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // console.log(acceptedFiles);
      
      // Update files in the parent component
      setFiles(acceptedFiles as File[]);

      // Convert the first file to URL and trigger the parent field change
      if (acceptedFiles.length > 0) {
        onFieldChange(convertFileToUrl(acceptedFiles[0]));
        console.log(convertFileToUrl(acceptedFiles[0]));
      }
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="justify-center items-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-gray-100"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <Image
            src={imageUrl}
            alt="Uploaded image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full py-5 text-grey-500 gap-2">
          <Upload size={30} />
          <h3 className="text-sm mb-2 mt-2 font-bold">Drag photo here</h3>
          <p className="text-sm mb-4 font-normal">SVG, PNG, JPG</p>
          <Button type="button" variant="link" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
