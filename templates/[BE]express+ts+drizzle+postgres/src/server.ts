import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({ msg: "Hello from Leenard's starter Express Template!" });
});

export default app;
