import InputFieldBaseline from "./InputFieldBaseline";
function InputWithLabelBaseline({
  label,
  labelProps,
  inputProps,
}: {
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  inputProps?: React.HTMLProps<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-1 my-2 grow">
      <label {...labelProps} className="text-xs 2xl:text-sm">
        {label}
      </label>
      <InputFieldBaseline {...inputProps} />
    </div>
  );
}
export default InputWithLabelBaseline;
