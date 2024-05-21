/* eslint-disable react/prop-types */
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { useState , useRef} from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Tasks( {title,timeGiven,moveTaskDown,moveTaskUp , id, deleteTask}) {
    const [isDone, setisDone] = useState(false);
    const [iconFocus, setIconFocus] = useState(1)
    let checkRef=useRef(null);
  return (
    <div className={`flex w-[90%] items-center text-xl py-3 px-5 border-2 rounded-md mt-2 ${isDone?"border-green-700":"bg-transparent  "} text-white `}>
      <input type="checkbox" ref={checkRef} onChange={()=>setisDone((e)=>!e)} className={`item-center mt-1  accent-green-600 text-black rounded-full`} />

      <h3 className=" ml-2 flex-1">{title}</h3>
      <h3>{timeGiven}</h3>
      <button className='ml-3 transition-all duration-200 hover:text-2xl hover:translate-y-[-5px]' onClick={()=>{setisDone(false);checkRef.current.checked=false ;return moveTaskUp(id)}}><FaAngleUp/></button>
      <button className="transition-all duration-200 hover:text-2xl hover:translate-y-[-5px]"onClick={()=>{ setisDone(false);checkRef.current.checked=false ;return moveTaskDown(id)}}><FaAngleDown /></button>
      <button  onClick={()=>deleteTask(id)}
      onMouseEnter={()=>setIconFocus(0)} onMouseLeave={()=>setIconFocus(1)} className={`ml-2  transition-all duration-200 hover:text-2xl hover:translate-y-[-5px] hover:ml-1`}>{iconFocus==1?<MdDeleteOutline />:<MdDelete />}</button>
    </div>
  )
}

export default Tasks

