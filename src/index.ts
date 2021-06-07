import express from 'express';
import models, { connectDb } from './database/index';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());
app.get('/',function(req,res) {
    res.send('Hello world');
})
app.post('/post',function(req,res) {
    res.send(req.body);
})
connectDb().then(async () => {
    app.listen(6000, () =>
      console.log(`Example app listening on port 6000!`),
    );
  });