const express=require("express")
const app=express()

app.use(express.json())
app.get("/",(req, res)=>{
    res.send("welcomt to prisma mysql server")
})

app.use("/api/user",require("./routes/user"))
app.use('/api/post',require("./routes/post"))

app.listen(5000,()=>{
    console.log("listenting on port 5000");
    
})