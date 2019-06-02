const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 432000
	});
}

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body);
		user.password = undefined;
		return res.status(200).send({ Id: user.id, Token: generateToken({ id: user.id }) });
	} catch (err) {
		res.status(400).send({ Erro: err });
	}
});

router.post('/authenticate', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select('+password');
	if (!user) return res.status(401).send({ Erro: 'Usuario não encontrado.' });

	if (!await bcrypt.compare(password, user.password)) return res.status(401).send({ Erro: 'Senha Invalida.' });

	user.password = undefined;

	res.status(200).send({ Usuario: user.name, token: generateToken({ id: user.id }) });
});

module.exports = (app) => app.use('/user', router);
