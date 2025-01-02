import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import ButtonFillPrimary from "./Primitives/ButtonFillPrimary";
import { MdEdit } from "react-icons/md";
import { useAddNewWords } from "../API/useAddNewWords";
import { useCreateWordsDictionary } from "../API/useCreateWordsDictionary";
import { twMerge } from "tailwind-merge";
import { IoArrowBackOutline } from "react-icons/io5";

export default function CreateDictionaryModal({
  setIsModalOpen,
  id,
  existingDictionaryName,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
  existingDictionaryName?: string;
}) {
  const [dictionaryName, setDictionaryName] = useState("");
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const {
    mutate: createDictionary,
    isPending: createDictionaryPending,
    isSuccess: createDictionarySuccess,
  } = useCreateWordsDictionary();
  const {
    mutate: addNewWords,
    isPending: addNewWordsPending,
    isSuccess: addNewWordsSuccess,
  } = useAddNewWords();

  const handleWordAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && word.trim()) {
      if (word.includes(",")) {
        setWords((prevWords) => [...prevWords, ...word.split(",")]);
      } else {
        setWords((prevWords) => [...prevWords, word]);
      }
      setWord("");
    }
  };
  const wordInputRef = useRef<HTMLInputElement>(null);
  const handleWordClick = (clickedWord: string) => {
    setWord(clickedWord);
    setWords((prevWords) => prevWords.filter((w) => w !== clickedWord));
    if (wordInputRef.current) {
      wordInputRef.current.style.outlineColor = "orange";

      setTimeout(() => {
        wordInputRef.current?.focus();
        wordInputRef.current?.select();
      }, 100);
      setTimeout(() => {
        wordInputRef.current!.style.outlineColor = "transparent";
      }, 1000);
    }
  };
  const handleWordRemove = (event: React.MouseEvent, wordToRemove: string) => {
    event.stopPropagation();
    setWords((prevWords) => prevWords.filter((w) => w !== wordToRemove));
  };

  const handleAddDictionary = () => {
    createDictionary({
      dictionaryName,
      words,
    });
  };
  const handleAddNewWords = () => {
    if (id) {
      addNewWords({
        dictionaryId: id,
        words,
      });
    }
  };
  useEffect(() => {
    if (createDictionarySuccess || addNewWordsSuccess) {
      setIsModalOpen(false);
    }
  }, [createDictionarySuccess, addNewWordsPending]);
  useEffect(() => {
    if (id) {
      wordInputRef.current?.focus();
    }
  }, [id]);
  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false);

        e.stopPropagation();
      }}
      className={twMerge(
        "w-full h-screen fixed z-50 inset-0 flex items-center justify-center overflow-hidden",
        !id ? "bg-black/50" : ""
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[60%] h-[70%]  bg-white p-6 rounded-md shadow-lg relative overflow-hidden flex flex-col"
      >
        {!id ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-4 ">
              Create Dictionary
            </h1>

            <input
              autoFocus
              type="text"
              value={dictionaryName}
              onChange={(e) => setDictionaryName(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-green"
              placeholder="Dictionary Name"
            />
          </>
        ) : (
          <div className="flex items-center justify-between">
            <IoArrowBackOutline
              size={25}
              className="cursor-pointer text-gray-500 hover:text-sky-500"
              onClick={() => setIsModalOpen(false)}
            />
            <h1 className="text-2xl mr-6 font-bold text-center flex-grow">
              {existingDictionaryName}
            </h1>
          </div>
        )}

        <input
          ref={wordInputRef}
          id="word"
          type="text"
          value={word}
          onChange={(e) => {
            const newWord = e.target.value;
            if (!words.includes(newWord)) {
              setWord(newWord);
            }
          }}
          onKeyDown={handleWordAdd}
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-green"
          placeholder="Add Word and Press Enter"
        />
        <div className="flex-grow w-full overflow-y-auto border border-gray-300 p-2 rounded-md">
          <div className="flex items-center flex-wrap gap-10">
            {words.map((word, index) => (
              <div
                key={index}
                className="bg-gray-200 border shadow-md hover:shadow-lg transition duration-150 ease-in-out rounded-lg cursor-pointer px-3 flex items-center gap-2 py-1"
              >
                <p className="text-center font-medium text-gray-500 truncate">
                  {word}
                </p>
                <button onClick={() => handleWordClick(word)}>
                  <MdEdit size={20} title="Edit" className="text-gray-500" />
                </button>
                <button onClick={(e) => handleWordRemove(e, word)}>
                  <IoMdCloseCircle
                    size={20}
                    title="Remove"
                    className="text-gray-500"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 w-full flex justify-end">
          {!id && (
            <ButtonFillPrimary
              onClick={handleAddDictionary}
              disabled={
                createDictionaryPending ||
                words.length === 0 ||
                dictionaryName === ""
              }
            >
              {createDictionaryPending ? "Creating..." : "Create"}
            </ButtonFillPrimary>
          )}
          {id && (
            <ButtonFillPrimary
              onClick={handleAddNewWords}
              disabled={addNewWordsPending || words.length === 0}
            >
              {addNewWordsPending ? "Adding..." : "Add"}
            </ButtonFillPrimary>
          )}
        </div>
      </div>
    </div>
  );
}
