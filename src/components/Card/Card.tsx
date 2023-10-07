import React from "react";
interface CardProps {
  data: {
    id: number;
    distance: number;
    status: string;
    battery: number;
  };
}


const Card = ( {data}:CardProps ) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl pl-4">
      <div className="flex items-center ">
        <div className="md:flex-shrink-0">
          {/* Utilisez le nouveau SVG fourni */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <path
              d="M11 11L19 19M37 37L29 29"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M37 11L29 19M11 37L19 29"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="19"
              y="19"
              width="10"
              height="10"
              fill="#21b692"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M37 18C38.3845 18 39.7379 17.5895 40.889 16.8203C42.0401 16.0511 42.9373 14.9579 43.4672 13.6788C43.997 12.3997 44.1356 10.9922 43.8655 9.63437C43.5954 8.2765 42.9287 7.02922 41.9498 6.05026C40.9708 5.07129 39.7235 4.4046 38.3656 4.13451C37.0078 3.86441 35.6003 4.00303 34.3212 4.53285C33.0421 5.06266 31.9489 5.95987 31.1797 7.11101C30.4105 8.26215 30 9.61553 30 11M37 30C38.3845 30 39.7379 30.4105 40.889 31.1797C42.0401 31.9489 42.9373 33.0421 43.4672 34.3212C43.997 35.6003 44.1356 37.0078 43.8655 38.3656C43.5954 39.7235 42.9287 40.9708 41.9498 41.9497C40.9708 42.9287 39.7235 43.5954 38.3656 43.8655C37.0078 44.1356 35.6003 43.997 34.3212 43.4672C33.0421 42.9373 31.9489 42.0401 31.1797 40.889C30.4105 39.7379 30 38.3845 30 37M11 18C9.61553 18 8.26216 17.5895 7.11101 16.8203C5.95987 16.0511 5.06266 14.9579 4.53285 13.6788C4.00303 12.3997 3.86441 10.9922 4.13451 9.63437C4.4046 8.2765 5.07129 7.02922 6.05026 6.05026C7.02922 5.07129 8.2765 4.4046 9.63437 4.13451C10.9922 3.86441 12.3997 4.00303 13.6788 4.53285C14.9579 5.06266 16.0511 5.95987 16.8203 7.11101C17.5895 8.26215 18 9.61553 18 11M11 30C9.61553 30 8.26216 30.4105 7.11101 31.1797C5.95987 31.9489 5.06266 33.0421 4.53285 34.3212C4.00303 35.6003 3.86441 37.0078 4.13451 38.3656C4.4046 39.7235 5.07129 40.9708 6.05026 41.9497C7.02922 42.9287 8.2765 43.5954 9.63437 43.8655C10.9922 44.1356 12.3997 43.997 13.6788 43.4672C14.9579 42.9373 16.0511 42.0401 16.8203 40.889C17.5895 39.7379 18 38.3845 18 37"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="uppercase tracking-wide text-sm text-black font-semibold">
              id: {data.id}
            </div>
            <div
              className={`uppercase tracking-wide text-sm font-semibold ${
                data.battery<= 50 ? "text-red-500" : "text-green-500"
              }`}
            >
              {data.battery}%
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 gap-8">
            <div className="uppercase tracking-wide text-sm text-black-500 font-semibold">
              {data.distance}km
            </div>
            <div
              className={`uppercase tracking-wide text-sm font-semibold ${
                data.status === "Grounded" ? "text-red-500" : "text-green-500"
              }`}
            >
              {data.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
