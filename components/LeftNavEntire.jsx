import React from 'react';
import NavLeftWithIcons from "./nav-left-with-icons";

export default function LeftNavEntire() {
    return (
        <div className={`h-auto bg-primary m-4 rounded box-content p-3 flex flex-col justify-between`}>
            <div>
                <div className=" text-5xl border-b border-primary flex items-center">
                    <div className={`p-2`}>
                        <div>
                            <span className={`text-primary-content font-extralight`}>ED</span><span
                            className={`text-accent font-bold italic`}>NAV</span>
                        </div>
                        <div className={`text-[16px] text-primary-content`}>SUCCESS TRACKER</div>
                    </div>
                </div>
                <NavLeftWithIcons/>
            </div>
            {/*<div className={`w-auto text-right`}><ThemeSwitcher className="w-full block"/></div>*/}
        </div>
    );
}
