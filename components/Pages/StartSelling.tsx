import { PropsWithRef, useEffect, useState } from "react"
import { AppBase, IOnSetNavigatePage, NavigatePage } from "../../helpers/interfaces"
import * as fcl from "@onflow/fcl";
import SelectCryptoModal from "../SelectCryptoModal";
import SelectFiatModal from "../SelectFiatModal";
import OpenOTPModal from "../OpenOTPModal";
import { Button, Input } from "antd";
import { CurrencyListItem } from "../../hooks/useCurrencyList";
import { UserToken } from "../../hooks/useUserTokenList";
import { faArrowRight, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useQuote from "../../hooks/useQuote";
import getSymbolFromCurrency from "currency-symbol-map";

type Props = {
  cryptoAmount: number,
  fiatAmount: number,
  crypto: UserToken,
  fiatCurrency: CurrencyListItem,
  onSetNavigatePage?: IOnSetNavigatePage
}

export default function StartSelling({...props}:PropsWithRef<Props>) {
  const [user, setUser] = useState({loggedIn: null, addr: null});
  const [chevron, setChevron] = useState(faChevronDown);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const quote = useQuote({
    fiatCurrency: props.fiatCurrency.id,
    cryptoSymbol: props.crypto.symbol,
    cryptoAmount: props.cryptoAmount
  })
  
  useEffect(() => { 
    //Check Authentication
    fcl.currentUser.subscribe(setUser);
    setCurrencySymbol(getSymbolFromCurrency(props.fiatCurrency.id.toUpperCase()));
  }, []);

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

  return (
    <>  
      {quote &&
        <>
          <div className="w-100 grow mx-3 mb-3">
            <label className="text-xs text-gray-600">Connected Wallet to {props.crypto.symbol}</label>
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
                    id="cryptoAmount"
                    value={props.cryptoAmount}
                    // onChange={(e) => handleValueChanged(e, e.target.value)}
                    className="border-none bg-transparent hover:border-none focus:border-none"
                  />
                </div>
              </div>
              <div className="col-span-2 flex">
                <div className="w-100 m-auto grow ">
                  <SelectCryptoModal
                    items={[props.crypto]}
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
                    value={props.fiatAmount}
                    className="border-none bg-transparent hover:border-none focus:border-none"
                  />
                </div>
              </div>
              <div className="col-span-2 flex">
                <div className="w-100 m-auto grow ">
                <SelectFiatModal
                    items={[props.fiatCurrency]}
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
              <div className="text-lg font-bold">{Number(props.cryptoAmount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})} {props.crypto.symbol.toUpperCase()} @ {currencySymbol}{Number(quote.conversionRate).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}</div>
              <div>{props.crypto.symbol} {Number(quote.fiatAmount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}</div>
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
          <OpenOTPModal onOtpVerified={(email) => handleNext(email)}/>
        </>
      }
    </>
  )
}