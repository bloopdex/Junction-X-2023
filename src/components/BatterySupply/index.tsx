import React from "react";

function BatterySupply() {
  return (
    <div className="flex flex-row justify-between bg-grey border border-gray-300 text-gray-900 text-sm rounded-lg placeholder:text-bla focus:ring-primary-500 focus:border-primary-500 w-full text-center p-2.5">
      <p>Battery Supply</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
      </label>
    </div>
  );
}

export default BatterySupply;
