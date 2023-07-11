import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl";
import MainLayout from "../layouts/MainLayout";
import { NavigatePage } from "../helpers/interfaces";
import Landing from "../components/Pages/Landing";
import StartSelling from "../components/Pages/StartSelling";




const Trasfer: FunctionComponent = () => {
  const [navigatePage, setNavigatePage] = useState<NavigatePage>(NavigatePage.Landing);
  
  const onSetNavigatePage = function (page) {
    setNavigatePage(page);
  };

  return (
    <MainLayout>
      {navigatePage == NavigatePage.Landing && <Landing OnSetNavigatePage={onSetNavigatePage}></Landing>}
      {navigatePage == NavigatePage.StartSelling && <StartSelling OnSetNavigatePage={onSetNavigatePage}></StartSelling>}
    </MainLayout>
  );
};

export default Trasfer;
