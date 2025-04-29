"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  position?: "center" | "bottom-right";
  width?: string;
  headerColor?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  position = "center",
  width = "max-w-lg",
  headerColor = "bg-orange-600",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 ${
        position === "center"
          ? "inset-0 flex items-center justify-center bg-black/50"
          : "bottom-4 right-4"
      }`}
    >
      <div
        className={`w-full ${width} overflow-hidden rounded-lg bg-white shadow-xl`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between ${headerColor} px-6 py-4 text-white`}
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
