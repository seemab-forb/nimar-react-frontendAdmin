import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import Br from "../Primitives/Br";
import { useGetLoggedInUserStats } from "../../API/useGetLoggedInUserStats";

function NoOfUsersLoggedInChart() {
  const { data, isLoading, error } = useGetLoggedInUserStats();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data</p>;

  const dates = data.dates;
  const counts = data.counts;

  const series = [
    {
      name: "series1",
      data: counts,
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      width: "100%",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    labels: dates,
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "right",
    },
    tooltip: {
      y: {
        title: {
          formatter: function () {
            return "users";
          },
        },
      },

      x: {
        format: "dd-MM-yyyy",
      },
    },
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center gap-1 mx-auto w-fit">
        <h2 className="px-2">No. of logged in users</h2>
        <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-700" />
      </div>
      <Br remGaps={0.25} />
      <div className="w-full px-3">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
}
export default NoOfUsersLoggedInChart;
