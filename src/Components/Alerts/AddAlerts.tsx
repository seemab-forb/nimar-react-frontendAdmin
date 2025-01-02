import { useAlertsContext } from "./AlertsContext";

function AddAlerts() {
  const { alertName, setAlertName } = useAlertsContext();
  return (
    <div className="">
      <input
        autoFocus
        type="text"
        className="border border-gray-300 w-full rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Job name"
        value={alertName}
        onChange={(e) => setAlertName(e.target.value)}
      />
    </div>
  );
}

export default AddAlerts;
