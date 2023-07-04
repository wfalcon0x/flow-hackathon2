import { FunctionComponent, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Input, Space, Select, Button, InputNumber } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCircle, faSquareFull } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Trasfer: FunctionComponent = () => {
  const refreshRate = 20;
  const [countDown, setCountDown] = useState(refreshRate);
  const [chevron, setChevron]  = useState(faChevronUp);

  useEffect(() => {
    const timer = setTimeout(function() {
      if(countDown > 0){
        setCountDown(countDown - 1);
      }
      else{
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



  return (
   <MainLayout>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
            <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-default">You pay</label>
              <Input
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <Select className="min-w-full bg-gray-50 opacity-100 rounded-xl align-middle"
                bordered={false}
                >
              </Select>
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
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <Select className="min-w-full bg-white opacity-100 rounded-xl align-middle"
                bordered={false}
                >
                
              </Select>
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
        <Button block type="primary" className="font-bold rounded-xl">SELL NOW</Button>
      </div>

   </MainLayout>
  );
};

export default Trasfer;
