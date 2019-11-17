import cors from "cors";
import path from "path";
import express from "express";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

(async () => {
  app.get(["/", "/polls", "/polls/templates", "/tts"], async (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.get(["/widget"], async (req, res) => {
    res.sendFile(path.join(__dirname, "/widget.html"));
  });

  app.use(express.static("dist"));
})();
