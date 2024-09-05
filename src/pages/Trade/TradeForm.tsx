import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { InfoSection } from "./InfoSection";
import { SwapSection } from "./SwapSection";

export const TradeForm = () => {
    const isLoggedIn = useGetIsLoggedIn();

    return (
    <div className="bg-black flex justify-center items-center h-screen">
        <div id="form" className="bg-xExchange-Neutral/900 w-534 h-724">
            <div id="frame" className="pt-14 pb-32 px-10 w-534 h-724">
                <div id="left" className="w-454 h-540 flex flex-col gap-4">
                    <div id="title" className="flex justify-between w-454 h-8">
                        <div className="text-xExchange-Neutral/200 text-3xl h-8 w-78">Trade</div>
                        <span></span>  {/* here the icon*/}
                    </div>
                    <div id="content" className="bg-xExchange-Neutral/850 rounded-2xl p-1 w-454 h-492 flex flex-col items-center gap-1">
                        <SwapSection />
                        <InfoSection />
                        {   isLoggedIn ? (
                           <button className="h-12 w-446 rounded-xl text-white bg-xExchange-Confirm-blue">Confirm</button>
                        ) : (
                            <button className="h-12 w-446 rounded-xl text-white bg-xExchange-Confirm-blue">Connect Wallet</button>
                        )}
                    </div>
                </div>    
            </div>
        </div>    
    </div>
    )
}