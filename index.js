import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/post.js';
import userRouter from './routes/user.js';
import multer from "multer";


const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());
app.use("/posts", router)
app.use("/users", userRouter)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },

  filename: (req, file, cb) => {
    cb(null, file.filename + "_" + Date.now())
  }
});

const upload = multer({
  storage: storage
})

app.post("/upload", upload.single("file"),(req, res) => {
  console.log(req);
})

const CONNECTION_URL = "mongodb+srv://adesiyantope2014:k1YT26npAsoIx6KF@cluster0.j4awde0.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((err) => console.log(err))

// mongoose.set('useFindAndModify', false)