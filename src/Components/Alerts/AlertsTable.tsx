import useGetAllAlerts from "../../API/useGetAllAlerts";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import PreviewSingleAlertModal from "../PreviewSingleAlertModel";
import { useDeleteAlerts } from "../../API/useDeleteAlerts";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import AlertNameUpdateModal from "../../Pages/AlertNameUpdateModal";
import { IoMdEye } from "react-icons/io";
function AlertsTable() {
  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllAlerts();

  const [isAlerNameModalOpen, setIsAlerNameModalOpen] = useState(false);
  const [existingAlertName, setExistingAlertName] = useState("");
  const [id, setId] = useState<number>(0);

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    root: null,
  });

  if (isError) {
    console.log(error.message);
  }

  const results = data?.pages.flatMap((page) => page.data.results);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch((err: unknown) => {
        console.log(err);
      });
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);
  const [isSingleAlertModalOpen, setIsSingleAlertModalOpen] = useState(false);
  const [SelectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const { mutate } = useDeleteAlerts();

  const queryClient = useQueryClient();

  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-start p-2">Alert Name</th>
            <th className="text-start p-2">Alert Source</th>
            <th className="text-start p-2">Created At</th>
            <th className="text-start p-2">Updated At</th>
            <th className="text-start p-2">Alert Dictionaries</th>
            <th className="text-start p-2">Members</th>
            <th className="text-start p-2"></th>
            <th className="text-start p-2"></th>
          </tr>
        </thead>
        {results?.map((alert) => (
          <tbody key={alert.id}>
            <tr className="border-b-2">
              <td className="px-2 text-start p-2">
                <p className="flex items-center gap-2">
                  {alert.alertName}
                  <span
                    className="p-1 text-gray-400 rounded-md w-fit aspect-square hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setIsAlerNameModalOpen(true);
                      setExistingAlertName(alert.alertName);
                      setId(alert.id);
                    }}
                  >
                    <RiEdit2Fill />
                  </span>
                </p>
              </td>
              <td className="p-2 text-start">{alert.alertSource}</td>
              <td className="p-2 text-start">
                {alert.createdAt.split("T")[0]}
              </td>
              <td className="p-2 text-start">
                {alert.updatedAt.split("T")[0]}
              </td>
              <td className="p-2 text-start">
                {alert.alertDictionaries.length}
              </td>
              <td>{alert.members.length}</td>

              <td className="py-2 text-start">
                <button
                  className="p-1 text-blue-500 bg-gray-200 rounded-md w-fit aspect-square hover:bg-gray-400"
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      `Are you sure you want to delete ${alert.alertName}?`
                    );
                    if (confirmDelete) {
                      mutate(alert.id, {
                        onSuccess: () => {
                          toast.success("Alert deleted successfully");
                          queryClient.invalidateQueries({
                            queryKey: ["getAllAlerts"],
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
                    setSelectedAlertId(alert.id);
                    setIsSingleAlertModalOpen(true);
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

      <div className="h-10 mt-10" ref={ref}>
        {hasNextPage && !isLoading && !isError && isFetchingNextPage && (
          <div className="flex justify-center">
            <RotatingLines
              strokeColor="gray"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          </div>
        )}
        {!hasNextPage && !isLoading && !isError && results?.length !== 0 && (
          <p className="my-5 text-center">No more data.</p>
        )}
      </div>

      {isAlerNameModalOpen && (
        <AlertNameUpdateModal
          setIsAlerNameModalOpen={setIsAlerNameModalOpen}
          existingAlertName={existingAlertName}
          id={id}
        />
      )}
      {isSingleAlertModalOpen && SelectedAlertId && (
        <PreviewSingleAlertModal
          id={SelectedAlertId}
          setIsModalOpen={setIsSingleAlertModalOpen}
        />
      )}
    </div>
  );
}

export default AlertsTable;
