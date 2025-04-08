import React from "react";
import { SignIn } from "@/components/auth-components";
// import {NavigatorsProvider} from "@/contexts/NavigatorsContext";
// import {ClientsProvider} from "@/contexts/ClientsContext";
// import {FepsProvider} from "@/contexts/FepsContext";

export default function HomePage({ children }) {
  return (
    // <NavigatorsProvider>
    //     <ClientsProvider>
    //         <FepsProvider>
    <div>
      <SignIn />
      {children}
    </div>
    //         </FepsProvider>
    //     </ClientsProvider>
    // </NavigatorsProvider>
  );
}
