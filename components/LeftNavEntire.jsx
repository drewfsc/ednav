import React from 'react';
import NavLeftWithIcons from "./nav-left-with-icons";

export default function LeftNavEntire() {
    return (
        <div className={`h-screen flex-shrink-0 bg-base-200`}>
            <div className=" text-5xl p-4 border-b border-base-300 flex items-center">
                <div>
                    <div>
                        <span className={`text-base-content/50 font-light`}>ED</span><span
                        className={`text-secondary font-bold italic`}>NAV</span>
                    </div>
                    <div className={`text-lg -mt-1 text-base-content/60`}>SUCCESS TRACKER</div>
                </div>
            </div>
            <NavLeftWithIcons/>
        </div>
    );
}
