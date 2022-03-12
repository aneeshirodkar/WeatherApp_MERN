import React, {   useState  } from 'react'
import axios from 'axios'
import Spinner from './spinner/spinner'
import './weather.css'

function Weather (){

    const [areaName,setAreaName] = useState('')
    const [loc, setLocation ] = useState('')
    const[sky, setSky] =useState('')
    const [icon,setIcon] = useState('')
    const [msg,setMsg] = useState('')
    const [activeDiv , setActivediv] =useState('p1')
    const [isError,setIsError] =useState(false)
    const [errMsg,setErrMsg] =useState('')
    const [loading,setLoading] = useState(false)

var load = null;
var  temp = null, widget = null, feels = null

  const  handleClick = () => {
   if(activeDiv ==='p1')
   {
       setActivediv('p2')
   }
   else{
       setActivediv('p1')
   }
  };

    const search =(event) =>{
     if(event.keyCode === 13)
       { if(!areaName)
        {
           alert("Enter Location to search forcast!!")
           return;
        }
        event.target.blur();
           setLoading(true)
        axios.get('http://localhost:3001/get/' + areaName).then((response)=>{
            setIsError(false)
        console.log(response)
            setAreaName('')
            var res = response.data.split("    ")
            setLocation(res[0])
            var icon = res[1].split("\t")
            setIcon(icon[0])
            var res1 = icon[1].split('. ')
            setSky(res1[0])
            setMsg(res1[1]+'. '+res1[2])

            setLoading(false)
        }).catch((err)=>{
                setIsError(true)
                if(!err.response.data.error) setErrMsg('Network Issue !! Please check your network')
                setErrMsg(err.response.data.error)
        })
    }
    }
   
    if(msg) { 
        temp = msg.split(' ')[3].split('.')[0]
        feels = msg.split('. ')
    widget=  ( <div className ="widget">
        <div class="weatherIcon"  onClick={handleClick}><img src={icon} alt='Cannot be loaded'/></div>
        <div className='weatherInfo'>
            <div class="temperature"><span>{temp}&deg;</span></div>
            <div className='description'> 
            <div class="weatherCondition">{sky}</div>    
            <div class="place">{loc}</div>
        </div>
    </div> 
    <div className={activeDiv === "p2" ? "p2 show" : "p2 hide"} id="p2">
            <p> {feels[0]}</p>
            <p>{feels[1]}</p>
        </div>  
        <p className={activeDiv === "p1" ? "p1 show" : "p1 hide"} id="p1"></p>
    </div> 
    )
     }



if(loading){
    widget = <Spinner/>
}
else{
    load = null
}

if(isError){
    widget  = <p>{errMsg}</p>
}


    return(
        <div>
               
        <input type="text" placeholder="Search.." value={areaName} onChange = {(e) => setAreaName(e.target.value)} onKeyDown ={(e) =>search(e)}/>
      {load}
      {widget}
    </div>
    )
}

export default Weather;