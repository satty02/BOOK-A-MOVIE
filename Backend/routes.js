const express = require("express");
const app = express();
app.use(express.json());
const { connection } = require("./connector");
const router = express.Router();

//POST API
router.post("/api/booking", async (req, res) => {
  const { movie, slot, seats } = req.body;

  if (!movie) {
    return res.status(422).send("Please select a Movie");
  }
  if (!slot) {
    return res.status(422).send("Please select a Time Slot");
  }

  if (seats.A1 || seats.A2 || seats.A3 || seats.A4 || seats.D1 || seats.D2) {
    await connection(req.body).save((err, info) => {
      if (err) {
        return res.send(err);
      }
      return res.json(info);
    });
  } else {
    return res.status(422).send("Please select a Seat!");
  }
});

//GET API
router.get("/api/booking", async (req, res) => {
  const data = await connection.find().exec();
  return res.status(200).send(data[data.length - 1]);
});

//DELETE API
router.delete("/api/booking", async (req, res) => {
  await connection.deleteMany();
  return res.send("Previous data deleted successfully");
});

module.exports = router;
