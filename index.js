
const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection(
  {
    host:"localhost",
    user: "root",
    database:"delta_app",
    password:"sarthak@2008"
  }
);

//inserting single data into database
//  let query = "INSERT INTO user(id,username,email,password)VALUES(?,?,?,?)";
//  let user =["101","diyatripathi19","diyatripathu@gmail.com","bhaikabdy2007"];

// try{
//   connection.query(query,user,(err,result)=>{
//     if(err) throw err ;
//     console.log(result);
//     // console.log(result.length);
//     // console.log(result[0]);
//     // console.log(result[1]);
//   });
// }catch(err){
//   console.log(err);
// }

//inserting multiple data into tables
// let query = "INSERT INTO user(id,username,email,password)VALUES ?";
// let users = [
//   ["102","102_abc","abc@gmail.com","abc"],
//   ["103","103_abc","abcd@gmail.com","abcd"]
// ]
// let data =[];
let getRandomUser =() =>{
  return [
     faker.string.uuid(),
     faker.internet.userName(),
     faker.internet.email(),
     faker.internet.password(),
    
  ];
}
// for(let i=1;i<=100;i++){
//   data.push(getRandomUser());
// }
// try{
//   connection.query(query,[data],(err,result)=>{
//     if(err) throw err ;
//     console.log(result);
//     // console.log(result.length);
//     // console.log(result[0]);
//     // console.log(result[1]);
//   });
// }catch(err){
//   console.log(err);
// }

// connection.end();

//THIS IS OUR HOME ROUTE
app.get("/",(req,res)=>{
  // res.send("welcome to home page");
  let query = "SELECT count(*) FROM user";
  try{
      connection.query(query,(err,result)=>{
        if(err) throw err ;
        // console.log(result[0]["count(*)"]);
        // res.send("success");
        let count = result[0]["count(*)"];
        res.render("home.ejs",{count});
        
      });
    }catch(err){
      console.log(err);
      res.send("there is some error");
    }
    
  });


  //USER ROUTE
  app.get("/user",(req,res)=>{
    let q = "SELECT * FROM user";
    try{
      connection.query(q,(err,result)=>{
        if(err) throw err ;
        // res.send(result);
        // console.log(result);
        let users = result;
        
       res.render("showuser.ejs",{users});
        
      });
    }catch(err){
      console.log(err);
      res.send("there is some error");
    }
    // res.send("successfull");
  })

// edit route

app.get("/user/:id/edit",(req,res)=>{
  let {id}= req.params;
  let query = `SELECT * FROM USER WHERE ID = '${id}'`;
  try{
    connection.query(query,(err,result)=>{
      if(err) throw err ;
       let user=result[0];
      console.log(result);
   
         res.render("edit.ejs",{user});
      
     
      
    });
  }catch(err){
    console.log(err);
    res.send("there is some error");
  }
})

//update route

app.patch("/user/:id",(req,res)=>{
  // res.send("updated");
  let{id}=req.params;
  let query = `SELECT * FROM USER WHERE ID = '${id}'`;
  let {password:formPass,username:newUsername}=req.body;
  try{
    connection.query(query,(err,result)=>{
      if(err) throw err ;
       let user=result[0];

       if(formPass!=user.password){
        res.send("WRONG PASSWORD");
       }
       else{
        let q2=`UPDATE user SET username= "${newUsername}" WHERE id="${id}"`;
        connection.query(q2,(err,result)=>{
          if(err) throw err;
          res.redirect("/user");
        })
       }
   
    });
  }catch(err){
    console.log(err);
    res.send("there is some error");
  }
})



app.listen(port,()=>{
  console.log(`listening on port ${port}`);
})

  
  
  