"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useFepsLeft } from "/contexts/FepsLeftContext";
import ClientTableItem from "/components/client/ClientTableItem";
import { useNavigators } from "../../contexts/NavigatorsContext";
import { useClientList } from "../../contexts/ClientListContext";
import { Eye, EyeClosed } from "phosphor-react";
import SearchField from "../layout/SearchField";

export default function ClientTable() {
  const { clientList } = useClientList();
  const { selectedNavigator } = useNavigators();
  const { selectedFepLeft } = useFepsLeft();
  const [isMounted, setIsMounted] = useState(false);
  const [statusCollapse, setStatusCollapse] = useState([]);
  const [viewMode, setViewMode] = useState(null);
  const [sortMode, setSortMode] = useState(null);

  const toggleGrouped = () => {
    setViewMode("grouped");
    setStatusCollapse([]);
    setSortMode(null);
  };

  const togglePinned = () => {
    setViewMode("pinned");
    setStatusCollapse([]);
    setSortMode(null);
  };

  const toggleAlpha = () => {
    setSortMode("alpha");
    setViewMode(null);
    setStatusCollapse([]);
  };

  const toggleDate = () => {
    setSortMode("date");
    setViewMode(null);
    setStatusCollapse([]);
  };

  const getBGColor = (status) => {
    switch (status) {
      case "Inactive":
        return "bg-error text-error-content";
      case "In Progress":
        return "bg-warning text-warning-content";
      case "Active":
        return "bg-success text-success-content";
      case "Graduated":
        return "bg-info text-info-content";
      default:
        return "bg-primary text-primary-content";
    }
  };

  const handleCollapseChange = (status) => {
    setStatusCollapse((prevState) => {
      if (prevState.includes(status)) {
        return prevState.filter((item) => item !== status);
      }
      return [...prevState, status];
    });
  };

  const filteredClients = clientList
    ?.filter((client) => {
      if (selectedNavigator?.name !== "All") {
        return client.navigator === selectedNavigator?.name;
      }
      return client;
    })
    .filter((client) => {
      const matchesSearch =
        client.first_name
          ?.toLowerCase()
          .includes(selectedFepLeft.searchTerm.toLowerCase()) ||
        client.last_name
          ?.toLowerCase()
          .includes(selectedFepLeft.searchTerm.toLowerCase());
      const matchesStatus =
        selectedFepLeft.status === "All" ||
        client.clientStatus === selectedFepLeft.status;
      const matchesGroup =
        selectedFepLeft.age === "All" || client.group === selectedFepLeft.age;
      return matchesSearch && matchesStatus && matchesGroup;
    });

  const groupByClientStatus = (clients) => {
    return clients
      .filter((client) => {
        if (selectedNavigator.name !== "All")
          return client.navigator === selectedNavigator?.name;
        return client;
      })
      .sort((a, b) => (a.clientStatus > b.clientStatus ? 1 : -1))
      .reduce((groups, client) => {
        const status = client.clientStatus || "Unknown";
        if (!groups[status]) groups[status] = [];
        groups[status].push(client);
        return groups;
      }, {});
  };

  const pinnedIds = selectedNavigator?.pinned || [];

  const clientsToShow = useMemo(() => {
    if (!filteredClients) return [];

    let sorted = [...filteredClients];

    if (viewMode === "pinned") {
      return sorted.sort((a, b) => {
        const aPinned = pinnedIds.includes(a._id.toString());
        const bPinned = pinnedIds.includes(b._id.toString());
        return aPinned === bPinned ? 0 : aPinned ? -1 : 1;
      });
    }

    if (viewMode === "grouped") {
      return groupByClientStatus(filteredClients);
    }

    if (sortMode === "alpha") {
      sorted.sort((a, b) => a.first_name?.localeCompare(b.first_name));
    } else if (sortMode === "date") {
      sorted.sort(
        (a, b) =>
          new Date(b.latestInteraction || 0) -
          new Date(a.latestInteraction || 0),
      );
    }

    return sorted;
  }, [filteredClients, viewMode, sortMode, pinnedIds]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Prevent hydration mismatch by rendering only after mount
  if (!isMounted) return null;

  return (
    <div className={`relative flex h-full w-full flex-col`}>
      <div className="bg-neutral text-base-content fixed top-0 flex w-full flex-col items-center justify-between text-sm shadow-lg backdrop-blur-sm">
        <SearchField />
        <div className="divide-base-content/30 flex w-full items-center justify-around divide-x px-3">
          <div className="my-3 flex w-1/2 justify-start filter">
            <input
              onClick={() => {
                setSortMode(null);
              }}
              className="btn btn-xs btn-ghost bg-base-300 hover:bg-base-content filter-reset"
              type="radio"
              name="metaframeworks"
              aria-label="All"
            />
            <input
              onClick={toggleAlpha}
              className={`btn btn-xs btn-ghost bg-base-300 hover:bg-base-content ${sortMode === "alpha" ? "bg-primary text-primary-content" : ""}`}
              type="radio"
              name="metaframeworks"
              aria-label="A-Z"
            />
            <input
              onClick={toggleDate}
              className={`btn btn-xs btn-ghost bg-base-300 hover:bg-base-content ${sortMode === "date" ? "bg-primary text-primary-content" : ""}`}
              type="radio"
              name="metaframeworks"
              aria-label="Recent"
            />
          </div>
          <div className="my-1.5 flex w-1/2 justify-end filter">
            <input
              onClick={() => {
                setViewMode(null);
                setStatusCollapse([]);
              }}
              className="btn btn-xs btn-ghost bg-base-300 hover:bg-base-content filter-reset"
              type="radio"
              name="metaframeworks"
              aria-label="All"
            />
            <input
              onClick={togglePinned}
              className={`btn btn-xs btn-ghost bg-base-300 hover:bg-base-content ${viewMode === "pinned" ? "bg-primary text-primary-content" : ""}`}
              type="radio"
              name="metaframeworks"
              aria-label="Pins"
            />
            <input
              onClick={toggleGrouped}
              className={`btn btn-xs btn-ghost bg-base-300 hover:bg-base-content ${viewMode === "grouped" ? "bg-primary text-primary-content" : ""}`}
              type="radio"
              name="metaframeworks"
              aria-label="Groups"
            />
          </div>
        </div>
      </div>
      <div className="no-scrollbar mt-0 overflow-y-scroll scroll-smooth">
        <table className="table-none mt-[120px] w-[300px] 2xl:w-[420px]">
          <tbody className="divide-base-content/5 divide-y">
            {viewMode === "grouped" ? (
              Object.entries(clientsToShow).map(([status, clients], idx) => (
                <React.Fragment key={status}>
                  <tr className={`${getBGColor(status)} `}>
                    <td className="flex w-[250px] cursor-pointer items-center justify-between py-2 text-sm 2xl:w-[320px]">
                      <span className={`w-5/7 pl-3 text-left`}>{status}</span>
                      <span
                        className={`w-1/7 pr-6`}
                        onClick={() => handleCollapseChange(status)}
                      >
                        {!statusCollapse.includes(status) ? (
                          <Eye size={20} className={getBGColor(status)} />
                        ) : (
                          <EyeClosed size={20} className={getBGColor(status)} />
                        )}
                      </span>
                    </td>
                  </tr>
                  {clients.map((person, i) => (
                    <ClientTableItem
                      key={`${idx}-${i}`}
                      person={person}
                      i={i}
                      statusCollapse={statusCollapse}
                    />
                  ))}
                </React.Fragment>
              ))
            ) : Array.isArray(clientsToShow) && clientsToShow.length > 0 ? (
              clientsToShow.map((person, i) => (
                <ClientTableItem
                  key={i}
                  person={person}
                  i={i}
                  statusCollapse={statusCollapse}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-sm text-gray-500"
                >
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
