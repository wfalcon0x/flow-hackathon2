import { CurrentUser } from "@onflow/typedefs";
import { CurrencyListItem } from "../hooks/useCurrencyList";
import { UserToken } from "../hooks/useUserTokenList";

export enum NavigatePage {
  Landing = 1,
  StartSelling = 2,
  PayGlide = 3,
  Right,
}

export interface AppBase {
  user: CurrentUser;
  currentCrypto: UserToken;
  currentCryptoAmount: number;
  currentFiatCurrency: CurrencyListItem;
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

export interface IOnCryptoInfoSelected {
  (
    currentCrypto: UserToken,
    currentCryptoAmount: number,
    currentFiatCurrency: CurrencyListItem
  ): void;
}

export interface IOnSetNavigatePage {
  (page: NavigatePage): void;
}