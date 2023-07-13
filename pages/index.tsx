import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl";
import MainLayout from "../layouts/MainLayout";
import { AppBase, NavigatePage } from "../helpers/interfaces";
import Landing from "../components/Pages/Landing";
import StartSelling from "../components/Pages/StartSelling";
import PayGlideAddRecipientCard from "../components/Pages/PayGlideAddRecipientCard";
import PayGlideAddRecipientInfo from "../components/Pages/PayGlideAddRecipientInfo";
import PayGlideConnectedRecipient from "../components/Pages/PayGlideConnectedRecipient";

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
          onSetNavigatePage={onSetNavigatePageHandler}
        ></Landing>
      )}
      {navigatePage == NavigatePage.StartSelling && (
        <StartSelling
          fiatAmount={appBase.currentFiatAmount}
          cryptoAmount={appBase.currentCryptoAmount}
          crypto={appBase.currentCrypto}
          fiatCurrency={appBase.currentFiatCurrency}
          onSetNavigatePage={onSetNavigatePageHandler}
        ></StartSelling>
      )}
      {navigatePage == NavigatePage.PayGlideConnectedRecipient && (
        <PayGlideConnectedRecipient appData={appBase}></PayGlideConnectedRecipient>
      )}
      {navigatePage == NavigatePage.PayGlideAddRecipientCard && (
        <PayGlideAddRecipientCard></PayGlideAddRecipientCard>
      )}
      {navigatePage == NavigatePage.PayGlideAddRecipientInfo && (
        <PayGlideAddRecipientInfo></PayGlideAddRecipientInfo>
      )}
      
    </MainLayout>
  );
};

export default Trasfer;
