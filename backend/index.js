const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path");
const fs = require("fs");
const { type } = require("os");
const { error } = require("console");
// const { error } = require("console");

require("dotenv").config();

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

mongoose.connect(uri)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.error("DB connection error:", err));

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "upload/Images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// API Creation
app.get("/", async (req, res) => {
  res.send("Server is running on port", PORT);
  console.log(PORT)
});


// Image Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
  // destination: "./upload/Images",
  // filename:(req, file, cb)=>{
  //   return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  // }
})

const upload = multer({storage:storage})
app.use("/images", express.static(uploadDir));
// Creating upload endpoint for images
// app.use("/images", express.static('upload/Images'))

app.post("/upload", upload.single("productImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
 
  res.json({
    success:1,
    // image_url:`http://localhost:${PORT}/images/${req.file.filename}`
    image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`

  })
})
// Schema for Creating Products
const Product = mongoose.model("Product",{
  id:{
    type: Number,
    required: true
  },
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  new_price:{
    type:Number,
    required:true, 
  },
  old_price:{
    type:Number,
    required:true, 
  },
  description:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now,
  },
  available:{
    type:Boolean,
    default:true
  }
});

app.post('/addproduct',async (req, res) => {
  let products = await Product.find({})
  let id;
  if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0]
    id = last_product.id+1
  } else{
    id=1
  }
  const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    description:req.body.description,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  })
  console.log(product)
  await product.save();
  console.log("Data Saves");
  res.json({
    success:true,
    name:req.body.name,
  })
  
})

// Creating API for delete Products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({id:req.body.id});
  console.log("removed product")
  res.json({
    success:true,
    name:req.body.name
  })
})

// Creating API for getting all products
app.get("/allproducts", async(req, res) => {
  let products = await Product.find({});
  console.log("All products fetched")
  res.send(products);
})

// Schema For user model
const Users = mongoose.model('Users', {
  name:{
    type:String
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default: Date.now
  }
})

// Creating end point for register the user
app.post('/signup', async(req, res) => {
  let check = await Users.findOne({email:req.body.email})
  if (check) {
    return res.status(400).json({success:false,errors:'existing user found with same email address'})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0 ;
  }
  const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
  await user.save();

  const data = {
    user:{
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  res.json({success:true,token})
})

// Creating end point for user login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({email:req.body.email});
  if (user) {
    const passCompare = req.body.password === user.password;
    if(passCompare){
      const data ={
        user:{
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom')
      res.json({success:true, token})
    } else {
      res.json({success:false, errors:'Wrong PassWord'})
    }
  } else {
    res.json({success:false,errors:"Wrong Email Id"})
  }
})

// creating endpoint for new collection data
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collection fetched")
  res.send(newcollection);
})

// creating end point for popular in women section
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({category:"women"});
  let popular_in_women = products.slice(0,4);
  console.log("Popular in Women fetched")
  res.send(popular_in_women);
})

// creating middleware to fetch user
  const fetchUser = async (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
      res.status(401).send({errors:"Please authentiate using valid token"})
    } else{
      try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
      } catch (error) {
        res.status(401).send({errors:"please authenticate using a valid token"})
      }
    }
  }

// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.send('Added')
})

// Creating endpoint to remove product from cart-item
app.post('/removefromcart',fetchUser,async (req, res) => {
  console.log("removed"  ,req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId] > 0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.send('Removed')
})

// creating end point to get cart data
app.post('/getcart', fetchUser , async (req, res) => {
  console.log("Get Cart")
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})

// Listining port
app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server running on port");
  } else{
    console.log(error);
  }
});

module.exports = app;
