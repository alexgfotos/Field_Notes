var fs = require("fs");

let id = 0
module.exports = function (app) {


  app.get("/api/notes", function (req, res) {
    let notes = fs.readFileSync("./db/db.json", "utf-8");
    let parsedNotes = [];
    if (!notes) {
      parsedNotes = [];
    }
    else {
      parsedNotes = JSON.parse(notes);
    }
    return res.json(parsedNotes);

  });


  app.post("/api/notes", (req, res) => {
    let notes = fs.readFileSync("./db/db.json", "utf-8");
    let parsedNotes = JSON.parse(notes);
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
    let notes = fs.readFileSync("./db/db.json", "utf-8");
    let parsedNotes = JSON.parse(notes);
    console.log("removing note:" + req.params.id)
    parsedNotes = parsedNotes.filter(element => {
      return element.id != req.params.id;
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
