import { PropsWithRef, useEffect, useState } from "react"
import { IOnSetNavigatePage, NavigatePage } from "../../helpers/interfaces"
import * as fcl from "@onflow/fcl";
import SelectCryptoModal from "../SelectCryptoModal";
import SelectFiatModal from "../SelectFiatModal";
import { Input } from "antd";
import { CurrencyListItem } from "../../hooks/useCurrencyList";
import { UserToken } from "../../hooks/useUserTokenList";

type Props = {
  CryptoAmount: number,
  Crypto: UserToken,
  FiatCurrency: CurrencyListItem,
  OnSetNavigatePage?: IOnSetNavigatePage
}

export default function StartSelling({...props}:PropsWithRef<Props>) {
  const [user, setUser] = useState({loggedIn: null});
  
  useEffect(() => { 
    //Check Authentication
    fcl.currentUser.subscribe(setUser);
  }, []);


  const handleNext = () => {
    props.OnSetNavigatePage(NavigatePage.PayGlide);
  }

  return (
    <>
      <div className="bg-gray-200 opacity-90 p-3 align mx-3 my-6 align-middle rounded-xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-span-4 flex">
            <div className="w-100 m-auto grow mb-3">
              <label className="text-xs text-default">You pay</label>
              <Input
                id="cryptoAmount"
                value={props.CryptoAmount}
                // onChange={(e) => handleValueChanged(e, e.target.value)}
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
              <SelectCryptoModal
                items={[props.Crypto]}
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
                value={0}
                className="border-none bg-transparent hover:border-none focus:border-none"
              />
            </div>
          </div>
          <div className="col-span-2 flex">
            <div className="w-100 m-auto grow ">
            <SelectFiatModal
                items={[props.FiatCurrency]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}