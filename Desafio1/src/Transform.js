const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
const Transform = require('./app/model/Transform');

Array.prototype.remove = function() {
	let what,
		a = arguments,
		L = a.length,
		ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
String.prototype.replaceAll = function(de, para) {
	var str = this;
	var pos = str.indexOf(de);
	while (pos > -1) {
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
	return str;
};

function validarArquivo(arquivo) {
	const transform = fs.readFileSync(__dirname + arquivo, 'utf-8');
	let format = transform.split(' ');
	format.remove('');
	let valor;
	format.forEach((value, key) => {
		if (key == 0) {
			valor = 'classifier description openingBalance debit credit finalBalance' + '\r\n' + value;
		} else {
			valor = valor + ' ' + value;
		}
	});
	saved = fs.writeFileSync(__dirname + '/archive/Desafio1_temp.csv', valor, 'utf8');
	return __dirname + '/archive/Desafio1_temp.csv';
}
module.exports = function comporJson(arquivo) {
	let fileInputName = validarArquivo(arquivo);
	let json = csvToJson.fieldDelimiter(' ').getJsonFromCsv(fileInputName);
	json.forEach(async (value, key) => {
		try {
			await Transform.create(value);
		} catch (err) {
			console.log({ erro: 'Erro ao Salvar os dados! ', err });
		}
	});
	return json;
};
