import app from './app';

const port = process.env.PORT || 3333;

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Node server app listening on port ${port}!`);
});
