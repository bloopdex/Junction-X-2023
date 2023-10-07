import React from 'react'
import Input from './Input';


export default function FilterByBattery() {
  return (
    <div>
      <div>
        <h1 className="uppercase tracking-wide text-sm font-semibold">
          Filter by Battery
        </h1>
      </div>
      <div className="flex gap-4">
        <Input placeholder="0%" />
        <Input placeholder='100%'/>
      </div>
      <div></div>
    </div>
  );
}
