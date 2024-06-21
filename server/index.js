const express=require("express")

const bodyparser=require("body-parser")
const cors=require("cors")
const mysql=require("mysql")
const app=express();

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud",
})

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT*FROM contact_db";
    db.query(sqlGet,(err,result)=>{
        res.send(result);
    })
})

app.post("/api/post",(req,res)=>{
    const {name,email,contact}=req.body;
    const sqlInsert="INSERT INTO contact_db(name,email,contact) VALUES(?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})


app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})


app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT*FROM contact_db WHERE id=?";
    db.query(sqlGet,id,(err,result)=>{
        if(err){
           console.log(err) 
        }
        res.send(result);
    })
})


app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {name,email,contact}=req.body;
    const sqlUpdate="UPDATE contact_db SET name=?,email=?,contact=? WHERE id=? ";
    db.query(sqlUpdate,[name,email,contact,id],(err,result)=>{
        if(err){
           console.log(err) 
        }
        res.send(result);
    })
})

app.get("/",function(req,res){
    // const sqlInsert="INSERT INTO contact_db(name,email,contact) VALUES('john','john@gmail.com',251453)";
    // db.query(sqlInsert,(err,result)=>{
    //     console.log("error",err);
    //     console.log("result",result);
    //     res.send("it is working perfectly")
    })
// });


app.listen(5000,()=>{
    console.log("server running on 5000");
})