import { Router } from 'express';
import { User } from './models';
const router = new Router();
const data = {
  users: [
  { avatar: 'http://xxx.com', name: 'John', age: 23 },
  { avatar: 'http://xxx.com', name: 'Amy', age: 18 },
  ]
};

// Write your restful api here:

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    console.log(users);
    res.json(users);
  });
});

router.post('/auth/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  User.create({
    username: username,
    password: password
  }, (err, user) => {
    res.json(user);
  });
});

router.get('/users/:id', (req, res) => {
  res.json(data.users[req.params.id - 1]);
});

router.use((req, res) => {
  res.send('404');
});

export default router;
