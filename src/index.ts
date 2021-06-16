import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import models, { connectDb } from './models/index';
import ratingRouter from './routes/rating';
import gameRouter from './routes/game';
import setupViewsRoutes from './routes';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: 'xd',
    resave: false,
    saveUninitialized: false,
  })
);
app.use('/games', gameRouter);
app.use('/ratings', ratingRouter);
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(express.static('src'));
setupViewsRoutes(app);

connectDb().then(async () => {
  app.listen(5000, () => console.log(`Example app listening on port 6000!`));
});
