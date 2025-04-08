const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create a new post
router.post("/", async (req, res) => {
  try {
    const { title, content, hashtags } = req.body;
    const newPost = new Post({ title, content, hashtags });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).send("Error creating post");
  }
});

// Get posts by hashtag
router.get("/tag/:tag", async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await Post.find({ hashtags: tag });
    res.json(posts);
  } catch (err) {
    res.status(500).send("Error fetching posts");
  }
});

// Get all unique hashtags
router.get("/tags", async (req, res) => {
  try {
    const tags = await Post.distinct("hashtags");
    res.json(tags);
  } catch (err) {
    console.error(err); // Add this line to log any issues
    res.status(500).send("Error fetching hashtags");
  }
});

module.exports = router;
