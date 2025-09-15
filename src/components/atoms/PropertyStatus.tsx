import { CheckCircle, XCircle, Clock } from "lucide-react";

export enum PropertyStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

interface PropertyStatusProps {
  status: PropertyStatus;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "chip" | "text";
  showIcon?: boolean;
}

const PropertyStatusComponent = ({
  status,
  size = "md",
  variant = "badge",
  showIcon = true,
}: PropertyStatusProps) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      text: "text-xs",
      padding: "px-2 py-1",
      iconSize: 12,
    },
    md: {
      text: "text-sm",
      padding: "px-3 py-1",
      iconSize: 14,
    },
    lg: {
      text: "text-base",
      padding: "px-4 py-2",
      iconSize: 16,
    },
  };

  // Status configurations
  const getStatusConfig = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.Approved:
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          borderColor: "border-green-200",
          icon: <CheckCircle size={sizeConfig[size].iconSize} />,
          label: "Approved",
        };
      case PropertyStatus.Rejected:
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          borderColor: "border-red-200",
          icon: <XCircle size={sizeConfig[size].iconSize} />,
          label: "Rejected",
        };
      case PropertyStatus.Pending:
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200",
          icon: <Clock size={sizeConfig[size].iconSize} />,
          label: "Pending",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
          icon: <Clock size={sizeConfig[size].iconSize} />,
          label: "Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const currentSize = sizeConfig[size];

  // Variant styles
  const getVariantClasses = () => {
    const baseClasses = `inline-flex items-center gap-1 font-medium ${currentSize.text} ${statusConfig.textColor}`;

    switch (variant) {
      case "badge":
        return `${baseClasses} ${currentSize.padding} ${statusConfig.bgColor} rounded-full border ${statusConfig.borderColor}`;
      case "chip":
        return `${baseClasses} ${currentSize.padding} ${statusConfig.bgColor} rounded-lg border ${statusConfig.borderColor}`;
      case "text":
        return baseClasses;
      default:
        return `${baseClasses} ${currentSize.padding} ${statusConfig.bgColor} rounded-full`;
    }
  };

  return (
    <span className={getVariantClasses()}>
      {showIcon && statusConfig.icon}
      {statusConfig.label}
    </span>
  );
};

export default PropertyStatusComponent;
