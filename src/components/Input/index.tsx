import React from "react";

interface InputProps {
  placeholder: string;
  fullWidth?: boolean;
}

function Input(props: InputProps) {
  return (
    <input
      type="text"
      className={`bg-grey border border-gray-300 text-gray-900 text-sm rounded-lg placeholder:text-bla focus:ring-primary-500 focus:border-primary-500 block ${
        props.fullWidth ? "w-full" : "w-32"
      } text-center p-2.5`}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
