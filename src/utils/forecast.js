
const request= require('request');


const forecast = (latitude,longitude,callback)=>{

    const url ='https://api.darksky.net/forecast/97efc916259805f85a7ad8a5d10c6561/'+latitude+','+longitude
    request({url: url  , json: true} , (error,response)=> {

        const celsius= (response.body.currently.temperature -32)*5/9
        const celsiusTemp= celsius.toFixed(2)
        


        if(error) {
    
            callback('unable to connect weather service', undefined)
            
        }else if(response.body.error){
            callback('unable to find location' , undefined)
        }else{
            // console.log(response.body.daily.data[0])
            callback(undefined ,response.body.currently.icon+ ',' +'and  temp is ' +celsiusTemp + ' C°' + '  ' +  'and windSpeed is ' + response.body.currently.windSpeed + ' '  + 'km/h')
                
                console.log(response.body.currently.icon+ ',' +'and  temp is ' +celsiusTemp + '  C° ' + '   '+ 'And windSpeed is' +  response.body.currently.windSpeed )
           
            // callback(undefined ,)'
            
        }
    
       
    })

}
 module.exports = forecast







