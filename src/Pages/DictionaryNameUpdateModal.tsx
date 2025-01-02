import { useEffect, useRef, useState } from "react";
import { useEditDictionaryName } from "../API/useEditDictionaryName";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function DictionaryNameUpdateModal({
  existingName,
  id,
  setIsDictionaryNameModalOpen,
}: {
  existingName: string;
  id: number;
  setIsDictionaryNameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dictionaryName, setDictionaryName] = useState(existingName);
  const { mutate: updateDictionaryName } = useEditDictionaryName();

  const queryClient = useQueryClient();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDictionaryNameModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDictionaryNameModalOpen, ref]);
  return (
    <div className="w-full h-screen bg-black/50 fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="w-[500px] h-fit bg-white p-6 rounded-md shadow-lg space-y-3"
        ref={ref}
      >
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={dictionaryName}
            onChange={(e) => setDictionaryName(e.target.value)}
            className="w-full border-2 p-2 rounded-lg outline-none"
          />
          <button
            className="px-3 py-2 text-white bg-blue-500 rounded-md float-right"
            onClick={() =>
              updateDictionaryName(
                { id, dictionaryName },
                {
                  onSuccess: () => {
                    toast.success("Dictionary name updated successfully");
                    setIsDictionaryNameModalOpen(false);
                    queryClient.invalidateQueries({
                      queryKey: ["stopWordsDictionary"],
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
  );
}

export default DictionaryNameUpdateModal;
