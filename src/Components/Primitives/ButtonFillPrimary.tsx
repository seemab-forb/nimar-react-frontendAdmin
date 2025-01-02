type ButtonFillPrimaryProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  children: React.ReactNode;
  isLoading?: boolean;
};

function ButtonFillPrimary(props: ButtonFillPrimaryProps) {
  const { children, isLoading, ...htmlButtonProps } = props;

  const { disabled } = htmlButtonProps;
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...htmlButtonProps}
      className="flex justify-center items-center gap-2 bg-gradient-to-b  from-[#6a97e8] to-[#3f79e2] text-white text-xs sm:text-base px-3 sm:px-6 py-0.5 2xl:py-1 rounded-md cursor-pointer active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
      disabled={isDisabled}
    >
      {!isLoading && children}
      {isLoading && <Loader />}
    </button>
  );
}
export default ButtonFillPrimary;

function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-6 rounded-full border-y-2 border-y-white aspect-square animate-spin" />
    </div>
  );
}
