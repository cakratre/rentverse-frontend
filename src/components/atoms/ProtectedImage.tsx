import React from "react";

interface ProtectedImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt,
  className,
}) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative inline-block">
      {/* Main Image */}
      <img
        src={src}
        alt={alt || "protected"}
        onContextMenu={handleContextMenu}
        draggable={false}
        className={`select-none pointer-events-none ${className}`}
      />
      {/* Overlay anti click */}
      <div className="absolute inset-0 bg-transparent" />
    </div>
  );
};

export default ProtectedImage;
