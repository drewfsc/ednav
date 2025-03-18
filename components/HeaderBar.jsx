import React from 'react';
import SignOutBtn from "./../components/signout-button";

export default function HeaderBar() {

    return (
        <div className={` h-30 text-primary-content bg-primary/60 backdrop-blur-sm`}>
          <SignOutBtn/>
        </div>
    );
}
