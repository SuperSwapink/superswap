"use client";

import { ChainId, isChainId } from "@/packages/chain";
import { Native, Type } from "@/packages/currency";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface SwapParamsType {
  amountIn: string;
  amountOut: string;
  tokenIn?: Type;
  tokenOut?: Type;
  setTokenIn: any;
  setTokenOut: any;
  setAmountIn: any;
  setAmountOut: any;
  switchToken: any;
}

const defaultVal: SwapParamsType = {
  tokenIn: Native.onChain(ChainId.INK),
  tokenOut: undefined,
  amountIn: "",
  amountOut: "",
  setTokenIn: () => {},
  setTokenOut: () => {},
  setAmountIn: () => {},
  setAmountOut: () => {},
  switchToken: () => {},
};

export const SwapParamsContext =
  React.createContext<SwapParamsType>(defaultVal);

export default function useSwapParams() {
  return React.useContext(SwapParamsContext);
}

export const SwapParamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { chainId } = useAccount();
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [tokenIn, setTokenIn] = useState<Type | undefined>(
    Native.onChain(ChainId.INK)
  );
  const [tokenOut, setTokenOut] = useState<Type | undefined>();

  useEffect(() => {
    setTokenIn(Native.onChain(ChainId.INK));
    setTokenOut(undefined);
  }, [chainId]);

  const switchToken = () => {
    const newTokenIn = tokenOut;
    const newTokenOut = tokenIn;

    setAmountIn("0");
    setTokenIn(newTokenIn);
    setTokenOut(newTokenOut);
  };

  const _setTokenIn = (token: Type) => {
    if (tokenOut?.equals(token)) {
      setTokenOut(tokenIn);
    }
    setTokenIn(token);
  };

  const _setTokenOut = (token: Type) => {
    if (tokenIn?.equals(token)) {
      setTokenIn(tokenOut);
    }
    setTokenOut(token);
  };

  return (
    <SwapParamsContext.Provider
      value={{
        amountIn,
        amountOut,
        tokenIn,
        tokenOut,
        setTokenIn: _setTokenIn,
        setTokenOut: _setTokenOut,
        setAmountIn,
        setAmountOut,
        switchToken,
      }}
    >
      {children}
    </SwapParamsContext.Provider>
  );
};
