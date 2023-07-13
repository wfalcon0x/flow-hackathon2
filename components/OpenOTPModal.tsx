import { Button, InputRef } from 'antd'
import React, { PropsWithRef, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import LoginHeroImage from './UI/LoginHeroImage'
import { Input } from "antd";
import Footer from './UI/Footer'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import OtpField from './UI/OtpField'

type Props = {
  onOtpVerified?: any
}

export default function OpenOTPModal({...props}:PropsWithRef<Props>) {
  const supabaseClient = useSupabaseClient()
  const [showModal, setShowModal] = useState(false)
  const modal = useRef<HTMLDivElement>()
  const emailInput = useRef<InputRef>()
  const selectModal = useRef<HTMLDivElement>()
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('')
  const [codeTimer, setCodeTimer] = useState(60)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (codeTimer === 0) {
        return;

    } else {
        if (showOtpInput) {
            setTimeout(() => {
                setCodeTimer(codeTimer - 1);
            }, 1000);
        }
    }
  }, [codeTimer, showOtpInput]);

  const handleLoginWithOtp = async (email: string) => {
      try {
          const { error } = await supabaseClient.auth.signInWithOtp({ email })
          if (error) throw error
          setShowOtpInput(true)
          setLoginError('')
      } catch (err) {
          const error = err as Error
          setLoginError(error.message)
      }
  }

  const verifyToken = async (token: string) => {
      try {
          setLoading(true)
          const { error: magicLinkError } = await supabaseClient.auth.verifyOtp({
              email,
              token,
              type: 'magiclink'
          })
          if (magicLinkError) {
              const { error: verifyError } = await supabaseClient.auth.verifyOtp({
                  email,
                  token,
                  type: 'signup'
              })
              if (verifyError) throw verifyError
          }
          handleOtpVerified()

      } catch (err) {
          const error = err as Error
          setLoginError(error.message)
          setToken('')
          setLoading(false)
      }
  }

  const setTokenAndVerify = async (token: string) => {
      setToken(token)
      if (token && token.length === 6) {
          verifyToken(token)
      }
  }
  
  const showModalHandler = function(e){
    if(showModal){
      selectModal.current.append(modal.current)
    }
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    selectModal.current.append(modal.current)
    setShowModal(false)
    setShowOtpInput(false)
  }

  const handleOtpVerified = () => {
    selectModal.current.append(modal.current)
    setShowModal(false)
    setShowOtpInput(false)
    props.onOtpVerified(email)
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
          <div className="">
            <div className={``}> 
              <LoginHeroImage/>
            </div>

            <Button type="ghost" className='absolute top-1 right-1 text-white' onClick={handleCancel}><FontAwesomeIcon size='2x' icon={faXmark}/></Button>
            {!showOtpInput?
            <div className='ml-5 mr-5'>
              <div className="absolute top-[357px] text-gray-500 text-[14px] font-light">
                Enter email address
              </div>
              <Input
                ref={emailInput}
                className="rounded-full gradient-border-hover gradient-border-focus focus:border-none bg-gray-100 border-gray-200 top-[384px] h-[48px]"
                style={{fontSize: "14px"}}
                type="email"
                placeholder="john.doe@email.com"
                required
                autoFocus
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              {loginError && <p className='mx-5 text-xs otpError'>{loginError}</p>}
              <div className="absolute bottom-20 right-3  flex justify-end w-full px-3 md-5 ">
                <Button className="gradient text-white font-bold rounded-full flex gap-2 items-center h-[48px] hover-white"
                  onClick={() => handleLoginWithOtp(email)}
                  disabled={!email}
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
            </div>
            :
            <div className='absolute top-[320px] w-full'>
              <p className='text-[18px] m-3 pl-3'>Verification Code</p>
              <p className='text-gray-500 text-[14px] font-light m-3 pl-3' style={{ paddingRight: 10 }}>Please enter the verification code sent to {email}</p>
              <div className='m-5 mb-0'>
                  <OtpField
                      value={token}
                      onChange={setTokenAndVerify}
                      numInputs={6}
                      onChangeRegex={/^([0-9]{0,})$/}
                      autoFocus
                      classNames='flex w-full justify-between font-bold text-xl'
                      separator={<span></span>}
                      isTypeNumber
                      inputProps={{disabled: false }}
                  />
              </div>
              {loginError && <p className='mx-5 text-xs otpError'>{loginError}</p>}
              <div className='flex w-full justify-end'>
                  <Button
                      className='border-none bg-white shadow-none disabled:bg-white'
                      onClick={() => {
                          handleLoginWithOtp(email)
                          setCodeTimer(60)
                      }}
                      disabled={codeTimer > 0}
                  >
                    {codeTimer == 0 ? 
                      <span className='gradient-text underline text-end mx-2 text-xs bg-white '>
                        Resend Code
                      </span>
                      : 
                      <span className='gradient-text text-end mx-2 text-xs bg-white'>
                        {codeTimer + ' s'}
                      </span>
                      }
                  </Button>
              </div>
            </div>
            }
          </div>
          <Footer></Footer>
        </div>
      }
    </div>
  )
}