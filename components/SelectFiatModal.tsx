import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import navbarStyles from '../styles/Navbar.module.css'
import elementStyles from '../styles/Elements.module.css'
import { Button, Input, Modal } from 'antd'
import React, { PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { CurrencyListItem } from '../hooks/useCurrencyList'

export interface OnFiatSelected{(
  e: React.MouseEventHandler<HTMLDivElement>,
  crypto: CurrencyListItem) : void
}



type data = {
  items: CurrencyListItem[]
  onFiatSelected?: OnFiatSelected,
  readonly?: boolean;
}

export default function SelectFiatModal({children, readonly = false, ...props} : PropsWithChildren<data>) {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState<CurrencyListItem>({
    id: 'gbp',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAMAAABjCgsuAAAAyVBMVEUAIH8BIH8CIYAHJoIOLIYPLYYZNYsaNowfO44nQpI3UJo4UJtLYaRhdK9idbBmebJnerJoerN4iLt5ibuQncenstK7w9y8xN29xd3P1ebRDSTe4u7fMh3fNiHgOyfgPCjhQi/hRDHjTjzlW0rlW0vnalvna1vpdWfpdmjpe27qfG/qjYTqj4bqoJnq7PTropvrs7DrtLHrurfrurjr7fTsxcTsxcXu1NXx4ePy8/j06+309fn17e/49PX49Pb7+vv7+/z+/v7///8ZBiYZAAABQklEQVQ4y82U2U4CURBEW3ABRR2VdShkQFTcFUQYQIH6/4/ywbm5KwYeTKzHSarOTU9XC4D+nGkkhsg4jmNSfzmoc/XSAi5fpQ8gGZLVwi+G0jOnNwCuJhQOEg/iGPJl8qMD4GHBhqSc37oQ21BscPEIoDMiy3kp1KghpwHD8YyTHoDrKd9LIiJy5kEMw26FfGsDracV6/vZCzyINhw2+XUPoDvm8iKnx+JAlCF3vuS4C+Duk80jc/BSqBqQSBlqavhkZU8cRQoyIJXhZ/i9CWcn4suEZIaRGn5RQtqJUs77ABJl0MO39iak7EkBbW+It9R/NPz9lJztsH5cEiq8tRpDezX8LobizeULFd6P1+sdpesgZrxRIKcma+LtTocgTrxzNTxIiGrfJSfQi/cvn5W5yam0IOLFB6+3hshm514X/hucN8Af5X8PRgAAAABJRU5ErkJggg=='
  });
  const [displayingList, setDisplayingList] = useState<CurrencyListItem[]>();
  const modal = useRef<HTMLDivElement>();
  const selectModal = useRef<HTMLDivElement>();
  

  useEffect(() => {
    if(props.onFiatSelected){
      props.onFiatSelected(null, selectedFiat);
    }
  }, []);

  useEffect(() => {
    setDisplayingList(props.items);
  }, [props.items]);
  
  const showModalHandler = function(e){
    if(!readonly){
      if(showModal){
        selectModal.current.append(modal.current);  
      }
      setShowModal(!showModal);
    }
  }

  const handleSearch = (e, value) => {
    if(value){
      setDisplayingList(props.items.filter(i => i.id.toLowerCase().includes(value.toLowerCase())));
    }
    else{
      setDisplayingList(props.items);
    }
  };

  const handleCancel = () => {
    selectModal.current.append(modal.current);
    setShowModal(false);
  };

  const handleSelect = (e, item) => {
    setSelectedFiat(item);
    if(props.onFiatSelected){
      props.onFiatSelected(e, item);
    }
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
        <div>
          { selectedFiat &&
            <div className='flex gap-1 items-center'>
            <div>
              <img src={selectedFiat.logo} className="w-4 h-4 rounded-full" />
            </div>
            <div className='uppercase'>{selectedFiat.id.toUpperCase()}</div>
            </div>
          }
        </div>
        <FontAwesomeIcon size="xs" icon={faChevronDown}/>
      </Button>
      {showModal &&
        <div key="modal" className={`absolute overflow-auto bg-white top-0 left-0 w-full h-full z-50 p-3 mb-7`}
          ref={modal}
        >
          <div className='mb-3'>
            <div className='text-center text-bold'>Select a Fiat Currency</div>
          </div>
          <Button type="ghost" className='absolute top-1 right-3' onClick={handleCancel}><FontAwesomeIcon size='2x' icon={faXmark}/></Button>
          <Input
            className='mb-1'
            onChange={(e)=> handleSearch(e, e.target.value)}
            suffix={
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            }
          />
          <ul>
          {displayingList && displayingList.map((item) => 
            <li onClick={(e) => handleSelect(e, item)} key={item.id} className='w-full bg-gray-200 hover:bg-gray-400 px-3 py-2 my-2 rounded-xl text-sm text-default'>
              <div className='flex items-center gap-2'>
                <div>
                  <img src={item.logo} className="w-6 h-6 rounded-full" />
                </div>
                <div>{item.id.toUpperCase()}</div>
              </div>
            </li>
          )}
          </ul>
        </div>
      }
    </div>
  )
}