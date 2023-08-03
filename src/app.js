const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine','hbs')
const viewsPath=path.join(__dirname,'/templates/views')
const partialsPath=path.join(__dirname,'/templates/partials')


app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Prateek'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Prateek'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        message:'Restart the page to load content',
        name:'Prateek'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address!'
        })

    }
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if (error){
            console.log(error)
            return res.send({
                error:error
            })
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                console.log(error)
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                forecast:'Weather report: '+forecastData
            })
            console.log('The current place is '+location)
            console.log('Weather report: '+forecastData)
        })
    })
    
})
app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'You must enter a search term!'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Prateek',
        page:'Help Page'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Prateek',
        page:'Page1'
    })
})

app.listen(3000,()=>{
    console.log("Server is running!")
})