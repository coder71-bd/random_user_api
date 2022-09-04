import express from "express";
import http from "http";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Random User API");
});

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server listenig on port: ", PORT);
});
