
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const bodyParser = require("body-parser");
const ShortUrl = require('./schemas/shortener');
const app = express()
mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser:true,useUnifiedTopology:true
})
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set(express.urlencoded({extended:false}))
app.get("/",async (req,res)=>{
 const urls = await ShortUrl.find()

 res.render('landing',{shortUrls:urls})
})
app.post('/shorten', async (req,res)=>
{
    console.log(req.body)
    await ShortUrl.create({entire:req.body.inputurl})
    res.json({success:"400"})
})
app.get('/:url', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.url })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks = shortUrl.clicks+1
    shortUrl.save()
  
    res.redirect(shortUrl.entire)
  })
app.listen(5000);