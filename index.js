import express from "express";
import path from "path";
const app = express();

// using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For Static File
app.set("view engine", "ejs");
app.get("/", (req, resp) => {
  resp.render("index.ejs");
  resp.sendFile("style.css");
});

// Post Request
let users = [];
console.log("Users Array", users);

app.post("/contact", (req, resp) => {
  console.log(req.body);

  users.push({
    username: req.body.name,
    email: req.body.email,
    id: req.body.id,
  });

  resp.render("success");
});

app.get("/users", (req, resp) => {
  resp.json({
    users,
  });
});

app.post("/users/update", (req, resp) => {
  console.log(req.body);
  const userId = parseInt(req.body.id);
  const { name, email } = req.body;
  console.log(userId, name, email);

  // let userIndex;
  // const userExist = users.some((user, index)=>{
  //   if (user.id === userId) {
  //     userIndex=index;
  //     return true;
  //   }

  //   return false
  // })
  const userIndex = users.findIndex((user) => Number(user.id) === userId);

  console.log(userIndex);

  if (userIndex !== -1) {
    users[userIndex] = { id: userId, username: name, email };
    resp.json({ message: "User updated successfully!" });
  } else {
    resp.status(404).json({ error: "User not found!" });
  }
});
app.listen(5000, () => {
  console.log("Server is running");
});
