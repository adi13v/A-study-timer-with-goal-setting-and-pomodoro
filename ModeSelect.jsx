
import { useState } from 'react';
function ModeSelect({changeSessionType}) {
  const [highlightedMode, sethighlightedMode] = useState("light")
  return (
    <div className="flex justify-center gap-5">
      <button className={`button ${highlightedMode=="light"?"text-white font-bold px-2 ":"text-gray-400"} border-2 transition-all border-yellow-400 hover:shadow-none font-arial  shadow-[0px_0px_10px_rgba(8,_18,_18,_0.7)] shadow-yellow-700 rounded-full p-2 flex flex-col items-center flex-wrap w-32`} onClick={()=>{ sethighlightedMode('light');return changeSessionType('light')}}>Light Session <div className="p text-[12px] ">15m Study <br />5m break</div></button>
      <button className={`button ${highlightedMode=='intense'?"text-white font-bold ":"text-gray-400"} border-2 transition-all border-red-400 hover:shadow-none font-arial shadow-red-700 shadow-[0px_0px_10px_rgba(8,_18,_18,_0.7)] py-1 rounded-full px-4`} onClick={()=>{sethighlightedMode('intense');return changeSessionType('intense')}}>Intense Session<div className="p text-[12px] ">25m Study <br />5m break</div></button>

    </div>
  )
}

export default ModeSelect
