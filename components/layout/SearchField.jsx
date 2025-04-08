import React from "react";
import { useFepsLeft } from "../../contexts/FepsLeftContext";
import { X } from "lucide-react";

function SearchField() {
  const { selectedFepLeft, setSelectedFepLeft } = useFepsLeft();
  return (
    <div className={`flex items-center justify-center relative z-0`}>
      <div
        onClick={() => {
          setSelectedFepLeft((prevState) => {
            return {
              ...prevState,
              searchTerm: "",
            };
          });
        }}
        className={`fixed right-0 h-fit w-fit mr-3 rounded-full border-secondary-content z-20 flex justify-between items-center border cursor-pointer ${selectedFepLeft.searchTerm ? "visible" : "invisible"}`}
      >
        <X className={`text-secondary-content w-6 h-6 font-light`} />
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
        className="input w-[250px] 2xl:w-[320px] rounded-none py-[31px] focus:border-0 outline-none ring-0 focus:ring-0 border-0 bg-secondary shadow-none text-secondary-content"
      />
    </div>
  );
}

export default SearchField;
