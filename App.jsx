
import './App.css'
import ModeSelect from './ModeSelect'
import ClockSection from './ClockSection'

import {useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import TaskArea from './TaskArea';


function App() {
  const [sessionType, setSessionType] = useState("light");
  const [message, setMessage] = useState("STUDY WELL");
  const [startTime, setStartTime] = useState("00:00:00")
  function changeSessionType(mode){
   
    if(mode=='intense'){
      setSessionType('intense');
    }
    else if(mode=='light'){
      setSessionType('light')
    }
    }
    
      
     function checkMessage(){
        if(message=='FOCUS TIME📖') {
          return "shadow-blue-500 border-blue-500"
        }
        else if(message=='Break Time 😊') return "shadow-green-500 border-green-700"
  
        else return "shadow-red-500 border-red-500"
      }
     
    
  
  return (
   <div className=" pomodoro  min-h-screen bg-gradient-to-l from-slate-900 to-black">
       <div className=" heading sticky top-0 right-0 left-0 flex justify-center items-center bg-opacity-95 bg-slate-900 border-b-2">
        <h1 className="text-white  text-2xl ml-3"><RxHamburgerMenu /></h1>
       <h1 className='text-3xl font-mono py-3 text-white text-center flex-1 '>POMODORO STUDY BUDDY</h1>

       </div>
       {/* HEADER DONE */}
       <div className=" mode_select flex justify-center mt-6 ml-2"> <ModeSelect changeSessionType={changeSessionType}/></div>
<div className=" box mt-2 mb-5 flex flex-col justify-center items-center">
<p className={`text-white transition-all duration-1000  text-3xl border ${checkMessage()}  mt-5 mb-8 py-1 px-5 rounded-full shadow-[0px_0px_12px_rgba(9,_1,_18,_0.9)] `} >{message}</p>

    <ClockSection sessionType={sessionType} changeMainMessage={setMessage} obtainStartTime={(t)=>{setStartTime(t)}}/>
      </div>

<TaskArea startTime={startTime} /> 

 

</div>
  
   
  )
}

export default App
