import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { InfoSection } from "./InfoSection";
import { SwapSection } from "./SwapSection";
import { useState } from "react";
import { Settings, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IToken {
    ticker: string, 
    balance: string, 
    price: number | undefined, 
    svgUrl: string | undefined
}

export const TradeForm = () => {
    const isLoggedIn = useGetIsLoggedIn();
    const navigate = useNavigate();
    const [firstToken, setFirstToken] = useState<IToken>()
    const [secondToken, setSecondToken] = useState<IToken>()
    const [swappedAmount, setSwappedAmount] = useState<string>()
    const [inputAmount, setInputAmount] = useState<string>()
    const [inputAmountInDollars, setInputAmountInDollars] = useState<string>()
    const [swappedAmountInDollars, setSwappedAmountInDollars] = useState<string>()
    const [displayConfirmation, setDisplayConfirmation] = useState<boolean>(false)

    const handleFirstTokenSelection = (selectedToken: IToken) => {
        setFirstToken(selectedToken);
    }

    const handleSecondTokenSelection = (selectedToken: IToken) => {
        setSecondToken(selectedToken);
    }
    
    const handleConfirmButton = () => {
        setDisplayConfirmation(true)
    }

    const handleSwapButton = () => {
        setDisplayConfirmation(false)
        resetAmounts()
    }

    const resetAmounts = () => {
        setInputAmount('')
        setInputAmountInDollars('')
        setSwappedAmount('')
        setSwappedAmountInDollars('')
    }

    const handleConnectWallet = () => {
        navigate("/unlock")
    }

    return (
    <div className=" bg-black flex justify-center items-center h-screen">
        <div id="form" className="bg-xExchange-Neutral/900 w-[534px] h-[724px] xs:w-[426px] xxs:w-[370px]">
            <div id="frame" className="pt-14 pb-32 px-10 w-[534px] h-[724px] xs:w-[426px] xxs:w-[370px]">
                <div id="left" className="w-[454px] h-[540px] flex flex-col gap-4 xs:w-[346px] xxs:w-[290px]">
                    <div id="title" className="text-xExchange-Neutral/200 flex items-center justify-between w-[454px] h-8 xs:w-[346px] xxs:w-[290px]">
                        <div className="text-32-32 font-medium h-8 w-[78px] tracking-3% xxs:text-2xl">Trade</div>
                        <Settings className="w-8 h-8 bg-xExchange-Neutral/850 p-1.5 rounded-lg xxs:w-7 xxs:h-7"/>
                    </div>
                    <div id="content" className={`relative bg-xExchange-Neutral/850 rounded-2xl p-1 w-[454px] ${!inputAmount && !swappedAmount ? "h-[312px]" : "h-[492px]"} flex flex-col items-center gap-1 xs:w-[346px] xxs:w-[290px]`}>
                        <SwapSection 
                        onFirstTokenSelect={handleFirstTokenSelection} onSecondTokenSelect={handleSecondTokenSelection} firstToken={firstToken} secondToken={secondToken} 
                        swappedAmount={swappedAmount} setSwappedAmount={setSwappedAmount} 
                        inputAmount={inputAmount} setInputAmount={setInputAmount} 
                        inputAmountInDollars={inputAmountInDollars} setInputAmountInDollars={setInputAmountInDollars}
                        swappedAmountInDollars={swappedAmountInDollars} setSwappedAmountInDollars={setSwappedAmountInDollars} 
                        resetAmounts={resetAmounts}/>
                        <InfoSection firstToken={firstToken} secondToken={secondToken} swappedAmount={swappedAmount} inputAmount={inputAmount}/>
                        {   isLoggedIn ? (
                           <button className="h-12 w-[446px] rounded-xl text-white bg-xExchange-Confirm-blue hover:bg-[#3396ff] xs:w-[338px] xxs:w-[282px]" onClick={handleConfirmButton}>Confirm</button>
                        
                        ) : (
                            <button className="h-12 w-[446px] rounded-xl text-white bg-xExchange-Confirm-blue xs:w-[338px] xxs:w-[282px]" onClick={handleConnectWallet}>Connect Wallet</button>
                        )}
                        {displayConfirmation && 
                        <div className="absolute top-12 w-96 h-60 bg-black text-white z-30 flex flex-col items-center justify-center gap-8 rounded-xl text-center text-lg  xs:w-80 xs:h-52 xs:top-16 xxs:w-64 xxs:h-44 xxs:top-20">
                            <div className="text-xExchange-Neutral/400 w-64 xs:w-60 xxs:text-base xxs:w-52">
                            You want to swap <span className="text-xExchange-Neutral/200">{inputAmount} {firstToken?.ticker}</span> to <span className="text-xExchange-Neutral/200">{swappedAmount} {secondToken?.ticker}</span> ?
                            </div>
                            <button className="rounded-xl text-white bg-xExchange-Confirm-blue hover:bg-[#3396ff] w-24 p-1 xxs:w-20 xxs:text-base" onClick={handleSwapButton}>Swap</button>
                            <button className="absolute top-1 right-1" onClick={() => setDisplayConfirmation(false)}>
                                <X className="text-xExchange-Neutral/400 hover:text-xExchange-Neutral/200"/>
                            </button>
                        </div>
                        }
                    </div>
                </div>    
            </div>
        </div>    
    </div>
    )
}