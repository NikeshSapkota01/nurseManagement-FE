import Image from "next/image";

import { getBase64 } from "@/utils/utils";
import { ChangeEvent, useState, useRef } from "react";
import { FileUpload } from "src/constants/interface";

const FileUploadSingle: React.FC<FileUpload> = ({ name, setValue }) => {
  const [image, setImage] = useState<string | null>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];
    const base64 = await getBase64(image);

    setImage(base64);
    setValue(name, image);
  };

  const handleUploadClick = async (event: any) => {
    event.preventDefault();

    fileInputRef.current?.click();
  };

  const handleRemoveClick = async (event: any) => {
    event.preventDefault();
    if (fileInputRef.current !== null) {
      fileInputRef.current.value = "";
    }
    setValue(name, null);
    setImage(null);
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="flex flex-col justify-center items-center">
        {image && (
          <Image
            src={image}
            alt="Pic"
            width="100"
            height="100"
            className="w-20 h-20 p-1 center rounded-full ring-2 ring-grey-300"
          />
        )}
        {image ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white mt-2 font-bold py-2 px-4 rounded-lg flex justify-center"
            onClick={handleRemoveClick}
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
            </svg>
            Remove
          </button>
        ) : (
          <button
            className="bg-grey-300 hover:bg-grey-400 text-grey-800 font-bold mt-2 py-2 px-4 rounded-lg flex justify-center"
            onClick={handleUploadClick}
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUploadSingle;
