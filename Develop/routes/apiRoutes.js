var fs = require("fs");
let notes
let parsedNotes = [];
let id = 0
module.exports = function (app) {


  app.get("/api/notes", function (req, res) {
    notes = fs.readFileSync("./db/db.json", "utf-8");
    if (!notes) {
      parsedNotes = [];
    }
    else {
      parsedNotes = JSON.parse(notes);
    }
    return res.json(parsedNotes);

  });


  app.post("/api/notes", (req, res) => {
    console.log(parsedNotes);
    req.body.id = id;
    parsedNotes.push(req.body);
    id++;
    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), "utf8", (err) => {
      if (err) {
        console.log(err);
      }
    })
  })

  app.delete("/api/notes/:id", function (req, res) {
    console.log("removing note:" + req.params.id)
    parsedNotes = parsedNotes.filter(element => {
      element.id !== req.params.id;
    });
    console.log(parsedNotes);
    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), "utf8", (err) => {
      if (err) {
        console.log(err);
      }
    })
    res.end()
  });



};
