import { useEffect, useState } from 'react'
import { QuoteData, UseQuoteInput } from '../helpers/interfaces'


export default function useQuote({...props}:UseQuoteInput): QuoteData | null {
  const [rawQuoteData, setRawQuoteData] =  useState<QuoteData>();

  const callAPI = async () => {
    try {
      if(props.cryptoAmount && props.cryptoSymbol && props.fiatCurrency){
        const res = await fetch(`/api/offramp/quote?toFiat=${props.fiatCurrency.toUpperCase()}&fromCrypto=${props.cryptoSymbol}&cryptoAmount=${props.cryptoAmount}`);
        const data = await res.json();
        setRawQuoteData(data);
      }
    } catch (err) {
      setRawQuoteData(null);
      console.log(err);
    }
  };

  useEffect(()  => {
    callAPI();
  }, [props.cryptoAmount, props.cryptoSymbol])

  return rawQuoteData;
}