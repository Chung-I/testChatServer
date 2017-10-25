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
const returnRouter = (io) => {
  router.get('/users', (req, res) => {
    User.find().exec((err, users) => {
      console.log(users);
      res.json(users);
    });
  });

  router.post('/auth/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    User.findOne({
      username: username
    }, (err, user) => {
      if (err) {
        console.log(err);
      } else if (!user){
        console.log('username not found; create new account');
        User.create({
          username: username,
          password: password
        }, (err, user) => {
          if (err) {
            console.log(err);
          }
          res.json({'success': true});
        });
      } else {
        if (user.password !== password) {
          console.log('wrong password');
          res.json({'success': false});
        } else {
          res.json({'success': true});        
        }
      }
    }); 
  });

  router.get('/users/:id', (req, res) => {
    res.json(data.users[req.params.id - 1]);
  });

  router.use((req, res) => {
    res.send('404');
  });

  return router;
}

module.exports = returnRouter;
