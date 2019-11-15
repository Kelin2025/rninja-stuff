import { app } from "../../../server/core/app";
import {
  createPollTemplate,
  updatePollTemplate,
  removePollTemplate
} from "./actions";

app.post("/api/poll-templates", async (req, res) => {
  res.send(await createPollTemplate(req.body));
});

app.put("/api/poll-templates/:id", async (req, res) => {
  res.send(await updatePollTemplate({ id: req.params.id, ...req.body }));
});

app.delete("/api/poll-templates/:id", async (req, res) => {
  res.send(await removePollTemplate({ id: req.params.id }));
});
