const request=require('request');

const forecast= (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=5022f59b1adabbd6dadb341c3345b61b&query=' + latitude + ','+longitude+'&units=m';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service!',undefined);
        }
        else if(body.error){
            callback('unable to find location',undefined);
        }
        else{
            callback(undefined,body.current.weather_descriptions+" . It is currently temperature is "+body.current.temperature +" C."+ " But it feels like "+body.current.feelslike+" C."+"The Humidity is "+body.current.humidity+"% . ");
        }

    })
}

module.exports=forecast;