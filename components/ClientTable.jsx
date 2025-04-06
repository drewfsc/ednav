"use client";
import React, {useEffect, useState, useMemo} from "react";
import {useFepsLeft} from "/contexts/FepsLeftContext";
import ClientTableItem from "/components/ClientTableItem";
import { useNavigators } from '../contexts/NavigatorsContext';
import { useClientList } from '../contexts/ClientListContext';

export default function ClientTable() {

    const {clientList} = useClientList();
    const {selectedNavigator} = useNavigators();
    const {selectedFepLeft} = useFepsLeft();
    const [isMounted, setIsMounted] = useState(false);
    const [statusCollapse, setStatusCollapse] = useState([])
    const [viewMode, setViewMode] = useState(null);

    const toggleGrouped = () => {
        setViewMode(prev => (prev === 'grouped' ? null : 'grouped'));
    };

    const togglePinned = () => {
        setViewMode(prev => (prev === 'pinned' ? null : 'pinned'));
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

        if (viewMode === 'pinned') {
            return [...filteredClients].sort((a, b) => {
                const aPinned = pinnedIds.includes(a._id.toString());
                const bPinned = pinnedIds.includes(b._id.toString());
                return aPinned === bPinned ? 0 : aPinned ? -1 : 1;
            });
        }

        if (viewMode === 'grouped') {
            return groupByClientStatus(filteredClients); // returns object
        }

        return filteredClients;
    }, [filteredClients, viewMode, pinnedIds]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // const groupedClients = viewMode === 'grouped' && typeof clientsToShow === 'object' ? clientsToShow : {};

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
      <div className="mt-0 overflow-y-scroll no-scrollbar">
          <div className="h-auto">
              <div className="inline-block w-full py-0 h-full align-middle relative">
                  <div
                    className="h-16 fixed top-0 bg-base-200 text-base-content flex justify-between items-center pr-4 pl-6 w-full text-sm">
                      <div>
                          <span className={`font-bold`} >
                            {
                                Array.isArray(clientsToShow)
                                  ? clientsToShow
                                    .filter(client => selectedFepLeft.age === "All" || client.group === selectedFepLeft.age)
                                    .filter(client => selectedFepLeft.status === "All" || client.clientStatus === selectedFepLeft.status).length
                                  : Object.values(clientsToShow)
                                    .flat()
                                    .filter(client => selectedFepLeft.age === "All" || client.group === selectedFepLeft.age)
                                    .filter(client => selectedFepLeft.status === "All" || client.clientStatus === selectedFepLeft.status).length
                            }
                          </span>
                      {selectedFepLeft.status !== "All" ? " "+selectedFepLeft.status.toLowerCase() : null} {selectedFepLeft.age !== "All" ? selectedFepLeft.age.toLowerCase() : null} clients
                      </div>
                      <div className="filter">
                          <input onClick={() => {
                              setViewMode(null)
                          }} className="btn btn-xs filter-reset" type="radio" name="metaframeworks" aria-label="All"/>
                          <input onClick={togglePinned} className="btn btn-xs" type="radio" name="metaframeworks" aria-label="Pins"/>
                          <input onClick={toggleGrouped} className="btn btn-xs" type="radio" name="metaframeworks" aria-label="Groups"/>
                      </div>
                  </div>
                  <table className="w-[250px] 2xl:w-[320px] mt-16">
                      <tbody className="">
                      {viewMode === 'grouped' ? (
                        Object.entries(clientsToShow).map(([status, clients], idx) => (
                          <React.Fragment key={status}>
                              <tr className={`${getBGColor(status)} border-b-1 border-b-base-300`}>
                                  <td className="py-2 px-4 text-sm">{status} ({clients.length})</td>
                                  <td className="text-2xl cursor-pointer text-right pr-5" onClick={() => handleCollapseChange(status)}>
                                      {statusCollapse.includes(status) ? "+" : "-"}
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
                      {/*{viewMode === 'grouped' ? (*/}
                      {/*  Object.entries(clientsToShow).map(([status, clients], idx) => (*/}
                      {/*    <React.Fragment key={status}>*/}
                      {/*        <tr className={`${getBGColor(status)} border-b-1 border-b-base-300`}>*/}
                      {/*            <td  className="py-2 px-4 text-sm whitespace-normal">{status} ({clientsToShow.length})</td>*/}
                      {/*            <td className={`text-2xl cursor-pointer text-right pr-5 m-0`} onClick={() => {*/}
                      {/*                handleCollapseChange(status)*/}
                      {/*            }}>{statusCollapse.includes(status) ? "+" : "-"}</td>*/}
                      {/*        </tr>*/}

                      {/*            {clientsToShow.map((person, i) => (*/}
                      {/*              <ClientTableItem key={`${idx}-${i}`} person={person} i={i} statusCollapse={statusCollapse}/>*/}
                      {/*            ))}*/}
                      {/*    </React.Fragment>*/}
                      {/*  ))*/}
                      {/*) : (*/}
                      {/*  clientsToShow?.length > 0 ? (*/}
                      {/*    clientsToShow?.map((person, i) => (*/}
                      {/*      <ClientTableItem key={i} person={person} i={i} statusCollapse={statusCollapse}/>*/}
                      {/*    ))*/}
                      {/*  ) : (*/}
                      {/*    <tr>*/}
                      {/*        <td colSpan="5" className="text-center py-4 text-sm text-gray-500">*/}
                      {/*            No clients found.*/}
                      {/*        </td>*/}
                      {/*    </tr>*/}
                      {/*  )*/}
                      {/*)}*/}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    );
}
