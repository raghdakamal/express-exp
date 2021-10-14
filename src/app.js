const express = require('express')
const app = express()
const port = 3000

/*app.get('/', (req, res) => {
  res.send('Hello Worldd!')
})
app.get('/weather',(req,res)=>{
    res.send('weather page')
})*/

/*app.get('/help',(req,res) =>{
    res.send('<h1>help page</h1>')
})
app.get('/about',(req,res) =>{
 res.send({
    name:'raghda',
    age:30
 })
})

app.get('/weather',(req,res) =>{
    res.send({
       forecast:'itis cold',
       location: 'east'
    })
   })*/
//path
const path= require('path')
/*console.log(__dirname)
console.log(__filename)*/

//go back one step
//console.log(path.join(__dirname,'../'))
//console.log(path.join(__dirname,'../public'))

const publicDirectory=path.join(__dirname,'../public/')
app.use(express.static(publicDirectory))

app.set('view engine','hbs')
//////////////////
const viewsPath = path.join(__dirname,'../template/views')
app.set('views',viewsPath)
const hbs= require('hbs')
const partialsPath=path.join(__dirname,'../template/partials')
hbs.registerPartials(partialsPath)


/////////////////////////////////
const request= require('request')

const url='https://newsapi.org/v2/everything?q=keyword&apiKey=997cd780bd014940bc0a1114f7dc0dc2'

const Handlebars= require('Handlebars')
Handlebars.registerPartial(
    "article", 
    "{{article.title}}, {{article.description}} , {{article.urlToImage}} "
)
app.get('/news',(req,res) =>{

request({url,json:true},(error,response) =>{

    if(error)
    {
        console.log('error has occured')
    }
    else if(response.body.message){
        console.log('Your API key is invalid or incorrect.')
      }
      else if(response.body.articles.lenght == 0){
        console.log("invalid search");
    }
    else{
        res.render('news',{
            news:response.body.articles
        
        })
    }

})  

})
app.get('/',(req,res) =>{
    //name of page
    res.render('index',{
       title:'home page',
       name:'raghda'
    })
})
//name of url
app.get('/help',(req,res) =>{
    //name of page
    res.render('help',{
       message:'hellllllllp',
       title:'help page',
       name:'raghda'
    })
})
app.get('/about',(req,res) =>{
    //name of page
    res.render('about',{
       title:'about page',
       name:'raghda'
    })
})


app.listen(port, () => {
  console.log(`server is running`)
})