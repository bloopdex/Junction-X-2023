import React from 'react'

interface Props {
  placeholder: string
}

export default function Input({ placeholder }: Props) {
  return (
    <input
      placeholder={placeholder}
      className="appearance-none text-center border-none outline-none bg-[#EBEBEB] w-1/4 rounded"
    
    />
  );
}

