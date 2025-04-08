import React from "react";
import "./loader.css";
import LoaderLightSpin from "@/stories/loader/LoaderLightSpin";

type LoaderStyle = {
  color: string;
  size: string;
  opacity: number;
};

export interface LoaderProps {
  color: LoaderStyle["color"];
  size: LoaderStyle["size"];
  opacity: LoaderStyle["opacity"];
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Loader = ({
  color,
  size,
  opacity,
  onLogin,
  onLogout,
  onCreateAccount,
}: LoaderProps) => (
  <div className="loader-container">
    <img
      src="/images/logo.png"
      width={250}
      height={250}
      alt="EDNAV"
      className={`absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform`}
    />
    <div className={`relative top-0 right-0 bottom-0 left-0 z-0`}>
      <LoaderLightSpin />
    </div>
  </div>
);
