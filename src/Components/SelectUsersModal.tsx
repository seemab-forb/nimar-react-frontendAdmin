import ButtonFillPrimary from "./Primitives/ButtonFillPrimary";
import { RiFileList2Line } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import SelectDictionariesModal from "./SelectDictionariesModal";
import userDpPlaceholder from "../assets/placeholderUser.jpg";
import { baseUrlFileAccess } from "../API/constants";
import { useAlertsContext } from "./Alerts/AlertsContext";
import ModalForSelectedCirclesButton from "./Alerts/ModalForSelectedCirclesButton";
import CircleWithName from "./Alerts/CircleWithName";
import { twMerge } from "tailwind-merge";
import { useAddMoreUsersToAlert } from "../API/useAddMoreUsersToAlert";

export default function SelectUsersModal() {
  const [isSelectDictionariesModalOpen, setIsSelectDictionariesModalOpen] =
    useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const {
    selectedCircle,
    setSelectedCirclesUsers,
    previousCirclesUsers,
    alertId,
    clearState,
  } = useAlertsContext();

  // Move useAddMoreUsersToAlert hook outside of the conditional
  const addMoreUsersToAlert = useAddMoreUsersToAlert();

  // Update selected users in context whenever selectedUserIds changes
  useEffect(() => {
    setSelectedCirclesUsers(selectedUserIds);
  }, [selectedUserIds]);

  if (selectedCircle !== null) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          clearState();
        }}
        className="fixed inset-0 flex items-center justify-center w-full h-screen z-50 bg-black/40"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-[80%] h-[80%] xl:w-[70%] xl:h-[70%] 2xl:w-[60%] 2xl:h-[60%] p-6 bg-white rounded-md shadow-lg flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IoArrowBackOutline
                onClick={() => {
                  clearState();
                }}
                size={20}
                className="cursor-pointer hover:text-blue-500"
              />
              <p className="text-xl font-bold">Select Users</p>
            </div>
            <div className="flex items-center gap-3">
              {selectedUserIds?.length > 0 && (
                <button
                  onClick={() => setSelectedUserIds([])}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md"
                >
                  Reset
                </button>
              )}
              {previousCirclesUsers?.length < 1 && (
                <ButtonFillPrimary
                  disabled={selectedUserIds?.length === 0}
                  onClick={() => setIsSelectDictionariesModalOpen(true)}
                >
                  Select Dictionaries <RiFileList2Line size={20} />
                </ButtonFillPrimary>
              )}
              {previousCirclesUsers?.length > 0 && (
                <ButtonFillPrimary
                  disabled={selectedUserIds?.length === 0}
                  onClick={() => {
                    addMoreUsersToAlert.mutate({
                      alertId: alertId as number,
                      memberIds: selectedUserIds,
                    });
                  }}
                >
                  Save
                </ButtonFillPrimary>
              )}
            </div>
          </div>

          {/* User Grid for the Selected Circle */}
          <div className="p-3 w-full h-full grid grid-rows-[auto_1fr] border rounded-md shadow-md shadow-black/30 bg-white overflow-hidden">
            <div className="w-[10%] mb-2">
              <CircleWithName
                selectedCircleName={selectedCircle.circleName}
                selectedCircleMembersData={selectedCircle.circleMembers}
                selectedCircleDepartmentsData={selectedCircle.circleDepartments}
                isContributor={selectedCircle.isContributor}
                isAdmin={selectedCircle.isAdmin}
              />
            </div>

            {/* Scrollable User Grid */}
            <div className="grid w-full  grid-cols-4 2xl:grid-cols-6 gap-4 overflow-y-auto  p-2 h-full">
              {selectedCircle.circleMembers.map((user) => (
                <label
                  key={user.id}
                  title={user.name}
                  className={twMerge(
                    "flex flex-col items-center justify-center cursor-pointer w-full p-2 rounded-md bg-gray-100 shadow-md shadow-black/30 hover:scale-105 border hover:text-blue-500",
                    previousCirclesUsers?.some(
                      (prevUser) => Number(prevUser) == user.id
                    ) && "hidden"
                  )}
                >
                  <div className="flex w-full justify-between items-center">
                    {user.name?.length > 100
                      ? `${user.name.slice(0, 100)}..`
                      : user.name}
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={
                          user.profilePic
                            ? `${baseUrlFileAccess}media/${user.profilePic}`
                            : userDpPlaceholder
                        }
                        alt="User"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <input
                      type="checkbox"
                      className="ml-2"
                      value={user.id}
                      checked={selectedUserIds.includes(user.id.toString())}
                      onChange={() => handleCheckboxChange(user.id.toString())}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        {isSelectDictionariesModalOpen && (
          <SelectDictionariesModal
            setIsModalOpen={setIsSelectDictionariesModalOpen}
          />
        )}
      </div>
    );
  }

  return <ModalForSelectedCirclesButton />;
}
