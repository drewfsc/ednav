import {useState} from "react"

export default function ClientsFilterGroup({setFilter}) {
    const [buttonState, setButtonState] = useState('Active')
    return (
        <div className="flex justify-between rounded-lg mb-1 divide-x divide-neutral-700 transition-all duration-300 bg-base-300">
            <button
                type="button"
                onClick={() => {
                    setButtonState('All')
                    setFilter('')
                }}
                className={`w-1/5 items-center rounded-l-lg px-3 py-1 text-sm overflow-hidden hover:bg-gray-200 ${buttonState === true ? 'bg-gray-300 hover:bg-gray-200 ' : ''}`}
            >
                <span className={`text-[11px] leading-none`}>All</span>
            </button>
            <button
                type="button"
                onClick={() => {
                    setFilter('Active')
                    setButtonState('Active')
                }}
                className={`w-1/5 items-center px-3 py-1 text-sm leading-none text-base-content focus:z-10 hover:bg-base-200 ${buttonState === null ? 'bg-base-300 hover:bg-base-100 ' : ''}`}
            >
                <span className={`text-[11px] leading-none`}>Active</span>
                {/*<span className={`rounded-full p-1 flex items-center w-auto ml-1`}><PersonSimpleWalk size={12} className={``} /></span>*/}
            </button>
            <button
                type="button"
                onClick={() => {
                    setButtonState('In Progress')
                    setFilter('In Progress')
                }}
                className={`w-1/5  items-center px-3 py-3 text-sm leading-none  focus:z-10 hover:bg-gray-200 ${buttonState === false ? 'bg-gray-300 hover:bg-gray-200 ' : ''}`}
            >
                <span className={`text-[11px] leading-none`}>In Progress</span>
                {/*<span className={` rounded-full p-1 flex items-center w-auto ml-1`}><TrendUp size={12} className={``} /></span>*/}
            </button>
            <button
                type="button"
                onClick={() => {

                    setButtonState('Graduated')
                    setFilter('Graduated')
                }}
                className={`w-1/5 relative items-center rounded-l-lg pl-4 pr-2 text-sm flex justify-center text-primary ${buttonState === 'Graduated' ? '  hover:' : ''}`}
            >
                <span className={`text-[11px] leading-none`}>Graduated</span>
                {/*<span className={` rounded-full p-1 flex items-center w-auto ml-1`}><GraduationCap size={12} className={``} /></span>*/}
            </button>
            <button
                type="button"
                onClick={() => {
                    setButtonState('Inactive')
                    setFilter('Not')
                }}
                className={`w-1/5 relative items-center rounded-r-lg pl-4 pr-2 text-sm flex justify-center text-primary ${buttonState === 'Inactive' ? '  ' : ''}`}
            >
                <span className={`text-[11px] leading-none`}>Inactive</span>
                {/*<span className={` rounded-full p-1 flex items-center justify-center w-auto ml-1`}><ProhibitInset size={14} className={``} /></span>*/}
            </button>

        </div>
    )
}
