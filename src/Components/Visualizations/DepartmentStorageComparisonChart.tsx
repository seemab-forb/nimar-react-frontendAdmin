import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useGetDepartmentsStorageChartData } from "../../API/useGetDepartmentsStorageChartData";

function DepartmentStorageComparisonChart() {
  const { data } = useGetDepartmentsStorageChartData();

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center bg-gray-300 h-96 animate-pulse rounded-xl">
  //       <p>Departments storage graph</p>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="flex items-center justify-center bg-gray-300 h-96 animate-pulse rounded-xl">
  //       <p>Unable to load</p>
  //     </div>
  //   );
  // }

  if (!data) return <div>No data</div>;

  const departmentsAllocatedStorages = data?.allocatedSpace;
  const departmentsUserAllocatedStorages = data?.userAllocatedSpace;
  const departmentsUserConsumedStorages = data?.userConsumedSpace;
  const departmentAbbreviations = data?.departmentAbbreviation;

  var options: ApexOptions = {
    series: [
      {
        name: "Allocated",
        data: departmentsAllocatedStorages,
      },
      {
        name: "Users Assigned",
        data: departmentsUserAllocatedStorages,
      },
      {
        name: "Users Consumed",
        data: departmentsUserConsumedStorages,
      },
    ],
    chart: {
      type: "bar",
      height: 400,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 7,
        borderRadiusApplication: "end",
        barHeight: "100%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
      lineCap: "round",
    },
    xaxis: {
      categories: departmentAbbreviations,
    },
    yaxis: {
      title: {
        text: "GBs",
      },
      labels: {
        formatter(val) {
          return `${val} GBs`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(2) + " GBs";
        },
      },
    },
  };

  return (
    <div className="p-3 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col items-center gap-1 py-4 mx-auto w-fit">
        <h2 className="px-2">Departments storage summary</h2>
        <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-700" />
      </div>
      <ReactApexChart
        height={400}
        options={options}
        series={options.series}
        type="bar"
      />
    </div>
  );
}
export default DepartmentStorageComparisonChart;
