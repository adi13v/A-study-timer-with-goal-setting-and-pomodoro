/* eslint-disable react/prop-types */

import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import {useState,useRef,useEffect} from "react";

import CircularProgress from '@mui/material/CircularProgress';

function ClockSection({sessionType,changeMainMessage , obtainStartTime}) {
  const [time,setTime] = useState("00:00:00");
  const[isRunning,setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(""); 
  const [timeRemainingFraction,setTimeRemainingFraction] = useState(100);
  console.log(startTime);
  let intervalIdRef=useRef(null);
    

 


   
   useEffect(() => {
   
    if(startTime=="") {
      obtainStartTime(time) ;
      return;
    }
     obtainStartTime(startTime);
    return () => {
      
    };
   }, [time]);

    useEffect(() => {
      if(isRunning){
       
        return;
      }
      setTime("00:00:00");
    }, [sessionType]);

  useEffect(() => {
    if(isRunning ){
      
      intervalIdRef.current=  setInterval(() => {
       setTime(time=>{
        let hour = parseInt(time.substring(0,2));
        let minute = parseInt(time.substring(3,5));
        let second = parseInt(time.substring(6));
        second=second-1;
        
        if(second<0) {
          second=59;
          minute--
        }
        if(minute<0) {
          minute=59;
          hour--;
        }
        if(hour<0) {
          setTime("00:00:00");
          return;
        }
//setting the fraction of time for circular progress bar

if(startTime!=""){

  
  let hour2 = parseInt(startTime.substring(0,2));
  let minute2 = parseInt(startTime.substring(3,5));
  let second2 = parseInt(startTime.substring(6));
  let time1 = (hour*60*60)+(minute*60)+(second);
  let time2=(hour2*60*60)+(minute2*60)+(second2);

 let ans = (1-(time2-time1)/time2)*100;
 if(  sessionType=='light'&&((time2-time1)%1200)>900 ){
    changeMainMessage("Break Time 😊");

 }
 else if( sessionType=='intense' && ((time2-time1)%1800)>1500 ){
  changeMainMessage("Break Time 😊");
 }
 else{
  changeMainMessage("FOCUS TIME📖");
 }

 setTimeRemainingFraction(ans);
 
 
}
      


  
       return (appendZeroes(hour)+":"+appendZeroes(minute)+":"+appendZeroes(second));
       })
      }, 1000);
    
    }

    return () => {
     
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function incrementTime() {
 
    
    if(isRunning){
      alert("Cant increment time while running");
      return;
    }
    setStartTime("");
    setTimeRemainingFraction(100);
    let hour = parseInt(time.substring(0,2));
    let minute = parseInt(time.substring(3,5));
    if(sessionType=='light'){
      minute+=20;
    }
    else{
      minute+=30;
    }
    if(minute>59) {
      minute=0;
      hour++;
    }
    
    setTime(`${appendZeroes(hour)}:${appendZeroes(minute)}:00`);
  
 
  }

  function appendZeroes(t) {
    if(t<=9)
      {
        return "0"+t;
      }
      else return t;
  }

  function decrementTime() {
    
    if(isRunning){
      alert("Cant increment time while running");
      return;
    }
    setStartTime("");
    let hour = parseInt(time.substring(0,2));
    let minute = parseInt(time.substring(3,5));
    if(sessionType=='light'){
      minute-=20;
    }
    else{
      minute-=30;
    }
     
   

    if(minute<0) {
      minute=45;
      hour--;
    }
    if(hour<0) {
      setTime("00:00:00");
      return;
     }
    
    
     setTime(`${appendZeroes(hour)}:${appendZeroes(minute)}:00`);
    
    
    }

  function handleStartTime() {
    if(isRunning) return;
    if(time!="00:00:00"){
      if(startTime=="") setStartTime(time);

      setIsRunning(true);
      changeMainMessage("FOCUS TIME📖");
    }
   
    

   
  }
  function handlePauseTime(){
    setIsRunning(false);
    changeMainMessage("COME BACK ASAP");
  }
  return (
    <>
    <div className="clock_section z-50 border-0 rounded-full py-20 px-4  h-full  ">
        <div className="clock-area flex justify-center ">
        <h1 className="clock font-light text-6xl text-white text-center mb-3">{time}</h1>
        <div className="timer_buttons flex flex-col gap-1 justify-center ml-3 ">
        <button className="up_button  text-white hover:text-gray-800 text-xl border-gray-500 border-2 rounded-full" onClick={incrementTime}><FaAngleUp /></button>
          <button className="down_button text-white hover:text-gray-800 text-xl  border-gray-500 border-2 rounded-full" onClick={decrementTime}><FaAngleDown /></button>
        </div>
         
        </div>
          
        <div className="buttons text-l flex gap-3 justify-center p-3">
            <button className='button text-green-600 border-2 hover:ring-2 font-arial py-1  rounded-full px-4' onClick={handleStartTime}>Start</button>
            <button className='button border-2  text-red-600 hover:ring-2 py-1  rounded-full px-4' onClick={handlePauseTime}>Pause</button>
            <button className='button border-2  hover:ring-2 py-1 text-white rounded-full px-4' onClick={()=>{setStartTime("");setIsRunning(false);setTimeRemainingFraction(100); return setTime("00:00:00")} }>Reset</button>
          </div>


        </div>
        <CircularProgress thickness={0.7} color={`${timeRemainingFraction<5?"success":"info"}`} style={{height:"320px", width:"320px",position:"absolute",top:"255px"}}variant="determinate" value={timeRemainingFraction} />
 
       </>
  )
}

export default ClockSection
