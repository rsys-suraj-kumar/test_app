const TimelineObject = ({
  start,
  end,
  title,
}: {
  start: number;
  end: number;
  title: string;
}) => {
  return (
    <div
      style={{ width: `${end - start}%` }}
      className="bg-red-500 border h-10 px-2"
    >
      <div className="text-white truncate">{title}</div>
    </div>
  );
};

export default TimelineObject;
