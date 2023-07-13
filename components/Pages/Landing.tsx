import { ChangeEvent, PropsWithRef, useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl";
import MainLayout from "../../layouts/MainLayout";
import { Input, Space, Select, Button, InputNumber, InputRef } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCircle,
  faSquareFull,
} from "@fortawesome/free-regular-svg-icons";
import SelectCryptoModal from "../../components/SelectCryptoModal";
import useUserTokenList, { UserToken } from "../../hooks/useUserTokenList";
import useCurrencyList, { CurrencyListItem } from "../../hooks/useCurrencyList";
import SelectFiatModal from "../../components/SelectFiatModal";
import getSymbolFromCurrency from 'currency-symbol-map'
import useCurrentUser from "../../hooks/useCurrentUser";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { AppBase, IOnCryptoInfoSelected, IOnSetNavigatePage, NavigatePage, QuoteData } from "../../helpers/interfaces";
import OpenOTPModal from "../OpenOTPModal";

type Props = {
  appData: AppBase,
  onSetNavigatePage?: IOnSetNavigatePage
}

export default function Landing({...props}:PropsWithRef<Props>) {
  const refreshRate = 20;
  const [user, setUser] = useState({loggedIn: null, addr: null});
  const cryptoInput = useRef<InputRef>();
  const [selectedCrypto, setSelectedCrypto] = useState<UserToken>();
  const [selectedFiat, setSelectedFiat] = useState<CurrencyListItem>();
  const [quote, setQuote] = useState<QuoteData>();
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState(100);
  const [fiatAmount, setFiatAmount] = useState(0);
  const [counter, setCounter] = useState(refreshRate);
  const counterRef = useRef<number>();
  const [chevron, setChevron] = useState(faChevronUp);

  const {currencyList} = useCurrencyList();

  const callAPI = async () => {
    try {
      if(selectedFiat && selectedCrypto && cryptoAmount){
        const res = await fetch(`/api/offramp/quote?toFiat=${selectedFiat.id.toUpperCase()}&fromCrypto=${selectedCrypto.symbol}&cryptoAmount=${cryptoAmount}`);
        const data = await res.json();
        setQuote({...data});
        setFiatAmount(data.fiatAmount);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { 
    if(props.appData?.currentCryptoAmount){
      setCryptoAmount(props.appData?.currentCryptoAmount);
    }

    //Check Authentication
    fcl.currentUser.subscribe(setUser);
    //Start Timer
    const timer= setInterval(decreaseNum, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => { 
    if(!selectedCrypto){
      if(props.appData?.currentCrypto){
        setSelectedCrypto(props.appData?.currentCrypto);
      }
      else{
          setSelectedCrypto({
            id: "A.7e60df042a9c0868.FlowToken",
            logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.1654653399040a61.FlowToken/logo.svg",
            symbol: "FLOW",
            balance: ""
          });
      }
    }
  }, [props.appData?.currentCrypto]);

  useEffect(()=> {
    counterRef.current = counter;
    
    if(counterRef.current <= 0){
      console.log([selectedFiat, selectedCrypto, cryptoAmount]);
      callAPI();
    }
  }, [counter]);

  useEffect(() => {
    callAPI();
  }, [cryptoAmount]);

  useEffect(() => {
    callAPI();
  }, [selectedCrypto]);

  const decreaseNum = () => {
    if(counterRef.current <= 0){
      setCounter((prev) => refreshRate);
    }
    else{
      setCounter((prev) => prev - 1);
    }
  }

  const toggleSummary = function (e) {
    if (chevron == faChevronUp) {
      setChevron(faChevronDown);
    } else {
      setChevron(faChevronUp);
    }
  };

  const handleCryptoAmountValueChanged = function (
    e: ChangeEvent<HTMLInputElement>,
  ) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.id == "cryptoAmount") {
        console.log(Number(e.target.value));
        setCryptoAmount((prev) => Number(e.target.value));
      }
    }
  };

  const onOtpVerifiedHandler = (val) => {
    if(props && props.onSetNavigatePage){
      props.onSetNavigatePage(NavigatePage.Landing, {
        ...props.appData,
        user: user,
        currentCrypto: selectedCrypto,
        currentCryptoAmount: cryptoAmount,
        currentFiatCurrency: selectedFiat,
        currentFiatAmount: fiatAmount,
        recipientEmail: val
      });
    }
  }

  const handleAddRecipientCard = () => {
    if(props && props.onSetNavigatePage){
      props.onSetNavigatePage(NavigatePage.PayGlideAddRecipientCard, {
        ...props.appData,
        user: user,
        currentCrypto: selectedCrypto,
        currentCryptoAmount: cryptoAmount,
        currentFiatCurrency: selectedFiat,
        currentFiatAmount: fiatAmount,
      });
    }
  }

  const handleApprove = ()=> {
    if(props && props.onSetNavigatePage){
      props.onSetNavigatePage(NavigatePage.Landing);
    }
  }

  const onCryptoSelected = function (e, value) {
    setSelectedCrypto(value);
  };

  const onFiatSelected = function (e, value) {
    setSelectedFiat(value);
    if(value){
      setCurrencySymbol(getSymbolFromCurrency(value.id.toUpperCase()));
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
      { (user.addr && quote) && 
      <>
        <div className="w-100 grow m-3">
          <label className="text-xs text-gray-600">Connected Wallet to {quote.cryptoCurrency}</label>
          <div className="rounded-full w-full h-[48px] mx-auto bg-gradient-to-r p-[3px] from-[#eb98fd] to-[#6ab7ff]">
            <div className="flex font-[500] justify-normal items-center h-full bg-white rounded-full px-4 text-[14px] font-montreal">
              <div>
                {user ? user.addr : ""}
              </div>
            </div>
          </div>
        </div>
        { props.appData?.recipientName &&
          <div className="w-100 grow m-3">
          <label className="text-xs text-gray-600">Sending to {props.appData?.recipientName}</label>
          <div className="rounded-full w-full h-[48px] mx-auto bg-gradient-to-r p-[3px] from-[#eb98fd] to-[#6ab7ff]">
            <div className="flex font-[500] justify-normal items-center h-full bg-white rounded-full px-4 text-[14px] font-montreal">
              <div>
                {user ? user.addr : ""}
              </div>
            </div>
          </div>
        </div>
        }
      </>
      }
      <div className={"bg-gray-100 px-2 pb-2 align mx-3 mb-3 align-middle rounded-xl " + (!user.addr ? "mt-8" : "")}>
      {/* <div className="bg-gray-100 px-2 pb-2 align mx-3 mt-8 mb-3 align-middle rounded-xl"> */}
        <div className="grid grid-cols-12 gap-1">
          <div className="col-start-1 col-span-7 grid grid-cols-12">
            <div className="w-100 m-auto grow col-start-1 col-span-7">
              <label className="text-xs text-gray-600">You pay</label>
              <Input
                ref={cryptoInput}
                id="cryptoAmount"
                value={cryptoAmount}
                bordered={false}
                onChange={(e) => handleCryptoAmountValueChanged(e)}
                style={{padding: 0}}
                className="bg-transparent border-none focus:border-none overflow-visible"
              />
            </div>
            { (selectedCrypto?.balance || user.loggedIn) &&
              <div className="text-xs text-gray-600 align-bottom col-span-5 mt-auto mb-0 text-right overflow-visible">available {selectedCrypto?.balance ? Number(selectedCrypto?.balance).toFixed(2) : "0.00"}</div>
            }
          </div>
          <div className="col-span-5 flex">
            <div className="w-100 grow mb-2 mt-auto pl-2">
              <SelectCryptoModal
                default={selectedCrypto}
                onCryptoSelected={onCryptoSelected}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-2 pb-2 align mx-3 mb-6 align-middle rounded-xl">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-start-1 col-span-7 flex">
            <div className="w-100 m-auto grow">
              <label className="text-xs text-gray-600">You get &asymp;</label>
              <Input
                readOnly={true}
                id="fiatAmount"
                value={Number(fiatAmount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}
                style={{padding: 0}}
                className="bg-transparent border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-5 flex">
          <div className="w-100 grow mb-2 mt-auto">
              <SelectFiatModal
                items={currencyList}
                onFiatSelected={onFiatSelected}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-end mx-3 text-xs">
        <FontAwesomeIcon className="text-[#eb98fd]" icon={faClock} />
        <span className="gradient-text">
          {" "}
          Quote refresh in {counter} secs
        </span>
      </div>
      <div className="bg-gray-100 p-3 align mx-3 my-3 align-middle rounded-xl text-xs text-gray-600">
        <div className="flex justify-between items-center">
          <span className="font-outfit">Summary</span>{" "}
          <Button
            className="border-none text-sm"
            size="small"
            onClick={(e) => toggleSummary(e)}
          >
            <FontAwesomeIcon size="xs" icon={chevron} />
          </Button>
        </div>
        { quote &&
          <div className="flex justify-between items-center text-base font-montreal">
            <div className="text-black text-base">
              {Number(cryptoAmount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})} {selectedCrypto?.symbol.toUpperCase()} @ {currencySymbol}{Number(quote.conversionRate).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}
            </div>
            <div className="text-sm">
              {currencySymbol} {Number(fiatAmount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}
            </div>
          </div>
        }
        <hr className="h-1 my-1 border-gray-500" />
        {chevron == faChevronUp && (
          <div >
            {getBreakdowns && getBreakdowns().map((item) => 
              <div key={item.description.replace(" ", "_")} className="flex justify-between pb-2">
                <span>{item.description}</span>
                <span>{currencySymbol} {Number(item.amount).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:2})}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Withdrawal Method</span>
              <span>VISA Direct</span>
            </div>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 mx-3">
        { props.appData?.recipientEmail == null &&
          <>
            { user.loggedIn == null &&
              <Button
                block
                type="primary"
                className="font-bold rounded-full uppercase h-[48px]"
                onClick={() =>  fcl.logIn()}
              >
                Sell Now
              </Button>
            }
            { user.loggedIn &&
              <OpenOTPModal onOtpVerified={(email) => onOtpVerifiedHandler(email)}/>
            }
          </>
        }
        { (props.appData?.recipientEmail && !props.appData?.recipientName) &&
          <Button
            block
            type="primary"
            className="font-bold rounded-full uppercase h-[48px]"
            onClick={() => handleAddRecipientCard()}
          >
            Add Recipient Details
          </Button>
        }
        { (props.appData?.recipientEmail && props.appData?.recipientName) &&
            <Button
            block
            type="primary"
            className="font-bold rounded-full uppercase h-[48px]"
            onClick={() => handleApprove()}
          >
            Approve
          </Button>
        }
      </div>
    </>
  )
}