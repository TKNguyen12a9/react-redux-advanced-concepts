const User = require("../models/user")

exports.signup = function (req, res, next) {
	const email = req.body.email
	const password = req.body.password

	User.findOne({ email: email }, (err, existingUser) => {
		if (err) return next(err)
		if (existingUser) {
			return res.status(422).send({ error: "Email is in use" })
		}

		const newUser = new User({
			email: email,
			password: password,
		})

		newUser.save(err => {
			if (err) {
				return next(err)
			}
			res.json(newUser)
		})
	})
}
