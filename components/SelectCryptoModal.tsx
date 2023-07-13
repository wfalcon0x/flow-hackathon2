import { Button, Input, Modal } from 'antd'
import React, { PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCross, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import useUserTokenList, { UserToken } from '../hooks/useUserTokenList'

export interface OnCryptoSelected{(
  e: React.MouseEventHandler<HTMLDivElement>,
  crypto: UserToken) : void
}

type data = {
  onCryptoSelected?: OnCryptoSelected
  default?: UserToken;
  readonly?: boolean;
}

export default function SelectCryptoModal({children, readonly = false, ...props} : PropsWithChildren<data>) {
  const [showModal, setShowModal] = useState(false);
  const {userTokenList} = useUserTokenList();
  const [selectedCrypto, setSelectedCrypto] = useState<UserToken>();
  const [displayingList, setDisplayingList] = useState<UserToken[]>();
  const modal = useRef<HTMLDivElement>();
  const selectModal = useRef<HTMLDivElement>();
  
  useEffect(() => {
    if(props?.default && props?.default != selectedCrypto){
      setSelectedCrypto(props?.default);
    }
  }, [props?.default]);
  


  useEffect(() => {
    console.log(userTokenList);
    setDisplayingList(userTokenList);
    if(props.onCryptoSelected){
      props.onCryptoSelected(null, selectedCrypto);
    }
  }, [userTokenList]);
  
  const showModalHandler = function(e){
    if(!readonly){
      if(showModal){
        selectModal.current.append(modal.current);  
      }
      setShowModal(!showModal);
    }
  }

  useEffect(() => {
    if(showModal){
      if (typeof document !== 'undefined') {
        const element = document.getElementById("main-app-container");
        element.append(modal.current);
      }
    }
  }, [showModal]);

  const handleSearch = (e, value) => {
    if(value){
      setDisplayingList(userTokenList.filter(i => i.id.toLowerCase().includes(value.toLowerCase()) || i.symbol.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
    }
    else{
      setDisplayingList(userTokenList);
    }
  };

  const handleCancel = () => {
    selectModal.current.append(modal.current);
    setShowModal(false);
  };

  const handleSelect = (e, item) => {
    setSelectedCrypto(item);
    props.onCryptoSelected(e, item);
    handleCancel();
  }

  return (
    <div ref={selectModal}>
      <Button onClick={e => showModalHandler(e)} className="rounded-xl min-w-full bg-gray-50 flex justify-between items-center"  style={{ background: "white"}}>
        <div>
          { selectedCrypto &&
            <div className='flex gap-1 items-center'>
            <div><img src={selectedCrypto.logo} className="w-4 h-4" /></div>
            <div className='max-w-[64px] overflow-hidden'>{selectedCrypto.symbol}</div>
            </div>
          }
        </div>
        <FontAwesomeIcon size="xs" icon={faChevronDown}/>
      </Button>
      {showModal &&
        <div key="modal" className={`absolute overflow-auto scrollbar-hide bg-white top-0 left-0 w-full h-full z-50 p-3 mb-7 rounded-2xl`}
          ref={modal}
        >
          <div className='mb-3'>
            <div className='text-center text-bold'>Select a Cryptocurrency</div>
          </div>
          <Button type="ghost" className='absolute top-1 right-3' onClick={handleCancel}><FontAwesomeIcon size='2x' icon={faXmark}/></Button>
          <Input
            className='mb-1 h-[48px] rounded-full'
            style={{fontSize: "14px"}}
            onChange={(e)=> handleSearch(e, e.target.value)}
            prefix={
              <FontAwesomeIcon icon={faMagnifyingGlass} color='gray'></FontAwesomeIcon>
            }
          />
          <div className='flex justify-start gap-1 py-1'>
            { userTokenList.find(i => i.symbol == 'FLOW') && 
              <div 
                onClick={(e) => handleSelect(e, userTokenList.find(i => i.symbol == 'FLOW'))}
                className='flex items-center gap-1 text-xs rounded-full bg-gray-200 py-1 px-2 hover:cursor-pointer'>
                <img 
                  className="w-2 h-2 rounded-full"
                  src={userTokenList.find(i => i.symbol == 'FLOW').logo}/>
                <span>Flow</span>
              </div>
            }
            { userTokenList.find(i => i.symbol == 'USDC') && 
              <div 
                onClick={(e) => handleSelect(e, userTokenList.find(i => i.symbol == 'USDC'))}
                className='flex items-center gap-1 text-xs rounded-full bg-gray-200 py-1 px-2 hover:cursor-pointer'>
                <img 
                  className="w-2 h-2 rounded-full"
                  src={userTokenList.find(i => i.symbol == 'USDC').logo}/>
                <span>USDC</span>
              </div>
            }
            { userTokenList.find(i => i.symbol == 'DUST') && 
            <div 
              onClick={(e) => handleSelect(e, userTokenList.find(i => i.symbol == 'DUST'))}
              className='flex items-center gap-1 text-xs rounded-full bg-gray-200 py-1 px-2 hover:cursor-pointer'>
              <img
                className="w-2 h-2 rounded-full"
                src={userTokenList.find(i => i.symbol == 'DUST').logo}/>
              <span>DUST</span>
            </div>
            }
            { userTokenList.find(i => i.symbol == 'LOPPY') && 
            <div 
              onClick={(e) => handleSelect(e, userTokenList.find(i => i.symbol == 'LOPPY'))}
              className='flex items-center gap-1 text-xs rounded-full bg-gray-200 py-1 px-2 hover:cursor-pointer'>
              <img
                className="w-2 h-2 rounded-full"
                src={userTokenList.find(i => i.symbol == 'LOPPY').logo}/>
              <span>LOPPY</span>
            </div>
            }
            { userTokenList.find(i => i.symbol == 'stFlow') && 
            <div 
              onClick={(e) => handleSelect(e, userTokenList.find(i => i.symbol == 'stFlow'))}
              className='flex items-center gap-1 text-xs rounded-full bg-gray-200 py-1 px-2 hover:cursor-pointer'>
              <img
                className="w-2 h-2 rounded-full"
                src={userTokenList.find(i => i.symbol == 'stFlow').logo}/>
              <span>stFlow</span>
            </div>
            }
          </div>
          <ul>
          {displayingList && displayingList.map((item) => 
            <li onClick={(e) => handleSelect(e, item)} key={item.id} className='w-full bg-gray-200 hover:bg-gray-400 px-3 py-2 my-2 rounded-xl text-sm text-default'>
              <div className='flex justify-between items-center'>
                <div className='flex justify-items-start gap-2 items-center'><img src={item.logo} className="w-6 h-6" /> <span> {item.symbol}</span></div><div className='p-2 rounded-xl text-right'>{item.balance}</div>
              </div>
              <div className='text-xs text-gray-600'>{item.id}</div>
            </li>
          )}
          </ul>
        </div>
      }
    </div>
  )
}