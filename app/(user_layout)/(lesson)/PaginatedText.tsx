"use client"
import React, { useState, useLayoutEffect, useRef } from "react";

interface PaginatedTextProps {
  text: string;
}

const PaginatedText: React.FC<PaginatedTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleText, setVisibleText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<string[]>([]);

  // Function to split text into pages based on container size
  const paginateText = (container: HTMLDivElement | null): string[] => {
    const pages: string[] = [];
    if (!container) return pages;

    let index = 0;
    while (index < text.length) {
      let currentIndex = index;
      while (currentIndex < text.length) {
        const currentText = text.substring(index, currentIndex + 1);
        container.innerText = currentText;

        // If the text overflows, end the current page
        if (container.scrollHeight > container.clientHeight) {
          break;
        }
        currentIndex++;
      }

      pages.push(text.substring(index, currentIndex));
      index = currentIndex;
    }

    return pages;
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      setPages(paginateText(container));
    }
  }, [text]);

  useLayoutEffect(() => {
    // Update visible text when `page` changes
    if (pages.length > 0) {
      setVisibleText(pages[page - 1] || "");
    }
  }, [page, pages]);

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
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous Page
          </button>
        )}
        {page < pages.length && (
          <button
            onClick={() => setPage(page + 1)}
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
