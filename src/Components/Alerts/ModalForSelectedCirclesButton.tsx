import { useEffect, useState } from "react";
import ModalForSelectedCircles from "./ModalForSelectedCircles";
import { useAlertsContext } from "./AlertsContext";
import AddAlerts from "./AddAlerts";
import ButtonFillPrimary from "../Primitives/ButtonFillPrimary";

function ModalForSelectedCirclesButton() {
  const [isSelectedCircleModalOpen, setIsSelectedCircleModalOpen] =
    useState(false);
  const { clearState, alertName } = useAlertsContext();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && alertName !== "") {
      setIsSelectedCircleModalOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [alertName]);

  return (
    <div
      onClick={() => clearState()}
      className="w-full h-screen bg-black/30  fixed z-50 inset-0 flex items-center justify-center overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[500px] h-fit bg-white px-10 py-5 rounded-md shadow-lg shadow-black/30 space-y-3"
      >
        <AddAlerts />
        <div className="flex justify-center ">
          <ButtonFillPrimary
            onClick={() => setIsSelectedCircleModalOpen(true)}
            disabled={alertName === ""}
          >
            Selected Circle
          </ButtonFillPrimary>
        </div>
      </div>
      {isSelectedCircleModalOpen && (
        <ModalForSelectedCircles
          setIsSelectedCircleModalOpen={setIsSelectedCircleModalOpen}
        />
      )}
    </div>
  );
}

export default ModalForSelectedCirclesButton;
