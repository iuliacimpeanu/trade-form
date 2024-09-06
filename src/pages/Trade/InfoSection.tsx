import { ChevronDown, ChevronUp, Info, Settings } from "lucide-react";
import { useState } from "react";

interface IToken {
    ticker: string, 
    balance: string, 
    price: number | undefined, 
    svgUrl: string | undefined
}

export const InfoSection = ({firstToken, secondToken, swappedAmount}: {firstToken: IToken | undefined, secondToken: IToken | undefined, swappedAmount: string | undefined}) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
    
    <div id="input3" className="w-446 h-176 border border-xExchange-Neutral/750 rounded-xl py-4 px-6 flex flex-col gap-4">

        { collapsed ? (
        <div className="flex w-398 h-6 justify-between items-center text-xExchange-Neutral/400 font-medium text-14-16 opacity-80">
            <span>More details</span>
            <button onClick={toggleCollapse}>
                <ChevronDown />
            </button>
        </div>
        ) : (

        <>
        <div id="up" className="flex w-398 h-6 justify-between">
            <div className="flex items-center gap-1">
                <span className="text-xExchange-Neutral/400 w-119 h-4 opacity-80 font-medium text-14-16">Minimum received:</span>
                <div className="flex gap-1 w-255 h-4 items-center text-14-16">
                    <span className="text-xExchange-Neutral/200 ">{(Number(swappedAmount) - (0.01 * Number(swappedAmount))).toFixed(4).toString()}</span>
                    <span className="text-xExchange-Neutral/400">{secondToken?.ticker}</span>
                </div>
            </div>
            <button onClick={toggleCollapse}>
                <ChevronUp className="text-xExchange-Neutral/400 font-normal"/>
            </button>
        </div>

        <div id="down" className="flex flex-col border-t border-xExchange-Neutral/750 pt-4 gap-2">
            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-52 h-4 flex font-normal text-14-16 text-xExchange-Neutral/400">
                    <span className="w-32 h-4 ">Exchange Rate</span>
                    <Info />
                </div>
                <div className="w-40 h-4 font-normal text-14-16 text-xExchange-Neutral/200">
                {   firstToken && secondToken && firstToken.price && secondToken.price &&
                    <div>1<span> {firstToken?.ticker}</span> = <span>{(firstToken.price / secondToken.price).toFixed(4).toString()}</span><span> {secondToken?.ticker}</span></div>
                }
                </div>
            </div>

            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-52 h-4 font-normal flex text-14-16 text-xExchange-Neutral/400">
                    <span className="w-32 h-4 ">Slippage Tolerance</span>
                    <Info />
                </div>
                <div className="w-10 h-4 flex items-center gap-2 font-normal text-14-16 text-xExchange-Neutral/200">
                    <span className="w-15 h-4 ">1%</span>
                    <Settings />
                </div>
            </div>

            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-52 h-4 flex font-normal text-14-16 text-xExchange-Neutral/400">
                    <span className="w-32 h-4">Trade Fee</span>
                    <Info />
                </div>
                <div className="w-70 h-4 flex gap-x-1 items-center">
                    <span className="w-9 h-4 font-normal text-14-16 text-xExchange-Neutral/500">$0.05</span>
                    <span className="w-30 h-4 font-normal text-14-16 text-xExchange-Neutral/200">0.3%</span>
                </div>
            </div>

            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-52 h-4 flex font-normal text-14-16 text-xExchange-Neutral/400">
                    <span className="w-32 h-4">Price Impact</span>
                    <Info />
                </div>
                <div className="w-34 h-4">
                <span className="w-34 h-4 font-normal text-14-16 text-xExchange-Neutral/200">&lt;0.1%</span>
                </div>
            </div>
        </div>  
        </>
        )
        }
        
    </div>

                        
    )
}