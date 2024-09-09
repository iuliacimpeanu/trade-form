import { FormatAmount } from "@multiversx/sdk-dapp/UI"
import { formatAmount, parseAmount } from "@multiversx/sdk-dapp/utils"
import { ChevronDown, ChevronUp, Wallet } from "lucide-react"

interface IToken {
    ticker: string, 
    balance: string, 
    price: number | undefined, 
    svgUrl: string | undefined
}

export const DropdownComponent = (
            { amount, handleAmountChange, handleDropdownToggle, token, isDropdownOpen, tokenOptions, handleTokenSelection, amountInDollars, maxButton, handleMaxButton, zIndex }: 
            {amount: string | undefined, handleAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, handleDropdownToggle: () => void, token: IToken | undefined, isDropdownOpen: boolean, 
            tokenOptions: IToken[], handleTokenSelection: (token: IToken) => void, amountInDollars: string | undefined, maxButton: boolean, handleMaxButton?: () => void, zIndex: number}) => {

return(
    <div id="input" className="rounded-xl bg-xExchange-Neutral/750 w-[446px] h-[124px] p-6 gap-2">
    <div id="content-input" className="w-[398px] h-[76px] flex flex-col gap-3">
        <div id="top" className="w-[398px] h-11 flex justify-between items-center">
            <input type="text" placeholder="0" className="text-xExchange-Neutral/300 font-medium bg-xExchange-Neutral/750 w-32 h-8 text-32-32 tracking-3%" value={amount} onChange={handleAmountChange}/>
            <div id="select" className={`relative bg-xExchange-Neutral/850 border border-xExchange-Neutral/500 hover:bg-[#35353b] w-[129px] h-11 rounded-bl-c99 rounded-tl-c99 rounded-tr-lg rounded-br-lg p-1 cursor-pointer z-${zIndex}`}>
                <button onClick={handleDropdownToggle}>
                    {
                        token ? (
                            <div className="flex items-center gap-2">
                                <img src={token.svgUrl} alt={token.ticker} className="h-8 w-8 rounded-full"/>
                                <div className="flex flex-col w-[57px] h-8 font-medium text-sm">
                                    <div className=" text-xExchange-Neutral/300 flex items-start">{token.ticker}</div>
                                    {token.price &&
                                        <div className="text-xExchange-Neutral/500 text-14-16 flex">
                                            <span>$</span>
                                            <FormatAmount
                                            value={parseAmount((token.price)?.toString())} 
                                            showLabel={false}
                                            />
                                        </div>
                                    }
                                </div>
                                {isDropdownOpen ? (
                                    <ChevronUp className="text-xExchange-Neutral/500 font-normal"/>
                                ) : (
                                    <ChevronDown className="text-xExchange-Neutral/500 font-normal"/>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <img src={"https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg"} alt={"EGLD"} className="h-8 w-8 rounded-full"/>
                                <div className="w-57 h-6 font-medium text-xExchange-Neutral/300">Select...</div>
                                {isDropdownOpen ? (
                                    <ChevronUp className="text-xExchange-Neutral/500 font-normal"/>
                                ) : (
                                    <ChevronDown className="text-xExchange-Neutral/500 font-normal"/>
                                )}
                            </div>
                        )
                    }
                </button>
                {isDropdownOpen && 
                    <div className="absolute bg-xExchange-Neutral/850 rounded-lg mt-1 flex flex-col gap-2 w-full cursor-pointer z-20">
                        {tokenOptions.map((tokenOption, index) => (
                            <div
                            key={index}
                            onClick={() => handleTokenSelection(tokenOption)}
                            >
                                <div className="flex gap-2 p-1 items-center justify-start">
                                    <img src={tokenOption.svgUrl} alt={tokenOption.ticker} className="h-8 w-8 rounded-full"/>
                                    <span className="font-medium text-xExchange-Neutral/300">{tokenOption.ticker}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
        <div id="bottom" className="w-[398px] h-6 flex justify-between">
            {amountInDollars ? (
                <div className="w-[54px] h-5 font-normal text-xExchange-Neutral/500 text-14-19.6">
                    <span>${amountInDollars}</span>
                </div>
            ) : (
                <div className="w-[54px] h-5 font-normal text-xExchange-Neutral/500 text-14-19.6 flex">
                    <span>$0</span>
                </div>
            )}

            { token &&
            <div className="w-60 h-6 flex justify-end gap-3">
                <div className="w-[77px] h-6 text-16-24 flex items-center justify-end text-xExchange-Neutral/300 font-medium gap-1">
                    <Wallet className="w-4 h-4 text-14-14 font-black flex justify-end" />
                    <span className="font-medium tracking-1% flex justify-end">{formatAmount({ input: token.balance, digits: 2, showLastNonZeroDecimal: false})}</span>          
                </div>
                {maxButton && 
                <div id="max" className="w-[46px] h-6 py-1 px-2 bg-xExchange-Max-bg-blue rounded-lg">
                    <button onClick={handleMaxButton} className="text-xExchange-Max-blue font-medium text-14-16 flex justify-center items-center cursor-pointer w-[30px] h-4 tracking-1%">MAX</button>
                </div>
                }
            </div>
            }
        </div>
    </div>
</div>
)

}

