const request = require('request')

const geoCode = (address,callback) =>{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5lZXNoYTA5IiwiYSI6ImNrb2gxemNydzBhOGYyb3E0cDk4d2czbmEifQ.ZrBAkZ7P73GWBYtbKsVkeA&limit=1'
    request({url,json:true},(error, { body})=>{
        if(error){
            callback("Unable to connect to weather server!!!",undefined)
        }
        else if(body.features === undefined ){
            callback("Unable to find the location Please enter valid data!",undefined)
        }
        else{
       
        const data=(body.features[0])
        if(!data) {callback("No data found",undefined); return;}
        //console.log(" Lat: ",lat," Long: ",long)
        callback(undefined,{
            lat : data.center[1],
            long : data.center[0],
            location : data.place_name
        })
        }

})
}

module.exports = geoCode