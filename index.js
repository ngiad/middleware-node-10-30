import express from "express";
import { router } from "./router.js";
import PostRouter from "./PostRouter.js";
import { database } from "./router.js";
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("middleware tổng của app");
  next();
});




app.use("/api/user", router);
app.use(
  "/api/post",
  (req, res, next) => {
    let iduser = req.query.id
    if(database.find(item => item.id === +iduser)){
      next();
    }else{
      res.json({error : "user notfound!"})
    }

  },
  PostRouter
);

app.listen(5000, () => {
  console.log("server is running on PORT : " + 5000);
});
