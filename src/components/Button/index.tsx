"use client";
interface ButtonProps {
  text: string;
}
const Button = (props: ButtonProps) => {
  return (
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {props.text}
    </button>
  );
};

export default Button;
