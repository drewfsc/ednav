import React from "react";
import { useFepsLeft } from "../../contexts/FepsLeftContext";
import { X } from "lucide-react";

function SearchField() {
  const { selectedFepLeft, setSelectedFepLeft } = useFepsLeft();
  return (
    <div className={`relative z-0 flex items-center justify-center`}>
      <div
        onClick={() => {
          setSelectedFepLeft((prevState) => {
            return {
              ...prevState,
              searchTerm: "",
            };
          });
        }}
        className={`border-secondary-content fixed right-0 z-20 mr-3 flex h-fit w-fit cursor-pointer items-center justify-between rounded-full border ${selectedFepLeft.searchTerm ? "visible" : "invisible"}`}
      >
        <X className={`text-secondary-content h-6 w-6 font-light`} />
      </div>
      <input
        name={`client-search`}
        type="text"
        onChange={(e) => {
          setSelectedFepLeft((prev) => {
            return {
              ...prev,
              searchTerm: e.target.value,
            };
          });
        }}
        value={selectedFepLeft.searchTerm}
        placeholder="Search by name..."
        className="input bg-secondary text-secondary-content w-[250px] rounded-none border-0 py-[31px] shadow-none ring-0 outline-none focus:border-0 focus:ring-0 2xl:w-[320px]"
      />
    </div>
  );
}

export default SearchField;
