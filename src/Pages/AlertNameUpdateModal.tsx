import React, { useEffect, useRef } from "react";
import { useEditAlertName } from "../API/useEditAlertName";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function AlertNameUpdateModal({
  setIsAlerNameModalOpen,
  existingAlertName,
  id,
}: {
  setIsAlerNameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  existingAlertName: string;
  id: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [alertname, setAlertName] = React.useState(existingAlertName);
  const { mutate: updateAlertName } = useEditAlertName();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsAlerNameModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAlerNameModalOpen, ref]);

  const queryClient = useQueryClient();
  return (
    <div>
      <div className="w-full h-screen bg-black/50 fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="w-[500px] h-fit bg-white p-6 rounded-md shadow-lg space-y-3"
          ref={ref}
        >
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={alertname}
              onChange={(e) => setAlertName(e.target.value)}
              className="w-full border-2 p-2 rounded-lg outline-none"
            />
            <button
              className="px-3 py-2 text-white bg-blue-500 rounded-md float-right"
              onClick={() =>
                updateAlertName(
                  { id, alertname },
                  {
                    onSuccess: () => {
                      toast.success("Alert name updated successfully");
                      setIsAlerNameModalOpen(false);
                      queryClient.invalidateQueries({
                        queryKey: ["getAllAlerts"],
                      });
                    },
                  }
                )
              }
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AlertNameUpdateModal;
