import { useEffect, useState } from 'react'
import { QuoteData, UseQuoteInput } from '../helpers/interfaces'


export default function useQuote(props:UseQuoteInput|undefined): QuoteData | null {
  const [rawQuoteData, setRawQuoteData] =  useState<QuoteData>();
  const [inputData, setInputData] =  useState<UseQuoteInput|undefined>();

  const callAPI = async () => {
    try {
      const res = await fetch(`/api/offramp/quote?toFiat=${inputData.fiatCurrency.toUpperCase()}&fromCrypto=${inputData.cryptoSymbol}&cryptoAmount=${inputData.cryptoAmount}`);
      const data = await res.json();
      setRawQuoteData(data);
    } catch (err) {
      setRawQuoteData(null);
    }
  };

  useEffect(()  => {
    if(inputData){
      callAPI();
    }
  }, [inputData])

  useEffect(()  => {
    if(props){
      if(inputData){
        if(inputData.fiatCurrency != props.fiatCurrency || inputData.cryptoSymbol != props.cryptoSymbol || inputData.cryptoAmount != props.cryptoAmount){
          setInputData(props);
        }
      }
      else{
        setInputData(props);
      }
    }
  }, [props])

  // if(props){
  //   useEffect(()  => {
  //     if(props && props.cryptoAmount && props.cryptoSymbol && props.fiatCurrency){
  //       callAPI();
  //     }
  //   }, [props.cryptoSymbol, props.fiatCurrency])
  // }

  return rawQuoteData;
}