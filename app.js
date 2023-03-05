import express from "express";
import route from "./routes/rounter.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import expressFlash from "express-flash";
import expressSession from "express-session";
import passport from "passport";

// configuration
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// app.use(expressFlash)
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// auto access static folders so we can use /css/code.css
app.use(express.static("public"));

// cors
app.use(
  cors({
    origin: "*",
  })
);

// routes mapping
app.use("/", route);

// connect to db
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error : "));

// listen for event
db.on("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
  });
});

// listen on port
