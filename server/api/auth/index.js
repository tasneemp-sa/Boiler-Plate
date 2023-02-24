// apiRoutes/users
const router = require('express').Router();
const {User, Posts} = require('../../db/models/User')

router.post('/login', async (req, res, next) => {
    try {
      console.log('req.body ',req.body);
      res.send({ token: await User.authenticate(req.body)}); 
    } catch (err) {
      console.log('inside /login error')
      next(err)
    }
  })

  router.post('/signup', async (req, res, next) => {
    try {
      const user = await User.create(req.body)
      res.send({token: await user.generateToken()})
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    }
  })


  router.get('/posts', async (req, res, next) => {
    try {
      // console.log('req.headers.authorization ', req.headers);
      console.log('req.headers.authorization ',req.headers.authorization);
      const user = await User.findByToken(req.headers.authorization);
      if (user) {
        const posts = await Posts.findAll({
          where: {
            userId: user.id
          }
        })
        res.send(posts);
      }
      
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    }
  })


module.exports = router;