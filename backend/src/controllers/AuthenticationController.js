const AuthenticationService = require('../services/AuthenticationService');
const bcrypt = require('bcrypt');

class AuthenticationController {
  constructor() {
  }

  login(req, res) {
    // Used for getting the password hashed
    // const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    // console.log(hashedPassword);

    return AuthenticationService.checkEmail(req.body.email)
      .then((result) => {
        if (result) {
          if (bcrypt.compareSync(req.body.password, result.password)) {
            const data = {
              email: result.email,
              admin: result.admin
            }
            return res.json(data);
          } else {
            throw (res.status(400).send({ error: "Incorrect password." }));
          }
        } else {
          throw (res.status(400).send({ error: "Email not found." }));
        }
      })
      .catch(err => err)
  }
}

module.exports = new AuthenticationController();