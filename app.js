const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const User = require('./Modals/User');
const Image = require('./Modals/Image');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
const imgUploadMulter = multer();

const MONGODB_URI = "mongodb+srv://pulak338:Admin123@cripttioncluster.lj1nx9o.mongodb.net/?retryWrites=true&w=majority";
const salt = bcrypt.genSaltSync(saltRounds);
mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected to MongoDb");
})
.catch((err)=>{
    console.log("Error while connecting to databse",err.message);
})

app.post('/addusers',async(req,res)=>{
    try{
        let{userName,firstName,email,phone,password} = req.body;

        password = bcrypt.hashSync(password, saltRounds);
   
        const newUser = new User({userName,firstName,email,phone,password});
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
app.get('/users',async(req,res)=>{
    try{
        const allUsers = await User.find();
        res.json(allUsers);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})
app.get('/signup',async(req,res)=>{
    const{user,password} = req.query;
    console.log(user);
    console.log(password);
    try{
    const userData = await User.findOne({ userName: user});
    if (userData) {
      const isPasswordMatched = bcrypt.compareSync(password, userData.password);
      if (isPasswordMatched) {
        res.json({ status: "logged in" });
      } else {
        res.json({ error: "Password not matched" });
      }
    } else {
      res.json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.post('/uploadImage',imgUploadMulter.single('imageData'),async(req,res) =>{
  try{
    const{imageData} = req.file;
    console.log(imageData);
    const newImage = new Image({imageData:imageData});
    await newImage.save();
    res.status(201).json({message:'Image uploaded successful'});
  }
  catch(error){
    // console.log(error);
    res.status(500).json({message:'unable to upload Images'})
  }
})

const PORT = process.env.PORT || 8000;

app.listen(PORT,() =>{
    console.log("Server Listening on Port",PORT);
})