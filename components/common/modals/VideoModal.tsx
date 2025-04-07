"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

const VideoModal = ({ isOpen, onClose, videoId, title }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Convert Google Drive view URL to embed URL
  const getGoogleDriveEmbedUrl = (driveId: string) => {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300 ease-in-out">
      <div 
        ref={modalRef} 
        className="relative mx-4 w-full max-w-4xl rounded-lg bg-white shadow-2xl animate-fadeIn"
        style={{ 
          animationDuration: '0.3s' 
        }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-green to-green-deep p-4 text-white">
          <h3 className="text-xl font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal body - Video container with responsive padding */}
        <div className="relative bg-black w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={getGoogleDriveEmbedUrl(videoId)}
            frameBorder="0"
            allow="autoplay; fullscreen; encrypted-media"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title={title}
            className="shadow-inner"
          ></iframe>
        </div>
      </div>
      
      {/* Add global styles for animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
          animation-duration: 0.3s;
          animation-fill-mode: both;
          animation-timing-function: ease-out;
        }
      `}</style>
    </div>
  );
};

export default VideoModal;