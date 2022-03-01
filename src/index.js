const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  let repositoryChecker = repositories.some((repository) => repository.id === id);

  if (!repositoryChecker) {
    return response.status(404).json({ error: "Repository not found" });
  }

  let repositoryFull = null;

  repositories.map(repository => {
    if (repository.id === id) {
      repository.title = updatedRepository.title;
      repository.url = updatedRepository.url;
      repository.techs = updatedRepository.techs;

      repositoryFull = repository;
    }
  })

  return response.json(repositoryFull);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let repositoryChecker = repositories.some(repository => repository.id === id);

  if (!repositoryChecker) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositories.findIndex(repository => repository.id === id), 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  let repositoryChecker = repositories.some(repository => repository.id === id);

  if (!repositoryChecker) {
    return response.status(404).json({ error: "Repository not found" });
  }

  let repositoryFull = null;

  repositories.map(repository => {
    if (repository.id === id) {
      repository.likes++;
      repositoryFull = repository;
    }
  });

  return response.json(repositoryFull);
});

module.exports = app;
