const TestPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border border-white w-20 flex">
        <div
          style={{ marginLeft: "-20px" }}
          className="size-10 bg-red-500"
        ></div>
        <div className="size-10 bg-red-500"></div>
      </div>
    </div>
  );
};

export default TestPage;
