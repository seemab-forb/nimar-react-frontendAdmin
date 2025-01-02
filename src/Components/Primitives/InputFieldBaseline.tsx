import { twMerge } from "tailwind-merge";

function InputFieldBaseline({
  className,
  ...props
}: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge(
        "block w-full px-2 py-[2px] placeholder:text-xs sm:placeholder:text-sm focus-within:outline-none border-b border-gray-400 text-xs",
        className
      )}
      {...props}
    />
  );
}
export default InputFieldBaseline;
