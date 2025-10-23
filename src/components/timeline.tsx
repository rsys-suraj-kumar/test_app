"use client";

import TimelineObject from "./timeline-object";
import { useState } from "react";

const initialTimelineItems = [
  {
    start: 0,
    end: 30,
    id: "1",
    title: "Timeline Object 1",
  },
  {
    start: 30,
    end: 45,
    id: "2",
    title: "Timeline Object 2",
  },
  {
    start: 45,
    end: 90,
    id: "3",
    title: "Timeline Object 3",
  },
];

const Timeline = () => {
  const [timelineItems, setTimelineItems] = useState(initialTimelineItems);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTrimChange = (id: string, newStart: number, newEnd: number) => {
    setTimelineItems((items) => {
      return items.map((item) => {
        // Only update the current item being trimmed
        if (item.id === id) {
          return { ...item, start: newStart, end: newEnd };
        }
        return item;
      });
    });
  };

  const handleDragOffset = (offset: number) => {
    setDragOffset(offset);
  };

  const resetDragOffset = () => {
    setDragOffset(0);
  };

  console.table(timelineItems);

  return (
    <div className="h-screen w-screen flex items-center justify-center px-12">
      <div className="border border-white w-full flex ">
        {timelineItems.map((item, index) => (
          <TimelineObject
            key={item.id}
            id={item.id}
            start={item.start}
            end={item.end}
            title={item.title}
            isFirst={index === 0}
            dragOffset={dragOffset}
            onTrimChange={handleTrimChange}
            onDragOffset={handleDragOffset}
            onDragEnd={resetDragOffset}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
