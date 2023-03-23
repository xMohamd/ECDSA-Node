const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { verifySignature } = require("./services")

app.use(cors());
app.use(express.json());

const balances = {
    "030fe62bedaf61698000478b18fbc8b0fbde6fab": 1000,
    "1294df9db1fd05101e6ba5952f2ce9c6facca847": 500,
    "b4082f03792278a598e125e6466ccfc443cc877f": 250,
    "2a7754588ed6ea0d3344a8f0f42fe23b2a295982": 125,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
  });

  app.post("/send", (req, res) => {
    const { sender, recipient, amount, signature } = req.body;
  
    const msg = JSON.stringify({
      recipient,
      amount
    })
    let isValid = verifySignature(signature, msg, sender);
    if (isValid === false){
      res.status(400).send({ message: "Invalid Signature!" })
      return
    }
  
    setInitialBalance(sender);
    setInitialBalance(recipient);
  
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
  
  function setInitialBalance(address) {
    if (!balances[address]) {
      balances[address] = 0;
    }
  }
  