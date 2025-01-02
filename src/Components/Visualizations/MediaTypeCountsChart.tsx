import useGetDashboardStats from "../../API/useGetDashboardStats";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

function MediaTypeCountsChart() {
  const { data } = useGetDashboardStats();

  const mediaTypeCounts = data?.mediaTypeCounts;

  const options: ApexOptions = {
    chart: {
      height: 390,
      type: "radialBar",
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter(val) {
          return val + " files";
        },
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          margin: 8,
          fontSize: "12px",
          formatter: function (seriesName, opts) {
            function getMediaTypeName(seriesIndex: number) {
              switch (seriesIndex) {
                case 0:
                  seriesName = "Others";
                  break;
                case 1:
                  seriesName = "Videos";
                  break;
                case 2:
                  seriesName = "Images";
                  break;
                case 3:
                  seriesName = "Audios";
                  break;
              }
              return seriesName;
            }
            return getMediaTypeName(opts.seriesIndex);
          },
        },
      },
    },
  };

  const series = [
    mediaTypeCounts?.othersCount || 0,
    mediaTypeCounts?.videosCount || 0,
    mediaTypeCounts?.imagesCount || 0,
    mediaTypeCounts?.audiosCount || 0,
  ];

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center gap-1 mx-auto w-fit">
        <h2 className="px-2">Media type distribution</h2>
        <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-700" />
      </div>
      <div className="flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height="400"
          width={400}
        />
      </div>
    </div>
  );
}
export default MediaTypeCountsChart;
