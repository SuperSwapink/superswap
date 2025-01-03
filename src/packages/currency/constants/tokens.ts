import { ChainId } from "../../chain";

import { Token } from "../Token";
import { addressMapToTokenMap } from "../functions/address-map-to-token-map";

import {
  USDC_ADDRESS,
  WETH9_ADDRESS,
  WNATIVE_ADDRESS,
} from "./token-addresses";

export const WETH9 = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "/media/weth.png",
  },
  WETH9_ADDRESS
) as Record<keyof typeof WETH9_ADDRESS, Token>;

export const WNATIVE = {
  [ChainId.INK]: WETH9[ChainId.INK],
} as const;

export const USDC: Record<keyof typeof USDC_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
      icon: "/media/usdc.png",
    },
    USDC_ADDRESS
  ) as Record<keyof typeof USDC_ADDRESS, Token>),
} as const;
