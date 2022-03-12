const request = require ('request')

const forecast = (lat, long,callback) =>{
          
    // const lat = data[1]
    // const long = data[0]
   
  const url ='http://api.weatherstack.com/current?access_key=f72a4aa1c28060c6fe6316be7847bdf5&query='+lat+','+long+'&units=f'

request({ url, json:true },(error,{body})=>{
  if(error ){
    callback("Unable to connect to weather server!!",undefined)
  }

   else if(body.error){
    callback("Unable to find the location Please enter valid data",undefined)
  }
  else{  
      const data  = (body.current)
      const temp1 = ((data.temperature - 32) * 5/9).toFixed(2)
      const temp2 = ((data.feelslike - 32) * 5/9).toFixed(2)
      const icon = data.weather_icons
      var msg =data.weather_descriptions[0]+'. It is currently '+ temp1 +' degrees out. It feels like '+temp2+ ' degrees' 
      msg = icon+'\t' + msg
     // const msg =data.weather_descriptions[0]+'. It is currently '+ data.temperature +' degrees out. It feels like '+data.feelslike+ ' degrees' 
       callback(undefined,msg)
      }
  })


}
 module.exports = forecast