import { Express } from 'express';
import jwt from 'jsonwebtoken';
import models from '../models/index';
import { getGame, getGames, createGame, removeGame, updateGame } from '../controllers/gameController';
import { addRating, removeRating } from '../controllers/ratingController';
import { register, login } from '../controllers/userController';
import { deleteToken, validateUser } from '../helpers/token';

const setupViewsRoutes = (app: Express) => {
  /* HOME */

  app.get('/', async (req, res) => {
    res.render('index');
  });

  /* GET FORMS VIEWS */

  app.get('/gry/dodaj', validateUser, async (req, res) => {
    res.render('formPost');
  });

  app.get('/gry/:id/aktualizuj', validateUser, async (req, res) => {
    const response = await getGame(req);
    res.render('formPut', { game: response.game });
  });

  app.get('/login', async (req, res) => {
    res.render('login');
  });
  app.get('/register', async (req, res) => {
    res.render('register');
  });

  /* START C-R-U-D */

  app.post('/gry/dodaj', async (req, res) => {
    const response = await createGame(req);
    res.redirect('/gry/' + response);
  });

  app.post('/gry/:id/aktualizuj', async (req, res) => {
    const response = await updateGame(req);
    res.redirect('/gry');
  });

  app.get('/gry/:id', async (req, res) => {
    let response = await getGame(req);
    response.cookie = req.cookies._id;
    res.render('game', response);
  });

  app.delete('/gry/:id', validateUser, async (req, res) => {
    const response = await removeGame(req);
    res.send({ data: response });
  });
  app.post('/review/:id/usun', validateUser, async (req, res) => {
    const response = await removeRating(req);
    res.send(response);
  });
  app.post('/review', validateUser, async (req, res) => {
    const response = await addRating(req, res);
    res.send(response);
  });

  /* AUTH */
  app.post('/login', async (req, res) => {
    const response = await login(req, res);
    if (response === false) {
      res.cookie('errorMessage', 'true');
      res.redirect('/register');
    } else {
      res.redirect('/gry');
    }
  });
  app.post('/register', async (req, res) => {
    const response = await register(req);
    if (response === false) {
      res.cookie('errorMessage', 'true');
      res.redirect('/register');
    } else {
      res.redirect('/login');
    }
  });

  app.post('/logout', async (req, res) => {
    deleteToken(res);
    res.redirect('/');
  });
  /* END C-R-U-D */

  /* VIEW GAMES */

  app.get('/gry', async (req, res) => {
    const response = await getGames(req);
    res.render('games', { games: response });
  });
};

export default setupViewsRoutes;
