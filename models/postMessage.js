import mongoose from "mongoose";


const postSchema = mongoose.Schema({
  title: String,
  image: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: []
  },
  comments: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const postMessages = mongoose.model("PostMessage", postSchema)

export default postMessages;