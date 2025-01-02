import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../SharedComponents/SidebarComponents/Sidebar";
import { useUser } from "../../Context/useUser";
import { useEffect, useState } from "react";
import { useRefreshToken } from "../../API/useRefreshToken";
import { refreshTokenKey } from "../../Utils/constants";
import GeneralLoading from "../SharedComponents/GeneralLoading";
import useGetConsumedStorage from "../../API/useGetConsumedStorage";

function BasicAuthWrapper() {
  const { username, setUser, consumedStorage, setConsumedStorage } = useUser();
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  // so we can get the consumed storage
  const { data } = useGetConsumedStorage();

  const refreshToken = localStorage.getItem(refreshTokenKey) || "";

  useEffect(() => {
    async function refreshUser() {
      // if no refresh token and no username, then user is not logged in and redirect to login page
      if ((refreshToken && username) || !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await refresh();

        setUser(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    refreshUser();
  }, [refresh, setUser, username, refreshToken]);

  useEffect(() => {
    if (data && data.data.consumedStorage !== consumedStorage) {
      setConsumedStorage(data.data.consumedStorage);
    }
  }, [data]);

  if (loading) return <GeneralLoading />;

  // TODO: do this properly
  if (!username) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="grid grid-cols-[auto_1fr] overflow-auto sm:overflow-hidden h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}
export default BasicAuthWrapper;
