import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth2"

env.config();
const app = express();
const port = process.env.PORT || 8080;
const saltRound = 10;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  }
})
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect();


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", async (req, res) => {
  if (req.isAuthenticated) {
    try {
      const result = await db.query("select secret from users1 where email = $1", [req.user.email]);
      const secret = result.rows[0].secret;
      if (secret) {
        res.render("secrets.ejs", { secret: secret })
      } else {
        res.render("secrets.ejs", { secret: "Default secret" })
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.render("/login")
  }
});

//TODO: Add a get route for the submit button
//Think about how the logic should work with authentication.
app.get('/submit', (req,res) =>{
  if(req.isAuthenticated){
    res.render("submit.ejs");
  }else {
    res.redirect("/login");
  }
})

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err)
    res.redirect('/')
  })
})

app.post("/register", async (req, res) => {
  const email = req.body.username
  const pass = req.body.password
  try {
    const check = await db.query("select * from users1 where email = $1", [email])
    if (check.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(pass, saltRound, async (err, hash) => {
        if (err) {
          console.log("Error hashing password", err)
        } else {
          const result = await db.query("insert into users1(email,password) values ($1,$2) RETURNING *;", [email, hash]);
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets")
          })
        }
      })
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

//TODO: Create the post route for submit.
//Handle the submitted data and add it to the database

app.post('/submit', async(req,res) =>{
  if(req.isAuthenticated){
    const secret = req.body.secret;
    try{
      await db.query("update users1 set secret = $1 where email = $2 ;",[secret,req.user.email]);
        res.redirect('/secrets');   
    }catch(err){
      console.log(err);
    }
  }
});

passport.use( "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const check = await db.query("select * from users1 where email = $1", [username]);
      if (check.rows.length > 0) {
        const user = check.rows[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false)
            }

          }
        })
      } else {
        return cb("Email does not exists. Try to register.");
      }
    } catch (err) {
      return cb(err)
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM users1 WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users1 (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
