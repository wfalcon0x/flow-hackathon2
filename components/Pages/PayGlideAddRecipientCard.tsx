import { ChangeEvent, PropsWithRef, useEffect, useState } from "react"
import { IOnSetNavigatePage, NavigatePage } from "../../helpers/interfaces"
import * as fcl from "@onflow/fcl";
import { Button, Input } from "antd";

type Props = {
  OnSetNavigatePage?: IOnSetNavigatePage
}

export default function PayGlideAddRecipientCard({...props}:PropsWithRef<Props>) {
  const [user, setUser] = useState({loggedIn: null});
  const [creditCardVal, setCreditCardVal] = useState("");

  useEffect(() => { 
    //Check Authentication
    fcl.currentUser.subscribe(setUser);

    //Create Random Card Data
    setCreditCardVal((Math.floor(1000000000000000 + Math.random() * 9000000000000000)).toString());
  }, []);

  const creditCardFormat = function (value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];
  
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
  
    return parts.length > 1 ? parts.join(" ") : value;
  }

  const handleValueChanged = function (
    e: ChangeEvent<HTMLInputElement>
  ) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value.replaceAll(" ", ""))) {
      console.log([1, e.target.value]);
      setCreditCardVal(e.target.value);
    }
    else{
      console.log([2, e.target.value]);
    }
  };

  return (
    <>
      <div className="w-100 grow mx-3 mb-3 mt-3">
        <div className="font-bold text-xl">Enter recipients card info</div>
        <div className="text-primary text-sm mb-6">you can send to VISA  debit cards</div>
        <div className="text-primary text-sm">Recipient debit card number</div>
        <Input className="border-solid rounded-full gradient-border text-center"
          placeholder="xxxx - xxxx - xxxx - xxxx"
          value={creditCardFormat(creditCardVal)}
          onChange={(e) => handleValueChanged(e)}/>
      </div>
      <div className="absolute bottom-3 flex justify-between w-full px-3">
        <Button className="text-primary border-none font-bold" >Back</Button>
        <Button className="gradient text-white font-bold rounded-full flex gap-2 items-center p-5">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" fill="none"><path fill="#fff" d="M23.959 5.992a.919.919 0 0 0-.27-.65L19.126.78a.925.925 0 0 0-1.3 0 .925.925 0 0 0 0 1.3l3.005 3.005H.963a.927.927 0 0 0-.92.92c0 .502.417.92.92.92h19.856l-2.993 2.992a.925.925 0 0 0 0 1.3.91.91 0 0 0 .65.27.91.91 0 0 0 .65-.27l4.55-4.55a.96.96 0 0 0 .209-.319c0-.012 0-.025.012-.037a.98.98 0 0 0 .062-.319Z"/></svg>
        </Button>
      </div>
    </>
  )
}