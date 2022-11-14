const database = require("./database");


const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("SELECT * FROM users WHERE id = ?", [id])
  .then(([users]) => {
      if(users[0] != null){
          res.json(users[0]);
      } else {
          res.status(404).send("Not found");
      }
  }
  )
  .catch((err) =>{
      console.error(500).send("Error retrieving database");
  })

};

const getUser = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
}

// quest 3

const postUser = (req, res) =>{
  const { firstname, lastname, email, city, language}= req.body;
  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error saving user`);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUser,
  postUser,
};