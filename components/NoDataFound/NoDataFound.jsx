import React from "react";

const NoDataFound = () => {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <p className="text-base-content/50 w-fit text-center text-xl font-semibold">
        No Data Found
      </p>
      <p className="text-center text-base-content/50">
        There is no matched data to show right now
      </p>
    </div>
  );
};

export default NoDataFound;