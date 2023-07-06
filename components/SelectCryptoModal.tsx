import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import navbarStyles from '../styles/Navbar.module.css'
import elementStyles from '../styles/Elements.module.css'
import { Button, Input, Modal } from 'antd'
import React, { PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCross, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { TokenListItem } from '../hooks/useTokenList'

export interface OnCryptoSelected{(
  e: React.MouseEventHandler<HTMLDivElement>,
  crypto: TokenListItem) : void
}

type data = {
  items: TokenListItem[]
  onCryptoSelected?: OnCryptoSelected
}

export default function SelectCryptoModal({children, ...props} : PropsWithChildren<data>) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<TokenListItem>();
  const [displayingList, setDisplayingList] = useState<TokenListItem[]>();
  const modal = useRef<HTMLDivElement>();
  const selectModal = useRef<HTMLDivElement>();
  

  useEffect(() => {
    setDisplayingList(props.items);
    console.log(displayingList);
  }, [props.items]);
  
  const showModalHandler = function(e){
    if(showModal){
      selectModal.current.append(modal.current);  
    }
    setShowModal(!showModal);
    if(showModal){

    }
  }

  const handleSearch = (e, value) => {
    if(value){
      setDisplayingList(props.items.filter(i => i.id.includes(value)));
    }
    else{
      setDisplayingList(props.items);
    }
    console.log(displayingList);
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

  useEffect(() => {
    if(showModal){
      if (typeof document !== 'undefined') {
        const element = document.getElementById("main-app-container");
        element.append(modal.current);
      }
    }
  }, [showModal]);

  return (
    <div ref={selectModal}>
      <Button onClick={e => showModalHandler(e)} className="rounded-xl min-w-full bg-gray-50 flex justify-between items-center"  style={{ background: "white"}}>
        <div>{selectedCrypto && <img src={selectedCrypto.logo} className="w-4 h-4" />}</div>
        <FontAwesomeIcon size="xs" icon={faChevronDown}/>
      </Button>
      {showModal &&
        <div key="modal" className={`absolute overflow-auto bg-white top-0 left-0 w-full h-full z-50 p-3 mb-7 rounded-2xl`}
          ref={modal}
        >
          <div className='mb-3'>
            <div className='text-center text-bold'>Select a Cryptocurrency</div>
          </div>
          <Button type="ghost" className='absolute top-1 right-3' onClick={handleCancel}><FontAwesomeIcon size='2x' icon={faXmark}/></Button>
          <Input
            className='mb-1 rounded-full'
            onChange={(e)=> handleSearch(e, e.target.value)}
            suffix={
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            }
          />
          <ul>
          {displayingList && displayingList.map((item) => 
            <li onClick={(e) => handleSelect(e, item)} key={item.id} className='w-full bg-gray-200 hover:bg-gray-400 px-3 py-2 my-2 rounded-xl text-sm text-default'>
              <div className='flex justify-between items-center'>
                <div className='flex justify-items-start gap-2 items-center'><img src={item.logo} className="w-6 h-6" /> <span> {item.symbol}</span></div><div className='p-2 rounded-xl text-right'>{'0.00000000'}</div>
              </div>
              <div className='text-xs text-default'>{item.id}</div>
            </li>
          )}
          </ul>
          
        </div>
      }
    </div>
  )
}