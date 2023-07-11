import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl";
import MainLayout from "../layouts/MainLayout";
import { AppBase, NavigatePage } from "../helpers/interfaces";
import Landing from "../components/Pages/Landing";
import StartSelling from "../components/Pages/StartSelling";




const Trasfer: FunctionComponent = () => {
  const [navigatePage, setNavigatePage] = useState<NavigatePage>(NavigatePage.Landing);
  const [appBase, setAppBase] = useState<AppBase>();

  const onSetNavigatePageHandler = function (page) {
    setNavigatePage(page);
  };

  const onCyptoInfoSelectedHandler = function (selectedCrypto, cryptoAmount, selectedFiat) {
    setAppBase((prevState) => ({
      ...prevState,
      currentCrypto: selectedCrypto,
      currentFiatCurrency: selectedFiat,
      currentCryptoAmount: cryptoAmount
    }));
  };

  return (
    <MainLayout>
      {navigatePage == NavigatePage.Landing && (
        <Landing 
          OnSetNavigatePage={onSetNavigatePageHandler}
          OnCyptoInfoSelected={onCyptoInfoSelectedHandler}
        ></Landing>
      )}
      {navigatePage == NavigatePage.StartSelling && (
        <StartSelling
          CryptoAmount={appBase.currentCryptoAmount}
          Crypto={appBase.currentCrypto}
          FiatCurrency={appBase.currentFiatCurrency}
          OnSetNavigatePage={onSetNavigatePageHandler}
        ></StartSelling>
      )}
    </MainLayout>
  );
};

export default Trasfer;
