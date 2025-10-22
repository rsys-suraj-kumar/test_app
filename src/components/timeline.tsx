import TimelineObject from "./timeline-object";

const timelineItems = [
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
  return (
    <div className="h-screen w-screen flex items-center justify-center px-12">
      <div className="border border-white w-full flex">
        {timelineItems.map((item) => (
          <TimelineObject
            key={item.id}
            start={item.start}
            end={item.end}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
