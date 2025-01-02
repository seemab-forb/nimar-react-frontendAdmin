import { useDepartmentModalContext } from "./useDepartmentModalContext";
import Br from "../../Primitives/Br";
import { useState } from "react";
import { toast } from "react-toastify";

type StorageEditModeType = "add" | "remove";

type StorageEditModeStateType = {
  enabled: boolean;
  mode: StorageEditModeType;
};

function StorageComponentEditModeDept() {
  const [editStorage, setEditStorage] = useState<StorageEditModeStateType>({
    enabled: false,
    mode: "add",
  });

  const { departmentAllocatedStorage, thisDepConsumedStorage } =
    useDepartmentModalContext();
  const { assigned } = departmentAllocatedStorage;

  const freeDepartmentStorage = assigned - thisDepConsumedStorage;

  return (
    <div className="pb-3 overflow-hidden shadow-md rounded-xl shadow-gray-300">
      <div className="w-full px-3 py-1 text-white bg-gradient-primary ">
        Storage
      </div>
      <div className="px-3 py-3 text-xs">
        <Entry field="Department Allocated Space" value={assigned} />
        <Br remGaps={0.5} />
        <Entry field="Users Allocated Space" value={thisDepConsumedStorage} />
        <Br remGaps={0.5} />
        <Entry field="Free Space" value={freeDepartmentStorage} />
      </div>
      {!editStorage.enabled && (
        <div className="grid grid-cols-2 gap-2 px-3 py-1">
          <button
            className="py-1 text-xs text-white bg-green-500 rounded-sm"
            onClick={() => setEditStorage({ enabled: true, mode: "add" })}
          >
            Add
          </button>
          <button
            className="py-1 text-xs text-white bg-red-500 rounded-sm"
            onClick={() => setEditStorage({ enabled: true, mode: "remove" })}
          >
            Take
          </button>
        </div>
      )}
      {editStorage.enabled && (
        <EditStorageComponent
          editStorage={editStorage}
          setEditStorage={setEditStorage}
        />
      )}
    </div>
  );
}
export default StorageComponentEditModeDept;

function Entry({ field, value }: { field: string; value: number }) {
  return (
    <p>
      <span className="font-bold">{field}: </span>
      <span>{value.toFixed(2)} GBs</span>
    </p>
  );
}

function EditStorageComponent({
  editStorage,
  setEditStorage,
}: {
  editStorage: StorageEditModeStateType;
  setEditStorage: React.Dispatch<
    React.SetStateAction<StorageEditModeStateType>
  >;
}) {
  const [changeInStorage, setChangeInStorage] = useState(0);
  const {
    departmentAllocatedStorage,
    thisDepConsumedStorage,
    setDepartmentAllocatedStorage,
  } = useDepartmentModalContext();

  const { assigned, total: totalStorageSuperAdminHasLeft } =
    departmentAllocatedStorage;

  const freeDepartmentStorage = assigned - thisDepConsumedStorage;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = +e.target.value;

    if (editStorage.mode === "add") {
      if (newVal > totalStorageSuperAdminHasLeft) {
        toast.error("You can't assign more than the you have left.");
        setChangeInStorage(totalStorageSuperAdminHasLeft);
      } else if (newVal < 0) {
        setChangeInStorage(0);
      } else {
        setChangeInStorage(newVal);
      }
      return;
    }

    if (newVal > freeDepartmentStorage) {
      toast.error("You can't take more than the free space.");
      setChangeInStorage(freeDepartmentStorage);
    } else if (newVal < 0) {
      setChangeInStorage(0);
    } else {
      setChangeInStorage(newVal);
    }
  }

  function handleSave() {
    if (editStorage.mode === "add") {
      setDepartmentAllocatedStorage({
        assigned: assigned + changeInStorage,
        total: totalStorageSuperAdminHasLeft - changeInStorage,
      });

      setEditStorage({
        enabled: false,
        mode: "add",
      });

      return;
    }

    setDepartmentAllocatedStorage({
      assigned: assigned - changeInStorage,
      total: totalStorageSuperAdminHasLeft + changeInStorage,
    });

    setEditStorage({
      enabled: false,
      mode: "add",
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 px-3 ">
      <div className="flex items-center gap-2 grow">
        <input
          type="number"
          className="px-3 py-1 text-xs border border-gray-300 grow"
          placeholder="Enter GBs" // if mode is add, min 1 GB should be added otherwise 0 GB may be taken
          min={0}
          max={
            editStorage.mode === "add"
              ? totalStorageSuperAdminHasLeft
              : freeDepartmentStorage
          }
          value={changeInStorage}
          onChange={handleInputChange}
        />
        <p className="text-sm">GBs</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 text-xs text-white bg-blue-500 rounded-sm"
          onClick={handleSave}
        >
          {editStorage.mode === "add" ? "Add" : "Remove"}
        </button>
        <button
          className="px-3 py-1 text-xs text-blue-500 border border-blue-500 rounded-sm"
          onClick={() =>
            setEditStorage({
              enabled: false,
              mode: "add",
            })
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
