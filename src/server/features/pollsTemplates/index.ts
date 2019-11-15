import { app } from "../../../server/core/app";
import {
  getPollTemplates,
  createPollTemplate,
  updatePollTemplate,
  removePollTemplate
} from "./actions";

app.get("/api/poll-templates", async (req, res) => {
  res.send(await getPollTemplates(req.body));
});

app.post("/api/poll-templates", async (req, res) => {
  res.send(await createPollTemplate(req.body));
});

app.put("/api/poll-templates/:id", async (req, res) => {
  res.send(await updatePollTemplate({ id: req.params.id, ...req.body }));
});

app.delete("/api/poll-templates/:id", async (req, res) => {
  res.send(await removePollTemplate({ id: req.params.id }));
});
