const AppBarContainer = ({
  children,
  data,
  onSelect,
  selectedId,
}: {
  children?: React.ReactNode;
  data: Array<{ [x: string]: any }>;
  onSelect: (data: any) => any;
  selectedId: number | null;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 h-screen">
      {/* Sidebar */}
      <div className="bg-white col-span-1 md:col-span-2 lg:col-span-1 shadow-md p-0 overflow-y-auto min-h-screen max-h-screen">
        <div className="p-2 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">Episodes</h1>
        </div>
        <ol>
          {data?.map((item, i) => {
            return (
              <li
                key={i}
                className={`p-2 hover:bg-blue-500 hover:text-white cursor-pointer border-b border-gray-300 transition duration-300 ease-in-out ${
                  selectedId === item.id ? "bg-blue-700 text-white" : ""
                }`}
                onClick={() => {
                  if (selectedId === item.id) {
                    onSelect(null);
                  } else {
                    onSelect(item);
                  }
                }}
              >
                {item?.name}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Main Content */}
      <div className="col-span-1 md:col-span-1 lg:col-span-3 p-6 overflow-y-auto min-h-screen max-h-screen">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AppBarContainer;