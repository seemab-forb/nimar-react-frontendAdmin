import React from "react";
import { useAlertsContext } from "./Alerts/AlertsContext";
import CircleWithName from "./Alerts/CircleWithName";
import { useGetStopWordsDictionary } from "../API/useGetStopWordsDictionary";
import ButtonFillPrimary from "./Primitives/ButtonFillPrimary";
import { IoArrowBackOutline } from "react-icons/io5";
import { useCreateAlertCampaign } from "../API/useCreateAlertCampaign";
import { RiFileList2Line } from "react-icons/ri";

export default function FinalFormCreateAlert({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Access selected circles and dictionaries from context
  const { selectedCircle, selectedCirclesUsers, selectedDictionaries, source } =
    useAlertsContext();
  const {
    data: dictionaryData,
    isError,
    isLoading,
    error,
  } = useGetStopWordsDictionary();

  // Map dictionary IDs to names
  const dictionaryNames = selectedDictionaries?.map((dictId) => {
    const dict = dictionaryData?.find((d) => d.id === Number(dictId));
    return dict ? dict.dictionaryName : `Unknown Dictionary (ID: ${dictId})`;
  });
  const { mutate: createAlert, isPending } = useCreateAlertCampaign();

  const handleCreateAlert = () => {
    createAlert({
      alertSource: source,
      circle: selectedCircle?.id,
      alertDictionaries: selectedDictionaries,
      members: selectedCirclesUsers,
    });
  };
  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false);
        e.stopPropagation();
      }}
      className="w-full h-screen fixed inset-0 flex justify-center items-center "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[60%] h-[80%] bg-white rounded-lg p-6 grid grid-rows-[auto_1fr] gap-4  shadow-lg"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              onClick={() => setIsModalOpen(false)}
              size={20}
              className="cursor-pointer hover:text-blue-500"
            />

            <p className="text-xl font-bold">Create Alert</p>
          </div>
          <ButtonFillPrimary
            onClick={() => {
              handleCreateAlert();
            }}
          >
            {isPending ? "Creating..." : "Create"}
          </ButtonFillPrimary>
        </div>

        {/* Content Section with Two Columns */}
        <div className="w-full h-full rounded border p-4 grid grid-cols-2 gap-6 overflow-y-auto">
          {/* Left Side - Circles with Selected Users */}
          <div className="border rounded-lg p-4 space-y-4 overflow-y-auto shadow-md shadow-black/40">
            <h3 className="text-xl font-semibold mb-4 text-gray-600">
              Selected Circle
            </h3>

            <div key={selectedCircle?.id} className="">
              {/* Circle Component */}
              <CircleWithName
                selectedCircleName={selectedCircle?.circleName || ""}
                selectedCircleMembersData={selectedCircle?.circleMembers || []} // Only selected users
                selectedCircleDepartmentsData={
                  selectedCircle?.circleDepartments || []
                }
                isContributor={selectedCircle?.isContributor || false}
                isAdmin={selectedCircle?.isAdmin || false}
              />
              {/* Display Selected Users as Chips */}
              <div className="ml-6">
                <h4 className="text-sm font-medium text-gray-500">
                  Selected Members:
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCirclesUsers.map((memberId) => {
                    const member = selectedCircle?.circleMembers?.find(
                      (member) => member.id === Number(memberId)
                    );
                    if (member) {
                      return (
                        <span
                          key={memberId}
                          className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
                        >
                          {member.name}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Dictionaries as Chips */}
          <div className="border shadow-md shadow-black/40 rounded-lg p-4 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-600">
              Selected Dictionaries
            </h3>
            <RiFileList2Line size={80} className="text-blue-900" />
            <div className="text-sm font-medium text-gray-500 border-t">
              {" "}
              selected dictionaries
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {dictionaryNames?.length > 0 ? (
                dictionaryNames.map((name, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-200 border border-black border-dashed text-blue-800 rounded px-3 py-1 text-sm flex items-center gap-2"
                  >
                    {name} <RiFileList2Line />
                  </span>
                ))
              ) : isLoading ? (
                <p className="text-gray-500">Loading dictionaries...</p>
              ) : isError ? (
                <p className="text-red-500">
                  Error loading dictionaries: {error?.message}
                </p>
              ) : (
                <p className="text-gray-500">No dictionaries selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
