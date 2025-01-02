import { IoMdCloseCircle } from "react-icons/io";
import { useGetSingleDictionary } from "../API/useGetSingleDictionary";
import axios from "axios";
import ButtonFillPrimary from "./Primitives/ButtonFillPrimary";
import { useState } from "react";
import CreateDictionaryModal from "./CreateDectionaryModal";
import { useDeleteSingleWord } from "../API/useDeleteSingleWord";

export default function PreviewDictionaryModal({
  setIsModalOpen,
  id,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) {
  const { data, isLoading, isError, error } = useGetSingleDictionary(id);

  const errMessage = axios.isAxiosError<{ message: string }>(error)
    ? error.response?.data.message ?? error.message
    : "Error";

  const { dictionaryName, words } = data?.data || {};

  // Initialize the delete mutation hook
  const deleteSingleWord = useDeleteSingleWord();
  const [isAddNewWordsModalOpen, setIsAddNewWordsModalOpen] = useState(false);
  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false);
        e.stopPropagation();
      }}
      className="w-full h-screen bg-black/50 fixed z-50 inset-0 flex items-center justify-center overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[60%] h-[70%] bg-white p-6 rounded-md shadow-lg relative overflow-hidden flex flex-col"
      >
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="h-11 w-11 border-blue-700 border-4 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {isError && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-red-500">{errMessage}</p>
          </div>
        )}

        {data && !isLoading && !isError && (
          <>
            <h1 className="text-2xl font-bold  text-center mb-4">
              {dictionaryName}
            </h1>

            <div className="flex-grow w-full overflow-y-auto border border-gray-300 p-2 rounded-md">
              <div className="flex items-center flex-wrap gap-10">
                {words?.length ? (
                  words.map((word, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 border shadow-md hover:shadow-lg transition duration-150 ease-in-out rounded-lg cursor-pointer px-3 flex items-center gap-2 py-1"
                    >
                      <button
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            `Are you sure you want to delete word: ${word.word}?`
                          );
                          if (confirmDelete) {
                            // Use the mutate function from the delete hook
                            deleteSingleWord.mutate({
                              dictionaryId: id,
                              wordId: word.id,
                            });
                          }
                        }}
                      >
                        <IoMdCloseCircle
                          size={20}
                          title="remove"
                          className="text-gray-500"
                        />
                      </button>
                      <p className="text-center font-medium text-gray-500 truncate">
                        {word.word}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No words available.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        <div className="mt-3 w-full flex justify-end">
          <ButtonFillPrimary
            onClick={() => {
              setIsAddNewWordsModalOpen(true);
            }}
            disabled={isError && isLoading}
          >
            Add more words
          </ButtonFillPrimary>
        </div>
      </div>
      {isAddNewWordsModalOpen && (
        <CreateDictionaryModal
          setIsModalOpen={setIsAddNewWordsModalOpen}
          id={id}
          existingDictionaryName={dictionaryName}
        />
      )}
    </div>
  );
}
