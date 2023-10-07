"use client";
export const SearchInput = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-200 rounded-lg p-2 w-full"
        />
      </div>
    </div>
  );
};

