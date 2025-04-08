import React, { useState, useEffect } from "react";
import { Input } from "/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "/components/ui/select";
import NavigatorSelector from "/components/layout/NavigatorSelector";
import ClientTable from "./ClientTable";
import { useFepsLeft } from "../../contexts/FepsLeftContext";

const FilteredClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [groupFilter, setGroupFilter] = useState("All");
  const [clients, setClients] = useState([]);
  const [selectedNavigator, setSelectedNavigator] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedFepLeft } = useFepsLeft();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const url = selectedNavigator
          ? `/api/clients?navigator=${selectedNavigator}`
          : "/api/clients";
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          // Check if response is an array
          setClients(data); // Directly set the array of clients
        } else if (data && Array.isArray(data.clients)) {
          // Check if it's an object with clients array
          setClients(data.clients);
        } else {
          console.error("Unexpected response structure:", data);
          setClients([]); // Fallback to empty array if structure is unexpected
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]); // Fallback to an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchClients().then();
  }, [selectedNavigator]);

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedFepLeft.status === "All" ||
      client.status === selectedFepLeft.status;
    const matchesGroup =
      selectedFepLeft.age === "All" || client.group === selectedFepLeft.age;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const CLIENT_STATUSES = [
    "All",
    "Active",
    "In Progress",
    "Graduated",
    "Inactive",
  ];
  const CLIENT_AGE_GROUPS = ["All", "Adult", "Youth"];

  return (
    <div className="p-4 space-y-4">
      <NavigatorSelector
        value={selectedNavigator}
        onChange={setSelectedNavigator}
      />

      <div className="flex space-x-4">
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>Status</SelectTrigger>
          <SelectContent>
            {CLIENT_STATUSES
              ? CLIENT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))
              : undefined}
          </SelectContent>
        </Select>

        <Select value={groupFilter} onValueChange={setGroupFilter}>
          <SelectTrigger>Group</SelectTrigger>
          <SelectContent>
            {CLIENT_AGE_GROUPS
              ? CLIENT_AGE_GROUPS.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))
              : undefined}
            )
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div>Loading clients...</div>
      ) : (
        <ClientTable
          clients={filteredClients}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          groupFilter={groupFilter}
        />
      )}
    </div>
  );
};

export default FilteredClients;
