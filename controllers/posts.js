import mongoose from "mongoose";
import postMessages from "../models/postMessage.js";



export const getPost = async (req, res) => {
  const { id } =req.params;
  try {
    const post = await postMessages.findById(id);
    if (!post) return res.status(404).json({ message: "Memory not found" });
    res.status(200).json({ post });    
  } catch (error) {
    res.status(404).json({ message: error });
  }
}



export const getPosts = async (req, res) => {
  const { page, limit } = req.query; 
  const LIMIT = limit || 9 ;
  const startIndex = (Number(page) - 1) * LIMIT;
  
  try {
    const total = await postMessages.countDocuments({});
    const posts = await postMessages.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) })
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const createPost = async (req, res) => {
  console.log(req.file);
  try {
    // const post = await req.body;
    // console.log(req.body, "body")
    // const newPost = new postMessages({ ...post, creator: req.userId, createdAt: new Date().toISOString()})
    // await newPost.save();
    // res.status(201).json({ newPost })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const upDatePost = async (req, res) => {
  
  try {
    const { id: _id } = req.params;
    console.log(_id)
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with id")
    const updatedPost = await postMessages.findByIdAndUpdate(_id, {...post, _id}, { new: true })
    res.status(200).json({updatedPost})
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}


export const deletePost = async (req, res) => {
  console.log(req);
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with id")

    await postMessages.findByIdAndDelete(_id)
    res.status(200).json({ msg: "Post deleted successfully"})
  } catch (error) {
    res.status(500).json({ msg: error })    
  }
} 


export const likePost = async (req, res) => {
  try {
    const {id: _id} = req.params


    // CHECK FOR USER ID
    if (!req.userId) return res.status(400).json({ message: "You are not authorized" })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with id")
    const post = await postMessages.findById(_id)
    
    // IMPLEMENT ONE LIKE PER USER
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // LIKE THE POST
      post.likes.push(req.userId)
    } else {
      // DISLIKE THE POST
      post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await postMessages.findByIdAndUpdate(_id, post, {})
    res.status(200).json({ msg: "Success", title: updatedPost.title })
  } catch (error) {
    res.status(500).json({ msg: error })    
  }
}



export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query; 

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await postMessages.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] })
    res.json({ data: posts })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment) return res.status(404).json({ message: "No comment" });

    const post = await postMessages.findById(id)
    if (!post) return res.status(404).json({ message: "Memory not found" });
    post.comments.push(comment)
    const updatedPost = await postMessages.findByIdAndUpdate(id, post, { new: true })
    
    res.status(200).json({ updatedPost })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


