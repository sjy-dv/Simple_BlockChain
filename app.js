const express = require("express");
const app = express();
const cors = require("cors");
const { create_block, blocks } = require("./blockchain-util");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/list", async (req, res) => {
  try {
    const block_set = blocks();
    res.send(block_set);
  } catch (error) {
    console.log(error);
  }
});

app.post("/create", async (req, res) => {
  try {
    let { data } = req.body;
    const new_block = create_block(data);
    res.send(new_block);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
