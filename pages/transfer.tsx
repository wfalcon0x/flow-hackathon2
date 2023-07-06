import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Input, Space, Select, Button, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCircle,
  faSquareFull,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import SelectCryptoModal from "../components/SelectCryptoModal";
import useTokenList, { TokenListItem } from "../hooks/useTokenList";
import useCurrencyList, { CurrencyListItem } from "../hooks/useCurrencyList";
import SelectFiatModal from "../components/SelectFiatModal";

export interface FeeBase {
  description: string;
  amount: number;
  currency: string;
}

export interface QuoteData {
  id: '3f5296bc-6640-64c2-9102-c86c6e8917ea',
  conversionRate: string,
  cryptoAmount: string,
  cryptoCurrency: string,
  fiatAmount: number,
  fiatCurrency: string,
  fees: {
    breakdowns: FeeBase[],
    total: FeeBase[]
  },
  createdAt: string,
  updatedAt: string,
  expiresAt: string,
}


const Trasfer: FunctionComponent = () => {
  const refreshRate = 20;
  const [selectedCrypto, setSelectedCrypto] = useState<TokenListItem>();
  const [selectedFiat, setSelectedFiat] = useState<CurrencyListItem>();
  const [quote, setQuote] = useState<QuoteData>();
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [fiatAmount, setFiatAmount] = useState(0);
  const [countDown, setCountDown] = useState(refreshRate);
  const [chevron, setChevron] = useState(faChevronUp);
  const {tokenList} = useTokenList();
  const {currencyList} = useCurrencyList();

  const callAPI = async () => {
    try {
      const res = await fetch("/api/offramp/quote?fiatCurrency={selectedFiat.id.toUpperCase()}&cryptoCurrency={selectedCrypto.symbol}&cryptoAmount={cryptoAmount}");
      const data = await res.json();
      setQuote({...data});
      setFiatAmount(quote.fiatAmount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAPI();
  }, [selectedFiat, selectedCrypto]);

  useEffect(() => {
    const timer = setTimeout(function () {
      if (countDown > 0) {
        setCountDown(countDown - 1);
      } else {
        callAPI();
        setCountDown(refreshRate);
      }
    }, 1000);

    return () => {
      // this should work flawlessly besides some milliseconds lost here and there
      clearTimeout(timer);
    };
  }, [countDown]);

  const toggleSummary = function (e) {
    if (chevron == faChevronUp) {
      setChevron(faChevronDown);
    } else {
      setChevron(faChevronUp);
    }
  };

  const handleValueChanged = function (
    e: ChangeEvent<HTMLInputElement>,
    value
  ) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.id == "cryptoAmount") {
        setCryptoAmount(value);
      }
    }
  };

  const onCryptoSelected = function (e, value) {
    setSelectedCrypto(value);
  };

  const onFiatSelected = function (e, value) {
    setSelectedFiat(value);
  };

  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);

  return (
    <MainLayout>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
            <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-default">You pay</label>
              <Input
                id="cryptoAmount"
                value={cryptoAmount}
                onChange={(e) => handleValueChanged(e, e.target.value)}
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <SelectCryptoModal
                items={tokenList}
                onCryptoSelected={onCryptoSelected}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
            <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-default">You get &asymp;</label>
              <Input
                readOnly={true}
                id="fiatAmount"
                value={fiatAmount}
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
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
          Quote refresh in {countDown} secs
        </span>
      </div>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl text-xs text-default">
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
        { quote &&
          <div className="flex justify-between">
            <div className="">{cryptoAmount} {selectedCrypto.symbol.toUpperCase()} @ {quote.conversionRate}</div>
            <div>{fiatAmount}</div>
          </div>
        }
        <hr className="h-1 my-1 border-gray-500" />
        {chevron == faChevronUp && (
          <div>
            <div className="flex justify-between">
              <span>Network Fee</span>
              <span>
                {quote &&
                  <>{quote.fees.breakdowns.find(i => i.description == 'Network Fee').amount}</>
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee</span>
              <span>
                {quote &&
                  <>{quote.fees.breakdowns.find(i => i.description == 'Processing Fee').amount}</>
                }
              </span>
            </div>
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
        >
          Sell Now
        </Button>
      </div>
    </MainLayout>
  );
};

export default Trasfer;
