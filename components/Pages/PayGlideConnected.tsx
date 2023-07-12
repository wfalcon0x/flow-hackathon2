import { PropsWithRef, useEffect, useState } from "react"
import { IOnSetNavigatePage, NavigatePage } from "../../helpers/interfaces"
import * as fcl from "@onflow/fcl";

type Props = {
  OnSetNavigatePage?: IOnSetNavigatePage
}

export default function PayGlideConnected({...props}:PropsWithRef<Props>) {
  const [user, setUser] = useState({loggedIn: null});

  useEffect(() => { 
    //Check Authentication
    fcl.currentUser.subscribe(setUser);
  }, []);

  return (
    <>  
     
    </>
  )
}