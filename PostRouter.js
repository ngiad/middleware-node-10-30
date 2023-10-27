import { Router } from "express";
import { database } from "./router.js";

const PostRouter = Router();

PostRouter.use((req,res,next) => {
    console.log("middleware tổng post 2");
    next()
})

let dataPost = [];

PostRouter.get("/",(req,res,next) => {
    console.log("middleware post của get all");
    next()
}, (req, res) => {
  res.json(dataPost);
});

PostRouter.get("/:id", (req, res) => {
  let Post = dataPost.find((item) => item.id === +req.params.id);

  if (Post) res.status(200).json(Post);
  else res.status(404).json({ error: "Post notfound!" });
});

PostRouter.get("/all-post-user/:idUser", (req, res) => {
  let arrPostByuser = dataPost.filter(
    (item) => item.idUser === +req.params.idUser
  );

  if (arrPostByuser.length > 0) res.json({ data: arrPostByuser });
  else res.json({ data: [] });
});

PostRouter.post("/:idUser", (req, res) => {
  let idUser = +req.params.idUser;

  if (isNaN(idUser)) return res.status(404).json({ error: "user notfound!" });
  if (database.find((user) => user.id === idUser)) {
    if (!req.body.content && !req.body.image) {
      res.status(404).json({ error: "data notfound!" });
    } else {
      dataPost.push({
        content: req.body.content,
        image: req.body.image,
        id: Math.random(),
        idUser,
      });

      res.json({ compete: true });
    }
  } else {
    res.status(404).json({ error: "user notfound!" });
  }
});

PostRouter.put("/:idUser/:id", (req, res) => {
  let idUser = +req.params.idUser;
  let idPost = +req.params.id;

  if (isNaN(idUser) || isNaN(idPost))
    return res.status(404).json({ error: "user notfound! ||  post Notfound!" });
  if (
    database.find((user) => user.id === idUser) &&
    dataPost.find((post) => post.id === idPost)
  ) {
    dataPost = dataPost.map((post) => {
      if (post.idUser === idUser && post.id === idPost) {
        if (!req.body.content && !req.body.image) {
          res.status(404).json({ error: "data notfound!" });
        } else {
          post.content = req.body.content;
          post.image = req.body.image;
          return post;
        }
      } else {
        return post;
      }
    });
    res.json({ compete: true });
  } else {
    res.status(404).json({ error: "user notfound! ||  post Notfound!" });
  }
});

PostRouter.delete("/:idUser/:id", (req, res) => {
  let idUser = +req.params.idUser;
  let idPost = +req.params.id;

  if (isNaN(idUser) || isNaN(idPost))
    return res.status(404).json({ error: "user notfound! ||  post Notfound!" });
  if (
    database.find((user) => user.id === idUser) &&
    dataPost.find((post) => post.id === idPost)
  ) {
    dataPost = dataPost.filter(
      (post) => post.id !== idPost && post.idUser !== idUser
    );
    res.json({ compete: true });
  } else {
    res.status(404).json({ error: "user notfound! ||  post Notfound!" });
  }
});

export default PostRouter;
