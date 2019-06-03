const router = require('express').Router();
const Transform = require('../model/Transform.js');
const auth = require('../../middleware/auth');
const tl = require('../../Transform');

router.use(auth);

router.post('/', async (req, res) => {
	try {
		const value = await Transform.create(req.body);
		return res.status(200).send({ value });
	} catch (err) {
		res.status(400).send({ erro: 'Erro ao Salvar os dados! ', err });
	}
});

router.get('/', async (req, res) => {
	const data = tl('/archive/Desafio1.txt');
	if (!data) res.status(404).send('Nenhuma informação encontrada.');
	res.status(200).send(data);
});
router.get('/:description', async (req, res) => {
	const { description } = req.params;
	const data = tl('/archive/Desafio1.txt');
	let valor = [];
	await data.forEach((value, key) => {
		if (value.description == description) valor.push(value);
	});
	res.status(200).send(valor);
});

module.exports = (app) => app.use('/transform', router);
