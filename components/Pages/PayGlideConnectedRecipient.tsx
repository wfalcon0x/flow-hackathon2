import { PropsWithRef, useEffect, useState } from "react"
import { AppBase, IOnSetNavigatePage, NavigatePage } from "../../helpers/interfaces"
import * as fcl from "@onflow/fcl";
import { UserToken } from "../../hooks/useUserTokenList";
import { CurrencyListItem } from "../../hooks/useCurrencyList";
import useQuote from "../../hooks/useQuote";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import getSymbolFromCurrency from "currency-symbol-map";
import SelectCryptoModal from "../SelectCryptoModal";
import { Button, Input } from "antd";
import SelectFiatModal from "../SelectFiatModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  appData: AppBase,
  onSetNavigatePage?: IOnSetNavigatePage
}

export default function PayGlideConnectedRecipient({...props}:PropsWithRef<Props>) {
  const [user, setUser] = useState({loggedIn: null, addr: null});
  const [chevron, setChevron] = useState(faChevronDown);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const quote = useQuote(props.appData && {
    fiatCurrency: props.appData.currentFiatCurrency.id,
    cryptoSymbol: props.appData.currentCrypto.symbol,
    cryptoAmount: props.appData.currentCryptoAmount
  })
  
  useEffect(() => { 
    //Check Authentication
    fcl.currentUser.subscribe(setUser);
  }, []);

  useEffect(() => { 
    setCurrencySymbol(getSymbolFromCurrency(props.appData.currentFiatCurrency.id.toUpperCase()));
  }, [props]);

  const handleNext = (email) => {
    props.onSetNavigatePage(NavigatePage.PayGlideConnectedRecipient, {
      recipientEmail: email
    });
  }

  const toggleSummary = function (e) {
    if (chevron == faChevronUp) {
      setChevron(faChevronDown);
    } else {
      setChevron(faChevronUp);
    }
  };

  const getBreakdowns = function() { 
    if (quote && quote.fees && quote.fees.breakdowns && quote.fees.breakdowns.length > 0){
      return quote.fees.breakdowns;
    }
    else{
      return [];
    }
  };

  const handleAddRecipientInfo = () => {
    if(user.loggedIn){
      if(props && props.onSetNavigatePage){
        props.onSetNavigatePage(NavigatePage.PayGlideAddRecipientCard, props.appData);
      }
    }
    else{
      fcl.logIn();
    }
  }


  return (
    <>  
      {quote &&
        <>
          <div className="w-100 grow mx-3 mb-3">
            <label className="text-xs text-gray-600">Connected Wallet to {props.appData.currentCrypto.symbol}</label>
            <div className="rounded-full w-full h-10 mx-auto bg-gradient-to-r p-[3px] from-[#eb98fd] to-[#6ab7ff]">
              <div className="flex justify-normal items-center h-full bg-white rounded-full px-4 text-primary text-sm font-bold">
                <div>
                  {user ? user.addr : ""}
                </div>
              </div>
            </div>
            {/* <Input
              value={user ? user.addr : ""}
              className="bg-transparent rounded-full gradient-border"
            /> */}
          </div>
          <div className="bg-gray-100 p-3 align mx-3 my-6 align-middle rounded-xl">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-start-1 col-span-4 flex">
                <div className="w-100 m-auto grow mb-3">
                  <label className="text-xs text-gray-600">You pay</label>
                  <Input
                    readOnly={true}
                    id="cryptoAmount"
                    value={props.appData.currentCryptoAmount}
                    // onChange={(e) => handleValueChanged(e, e.target.value)}
                    className="border-none bg-transparent hover:border-none focus:border-none"
                  />
                </div>
              </div>
              <div className="col-span-2 flex">
                <div className="w-100 m-auto grow ">
                  <SelectCryptoModal
                    items={[props.appData.currentCrypto]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-3 align mx-3 my-6 align-middle rounded-xl">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-start-1 col-span-4 flex">
                <div className="w-100 m-auto grow mb-3">
                  <label className="text-xs text-gray-600">You get &asymp;</label>
                  <Input
                    readOnly={true}
                    id="fiatAmount"
                    value={props.appData.currentFiatAmount}
                    className="border-none bg-transparent hover:border-none focus:border-none"
                  />
                </div>
              </div>
              <div className="col-span-2 flex">
                <div className="w-100 m-auto grow ">
                <SelectFiatModal
                    items={[props.appData.currentFiatCurrency]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-3 align mx-3 my-6 align-middle rounded-xl text-xs text-gray-600">
            <div className="flex justify-between items-center">
              <span className="font-bold">Summary</span>{" "}
              <Button
                className="border-none text-sm"
                size="small"
                onClick={(e) => toggleSummary(e)}
              >
                <FontAwesomeIcon size="xs" icon={chevron} />
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold">{Number(props.appData.currentCryptoAmount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})} {props.appData.currentCrypto.symbol.toUpperCase()} @ {currencySymbol}{Number(quote.conversionRate).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}</div>
              <div>{props.appData.currentCrypto.symbol} {Number(quote.fiatAmount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}</div>
            </div>
            <hr className="h-1 my-1 border-gray-500" />
            {chevron == faChevronUp && (
              <div>
                {getBreakdowns && getBreakdowns().map((item) => 
                  <div key={item.description.replace(" ", "_")} className="flex justify-between">
                    <span>{item.description}</span>
                    <span>{currencySymbol} {item.amount.toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Withdrawal Method</span>
                  <span>VISA Direct</span>
                </div>
              </div>
            )}
          </div>
          <div className="mx-3">
          <Button
              block
              type="primary"
              className="font-bold rounded-full uppercase"
              onClick={() => handleAddRecipientInfo()}
            >
              Add Recipient Details
            </Button>
          </div>
        </>
      }
    </>
  )
}