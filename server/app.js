const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const app = express()

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.use(express.json())
app.use(cors())


app.get("/get/:id", async(req,res)=>{

   const address =  req.params.id
   console.log(address)
if(!address){
 console.log('Please provide an address')
 res.send('Please provide an address').status(400)
}
else{
    geoCode(address,(error,{lat,long, location} = {})=>{
        if(error){
          
             return   res.status(404).send({error :'Please add correct region. No such region exists !!'})
             
        }
        console.log('out')
             forecast(lat,long,(error,msg) =>{
                 if(error){
                  return console.log("Error: ",error)
                 }
                //  console.log(location)
                //  console.log(msg)
                 res.send(location+'    '+msg)
             } )
      
  })
}

})


app.listen(3001,()=>{
    console.log('Server running on port 3001...')
})
