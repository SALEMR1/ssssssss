'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoSrc?: string;
  embedCode?: string;
}

export default function VideoModal({ isOpen, onClose, title, videoSrc, embedCode }: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
            aria-label="Close video"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl max-h-[92vh] bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-2">
              <h3 className="text-white font-bold text-base sm:text-lg truncate max-w-[80%]">{title}</h3>
              {embedCode && (() => {
                const match = embedCode.match(/href=([^&"]+)/);
                const directUrl = match ? decodeURIComponent(match[1]) : null;
                return directUrl ? (
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    فتح على فيسبوك ↗
                  </a>
                ) : null;
              })()}
            </div>

            {embedCode ? (
              <div 
                className="w-full flex items-center justify-center overflow-auto max-h-[75vh] py-2"
                dangerouslySetInnerHTML={{ __html: embedCode }}
              />
            ) : videoSrc ? (
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Play size={32} className="text-white ml-1" />
                </div>
                <p className="text-[#111827] font-medium text-lg">{title}</p>
                <p className="text-[#6B7280] text-sm mt-2">Video placeholder — replace with your actual video</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
