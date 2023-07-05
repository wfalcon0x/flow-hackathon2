import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import navbarStyles from '../styles/Navbar.module.css'
import elementStyles from '../styles/Elements.module.css'
import { Button, Input, Modal } from 'antd'
import React, { PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { TokenListItem } from '../hooks/useTokenList'

type data = {
  items: TokenListItem[]
}

export default function SelectModal({children, ...props} : PropsWithChildren<data>) {
  const [showModal, setShowModal] = useState(false);
  // const [mainDiv, setMainDiv] = useState<HTMLElement>();
  const modal = useRef<HTMLDivElement>();
  const selectModal = useRef<HTMLDivElement>();
  const [displayingList, setDisplayingList] = useState<TokenListItem[]>();

  useEffect(() => {
    setDisplayingList(props.items);
  }, []);
  
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
        <span></span>
        <FontAwesomeIcon size="xs" icon={faChevronDown}/>
      </Button>
      {showModal &&
        <div key="modal" className={`absolute bg-white top-0 left-0 w-full h-full z-50 p-3`}
          ref={modal}
        >
          <Input
            className='mb-3'
            onChange={(e)=> handleSearch(e, e.target.value)}
            suffix={
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            }
          />
          {displayingList && displayingList.map((item) => 
            <div>
              <div className='w-full hover:bg-gray-400 p-2 rounded-xl'>{item.id}</div>
            </div>
          )}
          <Button className='absolute bottom-3 right-3' onClick={handleCancel}>Cancel</Button>
        </div>
      }
    </div>
  )
}