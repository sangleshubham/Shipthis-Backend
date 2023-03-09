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
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
// app.use(expressFlash)
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie : {
      maxAge : 36000000, // 10hr
      httpOnly : false,
      secure : false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

// auto access static folders so we can use /css/code.css
app.use(express.static("public"));

app.use(cors({
  origin: true, // "true" will copy the domain of the request back
                // to the reply. If you need more control than this
                // use a function.

  credentials: true, // This MUST be "true" if your endpoint is
                     // authenticated via either a session cookie
                     // or Authorization header. Otherwise the
                     // browser will block the response.

  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                         // pre-flight OPTIONS requests
}));

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
