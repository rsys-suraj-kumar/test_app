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

  const handleTrimChange = (id: string, newStart: number, newEnd: number) => {
    setTimelineItems((items) => {
      const currentIndex = items.findIndex((item) => item.id === id);
      const currentItem = items[currentIndex];

      // Calculate the shift for subsequent clips
      const endDiff = newEnd - currentItem.end;

      return items.map((item, index) => {
        // Update the current item
        if (item.id === id) {
          return { ...item, start: newStart, end: newEnd };
        }

        // Update the previous item (extend/shrink its end to match current's start)
        if (index === currentIndex - 1) {
          return { ...item, end: newStart };
        }

        // Update all subsequent items (shift them by the amount current's end changed)
        if (index > currentIndex) {
          return {
            ...item,
            start: item.start + endDiff,
            end: item.end + endDiff,
          };
        }

        return item;
      });
    });
  };

  console.table(timelineItems);

  return (
    <div className="h-screen w-screen flex items-center justify-center px-12">
      <div className="border border-white w-full flex overflow-hidden">
        {timelineItems.map((item, index) => (
          <TimelineObject
            key={item.id}
            id={item.id}
            start={item.start}
            end={item.end}
            title={item.title}
            isFirst={index === 0}
            onTrimChange={handleTrimChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
