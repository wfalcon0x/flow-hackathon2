import { PropsWithRef, useEffect, useState } from "react"
import { randFirstName, randLastName, randAddress, randPhoneNumber } from '@ngneat/falso';
import { AppBase, IOnSetNavigatePage, NavigatePage, RecipientInfo } from "../../helpers/interfaces"
import * as fcl from "@onflow/fcl";
import { Button, Input } from "antd";

type Props = {
  appData: AppBase,
  onSetNavigatePage?: IOnSetNavigatePage
}

export default function PayGlideAddRecipientInfo({...props}:PropsWithRef<Props>) {
  const [user, setUser] = useState({loggedIn: null});
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>();

  useEffect(() => { 
    //Check Authentication
    fcl.currentUser.subscribe(setUser);
    const address = randAddress();
    setRecipientInfo({
      city: address.city,
      state: address.country,
      firstName: randFirstName(),
      lastName: randLastName(),
      phone: randPhoneNumber() 
    })
  }, []);

  const handlePrev = () => {
    props.onSetNavigatePage(NavigatePage.PayGlideAddRecipientCard, props.appData);
  }

  const handleNext = () => {
    console.log("gotolanding");
    console.log(
      {
        ...props.appData,
        recipientName: recipientInfo.firstName + " " + recipientInfo.lastName
      }
    );
    props.onSetNavigatePage(NavigatePage.Landing, {
      ...props.appData,
      recipientName: recipientInfo.firstName + " " + recipientInfo.lastName
    });
  }


  return (
    <>
      <div className="w-100 grow mx-3 mb-3 mt-3">
        <div className="font-bold text-[18px] font-outfit">Add contact&apos;s info</div>
        <label className="text-xs text-gray-600 font-outfit">First Name</label>
        <Input
          className="rounded-full gradient-border-hover gradient-border-focus focus:border-none bg-gray-100 border-gray-200 mb-3 h-[48px]"
          style={{fontSize: "14px"}}
          value={recipientInfo ? recipientInfo.firstName : ""}
        />
        <label className="text-xs text-gray-600 font-outfit">Last Name</label>
        <Input
          className="rounded-full gradient-border-hover gradient-border-focus focus:border-none bg-gray-100 border-gray-200 mb-3 h-[48px]"
          style={{fontSize: "14px"}}
          value={recipientInfo ? recipientInfo.lastName : ""}
        />
        <label className="text-xs text-gray-600 font-outfit">City</label>
        <Input
          className="rounded-full gradient-border-hover gradient-border-focus focus:border-none bg-gray-100 border-gray-200 mb-3 h-[48px] "
          style={{fontSize: "14px"}}
          value={recipientInfo ? recipientInfo.city : ""}
        />
        <label className="text-xs text-gray-600 font-outfit">State</label>
        <Input
          className="rounded-full gradient-border-hover gradient-border-focus focus:border-none bg-gray-100 border-gray-200 mb-3 h-[48px]"
          style={{fontSize: "14px"}}
          value={recipientInfo ? recipientInfo.state : ""}
        />
        <label className="text-xs text-gray-600 font-outfit">Phone</label>
        <Input
          className="rounded-full gradient-border-hover gradient-border-focus focus:border-none bg-gray-100 border-gray-200 mb-3 h-[48px]"
          style={{fontSize: "14px"}}
          value={recipientInfo ? recipientInfo.phone : ""}
        />
      </div>
      <div className="sticky bottom-0 px-3 flex justify-between">
        <Button
          className="text-primary border-none font-bold h-[48px] bg-white rounded-full opacity-70"
          onClick={() => handlePrev()}
        >
          Back
        </Button>
        <Button className="gradient text-white font-bold rounded-full flex gap-2 items-center h-[48px] hover-white"
          onClick={handleNext}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="12"
            fill="none"
          >
            <path
              fill="#fff"
              d="M23.959 5.992a.919.919 0 0 0-.27-.65L19.126.78a.925.925 0 0 0-1.3 0 .925.925 0 0 0 0 1.3l3.005 3.005H.963a.927.927 0 0 0-.92.92c0 .502.417.92.92.92h19.856l-2.993 2.992a.925.925 0 0 0 0 1.3.91.91 0 0 0 .65.27.91.91 0 0 0 .65-.27l4.55-4.55a.96.96 0 0 0 .209-.319c0-.012 0-.025.012-.037a.98.98 0 0 0 .062-.319Z"
            />
          </svg>
        </Button>
      </div>
    </>
  );
}