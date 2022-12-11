const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      console.log(hashedPassword);

      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};





// const argon2 = require('argon2');

// const hashPassword = (req, res, next) => {
//   const { password } = req.body;

//   argon2.hash(password).then(hash => {
//     req.hashedPassword = hash;
//     next();
//   }).catch(err => {
//     res.status(500).json({
//       error: 'Erreur lors du hachage du mot de passe'
//     });
//   });
// };


// module.exports = {
//     hashPassword,
// };



// const argon2 = require('argon2');

// const hashPassword = async (req, res, next) => {
//   try {
//     const password = req.body.password;
//     const hash = await argon2.hash(password, {
//       memoryCost: 15000000,
//       iterations: 2,
//       parallelism: 1,
//       type: argon2.argon2id
//     });

//     console.log(hash);
//     req.body.hashedPassword = hash;
//     delete req.body.password;
//     next();
//   } catch (err) {
//     res.status(500).json({
//       error: 'Erreur lors du hachage du mot de passe'
//     });
//   }
// };

