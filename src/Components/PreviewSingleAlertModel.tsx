import { IoArrowBackOutline } from "react-icons/io5";
import ButtonFillPrimary from "./Primitives/ButtonFillPrimary";
import { useGetSingleAlert } from "../API/useGetSingleAlert";
import CircleWithName from "./Alerts/CircleWithName";
import { IoMdCloseCircle } from "react-icons/io";

import { toast } from "react-toastify";
import { useDeleteSingleAlertDictionary } from "../API/useDeleteSingleAlertDictionary";
import axios from "axios";
import { useAlertsContext } from "./Alerts/AlertsContext";
import SelectUsersModal from "./SelectUsersModal";
import { useState } from "react";
import { useDeleteSingleAlertMember } from "../API/useDeleteSingleAlertMember";
import SelectDictionariesModal from "./SelectDictionariesModal";
import { RiFileList2Line } from "react-icons/ri";

export default function PreviewSingleAlertModal({
  id,
  setIsModalOpen,
}: {
  id: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    setSelectedCircle,
    previousCirclesUsers,
    setPreviousCirclesUsers,
    setAlertId,
    setPreviousDictionaries,
  } = useAlertsContext();
  const { data: alert, isLoading, isError, error } = useGetSingleAlert(id);

  const deleteSingleAlertDictionary = useDeleteSingleAlertDictionary();
  const errMessage = axios.isAxiosError<{ message: string }>(error)
    ? error.response?.data.message ?? error.message
    : "Error";

  const deleteSingleAlertMember = useDeleteSingleAlertMember();
  const [isAddMoreDictionariesModalOpen, setIsAddMoreDictionariesModalOpen] =
    useState(false);

  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false);
        e.stopPropagation();
      }}
      className="w-full h-screen fixed inset-0 flex justify-center items-center bg-black/50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[70%] h-[80%] bg-white rounded-lg p-6 grid grid-rows-[auto_1fr] gap-4 overflow-auto shadow-lg"
      >
        <IoArrowBackOutline
          onClick={() => setIsModalOpen(false)}
          size={20}
          className="cursor-pointer hover:text-blue-500"
        />

        {!isLoading && !isError && alert && (
          <div className="rounded border p-4  w-full flex flex-col">
            <div className="header bg-yellow-100 border rounded-lg p-4 shadow flex flex-col sm:flex-row sm:justify-between text-sm text-gray-700">
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <p className="font-semibold text-gray-600">
                  Alert:
                  <span className="font-normal text-gray-800 ml-1">
                    {alert?.alertName}
                  </span>
                </p>
                <p className="font-semibold text-gray-600">
                  Source:
                  <span className="font-normal text-gray-800 ml-1">
                    {alert?.alertSource}
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 sm:mt-0">
                <p className="font-semibold text-gray-600">
                  Created at:
                  <span className="font-normal text-gray-800 ml-1">
                    {alert.createdAt.split("T")[0]}
                  </span>
                </p>
                <p className="font-semibold text-gray-600">
                  Updated at:
                  <span className="font-normal text-gray-800 ml-1">
                    {alert.updatedAt.split("T")[0]}
                  </span>
                </p>
                <p className="font-semibold text-gray-600">
                  Receipts
                  <span className="font-normal text-gray-800 ml-1">
                    {alert?.members.length}
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full h-full  grid grid-cols-2 gap-6 overflow-y-auto p-2">
              <div className="border rounded-lg p-4 space-y-4 overflow-y-auto shadow-md shadow-black/40 relative ">
                <h3 className="text-xl font-semibold mb-4 text-gray-600">
                  Circle
                </h3>

                <div className="w-fit     ">
                  {" "}
                  <CircleWithName
                    selectedCircleName={
                      alert?.circlesalert.circle.circleName || ""
                    }
                    selectedCircleMembersData={
                      alert?.circlesalert.circle.circleMembers || []
                    } // Only selected users
                    selectedCircleDepartmentsData={
                      alert?.circlesalert.circle.circleDepartments || []
                    }
                    isContributor={
                      alert?.circlesalert.circle.isContributor || false
                    }
                    isAdmin={alert?.circlesalert.circle.isAdmin || false}
                  />
                </div>

                <div className="ml-6 border-t">
                  <h4 className="text-sm font-medium text-gray-500">
                    Selected Receipts
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {alert?.members.map((member) => (
                      <>
                        <span
                          key={member.id}
                          className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                        >
                          {member.name}
                          <button
                            onClick={() => {
                              if (alert.members.length > 1) {
                                const confirmDelete = window.confirm(
                                  `Are you sure you want to delete word: ${member.name}?`
                                );
                                if (confirmDelete) {
                                  deleteSingleAlertMember.mutate({
                                    alertId: alert.id,
                                    memberId: member.id,
                                  });
                                }
                              } else {
                                toast.error("At least one member is required");
                              }
                            }}
                          >
                            <IoMdCloseCircle
                              size={20}
                              title="remove"
                              className="text-gray-500"
                            />
                          </button>
                        </span>
                      </>
                    ))}
                  </div>
                  <div className="bg-white p-2 absolute bottom-0 right-0 w-full flex justify-end border-t">
                    <ButtonFillPrimary
                      onClick={async () => {
                        setAlertId(alert.id);
                        const preMembers = await Promise.all(
                          alert.members.map(async (member) => {
                            return member.id.toString();
                          })
                        );
                        setPreviousCirclesUsers(preMembers);
                        setSelectedCircle(alert.circlesalert.circle);
                      }}
                    >
                      Add more
                    </ButtonFillPrimary>
                  </div>
                </div>
              </div>

              {/* Right Side - Dictionaries as Chips */}
              <div className="border shadow-md shadow-black/40 rounded-lg p-4 overflow-y-auto relative">
                <h3 className="text-xl font-semibold mb-4 text-gray-600">
                  Dictionaries
                </h3>
                <RiFileList2Line size={80} className="text-blue-900" />
                <div className="text-sm font-medium text-gray-500 border-t">
            
                  selected dictionaries
                </div>
                <div className="flex flex-wrap gap-2 mt-2  py-2">
                  {alert?.alertDictionaries.map((dic, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-200 border border-black border-dashed text-blue-800 rounded px-3 py-1 text-sm flex items-center gap-2"
                    >
                      {dic.dictionaryName} <RiFileList2Line />
                      <button
                        onClick={() => {
                          if (alert.alertDictionaries.length > 1) {
                            const confirmDelete = window.confirm(
                              `Are you sure you want to delete word: ${dic.dictionaryName} from Alert ${alert.alertName}?`
                            );
                            if (confirmDelete) {
                              deleteSingleAlertDictionary.mutate({
                                alertId: alert.id,
                                dictionaryId: dic.id,
                              });
                            }
                          } else {
                            toast.error("At least one dictionary is required");
                          }
                        }}
                      >
                        <IoMdCloseCircle
                          size={20}
                          title="remove"
                          className="text-gray-500"
                        />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="bg-white p-2 absolute bottom-0 right-0 w-full flex justify-end border-t">
                  <ButtonFillPrimary
                    onClick={() => {
                      setIsAddMoreDictionariesModalOpen(true);
                      setAlertId(alert.id);
                      setPreviousDictionaries(
                        alert.alertDictionaries.map((d) =>
                          d.id.toLocaleString()
                        )
                      );
                    }}
                  >
                    Add more
                  </ButtonFillPrimary>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="h-11 w-11 border-blue-700   border-4 border-dashed rounded-full animate-spin"></div>
          </div>
        )}
        {isError && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-red-600 font-semibold"> {errMessage}</p>
          </div>
        )}
      </div>
      {previousCirclesUsers.length > 0 && <SelectUsersModal />}
      {isAddMoreDictionariesModalOpen && (
        <SelectDictionariesModal
          setIsModalOpen={setIsAddMoreDictionariesModalOpen}
        />
      )}
    </div>
  );
}
