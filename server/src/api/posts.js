const express = require("express");
const { requireUser } = require("../middleware/requireUser");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../db/post");
const { post } = require("../auth/authRoutes");
const postsRouter = express.Router();

postsRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const post = await getAllPosts();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:id", requireUser, async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    if (post) {
      res.send(post);
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await createPost({
      title,
      content,
      userId: req.user.id,
    });
    res.send(post);
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:id", requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await updatePost(id, { title, content }, req.user.id);
    if (post) {
      res.send(post);
    } else {
      res.status(403).send({ error: "You can only update your own posts" });
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await deletePost(id, req.user.id);
    if (post) {
      res.send(post);
    } else {
      res.status(403).send({ error: "You can only delete your own posts" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
