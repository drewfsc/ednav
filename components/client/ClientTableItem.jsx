import React, { useEffect, useState } from "react";
import { useClients } from "/contexts/ClientsContext";
import { PinIcon } from "lucide-react";
import { useNavigators } from "../../contexts/NavigatorsContext";
import { useEditing } from "../../contexts/EditingContext";
import { useActivities } from "../../contexts/ActivityContext";
import moment from "moment/moment";

export default function ClientTableItem({ person, i, statusCollapse }) {
  const { setSelectedActivity } = useActivities();
  const { selectedClient, setSelectedClient } = useClients(null);
  const { selectedNavigator } = useNavigators();
  const { setEditing } = useEditing();

  const getBadgeColor = (status) => {
    switch (status) {
      case "Inactive":
        return "badge badge-error text-error-content";
      case "In Progress":
        return "badge badge-warning text-warning-content";
      case "Active":
        return "badge badge-success text-success-content";
      case "Graduated":
        return "badge badge-info text-info-content";
      default:
        return "badge badge-primary text-primary-content";
    }
  };

  const getBGColor = (status) => {
    switch (status) {
      case "Inactive":
        return "bg-error hover:bg-error text-error-content";
      case "In Progress":
        return "bg-warning hover:bg-warning text-warning-content";
      case "Active":
        return "bg-success hover:bg-success text-success-content";
      case "Graduated":
        return "bg-info hover:bg-info text-info-content";
      default:
        return "bg-primary hover:bg-primary text-primary-content";
    }
  };

  // const getBorderColor = (status) => {
  //   switch (status) {
  //     case "Active":
  //       return "border-error";
  //     case "Inactive":
  //       return "border-warning";
  //     case "In Progress":
  //       return "border-success";
  //     case "Graduated":
  //       return "border-info";
  //     default:
  //       return "border-primary";
  //   }
  // };

  const getActivities = async (person) => {
    const res = await fetch("/api/activities?clientId=" + person._id);
    const json = await res.json();
    await setSelectedActivity((prev) => ({
      ...prev,
      activities: json.data,
    }));
  };

  function getScreenWidth() {
    return window.innerWidth;
  }

  function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());

    useEffect(() => {
      function handleResize() {
        setScreenWidth(getScreenWidth());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [screenWidth]);

    return screenWidth;
  }

  const screenWidth = useScreenWidth();
  const personStatus = person.clientStatus;
  const statusAbbr1 = personStatus.substring(0, 1);
  const latestInteraction = new Date(
    person.latestInteraction,
  ).toLocaleDateString();
  return (
    <tr
      key={person.email + i}
      onClick={() => {
        if (selectedClient?._id === person._id) {
          setSelectedClient(null);
          // noinspection JSCheckFunctionSignatures
          setEditing("");
        } else {
          setSelectedClient(person);
          getActivities(person).then();
          // noinspection JSCheckFunctionSignatures
          setEditing("client");
        }
      }}
      className={`${statusCollapse?.includes(person?.clientStatus) ? "hidden" : "visible"} hover:bg-base-300 hover:text-base-content hover:border-base-200 text-base-content box-border cursor-pointer transition-all duration-500 ${selectedClient?._id === person._id ? getBGColor(person?.clientStatus) : ""} ${selectedClient?._id === person?._id ? "bg-accent text-accent-content sticky top-[110px] bottom-0 shadow-xl" : ""}`}
    >
      <td className="flex w-[300px] items-center justify-between truncate text-xs 2xl:w-[420px]">
        <span className={`ml-4 flex-1 flex-col`}>
          {person.first_name && person.last_name && (
            <div
              className={`text-xs font-medium ${selectedClient?._id === person._id ? "text-black" : "text-base-content"} ${selectedClient?._id === person?._id ? "" : "text-base-content"}`}
            >
              {person.first_name + " " + person.last_name}
            </div>
          )}
          {person.latestInteraction && (
            <div className={`-mt-1-[3px] text-[11px]`}>
              {moment(latestInteraction, "MM/DD/YYYY").format("MMM Do, YYYY")}
            </div>
          )}
        </span>
        <span
          className={`ml-4 ${selectedClient?._id === person._id ? "text-black" : "text-base-content"}`}
        >
          <PinIcon
            size={20}
            className={`${selectedNavigator && selectedNavigator.pinned && selectedNavigator?.pinned?.includes(person?._id) ? "visible" : "hidden"}`}
          />
        </span>
        <span className={`mr-3 ml-2`}>
          <div
            className={`m-4 mx-2 w-[15px] text-[11px] 2xl:w-[80px] ${selectedClient?._id === person._id ? "badge border-0 bg-white text-black" : getBadgeColor(person?.clientStatus)}`}
          >
            {(screenWidth < 1536 ? statusAbbr1 : "") +
              (screenWidth >= 1536 ? personStatus : "")}
          </div>
        </span>
      </td>
    </tr>
  );
}
