import express from "express";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const io = new Server(server);

dotenv.config();

const port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("chat message", (msg) => {
    console.log("💬 Message:", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  
});

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};
startServer();
