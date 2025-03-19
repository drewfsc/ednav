import {useState} from "react"

export default function ClientsAgeFilterGroup({setFilter}) {
  const [buttonState, setButtonState] = useState(null)
    return (
        <div className="flex rounded-lg divide-x divide-neutral-700 transition-all duration-300 bg-base-300">
      <button
          type="button"
          onClick={() => {
            setFilter(null)
            setButtonState(null)
          }}
          className={`flex-1/3 items-center rounded-l-lg px-3 py-1 text-xs leading-none text-base-content focus:z-10 hover:bg-base-200 ${buttonState === null ? 'bg-base-300 hover:bg-base-100 ' : ''}`}
      >
          <span className={`text-[11px]`}>All</span>
      </button>
      <button
          type="button"
          onClick={() => {
            setButtonState(false)
              setFilter(false)
          }}
          className={`flex-1/3 items-center px-3 py-3 text-xs leading-none  focus:z-10 hover:bg-gray-200 ${buttonState === false ? 'bg-gray-300 hover:bg-gray-200 ' : ''}`}
      >
          <span className={`text-[11px]`}>Adult</span>
      </button>
            <button
                type="button"
                onClick={() => {
                    setButtonState(true)
                    setFilter(true)
                }}
                className={`flex-1/3 items-center rounded-r-lg px-3 py-1 text-xs overflow-hidden focus:z-10 hover:bg-gray-200 ${buttonState === true ? 'bg-gray-300 hover:bg-gray-200 ' : ''}`}
            >
                <span className={`text-[11px]`}>Youth</span>
            </button>
    </div>
    )
}
