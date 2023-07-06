import { FunctionComponent, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Input, Space, Select, Button, InputNumber } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCircle, faSquareFull } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import SelectCryptoModal from "../components/SelectCryptoModal";
import useTokenList, { TokenListItem } from '../hooks/useTokenList'

export interface ResultProps{
  networkFee: number;
  processingFee: number;
  withdrawalMethod: string;
}

const Trasfer: FunctionComponent = () => {
  const refreshRate = 20;
  const [selectedCrypto, setSelectedCrypto] = useState<TokenListItem>();
  const [quote, setQuote] = useState();
  const [amount, setAmount] = useState(0);
  const [fiatAmount, setfiatAmount] = useState(0);
  const [countDown, setCountDown] = useState(refreshRate);
  const [chevron, setChevron]  = useState(faChevronUp);
  const [resultProps, setResultProps]  = useState<ResultProps>();
  const { tokenList } = useTokenList();

  const callAPI = async () => {
		try {
			const res = await fetch('/api/offramp/quote');
			const data = await res.json();
			setQuote(data);
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(() => {
    // const result: ResultProps;
    
  }, [quote]);

  useEffect(() => {
    const timer = setTimeout(function() {
      if(countDown > 0){
        setCountDown(countDown - 1);
      }
      else{
        callAPI();
        setCountDown(refreshRate);
      }
    }, 1000)

    return () => { // this should work flawlessly besides some milliseconds lost here and there 
       clearTimeout(timer)
    }
  }, [countDown]);


  const toggleSummary = function(e) {
    if(chevron == faChevronUp){
      setChevron(faChevronDown);
    }
    else{
      setChevron(faChevronUp);
    }
  };

  const showFiatModal = function(e) {

  }

  const handleValueChanged = function(e, value){
    setfiatAmount(value);
  }
  
  const onCryptoSelected = function(e, value){
    setSelectedCrypto(value);
  }

  return (
   <MainLayout>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
            <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-default">You pay</label>
              <Input id="amount" value={amount} onChange={e => handleValueChanged(e, e.target.value)}
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <SelectCryptoModal items={tokenList} onCryptoSelected={onCryptoSelected}/>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
            <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-default">You get &asymp;</label>
              <Input id="fiatAmount" value={fiatAmount} onChange={e => handleValueChanged(e, e.target.value)}
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <Button onClick={e => showFiatModal(e)} className="rounded-xl min-w-full bg-gray-50 flex justify-between items-center"  style={{ background: "white"}}>
                <span></span>
                <FontAwesomeIcon size="xs" icon={faChevronDown}/>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-end mx-3 text-xs">
        <FontAwesomeIcon className="text-[#eb98fd]" icon={faClock}/>
        <span className='gradient-text'> Quote refresh in {countDown} secs</span>
      </div>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl text-xs text-default">
        <div className="flex justify-between items-center">
        <span className="font-bold">Summary</span> <Button className="border-none text-sm" size="small" onClick={(e) => toggleSummary(e)}><FontAwesomeIcon size="xs" icon={chevron}/></Button>
        </div>
        <hr className="h-1 my-1 border-gray-500"/>
        { chevron == faChevronUp && 
          <div>
            <div className="flex justify-between">
              <span>Network Fee</span><span></span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee</span><span></span>
            </div>
            <div className="flex justify-between">
              <span>Withdrawal Method</span><span></span>
            </div>
          </div>
        }
      </div>
      <div className="mx-3">
        <Button block type="primary" className='font-bold rounded-xl'>SELL NOW</Button>
      </div>

   </MainLayout>
  );
};

export default Trasfer;
