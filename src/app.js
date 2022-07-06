const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');


const app=express();
const port=process.env.PORT ||3000;

const publicDirectory=path.join(__dirname,'../public');
const templatepath=path.join(__dirname,'../template/views');
const partialpath=path.join(__dirname,'../template/partials');

app.use(express.static(publicDirectory));
app.set("view engine","hbs");
app.set('views',templatepath);
hbs.registerPartials(partialpath);

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        book:"book sus g"
    });
});

app.get('/about',(req,res)=>{
    console.log(req.query);
    res.render('about',{
        fun:"funday"
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        fun:"Sorry,No help for Now!"
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Enter address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error});
        }
        forecast(latitude,longitude,(error,forecast)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecast,
                location,
                address:req.query.address
            })
        })
})
})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(port,()=>{
    console.log("Server is running");
})