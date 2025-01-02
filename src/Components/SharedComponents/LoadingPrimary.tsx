import { RotatingLines } from "react-loader-spinner";

function LoadingPrimary() {
  return (
    <div className="flex justify-center">
      <span className=" mt-20">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
      </span>
    </div>
  );
}
export default LoadingPrimary;
