const express = require("express");
const app = express();
const users = [
  {
    name: "ayush",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: true,
      },
      {
        healthy: false,
      },
    ],
  },
];

app.get("/", function (req, res) {
  // will return to user that how many kidney he has and what is the health status of the kidney...

  const ayushKidneys = users[0].kidneys;
  const numberOfKidney = ayushKidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < ayushKidneys.length; i++) {
    if (ayushKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidney - numberOfHealthyKidneys;

  res.json({
    ayushKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

// to get the body we have to use the below line
app.use(express.json());

app.post("/", function (req, res) {
  // want to add new unhealthy or healthy kidney..
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

app.put("/", function (req, res) {
  // replace the unhealthy kidney with the healthy one
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    msg: "done updation",
  });
});

app.delete("/", function (req, res) {
  // delete the unhealthy kidneys
  if (isThereAtleastOneUnhealthyKidney()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.json({
      msg: "done",
    });
  } else {
    res.status(411).json({
      msg: "Bro you don't have any bad kidney",
    });
  }
});

function isThereAtleastOneUnhealthyKidney() {
  let atLeastOneUnhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atLeastOneUnhealthyKidney = true;
    }
  }
  return atLeastOneUnhealthyKidney;
}

app.listen(3000);
