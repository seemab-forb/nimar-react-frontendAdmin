import { RevolvingDot } from "react-loader-spinner";

function RevolvingDotLoading({ colorHex = "#000000" }: { colorHex?: string }) {
  return (
    <div className="w-full h-full">
      <RevolvingDot
        visible={true}
        height="80"
        width="80"
        color={colorHex}
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
export default RevolvingDotLoading;
