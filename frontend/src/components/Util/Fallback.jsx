import React from "react";

function Fallback() {
  return (
    <div className="w-full">
      <div className="mb-4">
        {/* Card-style skeleton */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-4 md:p-6">
            {/* Title skeleton */}
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 animate-pulse"></div>
              <div
                className="ml-3 h-4 mr-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10
                   animate-pulse w-1/3"
              ></div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-3">
              <div className="h-4 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 animate-pulse w-full"></div>
              <div className="h-4 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 animate-pulse w-5/6"></div>
              <div
                className={`h-4 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 animate-pulse w-2/3`}
              ></div>
            </div>

            {/* Footer skeleton */}
            <div className="flex justify-between mt-4">
              <div
                className={`h-4 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 animate-pulse w-1/4`}
              ></div>
              <div
                className={`h-4 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 animate-pulse w-1/5`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fallback;
