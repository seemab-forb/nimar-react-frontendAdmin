import InputFieldPrimary from "./InputFieldPrimary";
function InputWithLabelPrimary({
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
      <label {...labelProps} className="text-sm">
        {label}
      </label>
      <InputFieldPrimary {...inputProps} />
    </div>
  );
}
export default InputWithLabelPrimary;
