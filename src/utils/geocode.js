const request = require('request')





const geocode =(address ,callback)=>{
    const geocodeUrl= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoidmszMDAxODUxIiwiYSI6ImNsMGhrYXVwbjAzaWMzam8zcHcxZTd2ZjUifQ.1KnuSO9lTsV385HD_MCKHA&limit=1'
   
    request({url:geocodeUrl , json:true} , (error , response)=>{
        
        if(error){
             callback(' unable to connect to location service' , undefined)
        
        }else if(response.body.features.length===0){

            callback('unable to find location .Try another search' , undefined)
        }else{
            console.log(response.body.features)
            callback(undefined, {

                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
        
    })
}



module.exports= geocode  