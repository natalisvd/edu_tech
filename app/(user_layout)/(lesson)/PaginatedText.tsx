"use client";
import React, { useState, useEffect, useRef } from "react";

interface PaginatedTextProps {
  text: string;
}

const PaginatedText: React.FC<PaginatedTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleText, setVisibleText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let index = currentIndex;

    const checkTextFit = () => {
      while (index < text.length) {
        const currentText = text.substring(currentIndex, index + 1);
        container.innerText = currentText;

        if (container.scrollHeight > container.clientHeight) {
          break;
        }
        index++;
      }

      setVisibleText(text.substring(currentIndex, index));
    };

    checkTextFit();
  }, [page, text, currentIndex]);

  const handleNextPage = () => {
    if (currentIndex + visibleText.length < text.length) {
      setCurrentIndex(currentIndex + visibleText.length);
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(currentIndex - visibleText.length, 0));
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="w-full h-[60vh] overflow-hidden p-4 border border-gray-300"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {visibleText}
      </div>

      <div className="mt-4 flex justify-between">
        {page > 1 && (
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous Page
          </button>
        )}
        {currentIndex + visibleText.length < text.length && (
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginatedText;
