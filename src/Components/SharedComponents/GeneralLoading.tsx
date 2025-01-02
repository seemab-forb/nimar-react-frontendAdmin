function GeneralLoading() {
  return (
    <div className="bg-[#eef2f6] h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-[56px] h-[56px] grid border-4 border-solid border-[#0000] rounded-[50%] border-r-[#29B3D1] spinner"></div>
        <div className="loader">
          <p>
            loading - <span className="text-[#29B3D1]">processing</span>
          </p>
          <div className="words">
            <span className="word">models</span>
            <span className="word">images</span>
            <span className="word">videos</span>
            <span className="word">metadata</span>
            <span className="word">files</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GeneralLoading;
