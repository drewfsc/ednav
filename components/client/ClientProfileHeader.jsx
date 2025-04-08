import React from "react";
import { XSquare } from "phosphor-react";
import { useClients } from "/contexts/ClientsContext";
import { useEditing } from "../../contexts/EditingContext";
import { useNavigators } from "../../contexts/NavigatorsContext";
import ClientProfilePin from "./ClientProfilePin";

export default function ClientProfileHeader() {
  const { selectedClient, setSelectedClient } = useClients();
  const { selectedNavigator } = useNavigators();
  const { setEditing } = useEditing();

  const getBadgeColor = (status) => {
    switch (status) {
      case "Active":
        return "badge badge-success text-success-content text-xs px-3 ";
      case "Inactive":
        return "badge badge-error text-error-content text-xs px-3";
      case "In Progress":
        return "badge badge-warning text-warning-content text-xs px-3";
      case "Graduated":
        return "badge badge-info text-info-content text-xs px-3";
      default:
        return "badge badge-primary text-primary-content text-xs px-3";
    }
  };

  return (
    <div
      className={`bg-base-200 text-base-content absolute right-0 left-0 flex h-16 w-full items-center justify-between px-6 font-extralight shadow-lg transition-all duration-500`}
    >
      <div
        className={`divide-accent-content/30 flex items-center justify-between gap-4 divide-x`}
      >
        {selectedNavigator && selectedNavigator.name !== "All" ? (
          <ClientProfilePin />
        ) : null}
        <div className={`pr-4 font-bold`}>
          {selectedClient && !selectedClient?.name
            ? selectedClient?.first_name + " " + selectedClient?.last_name
            : selectedClient?.name}
        </div>
        <div className={`pr-4`}>
          <div className={`${getBadgeColor(selectedClient?.clientStatus)}`}>
            {selectedClient?.clientStatus}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setEditing(null);
          setSelectedClient(null);
        }}
        className={``}
      >
        <XSquare size={33} className={`text-base-content`} />
      </div>
    </div>
  );
}
