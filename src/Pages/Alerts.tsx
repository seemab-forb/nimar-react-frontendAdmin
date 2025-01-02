import OutletMainContainer from "../Components/SharedComponents/OutletMainContainer";
import { useAlertsContext } from "../Components/Alerts/AlertsContext";
import AlertsTable from "../Components/Alerts/AlertsTable";
import { useEffect, useRef, useState } from "react";
import SelectUsersModal from "../Components/SelectUsersModal";
import MainHeader from "../Components/SharedComponents/MainHeader";
import { FaUsersRectangle } from "react-icons/fa6";

function Alerts() {
  const { source, setSource } = useAlertsContext();
  const [addAlertModalOpen, setAddAlertModalOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setAddAlertModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAddAlertModalOpen, ref]);
  return (
    <OutletMainContainer>
      <div>
        <div className="bg-white w-full max-h-screen p-3 rounded-lg shadow-lg space-y-4 overflow-y-auto hide-scrollbar">
          <MainHeader
            title="Alerts"
            icon={<FaUsersRectangle className="text-2xl 2xl:text-4xl" />}
          />
          <div className="flex justify-between">
            <h1 className="text-xl">Alerts and Notifications</h1>
            <div className="relative" ref={ref}>
              <button
                className="flex justify-center items-center bg-gradient-to-b from-[#6a97e8] to-[#3f79e2] text-white text-xs sm:text-base px-3 sm:px-6 py-0.5 2xl:py-1 rounded-md cursor-pointer active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
                onClick={() => setAddAlertModalOpen((prev) => !prev)}
              >
                New Campaign
              </button>
              {addAlertModalOpen && (
                <div className="absolute right-0 mt-2  bg-white shadow-lg rounded-md">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                    onClick={() => setSource("AR")}
                  >
                    Archived Data
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                    onClick={() => setSource("WebContent")}
                  >
                    Web Content
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-blue-500"
                    onClick={() => setSource("Live")}
                  >
                    Live
                  </button>
                </div>
              )}
            </div>
          </div>

          <AlertsTable />
        </div>

        {source === "AR" && <SelectUsersModal />}
      </div>
    </OutletMainContainer>
  );
}

export default Alerts;
