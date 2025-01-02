import { twMerge } from "tailwind-merge";

function InputFieldPrimary({
  className,
  ...props
}: {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    // <div className="grow">
    // TODO: remove the need for the grow class by seeing the effect in all the places where it is used
    <div className="">
      <input
        className={twMerge(
          "block w-full ring-1 ring-gray-400 focus-within:outline-blue-500 rounded-md px-3 py-[2px] placeholder:text-sm sm:placeholder:text-base",
          className
        )}
        {...props}
      />
    </div>
  );
}
export default InputFieldPrimary;
