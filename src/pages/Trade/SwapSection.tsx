import axios from "axios";
import { Formik, Field, Form } from "formik"
import { useEffect, useState } from "react"
import { useGetAccount } from "@multiversx/sdk-dapp/hooks"
import * as Yup from "yup";

const initialValues = {
    insertedAmount: '',
    swappedAmount: '',
}

const validationSchema = Yup.object({
    insertedAmount: Yup.string().required('Amount required'),
});

export const SwapSection = () => {
    
    const { address } = useGetAccount();
    const [tokenOptions, setTokenOptions] = useState<{ ticker: string, balance: string, price: number | undefined, svgUrl: string | undefined }[]>([]);

    const [firstToken, setFirstToken] = useState<{ ticker: string, balance: string, price: number | undefined, svgUrl: string | undefined }>()
    const [secondToken, setSecondToken] = useState<{ ticker: string, balance: string, price: number | undefined, svgUrl: string | undefined }>()
    const [isFirstDropdownOpen, setIsFirstDropdownOpen] = useState(false)
    const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false)

    const handleFirstDropdownToggle = () => {
        setIsFirstDropdownOpen(!isFirstDropdownOpen)
    }

    const handleSecondDropdownToggle = () => {
        setIsSecondDropdownOpen(!isSecondDropdownOpen)
    }

    const handleFirstTokenSelection = (selectedToken: { ticker: string, balance: string, price: number | undefined, svgUrl: string | undefined }) => {
        setFirstToken(selectedToken);
        setIsFirstDropdownOpen(false);
    }

    const handleSecondTokenSelection = (selectedToken: { ticker: string, balance: string, price: number | undefined, svgUrl: string | undefined }) => {
        setSecondToken(selectedToken);
        setIsSecondDropdownOpen(false);
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

    <div id="boxes" className="relative flex flex-col items-center justify-center gap-1">
        <div id="input1" className="rounded-xl bg-xExchange-Neutral/750 w-446 h-124 p-6">
            <div id="content-input-1" className="w-398 h-76 flex flex-col gap-3">
                <div id="top" className="w-398 h-10">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
                        {() => 
                        <Form>
                            <div className="flex justify-between">
                                <Field as="input" name="insertedAmount" className="text-xExchange-Neutral/300 font-medium bg-xExchange-Neutral/750 w-58 h-8 text-32-32" placeholder="0"></Field>
                                <div id="select1" className="relative bg-xExchange-Neutral/850 w-129 h-10 rounded-bl-c99 rounded-tl-c99 rounded-tr-lg rounded-br-lg p-1 cursor-pointer z-10">
                                    <button onClick={handleFirstDropdownToggle}>
                                        {
                                            firstToken ? (
                                                <div className="flex items-center gap-2">
                                                    <img src={firstToken.svgUrl} alt={firstToken.ticker} className="h-8 w-8 rounded-full"/>
                                                    <span className="w-57 h-6 font-medium text-xExchange-Neutral/300">{firstToken.ticker}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <img src={"https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg"} alt={"EGLD"} className="h-8 w-8 rounded-full"/>
                                                    <span className="w-57 h-6 font-medium text-xExchange-Neutral/300">Select...</span>
                                                </div>
                                            )
                                        }
                                    </button>
                                    {isFirstDropdownOpen && 
                                        <div className="absolute bg-xExchange-Neutral/850 rounded-lg mt-1 flex flex-col gap-2 w-full cursor-pointer z-20">
                                            {tokenOptions.map((tokenOption, index) => (
                                                <div
                                                key={index}
                                                onClick={() => handleFirstTokenSelection(tokenOption)}
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
                        </Form>
                        }
                    </Formik>
                </div>
                <div id="bottom" className="w-398 h-6 flex justify-between">
                    <span className="w-54 h-5 font-normal text-xExchange-Neutral/500 text-14-19.6">$499.89</span>
                    <div className="w-240 h-6 flex justify-end">
                        <div id="balance" className="w-77 h-6">

                            <span className="w-57 h-6 font-medium text-16-24 text-xExchange-Neutral/300">1083.54</span>
                        </div>
                        <div id="max" className="w-46 h-6 py-1 px-2 bg-xExchange-Max-bg-blue rounded-lg">
                            <span className="text-xExchange-Max-blue font-medium text-14-16 flex justify-center items-center">MAX</span>
                        </div>
                    </div>
                </div>
                {/* <ErrorMessage name="insertedAmount" render={msg => <div className="w-1/2 flex justify-start ml-2 text-red-500 text-xs -mt-5">{msg}</div>} /> */}

            </div>
        </div>

        <div id="swap-button" className="absolute w-8 h-8 border-4 border-xExchange-Swap-gray rounded-full bg-neutral-800"></div>

        <div id="input2" className="rounded-xl bg-xExchange-Neutral/750 w-446 h-124 p-6">
            <div id="content-input-2" className= "w-398 h-76 flex flex-col gap-3">
                <div id="top2" className="w-398 h-10">
                    <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
                        {() => 
                        <Form>
                            <div className="flex justify-between">
                                <Field as="input" name="swappedAmount" className="text-xExchange-Neutral/300 font-medium bg-xExchange-Neutral/750 w-98 h-8 text-32-32 tracking-3%" placeholder="0"></Field>
                                <div id="select2" className="relative bg-xExchange-Neutral/850 w-129 h-10 rounded-bl-c99 rounded-tl-c99 rounded-tr-lg rounded-br-lg p-1 cursor-pointer z-0">
                                    <button onClick={handleSecondDropdownToggle}>
                                        {
                                            secondToken ? (
                                                <div className="flex items-center gap-2">
                                                    <img src={secondToken.svgUrl} alt={secondToken.ticker} className="h-8 w-8 rounded-full"/>
                                                    <span className="w-57 h-6 font-medium text-xExchange-Neutral/300">{secondToken.ticker}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <img src={"https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg"} alt={"EGLD"} className="h-8 w-8 rounded-full"/>
                                                    <span className="w-57 h-6 font-medium text-xExchange-Neutral/300">Select...</span>
                                                </div>
                                            )
                                        }
                                    </button>
                                    {isSecondDropdownOpen && 
                                        <div className="absolute bg-xExchange-Neutral/850 rounded-lg mt-1 flex flex-col gap-2 w-full cursor-pointer z-20">
                                            {tokenOptions.map((tokenOption, index) => (
                                                <div
                                                key={index}
                                                onClick={() => handleSecondTokenSelection(tokenOption)}
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
                        </Form>
                        }
                    </Formik>
                </div>
                <div id="bottom2" className="w-398 h-6 flex justify-between">
                    <span className="w-50 h-5 font-normal text-xExchange-Neutral/500 text-14-19.6">$496.21</span>
                    <div className="w-240 h-6 flex justify-end">
                        <div id="balance2" className="w-70 h-6 flex justify-end">

                            <span className="w-50 h-6 font-medium text-16-24 text-xExchange-Neutral/300">342.52</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}