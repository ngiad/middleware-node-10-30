import express from "express"

export const router = express.Router()

export let database = [{id : 1,name : "nghia"},{id : 2, name : "bod"},{id : 3, name : "kind"},{id : 4, name : "sara"}]

router.get("/",(request,response) => {
    response.json({data : database})
})


router.get("/:id",(request,response) => { 
    if(isNaN(request.params.id)) return  response.json({compete : false}) 
    let userQuery = database.find((user) => user.id === +request.params.id)
    if(userQuery){
        response.json(userQuery)
    }else{
        return  response.json({compete : false})
    }
})

router.post("/",(req,res) => {
    if(!req.body.name){
        return  res.json({compete : false})
    }

    if(req.body.name.length < 6){
        return res.json({compete : false})
    }

    if(!isNaN(req.body.name)){
        return  res.json({compete : false})
    }

    req.body.id = database.length + 1 + Math.random()
    database.push(req.body)
    res.json({data : database})
})

router.put('/:id',(req,res) => { 
    const id = +req.params.id
    const nameUpdate = req.query.name
    if(isNaN(id)) return res.json({error : "id cannot a string "})
    if(!nameUpdate)return res.json({error : "name cannot a EmptyString "})
    let index = database.findIndex((user) => user.id === id)
    if(index < 0) res.status(404).json({error : "user not found!",status : 404})
    else{
        database[index] = {id : id ,name : nameUpdate}
        res.json({data : database})
    }
})


router.delete("/:id",(req,res) => { 
    const id = +req.params.id
    if(isNaN(id)) return res.json({error : "id cannot a number "})
    let index = database.findIndex((user) => user.id === id)
    if(index < 0) res.status(404).json({error : "user not found!",status : 404})
    else{
        database = database.filter((item,i) => i !== index)
        res.json({data : database})
    }
})
