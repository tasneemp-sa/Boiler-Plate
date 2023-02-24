const path = require('path');
const express = require('express');
const app = express();
const {User, Posts} = require('./db/models/User')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', require('./api'));

// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that would go before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

 // The following is in the `start.js` file

// say our sequelize instance is create in 'db.js'
const db = require('./db'); 
// and our server that we already created and used as the previous entry point is 'server.js'
// const app = require('./index.js');
const port = process.env.PORT || 3000;

db.sync({ force: true })  // sync our database
  .then(async function(){
    app.listen(port, () => console.log(`listening on port ${port}`)) // then start listening with our express server once we have synced
    const credentials = [
      { username: "lucy", password: "lucy_pw", githubId: 1234 },
      { username: "moe", password: "moe_pw", githubId: 5678 },
      { username: "larry", password: "larry_pw", githubId: 91011 },
    ];
    const [lucy, moe, larry] = await Promise.all(
      credentials.map((credential) => User.create(credential))
    );

    const posts = [ { text: 'hello world'}, { text: 'reminder to buy groceries'}, { text: 'reminder to do laundry'} ];
const [post1, post2, post3] = await Promise.all(posts.map( post => Posts.create(post)));
await lucy.setPosts(post1);
await moe.setPosts([post2, post3]);
    
  })

module.exports = app;