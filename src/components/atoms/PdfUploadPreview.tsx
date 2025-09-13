import { useState } from "react";

interface PdfUploadPreviewProps {
  label: string;
  onChange: (files: File[]) => void;
  hint?: string;
}

const PdfUploadPreview: React.FC<PdfUploadPreviewProps> = ({
  label,
  onChange,
  hint,
}) => {
  const [filesList, setFilesList] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onChange(files);
    setFilesList(files);
  };

  return (
    <div>
      {/* Label */}
      <label className="block mb-1 ml-5">{label}</label>

      {/* Button Upload */}
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="mb-2 p-5 border border-[var(--color-border)] w-full rounded-2xl"
      />

      {/* File List Preview */}
      <div className="flex flex-col gap-2 mb-2">
        {filesList.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 border border-[var(--color-border)] rounded-md"
          >
            <span className="truncate">{file.name}</span>
            <span className="text-sm text-[var(--color-text)]/50">
              {(file.size / 1024).toFixed(2)} KB
            </span>
          </div>
        ))}
      </div>

      {/* Hint */}
      {hint && (
        <p className="text-sm ml-1 text-[var(--color-text)]/50">{hint}</p>
      )}
    </div>
  );
};

export default PdfUploadPreview;
