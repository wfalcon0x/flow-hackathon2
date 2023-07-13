import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl";
import MainLayout from "../layouts/MainLayout";
import { AppBase, NavigatePage } from "../helpers/interfaces";
import Landing from "../components/Pages/Landing";
import StartSelling from "../components/Pages/StartSelling";
import PayGlideAddRecipientCard from "../components/Pages/PayGlideAddRecipientCard";
import PayGlideAddRecipientInfo from "../components/Pages/PayGlideAddRecipientInfo";
import PayGlideConnectedRecipient from "../components/Pages/PayGlideConnectedRecipient";
import useQuote from "../hooks/useQuote";

const Trasfer: FunctionComponent = () => {
  const [navigatePage, setNavigatePage] = useState<NavigatePage>(NavigatePage.Landing);
  const [appBase, setAppBase] = useState<AppBase>();
  const onSetNavigatePageHandler = function (page, appBaseData) {
    setNavigatePage(page);
    setAppBase({
      ...appBase,
      ...appBaseData
    });
  };


  useEffect(() => { 
    console.log(appBase);
  }, [appBase]);


  return (
    <MainLayout>
      {navigatePage == NavigatePage.Landing && (
        <Landing 
          appData={appBase}
          onSetNavigatePage={onSetNavigatePageHandler}
          ></Landing>
      )}
      {navigatePage == NavigatePage.PayGlideConnectedRecipient && (
        <PayGlideConnectedRecipient
          appData={appBase}
          onSetNavigatePage={onSetNavigatePageHandler}
        ></PayGlideConnectedRecipient>
      )}
      {navigatePage == NavigatePage.PayGlideAddRecipientCard && (
        <PayGlideAddRecipientCard
          appData={appBase}
          onSetNavigatePage={onSetNavigatePageHandler}
        ></PayGlideAddRecipientCard>
      )}
      {navigatePage == NavigatePage.PayGlideAddRecipientInfo && (
        <PayGlideAddRecipientInfo
          appData={appBase}
          onSetNavigatePage={onSetNavigatePageHandler}
        ></PayGlideAddRecipientInfo>
      )}
    </MainLayout>
  );
};

export default Trasfer;
