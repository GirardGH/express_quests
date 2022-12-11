app.get('/api/users', (req, res) => {
  // Récupérer les paramètres language et city de la requête
  const language = req.query.language;
  const city = req.query.city;

  // Récupérer la liste de tous les utilisateurs
  let users = getAllUsers();

  // Appliquer les filtres si nécessaire
  if (language) {
    users = users.filter(user => user.language === language);
  }
  if (city) {
    users = users.filter(user => user.city === city);
  }

  // Renvoyer la liste filtrée d'utilisateurs
  res.status(200).json(users);
});
