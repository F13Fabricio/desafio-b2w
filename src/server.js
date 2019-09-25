const app = require('./app');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(
  'mongodb://localhost:27017/dev',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const port = 3000;

app.listen(port, () => {
  console.log(`'Listening on port http://localhost:${port}`);
});