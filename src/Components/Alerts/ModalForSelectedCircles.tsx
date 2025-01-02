import React, { useState } from "react";
import useGetAllCircles from "../../API/useGetAllCircles";
import CircleWithName from "./CircleWithName";

import { useAlertsContext } from "./AlertsContext";
import { CircleDataType } from "../../API/ResponseTypes/useGetAllCircles.types";
function ModalForSelectedCircles({
  setIsSelectedCircleModalOpen,
}: {
  setIsSelectedCircleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchCircles, setSearchCircles] = useState("");
  const { data } = useGetAllCircles({ seacrhCircles: searchCircles });
  const { setSelectedCircle } = useAlertsContext();
  return (
    <div
      onClick={() => setIsSelectedCircleModalOpen(false)}
      className="w-full h-screen bg-black/50 fixed z-50 inset-0 flex items-center justify-center overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-[60%] w-[60%] bg-white  rounded-md p-5 grid grid-rows-[auto_1fr]"
      >
        <div className="flex w-full justify-between items-center p-2">
          <p className="text-xl font-bold">Select Circle</p>{" "}
          <input
            type="text"
            className="
               border w-1/2 border-gray-300  rounded-md px-2 py-1 outline-none"
            placeholder="Search"
            value={searchCircles}
            onChange={(e) => setSearchCircles(e.target.value)}
          />
        </div>
        <div className="border  rounded-md w-full h-full shadow-md shadow-black/40">
          <div className="grid grid-cols-5 gap-3 overflow-auto p-6">
            {data?.map((circle: CircleDataType) => {
              const isContributor = circle.isContributor;
              const isAdmin = circle.isAdmin;

              return (
                <div
                  onClick={() => {
                    setSelectedCircle(circle);
                  }}
                  key={circle.id}
                  className="border p-2 rounded bg-gray-100 hover:bg-sky-100 shadow-md shadow-black/40 hover:scale-105 cursor-pointer"
                  title={circle.circleName}
                >
                  <CircleWithName
                    selectedCircleName={circle.circleName}
                    selectedCircleMembersData={circle.circleMembers}
                    selectedCircleDepartmentsData={circle.circleDepartments}
                    isContributor={isContributor}
                    isAdmin={isAdmin}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalForSelectedCircles;
