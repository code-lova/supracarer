export const ApptsStatCountSkeleton = () => {
  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md py-1 px-3 animate-pulse">
      <div className="flex items-center justify-center">
        <div className="h-4 bg-gray-200 rounded w-32 mt-1"></div>
      </div>
      <div className="flex items-center justify-between mt-4 mb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-200 rounded w-8"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="w-9 h-9 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export const GrsSkeleton = () => {
  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md px-3 py-1 animate-pulse">
      <div className="flex items-center justify-center">
        <div className="h-4 bg-gray-200 rounded w-28 mt-1 mb-2"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-200 rounded w-16 mt-3"></div>
          <div className="h-4 bg-gray-200 rounded w-12 mt-3"></div>
        </div>
        <div className="w-11 h-11 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export const RatingTrendsSkeleton = () => {
  return (
    <div className="w-full h-[190px] md:h-[190px] flex flex-col items-center justify-center animate-pulse">
      <div className="w-full h-32 bg-gray-200 rounded mb-2"></div>
      <div className="flex justify-between w-full">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

export const AppointmentBarchartSkeleton = () => {
  return (
    <div className="bg-white w-full h-[380px] border-2 rounded-2xl shadow-md">
      <div className="p-4 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-8 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export const RecentApptSkeleton = () => {
  return (
    <div className="bg-white w-full h-[202px] border-2 rounded-2xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
      </div>
      <div className="space-y-3 mt-6">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
