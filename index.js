import express from "express";
import http from "http";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  W;
  res.send("Welcome to Random User API");
});

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("server listenig on port: ", PORT);
});
