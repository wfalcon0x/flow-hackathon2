import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl";
import MainLayout from "../layouts/MainLayout";
import { AppBase, NavigatePage } from "../helpers/interfaces";
import Landing from "../components/Pages/Landing";
import StartSelling from "../components/Pages/StartSelling";
import PayGlideAddRecipientCard from "../components/Pages/PayGlideAddRecipientCard";
import PayGlideAddRecipientInfo from "../components/Pages/PayGlideAddRecipientInfo";

const Trasfer: FunctionComponent = () => {
  const [navigatePage, setNavigatePage] = useState<NavigatePage>(NavigatePage.Landing);
  const [appBase, setAppBase] = useState<AppBase>();

  const onSetNavigatePageHandler = function (page) {
    setNavigatePage(page);
  };

  const onCyptoInfoSelectedHandler = function (selectedCrypto, cryptoAmount, selectedFiat, fiatAmount) {
    setAppBase((prevState) => ({
      ...prevState,
      currentCrypto: selectedCrypto,
      currentFiatCurrency: selectedFiat,
      currentCryptoAmount: cryptoAmount,
      currentFiatAmount: fiatAmount
    }));
  };

  return (
    <MainLayout>
      {navigatePage == NavigatePage.Landing && (
        <Landing 
          onSetNavigatePage={onSetNavigatePageHandler}
          onCyptoInfoSelected={onCyptoInfoSelectedHandler}
        ></Landing>
      )}
      {navigatePage == NavigatePage.StartSelling && (
        <StartSelling
          FiatAmount={appBase.currentFiatAmount}
          CryptoAmount={appBase.currentCryptoAmount}
          Crypto={appBase.currentCrypto}
          FiatCurrency={appBase.currentFiatCurrency}
          onSetNavigatePage={onSetNavigatePageHandler}
        ></StartSelling>
      )}

      {/* <PayGlideAddRecipientInfo></PayGlideAddRecipientInfo> */}
    </MainLayout>
  );
};

export default Trasfer;
