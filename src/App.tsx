import Home from "./Pages/Home";
import Groups from "./Pages/Groups";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicAuthWrapper from "./Components/AuthWrappers/BasicAuthWrapper";
import Login from "./Pages/Login";
import Departments from "./Pages/Departments";
import Users from "./Pages/Users";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import Dictionaries from "./Pages/Dictionaries";
import Alerts from "./Pages/Alerts";
import { AlertsProvider } from "./Components/Alerts/AlertsContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BasicAuthWrapper />}>
          <Route index element={<Home />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dictionaries" element={<Dictionaries />} />
          <Route
            path="/alerts"
            element={
              <AlertsProvider>
                <Alerts />
              </AlertsProvider>
            }
          />
          <Route path="/groups" element={<Groups />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        {/* base route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
