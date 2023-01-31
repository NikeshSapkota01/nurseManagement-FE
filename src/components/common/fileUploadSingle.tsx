import { multiFormData } from "@/utils/httpUtils";
import { ChangeEvent, useState, useRef } from "react";
import endpoints from "src/constants/endpoint";
import { FileUpload } from "src/constants/interface";

/**
 * Component for uploading files.
 *
 * @param {IFileUploadSingeProps} param0
 * @returns
 */
const FileUploadSingle: React.FC<FileUpload> = ({
  onFileUploaded,
  nurseId,
}) => {
  const [file, setFile] = useState<File | null>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);

    let formData = new FormData();
    const id = nurseId?.toString() ?? "0";

    formData.append("nurseImage", e.target.files[0]);
    formData.append("nurseId", id);

    const { data } = await multiFormData.post(
      endpoints.nurse.uploadImage,
      formData
    );

    onFileUploaded(data);
  };

  const handleUploadClick = async (event: any) => {
    event.preventDefault();

    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div>{file && `${file.name} - ${file.type}`}</div>
      <div className="flex justify-center">
        <button
          className="inline-block mb-9 mt-5 h-10 p-2 text-green-500 font-medium text-sm uppercase rounded shadow-md"
          onClick={handleUploadClick}
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
};

export default FileUploadSingle;
