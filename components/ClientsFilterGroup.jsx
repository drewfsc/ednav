import {useState} from "react"
import {ProhibitInset, TrendUp, GraduationCap, PersonSimpleWalk } from "phosphor-react";

export default function ClientsFilterGroup({setFilter}) {
  const [buttonState, setButtonState] = useState('Active')
    return (
        <div className=" isolate w-full flex rounded-full shadow-sm overflow-hidden border border-gray-600 divide-x divide-gray-600 transition-all duration-300 bg-white">
      <button
          type="button"
          onClick={() => {
            setFilter('Active')
            setButtonState('Active')
          }}
          className={`w-1/5 relative inline-flex items-center rounded-l-full pl-4 pr-2 text-xs text-black hover:text-white focus:z-10 hover:bg-green-600 ${buttonState === 'Active' ? 'bg-green-500 hover:bg-green-600 text-white hover:text-white' : ''}`}
      >
          <span className={`text-[11px] leading-none`}>Active</span> <span className={`bg-green-500 rounded-full p-1 flex items-center w-auto ml-1`}><PersonSimpleWalk size={12} className={`text-white`} /></span>
      </button>
      <button
          type="button"
          onClick={() => {
              setButtonState('In Progress')
              setFilter('In Progress')
          }}
          className={`w-1/5 relative inline-flex items-center px-2  text-xs text-black hover:text-white focus:z-10 hover:bg-amber-400 ${buttonState === 'In Progress' ? 'bg-amber-500 hover:bg-amber-400 text-white ' : ''}`}
      >
          <span className={`text-[11px] leading-none`}>In Progress</span> <span className={`bg-amber-500 rounded-full p-1 flex items-center w-auto ml-1`}><TrendUp size={12} className={`text-white`} /></span>
      </button>
      <button
          type="button"
          onClick={() => {

            setButtonState('Graduated')
              setFilter('Graduated')
          }}
          className={`w-1/5 relative inline-flex items-center px-2  text-xs focus:z-10 hover:bg-purple-500 hover:text-white ${buttonState === 'Graduated' ? 'bg-purple-600 hover:bg-purple-500 text-white hover:text-white' : ''}`}
      >
          <span className={`text-[11px] leading-none`}>Graduated</span> <span className={`bg-purple-600 rounded-full p-1 flex items-center w-auto ml-1`}><GraduationCap size={12} className={`text-white`} /></span>
      </button>
      <button
          type="button"
          onClick={() => {
            setButtonState('Inactive')
              setFilter('Not')
          }}
          className={`w-1/5 relative inline-flex items-center px-2 py-1.5 text-xs  focus:z-10 hover:text-white  hover:bg-red-500 ${buttonState === 'Inactive' ? 'bg-red-500 hover:bg-red-600 text-white ' : ''}`}
      >
          <span className={`text-[11px] leading-none`}>Inactive</span> <span className={`bg-red-600 rounded-full p-1 flex items-center w-auto ml-1`}><ProhibitInset size={14} className={`text-white`} /></span>
      </button>
            <button
                type="button"
                onClick={() => {
                    setButtonState('All')
                    setFilter('')
                }}
                className={`w-1/5 relative inline-flex items-center rounded-r-full pl-3 pr-4  text-xs focus:z-10 hover:bg-gray-300 ${buttonState === 'All' ? 'bg-gray-200 hover:bg-gray-300 text-black hover:text-black' : ''}`}
            >
                <span className={`text-[11px] leading-none`}>All</span>
            </button>
    </div>
    )
}
