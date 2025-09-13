import { useState } from "react";

interface ImageUploadPreviewProps {
  label: string;
  onChange: (files: File[]) => void;
  hint?: string;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  label,
  onChange,
  hint,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onChange(files);

    const filePreviews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        filePreviews.push(reader.result as string);
        if (filePreviews.length === files.length) {
          setPreviews(filePreviews);
        }
      };
      reader.readAsDataURL(file);
    });

    if (files.length === 0) {
      setPreviews([]);
    }
  };

  return (
    <div>
      {/* Label */}
      <label className="block mb-1 ml-5">{label}</label>
      {/* Button Upload */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-2 p-5 border border-[var(--color-border)] w-full rounded-2xl"
      />
      {/* Image Preview */}
      <div className="flex gap-2 flex-wrap">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Preview ${idx + 1}`}
            className="w-40 h-40 object-cover rounded-md border border-[var(--color-border)] mb-2"
          />
        ))}
      </div>
      {/* Hint */}
      {hint && (
        <p className="text-sm ml-1 text-[var(--color-text)]/50">{hint}</p>
      )}
    </div>
  );
};

export default ImageUploadPreview;
