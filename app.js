const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const { db } = require("./models");
const models = require("./models");
//const { user, wiki } = require("./routes");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

db.authenticate().then(() => {
  console.log("connected to the database");
});

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "./stylesheets"));
app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);

app.get("/", function(req, res) {
  res.send(layout());
});

const PORT = 3000;

const init = async () => {
  await models.db.sync({ force: true });
  //await models.User.sync();
  // await models.Page.sync();

  app.listen(PORT, () => {
    console.log(`Sever is listening on port ${PORT}`);
  });
};

init();

//app.listen(PORT, () => {
//  console.log(`App listening in port ${PORT}`);
//});
