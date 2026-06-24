const express = require("express");
const app = express();
const PORT = 8000;

let data = ["john"];

//中间件
app.use(express.json());

app.get("/", (req, res) => {
  console.log("welcome to homepage");
  res.send("<h1 >Home Page</h1   >");
});

app.get("/dashboard");
app.listen(PORT, () => {
  console.log(`${PORT} is listening`);
});

app.get("/api/data", (req, res) => {
  res.send(`<h1>DATA:<span>${JSON.stringify(data)}</span></h1>`);
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  console.log("newEntry", newEntry);
  data.push(req.body.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  console.log(`删除了${data.pop()}`);
  res.sendStatus(202);
});
