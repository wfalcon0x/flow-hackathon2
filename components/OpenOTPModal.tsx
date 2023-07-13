import { Button, InputRef } from 'antd'
import React, { PropsWithRef, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import LoginHeroImage from './UI/LoginHeroImage'
import EmailInput from './UI/EmailInput'
import NextButton from './UI/NextButton'
import Footer from './UI/Footer'
import { randEmail } from '@ngneat/falso'

type Props = {
  onOtpVerified?: Function
}

export default function OpenOTPModal({...props}:PropsWithRef<Props>) {
  const [showModal, setShowModal] = useState(false)
  const modal = useRef<HTMLDivElement>()
  const emailInput = useRef<InputRef>()
  const selectModal = useRef<HTMLDivElement>()
  
  const showModalHandler = function(e){
    if(showModal){
      selectModal.current.append(modal.current)
    }
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    selectModal.current.append(modal.current)
    setShowModal(false);
  }

  const handleOtpVerified = () => {
    console.log("onOtpVerified1");
    if(emailInput.current.input.value){
      selectModal.current.append(modal.current)
      console.log("onOtpVerified2"+ emailInput.current.input.value);
      props.onOtpVerified(emailInput.current.input.value)
      setShowModal(false);
    }
    else{
      emailInput.current.input.focus();
    }
  }

  useEffect(() => {
    if(showModal){
      if (typeof document !== 'undefined') {
        const element = document.getElementById("main-app-container")
        element.append(modal.current)
      }
    }
  }, [showModal])

  return (
    <div ref={selectModal}>
      <div className="sticky bottom-0 mx-3">
        <Button
          block
          type="primary"
          className="font-bold rounded-full uppercase h-[48px] flex gap-2 justify-center items-center"
          onClick={e => showModalHandler(e)}
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
      {showModal &&
        <div key="modal" className={`absolute overflow-auto bg-white top-0 left-0 w-full h-full z-50 mb-7 rounded-2xl`}
          ref={modal}
        >
          <div className="p-3">
          <div className={``}> 
            <LoginHeroImage/>
          </div>

          <Button type="ghost" className='absolute top-1 right-3 text-white' onClick={handleCancel}><FontAwesomeIcon size='2x' icon={faXmark}/></Button>
          <EmailInput inputRef={emailInput}/>
          <NextButton onClickNext={() => handleOtpVerified()}/>
          </div>
          <Footer></Footer>
        </div>
      }
    </div>
  )
}