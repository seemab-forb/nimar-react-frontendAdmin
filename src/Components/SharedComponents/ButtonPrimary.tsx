import React from "react";
import { RotatingLines } from "react-loader-spinner";

function ButtonPrimary({
  type = "button",
  variant,
  onClick,
  className,
  children,
  disabled = false,
  isLoading = false,
  loadingWrapperClass = "",
  loaderStrokeColor = "blue",
}: {
  type?: "button" | "submit" | "reset" | undefined;
  variant: "skeleton" | "fill";
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  loadingWrapperClass?: string;
  loaderStrokeColor?: string;
}) {
  return (
    <button
      type={type}
      className={` ${
        variant === "skeleton" ? "button-skeleton" : "button-fill"
      } ${className} `}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && (
        <div className={`${loadingWrapperClass}`}>
          <RotatingLines
            strokeColor={loaderStrokeColor}
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />
        </div>
      )}
      {!isLoading && children}
    </button>
  );
}
export default ButtonPrimary;
