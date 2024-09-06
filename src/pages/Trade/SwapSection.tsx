import axios from "axios";
import { useEffect, useState } from "react"
import { useGetAccount } from "@multiversx/sdk-dapp/hooks"
import { formatAmount } from "@multiversx/sdk-dapp/utils";
import { DropdownComponent } from "./DropdownComponent";
import { ArrowUpDown } from "lucide-react";

interface IToken {
    ticker: string, 
    balance: string, 
    price: number | undefined, 
    svgUrl: string | undefined
}

export const SwapSection = ({onFirstTokenSelect, onSecondTokenSelect, firstToken, secondToken, swappedAmount, setSwappedAmount}: {onFirstTokenSelect: (token: IToken) => void, onSecondTokenSelect: (token: IToken) => void, firstToken: IToken | undefined, secondToken: IToken | undefined, swappedAmount: string | undefined, setSwappedAmount: React.Dispatch<React.SetStateAction<string | undefined>>}) => {
    
    const { address } = useGetAccount();
    const [tokenOptions, setTokenOptions] = useState<IToken[]>([]);
    const [inputAmount, setInputAmount] = useState<string>()
    const [inputAmountInDollars, setInputAmountInDollars] = useState<string>()
    // const [swappedAmount, setSwappedAmount] = useState<string>()
    const [swappedAmountInDollars, setSwappedAmountInDollars] = useState<string>()
    const [isFirstDropdownOpen, setIsFirstDropdownOpen] = useState(false)
    const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false)

    const handleFirstDropdownToggle = () => {
        setIsFirstDropdownOpen(!isFirstDropdownOpen)
    }

    const handleSecondDropdownToggle = () => {
        setIsSecondDropdownOpen(!isSecondDropdownOpen)
    }

    const resetAmounts = () => {
        setInputAmount('')
        setInputAmountInDollars('')
        setSwappedAmount('')
        setSwappedAmountInDollars('')
    }

    const handleFirstTokenSelection = (selectedToken: IToken) => {
        onFirstTokenSelect(selectedToken);
        setIsFirstDropdownOpen(false);
        resetAmounts()
    }

    const handleSecondTokenSelection = (selectedToken: IToken) => {
        onSecondTokenSelect(selectedToken);
        setIsSecondDropdownOpen(false);
        resetAmounts()
    }

    const swapTokens = () => {
        if(firstToken != null && secondToken != null){
            const aux = firstToken
            onFirstTokenSelect(secondToken);
            onSecondTokenSelect(aux);
            resetAmounts()
        }
    }

    const handleMaxButton = () => {
        if(firstToken != null && firstToken.price != null && secondToken != null && secondToken.price != null){
            const maxAmount = formatAmount({ input: firstToken.balance, digits: 2, showLastNonZeroDecimal: false})
            const maxAmountInDollars = ((Number(maxAmount) * firstToken.price).toFixed(2)).toString()
            const _swappedAmount = (firstToken.price / secondToken.price) * (Number(maxAmount))
            const _swappedAmountInDollars = (_swappedAmount * secondToken.price).toFixed(2).toString()
            setInputAmount(maxAmount)
            setInputAmountInDollars(maxAmountInDollars)
            setSwappedAmount(_swappedAmount.toFixed(4).toString())
            setSwappedAmountInDollars(_swappedAmountInDollars)
        }
    } 

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value
        setInputAmount(amount)

        if(firstToken != null && firstToken.price != null && secondToken != null && secondToken.price != null){
            const amountInDollars = ((Number(amount) * firstToken.price).toFixed(2)).toString()
            const _swappedAmount = (firstToken.price / secondToken.price) * (Number(amount))
            const _swappedAmountInDollars = (_swappedAmount * secondToken.price).toFixed(2).toString()
            setInputAmountInDollars(amountInDollars)
            setSwappedAmount(_swappedAmount.toFixed(4).toString())
            setSwappedAmountInDollars(_swappedAmountInDollars)
        }
    }

    useEffect(() => {
        const fetchTokens = async () => {
          try {
            const tx = await axios.get(`https://devnet-api.multiversx.com/accounts/${address}/tokens?from=1`);
            const options = tx.data.map((option: { ticker: string, balance: string, price: number | undefined, assets?: {svgUrl: string}}) => ({
              ticker: option.ticker,
              balance: option.balance,
              price: option.price,
              svgUrl: option.assets?.svgUrl
            }));
            setTokenOptions(options);
          } catch (error) {
            console.error('Error fetching token options:', error);
          }
        };
    
        fetchTokens();
      }, [address]);

    return (

    <div className="relative flex flex-col items-center justify-center gap-1">
        <DropdownComponent 
            amount={inputAmount}
            handleAmountChange={handleAmountChange}
            handleDropdownToggle={handleFirstDropdownToggle}
            token={firstToken}
            isDropdownOpen={isFirstDropdownOpen}
            tokenOptions={tokenOptions}
            handleTokenSelection={handleFirstTokenSelection}
            amountInDollars={inputAmountInDollars }
            maxButton={true}
            handleMaxButton={handleMaxButton}
            zIndex={20}
        />
        <div id="swap-button" className="absolute w-8 h-8 border-4 border-xExchange-Swap-gray rounded-full bg-neutral-800 cursor-pointer" onClick={swapTokens}>
        <ArrowUpDown className="text-xExchange-Neutral/400 p-1" />
        </div>
        <DropdownComponent 
            amount={swappedAmount}
            handleDropdownToggle={handleSecondDropdownToggle}
            token={secondToken}
            isDropdownOpen={isSecondDropdownOpen}
            tokenOptions={tokenOptions}
            handleTokenSelection={handleSecondTokenSelection}
            amountInDollars={swappedAmountInDollars}
            maxButton={false}
            zIndex={0}
        />
    </div>
    )
}
