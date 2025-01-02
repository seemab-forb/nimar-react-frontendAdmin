import { twMerge } from "tailwind-merge";
import ButtonFillPrimary from "./Primitives/ButtonFillPrimary";
import { RiFileList2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useGetStopWordsDictionary } from "../API/useGetStopWordsDictionary";
import axios from "axios";
import { useAlertsContext } from "./Alerts/AlertsContext";
import FinalFormCreateAlert from "./FinalFormCreateAlert";
import { useAddMoreDictionariesToAlert } from "../API/useAddMoreDictionariesToAlert";

export default function SelectDictionariesModal({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isFinalFormModalOpen, setIsFinalFormModalOpen] = useState(false);
  const [selectedDictionaryIds, setSelectedDictionaryIds] = useState<string[]>(
    []
  );
  const { setSelectedDictionaries, previousDictionaries, alertId } =
    useAlertsContext();
  useEffect(() => {
    setSelectedDictionaries(selectedDictionaryIds);
  }, [selectedDictionaryIds]);
  const handleCheckboxChange = (dictionaryId: string) => {
    setSelectedDictionaryIds((prev) =>
      prev.includes(dictionaryId)
        ? prev.filter((id) => id !== dictionaryId)
        : [...prev, dictionaryId]
    );
  };
  const { data, isError, isPending, error } = useGetStopWordsDictionary();
  const errMessage = axios.isAxiosError<{ message: string }>(error)
    ? error.response?.data.message ?? error.message
    : "Error";
  const addMoreDictionariesToAlert = useAddMoreDictionariesToAlert();
  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false);
        e.stopPropagation();
      }}
      className={twMerge(
        "w-full h-screen bg-black/50 fixed z-50 inset-0 flex items-center justify-center overflow-hidden "
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[60%] h-[60%] bg-white p-6 flex flex-col rounded-md shadow-lg  overflow-hidden"
      >
        <div className="w-full flex items-center justify-between  mb-3">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              onClick={() => setIsModalOpen(false)}
              size={20}
              className="cursor-pointer hover:text-blue-500"
            />

            <p className="text-xl font-bold">Select Dictionaries</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedDictionaryIds.length > 0 && (
              <button
                onClick={() => setSelectedDictionaryIds([])}
                className="bg-gray-500 text-white px-3 py-1 rounded-md"
              >
                Reset
              </button>
            )}
            <ButtonFillPrimary
              onClick={() => {
                if (previousDictionaries.length < 1) {
                  setIsFinalFormModalOpen(true);
                } else {
                  addMoreDictionariesToAlert.mutate(
                    {
                      alertId: alertId,
                      dictionariesIds: selectedDictionaryIds,
                    },
                    {
                      onSuccess: () => {
                        setIsModalOpen(false);
                      },
                    }
                  );
                }
              }}
              disabled={selectedDictionaryIds.length === 0}
            >
              Save
            </ButtonFillPrimary>
          </div>
        </div>
        <div className="w-full h-full overflow-auto flex  flex-wrap gap-10 border p-5 rounded-md shadow-md shadow-black/30">
          {data && !isPending && !isError && (
            <>
              {data?.map((dictionary) => (
                <label key={dictionary.id} title={dictionary.dictionaryName}>
                  <div
                    className={twMerge(
                      "bg-gray-100 p-2 rounded-md hover:text-blue-500 flex items-center justify-center cursor-pointer gap-2 shadow-md shadow-black/30 hover:scale-105   border",
                      selectedDictionaryIds.includes(
                        dictionary.id.toLocaleString()
                      )
                        ? "text-blue-500"
                        : "",
                      previousDictionaries.includes(
                        dictionary.id.toLocaleString()
                      ) && "hidden"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="ml-2"
                      value={dictionary.id}
                      checked={selectedDictionaryIds.includes(
                        dictionary.id.toLocaleString()
                      )}
                      onChange={() =>
                        handleCheckboxChange(dictionary.id.toLocaleString())
                      }
                    />
                    {dictionary.dictionaryName}
                    <RiFileList2Line size={20} />
                  </div>
                </label>
              ))}
            </>
          )}
          {isPending && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="h-11 w-11 border-blue-700 border-4 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
          {isError && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-red-500">{errMessage}</p>
            </div>
          )}
        </div>
      </div>
      {isFinalFormModalOpen && (
        <FinalFormCreateAlert setIsModalOpen={setIsFinalFormModalOpen} />
      )}
    </div>
  );
}
