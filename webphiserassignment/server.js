const express = require("express");
const helmet = require("helmet");
const multer = require('multer');
const bodyParser = require("body-parser");
var useragent = require("express-useragent");
const passport = require("passport");
const cors = require("cors");
const timeout = require("connect-timeout");
require("dotenv").config();
const app = express();
app.use(timeout("30s"));
app.use(helmet());
if (process.env.production == true) {
  var whitelist = ["http://localhost",];
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback({ err: new Error("Not allowed for you") });
      }
    },
  };
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(useragent.express());
app.use(haltOnTimedout);
app.use(multer().single('image')); // Add multer middleware here



app.use(passport.initialize());
require("./config/passport")(passport);

const apiRoutes = require("./routes/api");
app.use("/", apiRoutes);
const port = process.env.PORT || 5000;
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}
try {

  const server = require("http").createServer(app);
  server.listen(port, (_) => console.log(`Server listening at port ${port}`));
} catch (error) {
  console.log("server error", error);
}
