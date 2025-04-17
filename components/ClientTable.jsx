'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useFepsLeft } from '/contexts/FepsLeftContext';
import ClientTableItem from '/components/ClientTableItem';
import { useNavigators } from '../contexts/NavigatorsContext';
import { useClientList } from '../contexts/ClientListContext';
import { Eye, EyeClosed } from 'phosphor-react';
import SearchField from './SearchField';

export default function ClientTable({ menuClosed, setMenuClosed, clients, searchTerm, statusFilter }) {
  const { clientList } = useClientList();
  const { selectedNavigator } = useNavigators();
  const { selectedFepLeft } = useFepsLeft();
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusCollapse, setStatusCollapse] = useState([]);

  const getBGColor = (status) => {
    switch (status) {
      case 'Inactive':
        return 'bg-error text-error-content';
      case 'In Progress':
        return 'bg-warning text-warning-content';
      case 'Active':
        return 'bg-success text-success-content';
      case 'Graduated':
        return 'bg-info text-info-content';
      default:
        return 'bg-primary text-primary-content';
    }
  };

  const handleCollapseChange = (status) => {
    setStatusCollapse(prevState => {
      if (prevState.includes(status)) {
        return prevState.filter(item => item !== status);
      }
      return [...prevState, status];
    });
  };

  const filteredClients = clientList?.filter(client => {
    if (selectedNavigator?.name !== 'All') {
      return client.navigator === selectedNavigator?.name;
    }
    return client;
  }).filter(client => {
    const matchesSearch = client.first_name?.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase())
      || client.last_name?.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase());
    const matchesStatus = selectedFepLeft.status === 'All' || client.clientStatus === selectedFepLeft.status;
    const matchesGroup = selectedFepLeft.age === 'All' || client.group === selectedFepLeft.age;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const groupByClientStatus = (clients) => {
    return clients
      .filter(client => {
        if (selectedNavigator.name !== 'All') return client.navigator === selectedNavigator?.name;
        return client;
      })
      .sort((a, b) => (a.clientStatus > b.clientStatus ? 1 : -1))
      .reduce((groups, client) => {
        const status = client.clientStatus || 'Unknown';
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

  // ✅ Prevent hydration mismatch by rendering only after mount
  if (!isMounted) return null;
  return (
    <div className={`flex w-full relative h-full overflow-y-scroll no-scrollbar shadow ${menuClosed ? '' : ''}`}>
      <div
        className=" w-full h-[80px] box-border relative right-0 top-0 left-0 flex-col flex justify-between z-50 text-sm text-base-content no-scrollbar">
        <SearchField menuClosed={menuClosed} setMenuClosed={setMenuClosed} setFilterOpen={setFilterOpen}
                     filterOpen={filterOpen} setViewMode={setViewMode} setStatusCollapse={setStatusCollapse}
                     className="fixed left-0 top-0 z-50 shadow-xl" />
      </div>
      <div className="mt-0 overflow-y-scroll no-scrollbar absolute right-0 left-0 top-0 bottom-0 z-40 ">
        <div className={`h-auto w-full transition-all duration-500 ${filterOpen ? 'mt-[113px]' : 'mt-[68px]'}`}>
          <div className="w-full h-full overflow-y-scroll no-scrollbar">
            <div className={`overflow-y-scroll w-full no-scrollbar`}>
              <table className={`overflow-y-scroll w-full ${menuClosed ? '' : ''}`}>
                <tbody className="w-full overflow-y-scroll">
                {viewMode === 'grouped' ? (
                  Object.entries(clientsToShow).map(([status, clients], idx) => (
                    <React.Fragment key={status}>
                      <tr
                        className={`${getBGColor(status)} ${selectedClient && selectedClient.clientStatus === status ? '' : ''} ${statusCollapse.includes(status) ? 'hidden' : ''} ${menuClosed ? '' : ''}`}>
                        <td onClick={() => handleCollapseChange(status)}
                            className={`py-2 text-sm flex w-full justify-between items-center cursor-pointer ${menuClosed ? '' : ''}`}>
                          <span className={`w-6/7 text-left font-bold pl-3`}>{status}</span>
                          <span className={`w-[30px] mr-3 text-center`}>
                                              {!statusCollapse.includes(status) ?
                                                <Eye size={27} className={getBGColor(status)} /> :
                                                <EyeClosed size={27} className={getBGColor(status)} />}
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
                      <ClientTableItem key={i} person={person} i={i} statusCollapse={statusCollapse}
                                       menuClosed={menuClosed} />
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
