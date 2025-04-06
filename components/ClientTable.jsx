"use client";
import React, {useEffect, useState} from "react";
import {useFepsLeft} from "/contexts/FepsLeftContext";
import ClientTableItem from "/components/ClientTableItem";
import {GroupIcon} from "lucide-react";
import {ToggleGroup} from "/components/ui/toggle-group";
import { useNavigators } from '../contexts/NavigatorsContext';
import { useClientList } from '../contexts/ClientListContext';

export default function ClientTable({setEditing}) {

    const {clientList} = useClientList();
    const {selectedNavigator} = useNavigators();
    const {selectedFepLeft} = useFepsLeft();
    const [isMounted, setIsMounted] = useState(false);
    const [grouped, setGrouped] = useState(false);
    const [, setTableClients] = useState([]);
    const [statusCollapse, setStatusCollapse] = useState([])
    const [pinned, setPinned] = useState([]);

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

    const handleGroupChange = () => {
        setGrouped(!grouped);
        setStatusCollapse([])
        if (!grouped) {
            const groupedArray = Object.entries(groupedClients).flatMap(([status]) =>
                clientList.map(client => ({ ...client, groupStatus: status }))
            );
            setTableClients(groupedArray);
        } else {
            setTableClients(filteredClients);
        }
    };

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

    const filteredClients = clientList?.filter(client => {
        if ( selectedNavigator?.name !== "All" ) { return client.navigator === selectedNavigator?.name } return client}).filter(client => {
        const matchesSearch = client.first_name?.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase())
          || client.last_name?.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase());
        const matchesStatus = selectedFepLeft.status === 'All' || client.clientStatus === selectedFepLeft.status;
        const matchesGroup = selectedFepLeft.age === 'All' || client.group === selectedFepLeft.age;
        return matchesSearch && matchesStatus && matchesGroup;
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const groupedClients = groupByClientStatus(filteredClients);

    function getScreenWidth() {
        return window.innerWidth;
    }

    function useScreenWidth() {
        const [screenWidth, setScreenWidth] = useState(getScreenWidth());

        useEffect(() => {
            function handleResize() {
                setScreenWidth(getScreenWidth());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [screenWidth]);

        return screenWidth;
    }
    const screenWidth = useScreenWidth();

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
      <div className="mt-0 overflow-y-scroll no-scrollbar">
          <div className="h-auto">
              <div className="inline-block w-full py-0 h-full align-middle relative">
                  <div
                    className="h-16 fixed top-0 bg-base-200 text-base-content flex justify-between items-center pr-4 pl-6 w-full">
                      <div>
                          <span className={`font-bold`} >
                            {
                                filteredClients
                                  .filter(client => selectedFepLeft.age !== "All" ? client.group === selectedFepLeft.age : "All")
                                  .filter(client => selectedFepLeft.status !== "All" ? client.clientStatus === selectedFepLeft.status : "All").length
                            }
                          </span>
                      {selectedFepLeft.status !== "All" ? " "+selectedFepLeft.status.toLowerCase() : null} {selectedFepLeft.age !== "All" ? selectedFepLeft.age.toLowerCase() : null} clients
                      </div>
                      <div>
                          <div className={`cursor-pointer`} onClick={handleGroupChange}>
                              <ToggleGroup className={`flex items-center justify-center w-8 h-8 rounded-full border gap-0 ${grouped ? 'border-error text-error' : 'border-base-content/10 text-base-content/30'}`} type={`single`} onToggle={handleGroupChange} title={`Group`} >
                                  <GroupIcon className={`w-5 h-5  `} /><span>{grouped && screenWidth > 1536 ? '' : ''}</span>
                              </ToggleGroup></div>
                      </div>
                  </div>
                  <table className="w-[250px] 2xl:w-[320px] mt-16">
                      <tbody className="">
                      {grouped ? (
                        Object.entries(groupedClients).map(([status, clients], idx) => (
                          <React.Fragment key={status}>
                              <tr className={`${getBGColor(status)} border-b-1 border-b-base-300`}>
                                  <td  className="py-2 px-4 text-sm whitespace-normal">{status} ({clients.length})</td>
                                  <td className={`text-2xl cursor-pointer text-right pr-5 m-0`} onClick={() => {
                                      handleCollapseChange(status)
                                  }}>{statusCollapse.includes(status) ? "+" : "-"}</td>
                              </tr>

                                  {clients.map((person, i) => (
                                    <ClientTableItem key={`${idx}-${i}`} person={person} i={i} setEditing={setEditing} statusCollapse={statusCollapse}/>
                                  ))}
                          </React.Fragment>
                        ))
                      ) : (
                        filteredClients?.length > 0 ? (
                          filteredClients?.map((person, i) => (
                            <ClientTableItem key={i} person={person} i={i} setEditing={setEditing} statusCollapse={statusCollapse}/>
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
    );
}
