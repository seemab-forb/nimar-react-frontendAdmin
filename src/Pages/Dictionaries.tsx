import { useGetStopWordsDictionary } from "../API/useGetStopWordsDictionary";
import { useState } from "react";
import CreateDictionaryModal from "../Components/CreateDectionaryModal";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteDictionary } from "../API/useDeleteDictionary";
import { toast } from "react-toastify";
import { RiEdit2Fill } from "react-icons/ri";
import DictionaryNameUpdateModal from "./DictionaryNameUpdateModal";
import { IoMdEye } from "react-icons/io";
import PreviewDictionaryModal from "../Components/PreviewDictionaryModal";
import { useQueryClient } from "@tanstack/react-query";
import OutletMainContainer from "../Components/SharedComponents/OutletMainContainer";
import MainHeader from "../Components/SharedComponents/MainHeader";
import { FaUsersRectangle } from "react-icons/fa6";

function Dictionaries() {
  const { data, isError, isLoading, error } = useGetStopWordsDictionary();
  const { mutate: deleteDictionary } = useDeleteDictionary();
  const [isDictionaryNameModalOpen, setIsDictionaryNameModalOpen] =
    useState(false);
  const [existingName, setExistingName] = useState("");
  const [id, setId] = useState<number>(0);

  const [isCreateDictionaryModalOpen, setIsCreateDictionaryModalOpen] =
    useState(false);
  const [isPreviewDictionaryModalOpen, setIsPreviewDictionaryModalOpen] =
    useState(false);
  const [dictionaryID, setDictionaryID] = useState<number | null>(null);

  const queryClient = useQueryClient();

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-5">
        <p>{error.message}</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <OutletMainContainer>
      <div>
        <div className="w-full bg-white rounded-lg shadow-lg px-3 py-5 space-y-4">
          <MainHeader
            title="Dictionaries"
            icon={<FaUsersRectangle className="text-2xl 2xl:text-4xl" />}
          />
          <div className="flex justify-end">
            <button
              className="flex justify-center items-center bg-gradient-to-b  from-[#6a97e8] to-[#3f79e2] text-white text-xs sm:text-base px-3 sm:px-6 py-0.5 2xl:py-1 rounded-md cursor-pointer active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
              onClick={() => {
                setIsCreateDictionaryModalOpen(true);
              }}
            >
              Add Dictionary
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-start p-2">Dictionary</th>
                <th className="text-start p-2">Words</th>
                <th className="text-start p-2">Created At</th>
                <th className="text-start p-2">Updated At</th>
                <th className="text-start p-2"></th>
                <th className="text-start p-2"></th>
              </tr>
            </thead>
            {data?.map((dictionary) => (
              <tbody>
                <tr className="border-b-2">
                  <td className="px-2 text-start p-2">
                    <p className="flex items-center gap-2">
                      {dictionary.dictionaryName}{" "}
                      <span
                        className="p-1 text-gray-400 rounded-md w-fit aspect-square hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setIsDictionaryNameModalOpen(true);
                          setExistingName(dictionary.dictionaryName);
                          setId(dictionary.id);
                        }}
                      >
                        <RiEdit2Fill />
                      </span>
                    </p>
                  </td>
                  <td className="p-2 text-start">{dictionary.words.length}</td>
                  <td className="p-2 text-start">
                    {dictionary.createdAt.split("T")[0]}
                  </td>
                  <td className="p-2 text-start">
                    {dictionary.updatedAt.split("T")[0]}
                  </td>
                  <td className="py-2 text-start">
                    <button
                      className="p-1 text-blue-500 bg-gray-200 rounded-md w-fit aspect-square hover:bg-gray-400"
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `Are you sure you want to delete dictionary?`
                        );
                        if (confirmDelete) {
                          deleteDictionary(dictionary.id, {
                            onSuccess: () => {
                              toast.success("Dictionary deleted successfully");
                              queryClient.invalidateQueries({
                                queryKey: ["stopWordsDictionary"],
                              });
                            },
                            onError: () => {
                              toast.error("500 internal server error");
                            },
                          });
                        }
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setDictionaryID(dictionary.id);

                        setIsPreviewDictionaryModalOpen(true);
                      }}
                      className="p-1 text-blue-500 bg-gray-200 rounded-md w-fit aspect-square hover:bg-gray-400"
                    >
                      <IoMdEye size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {isCreateDictionaryModalOpen && (
          <CreateDictionaryModal
            setIsModalOpen={setIsCreateDictionaryModalOpen}
          />
        )}
        {isPreviewDictionaryModalOpen && (
          <PreviewDictionaryModal
            setIsModalOpen={setIsPreviewDictionaryModalOpen}
            id={dictionaryID as number}
          />
        )}

        {isDictionaryNameModalOpen && (
          <DictionaryNameUpdateModal
            existingName={existingName}
            id={id}
            setIsDictionaryNameModalOpen={setIsDictionaryNameModalOpen}
          />
        )}
      </div>
    </OutletMainContainer>
  );
}

export default Dictionaries;
