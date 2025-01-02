import OutletMainContainer from "../Components/SharedComponents/OutletMainContainer";

import DepartmentStorageComparisonChart from "../Components/Visualizations/DepartmentStorageComparisonChart";
import TopStorageConsumers from "../Components/Visualizations/TopStorageConsumers";
import TopActiveUsers from "../Components/Visualizations/TopActiveUsers";
import StorageStatsCards from "../Components/Visualizations/StorageStatsCards";
import ServicesStatus from "../Components/Visualizations/ServicesStatus";
import MediaTypeCountsChart from "../Components/Visualizations/MediaTypeCountsChart";
import NoOfUsersLoggedInChart from "../Components/Visualizations/NoOfUsersLoggedInChart";
import { useUser } from "../Context/useUser";

function Home() {
  const { userType } = useUser();
  return (
    <OutletMainContainer>
      <div className="grid h-full overflow-hidden">
        <div className="w-full overflow-auto grid grid-cols-[1fr_25%] gap-4 hide-scrollbar pb-6">
          <div className="grid content-start grid-cols-1 gap-4">
            <StorageStatsCards />
            {userType === "super" && <DepartmentStorageComparisonChart />}
            <ServicesStatus />
            <div className="grid grid-cols-[auto_1fr] gap-2">
              <div className="w-full p-3 bg-white shadow-lg rounded-xl aspect-square">
                <MediaTypeCountsChart />
              </div>
              <div className="flex items-center justify-center p-3 bg-white shadow-lg rounded-xl">
                <NoOfUsersLoggedInChart />
              </div>
            </div>
          </div>
          <div className="grid content-start grid-cols-1 gap-4">
            <TopStorageConsumers />
            <TopActiveUsers />
          </div>
        </div>
      </div>
    </OutletMainContainer>
  );
}
export default Home;
