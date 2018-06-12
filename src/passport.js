import passport from 'passport';
import nodeFetch from 'node-fetch';
import createFetch from './createFetch';
import config from './config';

const Strategy = require('passport-http-bearer').Strategy;

// const TokenStrategy = require('passport-http-oauth').TokenStrategy;

const fetch = createFetch(nodeFetch, {
  baseUrl: config.api.serverUrl,
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((token, done) => {
  done({
    id: 'dsfdasfdsf',
    id_token: 'dfdsfsdafdasfdsf',
  });
});

function getUser(token) {
  fetch(`/api/edit/user/viewByToken?token=${token}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
}

passport.use(
  new Strategy((token, done) => {
    // fetch(`/api/edit/user/viewByToken?token=${token}`)
    //   .then(res => {
    //     console.log(res)
    //     return done(null, res);
    //   })
    //   .catch(err => done(err));
    console.log(token);

    const User = async () => {
      done(null, {
        id: '1111111111',
        name: '姜',
      });
    };

    User().catch(done);
  }),
);
// db.users.findByToken(token, function(err, user) {
//   if (err) { return cb(err); }
//   if (!user) { return cb(null, false); }
//   return cb(null, user);
// });
// passport.use(
//   'token',
//   new TokenStrategy(
//     (consumerKey, done) => {
//       console.log('token------------------------');
//       fetch(`/api/edit/user/viewByToken?token=${consumerKey}`)
//         .then(res => {
//           return done(res);
//           console.log(res);
//         })
//         .catch(err => done(err));
//     },

//     (accessToken, done) => {
//       fetch(`/api/edit/user/viewByToken?token=${accessToken}`)
//         .then(res => {
//           return done(res);
//           console.log(res);
//         })
//         .catch(err => done(err));
//     },
//     (timestamp, nonce, done) => {
//       done(null, true);
//     },
//   ),
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((u, done) => {
//   const user = await getUser(u.id);
//   done(null, user);
// });

export default passport;
