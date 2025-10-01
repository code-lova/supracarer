export const MessageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-40 bg-gray-300 rounded" />
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-300 rounded-md" />
          <div className="h-8 w-8 bg-gray-300 rounded-md" />
        </div>
      </div>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="cursor-wait rounded-xl px-4 py-3 border shadow-md bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-5 w-16 bg-gray-300 rounded-full" />
          </div>
          <div className="h-3 w-full bg-gray-200 rounded mt-2" />
          <div className="h-3 w-5/6 bg-gray-200 rounded mt-1" />
        </div>
      ))}
    </div>
  );
};
