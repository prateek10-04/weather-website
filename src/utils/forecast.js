const request=require('request')

const forecast=(lat,long,callback)=>{
    const url=`https://api.weatherapi.com/v1/forecast.json?key=4c3268c0272745c79ca183149232606&q=${lat},${long}`
    request({url,json:true},(error,{body})=>{
    if(body.error){
            console.log(body.error.message)
        }
    else if(error){
        console.log('Unable to connect to weather service')
    }
    
    else {
        callback(undefined,'For date '+body.forecast.forecastday[0].date+' the summary is '+body.forecast.forecastday[0].day.condition.text+' It is currently '+body.current.temp_c+' C out. There is currently '+body.current.precip_in+'% chance of rain')
    }
})
}
module.exports=forecast