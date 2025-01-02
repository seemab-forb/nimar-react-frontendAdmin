import { twMerge } from "tailwind-merge";
import Br from "../Primitives/Br";
import { useGetServicesStatus } from "../../API/useGetServicesStatus";

function ServicesStatus() {
  const { data, isError, isLoading, error } = useGetServicesStatus();

  data?.frontend?.status;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-300 h-96 animate-pulse rounded-xl">
        <p>Loading status</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-gray-300 h-96 animate-pulse rounded-xl">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full bg-white shadow-lg rounded-xl">
        <div className="flex flex-col items-center gap-1 py-4 mx-auto w-fit">
          <h2 className="px-2">Services status</h2>
          <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-700" />
        </div>
      </div>
      <Br remGaps={1} />
      <div className="grid w-full grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        <ServiceCard
          service={{
            name: "User Frontend",
            status: data?.frontend.status,
          }}
        />
        <ServiceCard
          service={{
            name: "Backend",
            status: data?.backend.status,
          }}
        />
        <ServiceCard
          service={{
            name: "Web Content Server",
            status: data?.webContent.status,
          }}
        />
        <ServiceCard
          service={{
            name: "Streaming Server",
            status: data?.streaming.status,
          }}
        />
        <ServiceCard
          service={{
            name: "STT",
            status: data?.stt.status,
          }}
        />
        <ServiceCard
          service={{
            name: "OCR",
            status: data?.ocr.status,
          }}
        />
        <ServiceCard
          service={{
            name: "ScD",
            status: data?.scd.status,
          }}
        />
        <ServiceCard
          service={{
            name: "Sentiment Analysis",
            status: data?.sentiment.status,
          }}
        />
        <ServiceCard
          service={{
            name: "Summarization",
            status: data?.summary.status,
          }}
        />
        <ServiceCard
          service={{
            name: "Translation",
            status: data?.translation.status,
          }}
        />
      </div>
    </div>
  );
}
export default ServicesStatus;

function ServiceCard({
  service,
}: {
  service: {
    name: string;
    status: boolean;
  };
}) {
  const { name, status } = service;
  return (
    <div
      className={twMerge(
        "flex flex-col justify-between p-4 bg-white rounded-lg shadow-lg",
        !status && "bg-red-100"
      )}
    >
      <div>
        <h3 className="">{name}</h3>
      </div>
      <div className="flex justify-between mt-4">
        <p className="text-sm text-gray-500">Status</p>
        <p
          className={twMerge(
            "text-sm font-semibold text-green-500",
            !status && "text-red-500"
          )}
        >
          {status ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}
