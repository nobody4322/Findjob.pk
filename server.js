const mongoose = require('mongoose');
const express=require('express');
//var smtpTransport = require('nodemailer-smtp-transport');
const bodyParser=require('body-parser')
const app = express();
const db=require('./config/keys').mongoURI;
const user=require('./routes/user')
const company=require('./routes/company')
var cors = require('cors');
const PORT=process.env.PORT|| 5000


mongoose.connect(db,{
    useUnifiedTopology: true,
    useNewUrlParser: true,})
        .then(()=>console.log('connected'))
        .catch(err=>console.log(err));


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/user',user);
app.use('/company',company);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

   
  
    
  }

app.listen(PORT,()=>{
    console.log('server runnng at 5000')
})
                