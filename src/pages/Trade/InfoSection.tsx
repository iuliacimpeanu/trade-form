export const InfoSection = () => {

    return (
    
    <div id="input3" className="w-446 h-176 border border-xExchange-Neutral/750 rounded-xl py-4 px-6 flex flex-col gap-4">
        <div id="up" className="flex items-center gap-1">
            <span className="text-xExchange-Neutral/400 w-119 h-4 opacity-80 font-medium text-14-16">Minimum received:</span>
            <div className="flex gap-1 w-255 h-4 items-center text-14-16">
                <span className="text-xExchange-Neutral/200 ">11.200</span>
                <span className="text-xExchange-Neutral/400">EGLD</span>
            </div>
        </div>

        <div id="down" className="flex flex-col border-t border-xExchange-Neutral/750 pt-4 gap-2">
            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-114 h-4">
                <span className="w-94 h-4 font-normal text-14-16 text-xExchange-Neutral/400">Exchange Rate</span>

                </div>
                <span className="w-127 h-4 font-normal text-14-16 text-xExchange-Neutral/200">1UTK=0.0012EGLD</span>
            </div>

            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-139 h-4">
                <span className="w-119 h-4 font-normal text-14-16 text-xExchange-Neutral/400">Slippage Tolerance</span>

                </div>
                <div className="w-35 h-4">
                <span className="w-15 h-4 font-normal text-14-16 text-xExchange-Neutral/200">1%</span>

                </div>
            </div>

            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-81 h-4">
                <span className="w-61 h-4 font-normal text-14-16 text-xExchange-Neutral/400">Trade Fee</span>

                </div>
                <div className="w-70 h-4 flex gap-x-1 items-center">
                    <span className="w-9 h-4 font-normal text-14-16 text-xExchange-Neutral/500">$0.05</span>
                    <span className="w-30 h-4 font-normal text-14-16 text-xExchange-Neutral/200">0.3%</span>
                </div>
            </div>

            <div className="flex justify-between h-4 w-398 items-center">
                <div className="w-100 h-4">
                <span className="w-80 h-4 font-normal text-14-16 text-xExchange-Neutral/400">Price Impact</span>

                </div>
                <div className="w-34 h-4">
                <span className="w-34 h-4 font-normal text-14-16 text-xExchange-Neutral/200">0.1%</span>
                </div>
            </div>
        </div>     
    </div>

                        
    )
}