/* eslint-disable react/prop-types */

import { useState,useRef,useEffect } from 'react'
import { IoAdd } from "react-icons/io5";
import Tasks from "./Tasks";
function TaskArea({startTime}) {
    const [tasks,setTasks] = useState(["hii","maths"]);
    const [input , setInput] = useState("");
    const inputRef = useRef(null);
    const [timePerTask, settimePerTask] = useState("00:00:00");
    const[inputEmptyAlert,setInputEmptyAlert]= useState(false)
    
    useEffect(() => {
      // Focus the input field on mount
      inputRef.current.focus();
      
    }, []);
    
  function timeForEachTask(time) {
        let hour = parseInt(time.substring(0,2));
        let minute = parseInt(time.substring(3,5));
        let second = parseInt(time.substring(6));

        let total = (hour*60*60) + (minute*60) + second;

        let totalpertask = total/tasks.length;
       
        let hourpertask=Math.floor(totalpertask/3600);
       
        let minutepertask = Math.floor((totalpertask%3600)/60);
        let secondpertask = (totalpertask%3600)%60;

        return `${appendZeroes(hourpertask)}:${appendZeroes(minutepertask)}:${appendZeroes(secondpertask)}`;
       
  }

  useEffect(() => {
    
    settimePerTask(timeForEachTask(startTime));
    
  }, [startTime,tasks] );

  function appendZeroes(t) {
    if(t<=9)
      {
        return "0"+t;
      }
      else return t;
  }
  
function handleAddTask() {

    if(input==='') {
     
      setInputEmptyAlert(true);

  setTimeout(() => {
    setInputEmptyAlert(false);
  }, 2000);
    return;
   
}
let newTask = [...tasks,input]
setTasks(newTask)
setInput("");


}

function moveTaskUp(idx) {
  if(idx>0) {
    const updatedTasks = [...tasks];
    [ updatedTasks[idx], updatedTasks[idx-1]]= [ updatedTasks[idx-1], updatedTasks[idx]];
    setTasks(updatedTasks);
  }
}

function moveTaskDown(idx) {
  if(idx<tasks.length-1){
    const updatedTasks = [...tasks];
    [ updatedTasks[idx], updatedTasks[idx+1]]= [ updatedTasks[idx+1], updatedTasks[idx]];
    setTasks(updatedTasks);
  }
}

function deleteTask(idx){
 let newTask= tasks.filter((_,id)=> idx!==id);
 setTasks(newTask);
}

  return (
    <div className="task_area transition-all duration-100 flex flex-col items-center ">
  <div className={`add_new_task mt-5 justify-between  shadow-[0px_0px_12px_rgba(8,_18,_18,_0.7)] hover:h-12 gap-1 w-[30%] hover:w-[90%] border-2 h-10 transition-all duration-500 ${ inputEmptyAlert==1?"shadow-red-600 border-red-600 ":" shadow-gray-600  hover:shadow-white " }   rounded-full flex  items-center shadow-[0px_0px_10px_rgba(8,_18,_18,_0.7)]`}>
  <form action="">
    
  </form>
  <input type="text"  ref={inputRef}value={input} onChange={e=>setInput(e.target.value)} className={` h-12 w-full  outline-none  transition-all  ease-in-out rounded-md rounded-r-none rounded-l-full bg-transparent px-3 border-r-0  text-white  `} placeholder={`${inputEmptyAlert?"WRITE SOME TEXT BLUD😡 ":"Write Tasks"}`} />

<button className={`text-2xl flex justify-center items-center   h-full  rounded-r-full  border-l-0 transition-all duration-300  hover:text-3xl   w-12 bg-white text-black  `} onClick={handleAddTask}>< IoAdd /></button>
  </div>

{tasks.map( (title,id)=> <Tasks key={id} title={title} timeGiven={timePerTask} moveTaskDown={moveTaskDown} moveTaskUp={moveTaskUp} id={id} deleteTask={deleteTask}/> ) }

</div>
  )
}

export default TaskArea
