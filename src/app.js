const path= require('path')
const express = require('express')
const hbs= require('hbs')

const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

console.log( ' this is form app.js')
const app = express()

const port= process.env.PORT || 3000

// path.join() joins current directory to any other directory
// if you console.log(__dirname) it will give dir path
const publicDirectoryPath= path.join(__dirname ,'../public')
const viewPath= path.join(__dirname ,'../templates/views')
const partialPath= path.join(__dirname ,'../templates/partials')
hbs.registerPartials(partialPath)




app.set('view engine', 'hbs') // this set view engine hbs with require
app.use(express.static(publicDirectoryPath))  // this is use to connect static template like html ;
app.set('views' ,viewPath) // views is folder name & view path is total path of views folder




app.get('/', (req, res) =>{
    res.render('index' ,{
        title:'weather', 
        name:'vivek'
    })
})


app.get('/help' , (req ,res)=> {
    res.render('help',{
        helpText:'This is some useful text',
        title:'Help',
        name:'vivek'

    }
        
    )
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'vivek',
        errorMessage:'page not found'
    })
})

app.get('/about' , (req ,res)=> {
    res.render('about',{
        title:'About me',
        name:'vivek'
    })
})



app.get('/weather', (req ,res)=> {
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
          console.log(req.query)
        if(error){
            return res.send({error})
        }
        console.log(latitude)
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address,
                
            })
        })
    }) 
})


app.get('*',(req, res)=>{
    res.send('my 404 page')
})

app.listen(port,()=>{
    console.log('this is running on port ' + port)
})