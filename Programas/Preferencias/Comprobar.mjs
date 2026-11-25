import fs from 'node:fs'; // Comprueba Locales/Preferencias.json, con lo que cada Director decide distinto: la familia del modelo y el razonamiento de cada papel, las paradas del flujo, las vueltas máximas de los revisores, si se hacen las pruebas gemelas, desde cuántas líneas una pieza de un paso va en su propia etapa y si las habilidades de diseño sugieren conectar sus MCP gratis. Lo corren Instalar.mjs y las habilidades al empezar. Si algo está mal, lo dice todo y sale con el código 1. Si recibe el modelo y el razonamiento de la sesión, también comprueba que sean los que las preferencias le piden al Líder, y si no, sale con el código 2.
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const Carpeta = path.dirname(fileURLToPath(import.meta.url)); // Programas/Preferencias, la carpeta de este archivo y de Modelos.json.
const Raíz = path.resolve(Carpeta, '..', '..'); // La carpeta de Trabajo Agéntico, dos niveles arriba de Programas/Preferencias.
const Programas = LeerJson(path.join(Carpeta, 'Modelos.json'), 'Modelos.json tiene problemas:'); // Lo que Trabajo Agéntico acepta de cada programa, según Modelos.json: sus familias, como opus o sol, cada una con el nombre exacto de su versión de hoy, y sus niveles de razonamiento, sacados de la ayuda de Claude y de la configuración de Codex, menos ultra, que reparte el trabajo entre varios agentes y gasta mucho más tiempo y cupo. Las preferencias dicen la familia y no el nombre exacto, que cambia con cada versión, para que al salir una nueva se cambie solo Modelos.json, una vez para todos los Directores.
const Papeles = ['Líder', 'Implementador', 'RevisorEtapa', 'RevisorPrincipal']; // Los papeles de cada programa.
const PapelesConPrograma = ['RevisorEtapa', 'RevisorPrincipal']; // Los revisores dicen además de qué programa son, porque se llaman por la terminal y pueden ser de cualquiera: si son del mismo programa de su sección, no hay revisor externo. El Líder es la sesión y el Implementador es un agente suyo, así que son del programa de su sección.
const Paradas = ['RevisarLasPruebas', 'AprobarElPlan', 'RevisarCadaEtapa', 'AprobarAntesDeSubir']; // Las paradas del Director en el flujo. Todas se pueden apagar, salvo la de antes de subir.
const VueltasMáximas = ['RevisorPlan', 'RevisorPruebas', 'RevisorEtapa', 'RevisorPuerta', 'RevisorFinal', 'RevisarYCorregir']; // Los revisores con vueltas máximas: cuántas veces vuelve a revisar cada uno mientras siga encontrando algo bloqueante. El Revisor de Etapa es el mismo en un paso y en un cambio, y RevisarYCorregir es el techo de la habilidad del mismo nombre.
const Argumentos = LeerArgumentos(process.argv.slice(2));
const RutaPreferencias = Argumentos.archivo ?? path.join(Raíz, 'Locales', 'Preferencias.json'); // --archivo sirve para probar el programa con otra copia.
const Errores = []; // Todo lo que está mal, para decirlo de una vez y no de a uno por corrida.

if (!fs.existsSync(RutaPreferencias)) Detener('Faltan las preferencias:',
	[`No existe ${RutaPreferencias}. Créalo copiando la plantilla de Plantillas/ que aplica a tus suscripciones, como dice Configuración.md.`], 1);

const Preferencias = LeerJson(RutaPreferencias, 'Las preferencias tienen problemas:');
if (ComprobarClaves(Preferencias, ['Modelos', 'Paradas', 'VueltasMáximas', 'PruebasGemelas', 'LíneasParaEtapaPropia',
	'SugerirMcpDiseño'], 'el archivo')) {

	ComprobarModelos(Preferencias.Modelos);
	ComprobarParadas(Preferencias.Paradas);
	ComprobarVueltasMáximas(Preferencias.VueltasMáximas);
	if ('PruebasGemelas' in Preferencias && typeof Preferencias.PruebasGemelas !== 'boolean') Errores.push( // Las gemelas se hacen o no, como una parada se enciende o se apaga. Si falta la clave, ya lo dijo ComprobarClaves.
		'En PruebasGemelas tiene que haber true, para que el Líder las haga después de cada etapa, o false, para no hacerlas.');
	if ('LíneasParaEtapaPropia' in Preferencias) ComprobarLíneasParaEtapaPropia(Preferencias.LíneasParaEtapaPropia); // Si falta la clave, ya lo dijo ComprobarClaves.
	if ('SugerirMcpDiseño' in Preferencias && typeof Preferencias.SugerirMcpDiseño !== 'boolean') Errores.push( // Se sugiere o no, como una parada se enciende o se apaga. El Director la apaga al decir que no, para que no se le vuelva a preguntar en este computador. Si falta la clave, ya lo dijo ComprobarClaves.
		'En SugerirMcpDiseño tiene que haber true, para que las habilidades de diseño sugieran conectar sus MCP gratis si faltan, o false, para no sugerirlo.');

}
if (Errores.length > 0) Detener('Las preferencias tienen problemas:', Errores, 1);
if (Argumentos.modelo !== undefined) ComprobarSesión(Argumentos.modelo, Argumentos.razonamiento);
console.log(Resumen());


function LeerArgumentos(argumentos) { // Lee --archivo, --modelo y --razonamiento, cada uno seguido de su valor. El modelo y el razonamiento son los de la sesión del Líder, y van juntos.

	const leídos = {};
	for (let i = 0; i < argumentos.length; i += 2) {

		const nombre = argumentos[i].startsWith('--') ? argumentos[i].slice(2) : null; // Sin los dos guiones, o null si no los tiene.
		const valor = argumentos[i + 1];
		if (!['archivo', 'modelo', 'razonamiento'].includes(nombre) || valor === undefined) Detener('No entendí cómo me llamaron:',
			[`${argumentos[i]} no se conoce o le falta su valor. Se usa con --modelo y --razonamiento, y si se prueba otra copia, con --archivo.`], 1);
		leídos[nombre] = valor;

	}
	if ((leídos.modelo === undefined) !== (leídos.razonamiento === undefined)) Detener('No entendí cómo me llamaron:',
		['--modelo y --razonamiento van juntos: son el modelo y el razonamiento de la sesión del Líder.'], 1);
	return leídos;

}


function LeerJson(ruta, título) { // Lee el archivo como JSON, sea Modelos.json o las preferencias. Si no es un JSON válido, se detiene con el título de su archivo y el mensaje de JSON.parse, que dice dónde está la falla.

	try {
		return JSON.parse(fs.readFileSync(ruta, 'utf8'));
	} catch (error) {
		Detener(título, [`${ruta} no es un JSON válido: ${error.message}`], 1);
	}

}


function ComprobarClaves(valor, claves, dónde) { // Comprueba que el valor sea un objeto con justo esas claves: las que faltan y las que sobran son errores. Devuelve si es un objeto, para seguir comprobando adentro.

	const esObjeto = typeof valor === 'object' && valor !== null && !Array.isArray(valor);
	if (!esObjeto) {
		Errores.push(`En ${dónde} tiene que haber un objeto con ${claves.join(', ')}.`);
	} else {

		const faltan = claves.filter(clave => !(clave in valor));
		const sobran = Object.keys(valor).filter(clave => !claves.includes(clave));
		if (faltan.length > 0) Errores.push(`En ${dónde} falta ${faltan.join(', ')}.`);
		if (sobran.length > 0) Errores.push(`En ${dónde} sobra ${sobran.join(', ')}, porque solo puede tener ${claves.join(', ')}.`);

	}
	return esObjeto;

}


function ComprobarModelos(modelos) { // Comprueba la sección de cada programa: sus cuatro papeles, cada uno con una familia de su programa y un razonamiento que ese programa acepte.

	const esObjeto = typeof modelos === 'object' && modelos !== null && !Array.isArray(modelos);
	const programas = esObjeto ? Object.keys(modelos) : [];
	if (programas.length === 0) Errores.push(
		`En Modelos tiene que haber al menos una sección, de ${Object.keys(Programas).join(' o de ')}.`);
	for (const programa of programas) {

		if (!Object.hasOwn(Programas, programa)) {
			Errores.push(
				`En Modelos sobra ${programa}, porque solo puede haber secciones de ${Object.keys(Programas).join(' y de ')}.`);
		} else if (ComprobarClaves(modelos[programa], Papeles, `Modelos.${programa}`)) {
			for (const papel of Papeles.filter(p => p in modelos[programa])) ComprobarPapel(programa, papel, modelos[programa][papel]);
		}

	}

}


function ComprobarPapel(programa, papel, valor) { // Comprueba un papel. Los revisores dicen de qué programa son, y los demás son del programa de su sección, porque los corre la misma sesión.

	const dónde = `Modelos.${programa}.${papel}`;
	const conPrograma = PapelesConPrograma.includes(papel);
	const claves = conPrograma ? ['Programa', 'Modelo', 'Razonamiento'] : ['Modelo', 'Razonamiento'];
	if (ComprobarClaves(valor, claves, dónde)) {

		const delPrograma = conPrograma ? valor.Programa : programa;
		if (typeof delPrograma !== 'string' || !Object.hasOwn(Programas, delPrograma)) { // Sin el tipo, una lista como ['Claude'] pasaría, porque se vuelve texto al buscarla, y sin hasOwn también pasaría un nombre heredado, como toString.
			Errores.push( // El valor va con JSON.stringify para que se vea como está en el archivo: una lista con sus corchetes, como ['Claude'], y un texto con sus comillas y sus espacios.
				`En ${dónde}, el programa ${JSON.stringify(delPrograma)} no se conoce, porque tiene que ser ${Object.keys(Programas).join(' o ')}.`);
		} else {
			ComprobarModelo(delPrograma, valor.Modelo, valor.Razonamiento, dónde);
		}

	}

}


function ComprobarModelo(programa, familia, razonamiento, dónde) { // Comprueba que la familia sea una de las del programa en Modelos.json y que ese razonamiento sea de los que Trabajo Agéntico acepta en el programa.

	const { Familias: familias, Razonamientos: razonamientos } = Programas[programa];
	if (typeof familia !== 'string' || !Object.hasOwn(familias, familia)) Errores.push( // Sin el tipo, una lista como ['opus'] pasaría, porque se vuelve texto al buscarla, y sin hasOwn también pasaría un nombre heredado, como toString. Los valores van con JSON.stringify, como en ComprobarPapel, para que se vea un espacio de más o una lista donde va un texto.
		`En ${dónde}, el modelo ${JSON.stringify(familia)} no es una familia de ${programa}: tiene que ser ${Object.keys(familias).join(', ')}, y su nombre exacto lo pone Programas/Preferencias/Modelos.json.`);
	if (!razonamientos.includes(razonamiento)) Errores.push(
		`En ${dónde}, el razonamiento ${JSON.stringify(razonamiento)} no es de los que Trabajo Agéntico acepta en ${programa}: tiene que ser ${razonamientos.join(', ')}.`);

}


function ComprobarParadas(paradas) { // Comprueba que estén las cuatro paradas, encendidas o apagadas, y que la de antes de subir esté encendida.

	if (ComprobarClaves(paradas, Paradas, 'Paradas')) {

		for (const parada of Paradas.filter(p => p in paradas && typeof paradas[p] !== 'boolean')) Errores.push(
			`En Paradas.${parada} tiene que haber true, para encenderla, o false, para apagarla.`);
		if (paradas.AprobarAntesDeSubir === false) Errores.push(
			'La parada de antes de subir, Paradas.AprobarAntesDeSubir, está apagada, y Trabajo Agéntico no la deja apagar: nada se sube a GitHub sin la aprobación del Director, porque es uno de sus pilares. Si de verdad la quieres apagar, tienes que cambiar este programa, Programas/Preferencias/Comprobar.mjs.');

	}

}


function ComprobarVueltasMáximas(vueltas) { // Comprueba que estén las vueltas máximas de los cinco revisores y de revisar-y-corregir, cada una un número entero de 1 en adelante, para que ninguna revisión se apague sin querer con un 0.

	if (ComprobarClaves(vueltas, VueltasMáximas, 'VueltasMáximas')) {

		const revisoresInválidos = VueltasMáximas.filter(r => r in vueltas && !(Number.isInteger(vueltas[r]) && vueltas[r] >= 1)); // Los que tienen algo que no es un número entero de 1 en adelante, como 0, 2.5, '3' o true.
		for (const revisor of revisoresInválidos) Errores.push(
			`En VueltasMáximas.${revisor} tiene que haber un número entero de 1 en adelante, que son las vueltas que puede dar como máximo, y hay ${JSON.stringify(vueltas[revisor])}.`);

	}

}


function ComprobarLíneasParaEtapaPropia(líneas) { // Comprueba que las líneas desde las que una pieza de un paso va en su propia etapa sean un número entero de 1 en adelante, como las vueltas máximas, porque con un 0 cada pieza iría en su propia etapa.
	if (!(Number.isInteger(líneas) && líneas >= 1)) Errores.push( // Lo que no es un número entero de 1 en adelante, como 0, 250.5, '300' o true.
		`En LíneasParaEtapaPropia tiene que haber un número entero de 1 en adelante, que son las líneas desde las que una pieza de un paso va en su propia etapa, y hay ${JSON.stringify(líneas)}.`);
}


function ComprobarSesión(modelo, razonamiento) { // Comprueba que la sesión que lidera sea la que piden las preferencias: la versión de hoy de la familia del Líder, según Modelos.json, con su razonamiento. Si no, sale con el código 2, para que la habilidad le ofrezca al Director cambiar el modelo o el razonamiento en la ventana de su programa, o cambiar las preferencias.

	const programa = Object.keys(Programas).find(nombre => Object.values(Programas[nombre].Familias).includes(modelo)); // El programa que tiene ese modelo entre sus versiones de hoy. Una versión vieja no la tiene ninguno, y tampoco puede ser la que piden.
	const líder = programa === undefined ? undefined : Preferencias.Modelos[programa]?.Líder;
	const título = 'La sesión no es la que piden las preferencias:';
	if (programa === undefined) {

		const pedidos = Object.entries(Preferencias.Modelos).map(([nombre, papeles]) => // Lo que piden para el Líder en cada sección, para que el Director sepa qué escoger en la ventana de su programa.
			`${Describir(nombre, papeles.Líder)} en ${nombre}`);
		Detener(título,
			[`El modelo ${modelo} no es la versión de hoy de ninguna familia de Programas/Preferencias/Modelos.json. Pasa el nombre completo del modelo, y si es una versión más nueva, actualiza Modelos.json. Las preferencias le piden al Líder ${pedidos.join(', o ')}.`], 2);

	} else if (líder === undefined) {
		Detener(título,
			[`La sesión es de ${programa}, y Locales/Preferencias.json no tiene su sección. Abre un programa que sí la tenga, o agrégale su sección a las preferencias.`], 2);
	} else if (Programas[programa].Familias[líder.Modelo] !== modelo || líder.Razonamiento !== razonamiento) {
		Detener(título,
			[`La sesión es ${modelo} con ${razonamiento}, y las preferencias le piden al Líder ${Describir(programa, líder)}. Cambia el modelo o el razonamiento en la ventana de ${programa}, o cambia Locales/Preferencias.json.`], 2);
	}

}


function Resumen() { // Lo que dicen las preferencias, en pocas líneas, para que la habilidad lo tenga a la vista sin volver a leer el archivo.

	const líneas = ['Las preferencias están bien.'];
	if (Argumentos.modelo !== undefined) líneas.push(
		`La sesión, ${Argumentos.modelo} con ${Argumentos.razonamiento}, es la que piden para el Líder.`);
	for (const [programa, papeles] of Object.entries(Preferencias.Modelos)) {

		const { Líder: líder, Implementador: implementador, RevisorEtapa: revisorEtapa, RevisorPrincipal: revisorPrincipal } = papeles;
		const origen = r => r.Programa === programa ? 'del mismo programa' : `de ${r.Programa}`; // Un revisor del mismo programa de la sección no es un revisor externo.
		líneas.push(
			`Con ${programa}: el Líder usa ${Describir(programa, líder)}, el Implementador usa ${Describir(programa, implementador)}, el Revisor de Etapa es ${origen(revisorEtapa)} y usa ${Describir(revisorEtapa.Programa, revisorEtapa)}, y el Revisor Principal es ${origen(revisorPrincipal)} y usa ${Describir(revisorPrincipal.Programa, revisorPrincipal)}.`);

	}
	const encendidas = Paradas.filter(parada => Preferencias.Paradas[parada]);
	const apagadas = Paradas.filter(parada => !Preferencias.Paradas[parada]);
	líneas.push(`Paradas encendidas: ${encendidas.join(', ')}. Apagadas: ${apagadas.length > 0 ? apagadas.join(', ') : 'ninguna'}.`);
	líneas.push(
		`Vueltas máximas de los revisores: ${VueltasMáximas.map(revisor => `${revisor} ${Preferencias.VueltasMáximas[revisor]}`).join(', ')}.`);
	líneas.push(`Pruebas gemelas: ${Preferencias.PruebasGemelas ? 'encendidas' : 'apagadas'}.`);
	líneas.push(
		`Líneas para una etapa propia: una pieza de un paso va en su propia etapa desde unas ${Preferencias.LíneasParaEtapaPropia} líneas.`);
	líneas.push(`Sugerencia de los MCP de diseño: ${Preferencias.SugerirMcpDiseño ? 'encendida' : 'apagada'}.`);
	líneas.push(
		'Ojo: el razonamiento se comprueba por programa y no por modelo. Si un modelo no tiene ese nivel, su programa puede usar uno menor.');
	return líneas.join('\n');

}


function Describir(programa, papel) { // La familia de un papel con su nombre exacto de hoy y su razonamiento, como opus (claude-opus-5-5) con xhigh. El nombre exacto es el que se usa con Codex, que no entiende la familia, y al llamar a los revisores por la terminal.
	return `${papel.Modelo} (${Programas[programa].Familias[papel.Modelo]}) con ${papel.Razonamiento}`;
}


function Detener(título, errores, código) { // Falla con ruido: dice todo lo que está mal y sale con su código, 1 si las preferencias están mal y 2 si la sesión no es la que piden.
	console.error([título, ...errores.map(error => `- ${error}`)].join('\n'));
	process.exit(código);
}
