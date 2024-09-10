import { ChevronDown, ChevronUp, Info, Settings } from "lucide-react";
import { useState } from "react";

interface IToken {
    ticker: string, 
    balance: string, 
    price: number | undefined, 
    svgUrl: string | undefined
}

export const InfoSection = ({firstToken, secondToken, swappedAmount, inputAmount}: {firstToken: IToken | undefined, secondToken: IToken | undefined, swappedAmount: string | undefined, inputAmount: string | undefined}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        if(collapsed){
            if(inputAmount != '' && swappedAmount != ''){
                setCollapsed(!collapsed)
            }
        } else {
            setCollapsed(!collapsed);
        }
    };

    return (
    
    <div id="input3" className="w-[446px] h-176 border border-xExchange-Neutral/750 rounded-xl py-4 px-6 flex flex-col gap-4">

        { !inputAmount && !swappedAmount ? (<></>) :

         collapsed ? (
        <div className="flex w-[398px] h-6 justify-between items-center text-xExchange-Neutral/400 font-medium text-14-16 opacity-80">
            <span>More details</span>
            <button onClick={toggleCollapse}>
                <ChevronDown className="w-4 h-4"/>
            </button>
        </div>
        ) : (
        <>
        <div id="up" className="flex w-[398px] h-6 justify-between">
            <div className="flex items-center gap-1">
                <span className="text-xExchange-Neutral/400 w-[119px] h-4 opacity-80 font-medium text-14-16 tracking-1%">Minimum received:</span>
                <div className="flex gap-1 w-[255px] h-4 items-center text-14-16">
                    <span className="text-xExchange-Neutral/200 ">{(Number(swappedAmount) - (0.01 * Number(swappedAmount))).toFixed(4).toString()}</span>
                    <span className="text-xExchange-Neutral/400">{secondToken?.ticker}</span>
                </div>
            </div>
            <button onClick={toggleCollapse}>
                <ChevronUp className="text-xExchange-Neutral/400 font-normal w-4 h-4"/>
            </button>
        </div>

        <div id="down" className="flex flex-col border-t border-xExchange-Neutral/750 pt-4 gap-2 w-[398px] h-[104px]">
            <div className="flex justify-between h-4 w-[398px] items-center">
                <div className="w-[114px] h-4 flex font-normal text-14-16 text-xExchange-Neutral/400 gap-1 rounded-lg">
                    <span className="w-[94px] h-4 tracking-1%">Exchange Rate</span>
                    <Info className="w-4 h-4"/>
                </div>
                <div className="h-4 font-normal text-14-16 text-xExchange-Neutral/200">
                {   firstToken && secondToken && firstToken.price && secondToken.price &&
                    <div>1<span> {firstToken?.ticker}</span> = <span>{(firstToken.price / secondToken.price).toFixed(4).toString()}</span><span> {secondToken?.ticker}</span></div>
                }
                </div>
            </div>

            <div className="flex justify-between h-4 w-[398px] items-center">
                <div className="w-[139px] h-4 font-normal flex text-14-16 text-xExchange-Neutral/400 gap-1">
                    <span className="w-119 h-4 tracking-1%">Slippage Tolerance</span>
                    <div className="relative group">
                        <span className="absolute w-64 bottom-full hidden group-hover:block bg-xExchange-Neutral/900 text-xExchange-Neutral/200 text-xs text-center px-2 py-2 rounded-lg">
                            You agree to receive from your swaps up to 1% less than the expected amount.
                        </span>
                        <Info className="w-4 h-4"/>
                    </div>
                </div>
                <div className="w-[35px] h-4 flex items-center gap-2 font-normal text-14-16 text-xExchange-Neutral/200">
                    <span className="w-[15px] h-4 tracking-1%">1%</span>
                    <Settings className="w-4 h-4"/>
                </div>
            </div>

            <div className="flex justify-between h-4 w-[398px] items-center">
                <div className="w-[83px] h-4 flex font-normal text-14-16 text-xExchange-Neutral/400 gap-1">
                    <span className="w-61 h-4 tracking-1%">Trade Fee</span>
                    <Info className="w-4 h-4"/>
                </div>
                <div className="w-[72px] h-4 flex gap-x-1 items-center">
                    <span className="w-9 h-4 font-normal text-14-16 text-xExchange-Neutral/500">$0.05</span>
                    <span className="w-[30px] h-4 font-normal text-14-16 text-xExchange-Neutral/200">0.3%</span>
                </div>
            </div>

            <div className="flex justify-between h-4 w-[398px] items-center">
                <div className="w-[100px] h-4 flex items-center font-normal text-14-16 text-xExchange-Neutral/400 gap-1">
                    <span className="w-[80px] h-4 tracking-1%">Price Impact</span>
                    <div className="relative group">
                        <span className="absolute w-64 bottom-full hidden group-hover:block bg-xExchange-Neutral/900 text-xExchange-Neutral/200 text-xs text-center px-2 py-2 rounded-lg">
                           The difference between the market price and estimated price due to this trade amount.
                        </span>
                        <Info className="w-4 h-4"/>
                    </div>
                </div>
                <div className="w-[40px] h-4">
                    <span className="font-normal text-14-16 text-xExchange-Neutral/200 flex items-center">&lt;0.1%</span>
                </div>
            </div>
        </div>  
        </>
        )
        }
    </div>                 
    )
}