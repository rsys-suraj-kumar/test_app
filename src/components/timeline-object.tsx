"use client";

import { useRef, useState } from "react";

const TimelineObject = ({
  id,
  start,
  end,
  title,
  isFirst,
  dragOffset,
  onTrimChange,
  onDragOffset,
  onDragEnd,
}: {
  id: string;
  start: number;
  end: number;
  title: string;
  isFirst: boolean;
  dragOffset: number;
  onTrimChange: (id: string, newStart: number, newEnd: number) => void;
  onDragOffset: (offset: number) => void;
  onDragEnd: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<"left" | "right" | null>(null);

  const handleMouseDown = (e: React.MouseEvent, handle: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(handle);

    // Capture the starting values directly in the closure
    const startX = e.clientX;
    const startValue = start;
    const endValue = end;

    let currentStart = startValue;
    let currentEnd = endValue;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;

      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const parentWidth = parent.offsetWidth;
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / parentWidth) * 100;

      let newStart = startValue;
      let newEnd = endValue;

      const minWidth = 5; // Minimum clip width percentage

      if (handle === "left") {
        // Update the first block's margin based on drag distance (only for left trim)
        onDragOffset(deltaPercent);

        // Allow negative values (dragging beyond left edge)
        newStart = Math.min(startValue + deltaPercent, endValue - minWidth);
      } else {
        newEnd = Math.min(
          150,
          Math.max(startValue + minWidth, endValue + deltaPercent)
        );
      }

      currentStart = newStart;
      currentEnd = newEnd;
      onTrimChange(id, newStart, newEnd);
    };

    const handleMouseUp = () => {
      setIsDragging(null);

      // Reset the drag offset (margin goes back to 0)
      onDragEnd();

      // Snap back if dragged beyond the left boundary
      if (handle === "left") {
        if (isFirst && currentStart < 0) {
          // For first clip: snap to 0 and extend width
          const newWidth = currentEnd - currentStart;
          onTrimChange(id, 0, newWidth);
        } else if (!isFirst && currentStart < 0) {
          const newWidth = currentEnd - currentStart;
          onTrimChange(id, 0, newWidth);
        }
      }

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: `${end - start}%`,
        flexShrink: 0,
        marginLeft: isFirst ? `${start + dragOffset}%` : 0,
      }}
      className="bg-red-500 border h-10 px-2 relative group"
    >
      {/* Left trim handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => handleMouseDown(e, "left")}
        style={{ opacity: isDragging === "left" ? 1 : undefined }}
      />

      {/* Content */}
      <div className="text-white truncate">{title}</div>

      {/* Right trim handle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 bg-blue-500 cursor-ew-resize opacity-0 group-hover:opacity-100  transition-opacity z-10"
        onMouseDown={(e) => handleMouseDown(e, "right")}
        style={{ opacity: isDragging === "right" ? 1 : undefined }}
      />
    </div>
  );
};

export default TimelineObject;
