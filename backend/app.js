import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./db.js";
import userRoutes from "./src/routes/users.js";
import rolRoutes from "./src/routes/rol.js";
import artistRoutes from "./src/routes/artist.js";
import playlistRoutes from "./src/routes/playlist.js";
import songsRoutes from "./src/routes/songs.js";

connectDB();

configDotenv();
const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());

app.use("/api/songs", songsRoutes);
app.use("/api/rol", rolRoutes);
// app.use("/api/artist", artistRoutes);
// app.use("/api/playlist", playlistRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Aquí funcionando el back del spotify mcdeiniels" });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT} on backend-spotify-production.up.railway.app`);
});
