import { createContext, useContext, useState, ReactNode } from "react";
import { CircleDataType } from "../../API/ResponseTypes/useGetAllCircles.types";

export type AlertsContextType = {
  source: string;
  selectedCircle: CircleDataType | null; // Changed to object type with possible null
  selectedCirclesUsers: Array<string>;
  selectedDictionaries: Array<string>;
  previousCirclesUsers: Array<string>;
  previousDictionaries: Array<string>;
  alertId: number | null;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCircle: React.Dispatch<
    React.SetStateAction<CircleDataType | null>
  >; // Updated setter to handle object
  setSelectedCirclesUsers: React.Dispatch<React.SetStateAction<Array<string>>>;
  setSelectedDictionaries: React.Dispatch<React.SetStateAction<Array<string>>>;
  setPreviousCirclesUsers: React.Dispatch<React.SetStateAction<Array<string>>>;
  setPreviousDictionaries: React.Dispatch<React.SetStateAction<Array<string>>>;
  setAlertId: React.Dispatch<React.SetStateAction<number | null>>;
  alertName: string;
  setAlertName: React.Dispatch<React.SetStateAction<string>>;
  clearState: () => void;
};

export const AlertsContext = createContext<AlertsContextType>({
  source: "",
  selectedCircle: null, // Default as null to indicate no selection
  selectedCirclesUsers: [],
  selectedDictionaries: [],
  previousCirclesUsers: [],
  previousDictionaries: [],
  alertId: null,
  setSource: () => {},
  setSelectedCircle: () => {}, // Updated setter
  setSelectedCirclesUsers: () => {},
  setSelectedDictionaries: () => {},
  setPreviousCirclesUsers: () => {},
  setPreviousDictionaries: () => {},
  setAlertId: () => {},
  alertName: "",
  setAlertName: () => {},
  clearState: () => {},
});

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState("");
  const [selectedCircle, setSelectedCircle] = useState<CircleDataType | null>(
    null
  ); // Updated to object type
  const [selectedCirclesUsers, setSelectedCirclesUsers] = useState<
    Array<string>
  >([]);
  const [selectedDictionaries, setSelectedDictionaries] = useState<
    Array<string>
  >([]);
  const [previousCirclesUsers, setPreviousCirclesUsers] = useState<
    Array<string>
  >([]);
  const [previousDictionaries, setPreviousDictionaries] = useState<
    Array<string>
  >([]);
  const [alertName, setAlertName] = useState("");
  const [alertId, setAlertId] = useState<number | null>(null);
  const clearState = () => {
    setSource("");
    setSelectedCircle(null); // Clear to null to reset selection
    setSelectedCirclesUsers([]);
    setSelectedDictionaries([]);
    setAlertName("");
    setPreviousCirclesUsers([]);
    setPreviousDictionaries([]);
    setAlertName("");
    setAlertId(null);
  };

  return (
    <AlertsContext.Provider
      value={{
        source,
        selectedCircle,
        selectedCirclesUsers,
        selectedDictionaries,
        previousCirclesUsers,
        previousDictionaries,
        alertId,

        setSource,
        setSelectedCircle, // Updated setter
        setSelectedCirclesUsers,
        setSelectedDictionaries,
        setAlertId,
        setPreviousCirclesUsers,
        setPreviousDictionaries,
        alertName,
        setAlertName,
        clearState,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlertsContext() {
  return useContext(AlertsContext);
}
