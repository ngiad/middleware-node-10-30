import express from "express"


const app = express()

//  request yeu cau tu phia client 
//  response phan hoi tu phia server
app.get("/api/get",(request,response) => {
    // response.send("phan hoi send : chi dc phep gui string")
    //response.send  gui 1 string

    //  khi muon gui du lieu la kieu tham chieu (object,array,function)
    response.json({data : {name : "nghia"}})
})



app.listen(5000,() => {
    console.log("server is running on PORT : "+ 5000);
})

//  lol