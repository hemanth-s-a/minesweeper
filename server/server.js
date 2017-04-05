import express from "express";

const app = express(),
    port = process.env.MINESWEEPER_PORT || 9911;

app.use("/", express.static("dist/client"));

app.listen(port, () => {
    console.log("Server running on port " + port);
});
