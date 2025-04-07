"use client";
import React, {useEffect, useState, useMemo} from "react";
import {useFepsLeft} from "/contexts/FepsLeftContext";
import ClientTableItem from "/components/ClientTableItem";
import { useNavigators } from '../contexts/NavigatorsContext';
import { useClientList } from '../contexts/ClientListContext';
import { Eye, EyeClosed } from 'phosphor-react';
import SearchField from './SearchField';

export default function ClientTable() {

    const {clientList} = useClientList();
    const {selectedNavigator} = useNavigators();
    const {selectedFepLeft} = useFepsLeft();
    const [isMounted, setIsMounted] = useState(false);
    const [statusCollapse, setStatusCollapse] = useState([])
    const [viewMode, setViewMode] = useState(null);
    const [sortMode, setSortMode] = useState(null);

    const toggleGrouped = () => {
        setViewMode("grouped");
    };

    const togglePinned = () => {
        setViewMode("pinned");
        setStatusCollapse([])
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
    }

    const handleCollapseChange = (status) => {
        setStatusCollapse(prevState => {
            if (prevState.includes(status)) {
                return prevState.filter(item => item !== status)
            }
            return [...prevState, status]
        })
    }

    const filteredClients = clientList?.filter(client => {
        if ( selectedNavigator?.name !== "All" ) { return client.navigator === selectedNavigator?.name } return client}).filter(client => {
        const matchesSearch = client.first_name?.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase())
          || client.last_name?.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase());
        const matchesStatus = selectedFepLeft.status === 'All' || client.clientStatus === selectedFepLeft.status;
        const matchesGroup = selectedFepLeft.age === 'All' || client.group === selectedFepLeft.age;
        return matchesSearch && matchesStatus && matchesGroup;
    });

    const groupByClientStatus = (clients) => {
        return clients
            .filter(client => {
                if(selectedNavigator.name !== "All") return client.navigator === selectedNavigator?.name
                return client
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

        if (viewMode === 'pinned') {
            return sorted.sort((a, b) => {
                const aPinned = pinnedIds.includes(a._id.toString());
                const bPinned = pinnedIds.includes(b._id.toString());
                return aPinned === bPinned ? 0 : aPinned ? -1 : 1;
            });
        }

        if (viewMode === 'grouped') {
            return groupByClientStatus(filteredClients);
        }

        if (sortMode === 'alpha') {
            sorted.sort((a, b) =>
              a.name?.localeCompare(b.name)
            );
        } else if (sortMode === 'date') {
            sorted.sort((a, b) =>
              new Date(b.latestInteraction || 0) - new Date(a.latestInteraction || 0)
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
      <div className={`relative flex flex-col h-full w-full`}>
          <div className="fixed flex-col top-0 bg-secondary/60 backdrop-blur-sm text-base-content flex justify-between items-center  w-full text-sm shadow-lg">
              <SearchField/>
              <div className="flex justify-around items-center w-full divide-x divide-base-content/30 px-1.5">
                  <div className="filter my-1/5 w-1/2 flex justify-start">
                      <input onClick={() => {
                          setSortMode(null)
                      }} className="btn btn-xs filter-reset" type="radio" name="metaframeworks" aria-label="All"/>
                      <input onClick={toggleAlpha} className={`btn btn-xs font-normal ${sortMode === "alpha" ? "bg-primary text-primary-content" : ""}`} type="radio" name="metaframeworks" aria-label="A-Z"/>
                      <input onClick={toggleDate} className={`btn btn-xs font-normal ${sortMode === "date" ? "bg-primary text-primary-content" : ""}`} type="radio" name="metaframeworks" aria-label="Recent"/>
                  </div>
                  <div className="filter my-1.5 w-1/2 flex justify-end">
                      <input onClick={() => {
                          setViewMode(null)
                          setStatusCollapse([])
                      }} className="btn btn-xs filter-reset" type="radio" name="metaframeworks" aria-label="All"/>
                      <input onClick={togglePinned} className={`btn btn-xs font-normal ${viewMode === "pinned" ? "bg-primary text-primary-content" : ""}`} type="radio" name="metaframeworks" aria-label="Pins"/>
                      <input onClick={toggleGrouped} className={`btn btn-xs font-normal ${viewMode === "grouped" ? "bg-primary text-primary-content" : ""}`} type="radio" name="metaframeworks" aria-label="Groups"/>
                  </div>
              </div>
          </div>
          <div className="mt-0 overflow-y-scroll no-scrollbar">
              <div className="h-auto">
                  <div className="w-full h-full">
                      <div className={``}>
                          <table className="w-[250px] 2xl:w-[320px] mt-[98px] table-none">
                              <tbody className="">
                              {viewMode === 'grouped' ? (
                                Object.entries(clientsToShow).map(([status, clients], idx) => (
                                  <React.Fragment key={status}>
                                      <tr className={`${getBGColor(status)} `}>
                                          <td className="py-2 text-sm flex justify-between items-center cursor-pointer w-[250px] 2xl:w-[320px]">
                                              <span className={`w-5/7 text-left pl-3`}>{status}</span>
                                              <span className={`w-1/7 pr-6`} onClick={() => handleCollapseChange(status)}>
                                              {!statusCollapse.includes(status) ? <Eye size={20} className={getBGColor(status)}/> : <EyeClosed size={20} className={getBGColor(status)}/>}
                                          </span>
                                          </td>
                                      </tr>
                                      {clients.map((person, i) => (
                                        <ClientTableItem key={`${idx}-${i}`} person={person} i={i} statusCollapse={statusCollapse} />
                                      ))}
                                  </React.Fragment>
                                ))
                              ) : (
                                Array.isArray(clientsToShow) && clientsToShow.length > 0 ? (
                                  clientsToShow.map((person, i) => (
                                    <ClientTableItem key={i} person={person} i={i} statusCollapse={statusCollapse} />
                                  ))
                                ) : (
                                  <tr>
                                      <td colSpan="5" className="text-center py-4 text-sm text-gray-500">
                                          No clients found.
                                      </td>
                                  </tr>
                                )
                              )}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}
