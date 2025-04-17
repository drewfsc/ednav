import React from 'react';
import { useFepsLeft } from '../contexts/FepsLeftContext';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Sidebar, Wrench, XCircle } from 'phosphor-react';

function SearchField({ menuClosed, setMenuClosed, filterOpen, setFilterOpen, setViewMode, setStatusCollapse }) {

  const { selectedFepLeft, setSelectedFepLeft } = useFepsLeft();
  const toggleGrouped = () => {
    setViewMode('grouped');
  };

  const togglePinned = () => {
    setViewMode('pinned');
    setStatusCollapse([]);
  };

  const toggleAlpha = () => {
    setViewMode('alpha');
    setStatusCollapse([]);
  };

  const toggleDate = () => {
    setViewMode('date');
    setStatusCollapse([]);
  };

  return (
    <div className={`w-full h-full flex items-center top-0 gap-4 mb-3 justify-between`}>
      <div className={`flex h-full w-full items-center justify-start gap-2 bg-base-300 px-6 `}>
        <MagnifyingGlass className={`-mr-8 text-base-content/40`} size={20} />
        <input name={`client-search`} type="text" onChange={(e) => {
          setSelectedFepLeft(prev => {
            return { ...prev, searchTerm: e.target.value };
          });
        }} value={selectedFepLeft.searchTerm}
               placeholder="Search by name..."
               className="input pl-10 rounded-none focus:bg-base-300 focus:border-0 focus:outline-0 outline-none ring-0 focus:ring-0 border-0 bg-transparent shadow-none border-b-1 border-base-content/20" />
        <XCircle className={`-ml-10 ${selectedFepLeft.searchTerm !== '' ? 'visible' : 'hidden'}`} size={30}
                 color={`white`} />
      </div>
      <div
        className={`absolute bg-secondary/30 backdrop-blur backdrop-grayscale-100 top-0 p-3 right-0 left-0 flex items-center justify-end gap-3 transition-all ease-out duration-700 -z-10 ${filterOpen ? 'translate-y-[64px]' : '-translate-y-[84px]'}`}>
        <div className="filter flex items-center gap-1 justify-end">
          <input className="btn lg:btn-xs btn-sm btn-primary btn-soft filter-reset" type="radio" name="metaframeworks"
                 aria-label="All" />
          <input onClick={toggleAlpha} className="btn lg:btn-xs btn-sm btn-primary btn-soft" type="radio"
                 name="metaframeworks" aria-label="A-Z" />
          <input onClick={toggleDate} className="btn lg:btn-xs btn-sm btn-primary btn-soft" type="radio"
                 name="metaframeworks" aria-label="Latest" />
          <input onClick={toggleGrouped} className="btn lg:btn-xs btn-sm btn-primary btn-soft" type="radio"
                 name="metaframeworks" aria-label="Grouped" />
          <input onClick={togglePinned} className="btn lg:btn-xs btn-sm btn-primary btn-soft" type="radio"
                 name="metaframeworks" aria-label="Pinned" />
        </div>
      </div>

      <div className="z-100 cursor-pointer absolute flex items-center justify-items-center gap-3 right-3 ">
        <Wrench size={27} className={`text-base-content/50 hover:text-base-content`}
                onClick={() => setFilterOpen(!filterOpen)} />
        <Sidebar color={'white'} size={27} onClick={() => setMenuClosed(!menuClosed)} />
      </div>
    </div>
  );
}

export default SearchField;