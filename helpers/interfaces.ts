import { CurrentUser } from "@onflow/typedefs";
import { CurrencyListItem } from "../hooks/useCurrencyList";
import { UserToken } from "../hooks/useUserTokenList";

export enum NavigatePage {
  Landing = 1,
  StartSelling = 2,
  PayGlideConnectedRecipient = 3,
  PayGlideAddRecipientCard = 4,
  PayGlideAddRecipientInfo = 5,
}

export interface AppBase {
  user: CurrentUser;
  currentCrypto: UserToken;
  currentCryptoAmount: number;
  currentFiatCurrency: CurrencyListItem;
  currentFiatAmount: number;
  recipientEmail: string;
}

export interface FeeBase {
  description: string;
  amount: number;
  currency: string;
}

export interface QuoteData {
  id: "3f5296bc-6640-64c2-9102-c86c6e8917ea";
  conversionRate: string;
  cryptoAmount: string;
  cryptoCurrency: string;
  fiatAmount: number;
  fiatCurrency: string;
  fees: {
    breakdowns: FeeBase[];
    total: FeeBase[];
  };
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}
export interface UseQuoteInput {
  fiatCurrency: string;
  cryptoSymbol: string;
  cryptoAmount: number;
}


export interface IOnCryptoInfoSelected {
  (
    currentCrypto: UserToken,
    currentCryptoAmount: number,
    currentFiatCurrency: CurrencyListItem,
    currentFiatAmount: number,
  ): void;
}

export interface IOnSetNavigatePage {
  (page: NavigatePage, addData?: AppBase | any): void;
}

export interface RecipientInfo {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  phone: string;
}