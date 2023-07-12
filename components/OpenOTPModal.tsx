import { Button } from 'antd'
import React, { PropsWithRef, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import LoginHeroImage from './UI/LoginHeroImage'
import EmailInput from './UI/EmailInput'
import NextButton from './UI/NextButton'
import Footer from './UI/Footer'

type Props = {
  readonly?: boolean
  onOtpVerified?: Function
}

export default function OpenOTPModal({...props}:PropsWithRef<Props>) {
  const [showModal, setShowModal] = useState(false)
  const modal = useRef<HTMLDivElement>()
  const selectModal = useRef<HTMLDivElement>()
  
  const showModalHandler = function(e){
    if(!props.readonly){
      if(showModal){
        selectModal.current.append(modal.current)
      }
      setShowModal(!showModal)
    }
  }

  const handleCancel = () => {
    selectModal.current.append(modal.current)
    setShowModal(false);
  }

  const handleOtpVerified = () => {
    selectModal.current.append(modal.current)
    setShowModal(false);
    props.onOtpVerified()
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
      <div className="mx-3">
        <Button
          block
          type="primary"
          className="font-bold rounded-full uppercase"
          onClick={e => showModalHandler(e)}
        >
          Next <FontAwesomeIcon className="mx-3" icon={faArrowRight}/>
        </Button>
      </div>
      {showModal &&
        <div key="modal" className={`absolute overflow-auto bg-white top-0 left-0 w-full h-full z-50 p-3 mb-7 rounded-2xl`}
          ref={modal}
        >
          <div className={``}> 
            <LoginHeroImage/>
          </div>

          <Button type="ghost" className='absolute top-1 right-3 text-white' onClick={handleCancel}><FontAwesomeIcon size='2x' icon={faXmark}/></Button>
          <EmailInput/>
          <NextButton onClickNext={() => handleOtpVerified()}/>
          <Footer/>
        </div>
      }
    </div>
  )
}