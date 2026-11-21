import fs from 'node:fs'; // Deshace lo que la configuración de Trabajo Agéntico conectó a Claude y a Codex en este computador: quita los enlaces a sus habilidades, el enlace de Codex y la línea de Claude, y devuelve lo que había antes, después de que el usuario lo apruebe en una ventana de Windows. No toca la carpeta de Trabajo Agéntico.
import path from 'node:path';
import { CarpetaHabilidades, CarpetasDeEnlaces, ComprobarWindows, DestinoDeEnlace, Escribir, EsEnlaceAHabilidadDeAquí,
	EsEnlaceRotoAHabilidadDeOtraCarpeta, Fallar, InicioDelConstruido, LeerEstadoCodex, LíneaClaude, NombreDeRespaldo, Raíz, Respaldos,
	RutaClaude, RutaCodex, RutaPersonal, Ventana, VentanaDeOpciones } from './Común.mjs'; // Lo que comparte con Instalar.mjs.


ComprobarWindows(Detener);

const EstadoCodex = LeerEstadoCodex(); // Cómo está hoy el AGENTS.md de Codex.
const HayEnlace = EstadoCodex === 'enlazado'; // El enlace que creó la instalación, al AGENTS.md construido de esta carpeta. Un enlace roto a otro lugar no cuenta, porque no se puede saber de quién es, y no se toca.
const EnlaceDeOtraCarpeta = EstadoCodex === 'enlaceRoto' && /[\\/]Locales[\\/]AGENTS\.md$/i.test(DestinoDeEnlace(RutaCodex)); // Un enlace roto a un AGENTS.md construido en otra carpeta, como queda al moverla. Parece de Trabajo Agéntico, pero no se puede comprobar, así que solo se avisa.
const EsCopiaDelConstruido = EstadoCodex === 'archivo' && fs.readFileSync(RutaCodex, 'utf8').startsWith(InicioDelConstruido); // Pasa si Codex reemplazó el enlace por una copia del archivo, por ejemplo al editarlo desde su configuración.
const RespaldoCodex = NombreDeRespaldo(RutaCodex); // Donde queda esa copia, que no se borra porque el usuario le pudo agregar reglas.
const RespaldoOriginal = Respaldos(RutaCodex).find(EsRespaldoPropio); // El AGENTS.md que el usuario tenía en Codex antes de instalar por primera vez. Si hay otros, como el que queda al volver a instalar después de quedarse con lo de Agents Personal.md, siguen guardados, pero no se ofrecen, porque Agents Personal.md ya los cubre.
const TextoOriginal = RespaldoOriginal === undefined ? '' : fs.readFileSync(RespaldoOriginal, 'utf8').trim();
const ContenidoPersonal = fs.existsSync(RutaPersonal) ? fs.readFileSync(RutaPersonal, 'utf8') : '';
const PersonalCambió = ContenidoPersonal.trim() !== '' && ContenidoPersonal.trim() !== TextoOriginal; // Si es igual al respaldo original, es lo que la instalación copió de él, sin cambios, y basta con devolver ese respaldo.
const TocarCodex = HayEnlace || EsCopiaDelConstruido || (EstadoCodex === 'falta' && RespaldoOriginal !== undefined); // Lo que el usuario puso en Codex, un archivo suyo o un enlace a otro archivo, no se toca. Si no hay nada, se devuelve su respaldo, si lo hay.
const OpcionesCodex = []; // Lo que puede quedar en el AGENTS.md de Codex, con un texto corto, para elegirlo en la ventana, y uno largo, para la lista de lo que se va a hacer. Son a lo sumo dos: lo de Agents Personal.md, si cambió después de instalar, que va primero y está elegido de forma predeterminada porque son las reglas más recientes del usuario, y lo de antes de instalar.
if (TocarCodex) {

	if (PersonalCambió) OpcionesCodex.push({
		tipo: 'personal', corta: `Uno con tus reglas de ${path.relative(Raíz, RutaPersonal)}, modificadas el ${Fecha(RutaPersonal)}`,
		larga: `Tu AGENTS.md de Codex pasa a ser una copia de tus reglas de ${RutaPersonal}, modificadas el ${Fecha(RutaPersonal)}, sin lo de Trabajo Agéntico.`,
	});
	if (RespaldoOriginal !== undefined) OpcionesCodex.push({
		tipo: 'respaldo', ruta: RespaldoOriginal,
		corta: `El de antes de instalar, guardado en ${path.basename(RespaldoOriginal)}, modificado el ${Fecha(RespaldoOriginal)}`,
		larga: `Tu AGENTS.md de Codex vuelve a ser el de antes de instalar, modificado el ${Fecha(RespaldoOriginal)}, que estaba guardado en ${RespaldoOriginal}.`,
	});
	if (RespaldoOriginal === undefined) OpcionesCodex.push({
		tipo: 'ninguno', corta: 'Ninguno, como antes de instalar', larga: 'Codex queda sin AGENTS.md, como estaba antes de instalar.',
	});

}
const AccionesCodex = []; // Lo que se le hace a lo que hay hoy en el AGENTS.md de Codex, para mostrárselo al usuario.
if (EstadoCodex === 'enlazado') AccionesCodex.push('Se quita el enlace de Codex al AGENTS.md de Trabajo Agéntico.');
if (EsCopiaDelConstruido) AccionesCodex.push(
	`Tu AGENTS.md de Codex es una copia del de Trabajo Agéntico, y queda como respaldo en ${RespaldoCodex}, por si le agregaste algo.`);
if (!TocarCodex && EstadoCodex !== 'falta' && !EnlaceDeOtraCarpeta) AccionesCodex.push(
	'Tu AGENTS.md de Codex no se toca, porque no es de Trabajo Agéntico.');

const ContenidoClaude = fs.existsSync(RutaClaude) ? fs.readFileSync(RutaClaude, 'utf8') : ''; // Vacío si el usuario no tiene CLAUDE.md.
const TieneLínea = ContenidoClaude.split(/\r?\n/).some(línea => línea.trim() === LíneaClaude);
const LíneasDeOtraCarpeta = ContenidoClaude.split(/\r?\n/).map(línea => línea.trim()) // Las que traen un AGENTS.md construido en otra carpeta, como queda al moverla. Se avisa de ellas, pero no se quitan, porque no se puede comprobar de quién son.
	.filter(línea => línea !== LíneaClaude && /^@.+\/Locales\/AGENTS\.md$/i.test(línea));
const ClaudeSinLínea = QuitarLínea(ContenidoClaude);
const RespaldosClaude = Respaldos(RutaClaude);
const RespaldoIgualDeClaude = RespaldosClaude.find(respaldo => fs.readFileSync(respaldo, 'utf8') === ClaudeSinLínea); // El CLAUDE.md de antes de instalar, si el usuario no lo ha cambiado desde entonces.
const AcciónClaude = ElegirAcciónClaude(); // Qué se hace con el CLAUDE.md, y su texto para el usuario.

const EnlacesEnCarpetasDeHabilidades = CarpetasDeEnlaces // Los enlaces que hay donde Claude y Codex buscan sus habilidades.
	.flatMap(carpeta => (fs.existsSync(carpeta) ? fs.readdirSync(carpeta) : []).map(nombre => path.join(carpeta, nombre)))
	.filter(ruta => fs.lstatSync(ruta).isSymbolicLink());
const EnlacesDeHabilidades = EnlacesEnCarpetasDeHabilidades.filter(EsEnlaceAHabilidadDeAquí); // Los que se quitan. Las demás habilidades del usuario no se tocan.
const HabilidadesDeOtraCarpeta = EnlacesEnCarpetasDeHabilidades.filter(EsEnlaceRotoAHabilidadDeOtraCarpeta); // Los que quedaron de otra carpeta de Trabajo Agéntico, como al moverla. Solo se avisa de ellos.
const CarpetasConEnlaces = [...new Set(EnlacesDeHabilidades.map(enlace => path.dirname(enlace)))]; // Las carpetas de Claude y de Codex que tienen enlaces a las habilidades de aquí.
const AcciónHabilidades = EnlacesDeHabilidades.length === 0 ? null : // Qué se hace con los enlaces de las habilidades, para mostrárselo al usuario.
	`Se quitan los enlaces a las habilidades de Trabajo Agéntico que hay en ${CarpetasConEnlaces.join(' y en ')}. Las habilidades no se borran: siguen en ${CarpetaHabilidades}.`;

const Avisos = []; // Lo que parece de Trabajo Agéntico en otra carpeta y no se toca. Va en las ventanas y en el mensaje final, para no decir que se terminó sin nombrarlo.
if (EnlaceDeOtraCarpeta) Avisos.push(`Tu ${RutaCodex}, que es un enlace roto a ${DestinoDeEnlace(RutaCodex)}.`);
for (const línea of LíneasDeOtraCarpeta) Avisos.push(`La línea ${línea} de tu ${RutaClaude}.`);
for (const carpeta of new Set(HabilidadesDeOtraCarpeta.map(enlace => path.dirname(enlace)))) {
	const nombres = HabilidadesDeOtraCarpeta.filter(enlace => path.dirname(enlace) === carpeta).map(enlace => path.basename(enlace));
	Avisos.push(`En ${carpeta}, los enlaces rotos a las habilidades de otra carpeta: ${nombres.join(', ')}.`);
}
const TextoDeAvisos = Avisos.length === 0 ? '' : Mensaje(
	'Esto parece de Trabajo Agéntico en otra carpeta, como queda al moverla, y no lo toco, porque no puedo comprobar que sea de esta instalación:',
	Avisos,
	'Si es de una instalación anterior, quítalo a mano y vuelve a correr este programa, que devuelve los respaldos que haya.');

const Introducción = 'Trabajo Agéntico va a devolver tu computador a como estaba antes de instalarlo:';
const Pregunta = Mensaje(Introducción, [...AccionesCodex, OpcionesCodex[0]?.larga, AcciónClaude.texto, AcciónHabilidades], // Para cuando no hay nada que elegir, porque Codex tiene una sola opción o no se toca.
	TextoDeAvisos, 'No se borra nada tuyo. ¿Quieres continuar?');
const HayQueRestaurar = TocarCodex || AcciónClaude.tipo !== 'nada' || EnlacesDeHabilidades.length > 0; // Si hay algo de esta instalación que deshacer.

if (!HayQueRestaurar && Avisos.length === 0) {
	console.log(
		'No había nada que restaurar: ni el AGENTS.md de Codex ni el CLAUDE.md tienen nada de Trabajo Agéntico, y no hay enlaces a sus habilidades.');
} else if (!HayQueRestaurar) {

	const mensaje = Mensaje('No hay nada de esta instalación de Trabajo Agéntico que restaurar.', [], TextoDeAvisos);
	console.log(mensaje);
	Ventana(mensaje, 'OK', 'Warning'); // Con un aviso, y no solo en la consola, porque el usuario tiene que quitar eso a mano.

} else if (OpcionesCodex.length > 1) {

	const pregunta = Mensaje(Introducción, [...AccionesCodex, AcciónClaude.texto, AcciónHabilidades],
		TextoDeAvisos, 'No se borra nada tuyo. ¿Qué AGENTS.md quieres que quede en Codex?');
	const elegida = VentanaDeOpciones(pregunta, OpcionesCodex.map(opción => opción.corta), 'Restaurar');
	if (elegida === null) {
		console.log('No se cambió nada, porque el usuario eligió Cancelar.');
	} else {
		Restaurar(OpcionesCodex[elegida]);
	}

} else if (Ventana(Pregunta, 'YesNo', 'Question') === 'Yes') {
	Restaurar(OpcionesCodex[0]); // Sin opciones, si Codex no se toca.
} else {
	console.log('No se cambió nada, porque el usuario eligió No.');
}


function Restaurar(opción) { // Hace los cambios que aprobó el usuario, con lo que eligió para Codex, y le muestra cómo quedó, con los respaldos que siguen guardados.

	if (TocarCodex) RestaurarCodex(opción);
	RestaurarClaude();
	for (const enlace of EnlacesDeHabilidades) fs.unlinkSync(enlace); // Quita solo el enlace: la habilidad sigue en su carpeta, dentro de Trabajo Agéntico.
	const quedan = [...Respaldos(RutaCodex), ...Respaldos(RutaClaude)].map(respaldo => `• ${respaldo}`).join('\n');
	const respaldos = quedan === '' ? '' : `Quedan estos respaldos, que puedes borrar si ya no los necesitas:\n\n${quedan}`;
	const mensaje = Mensaje('Listo. Así quedó:', [...AccionesCodex, opción?.larga, AcciónClaude.texto, AcciónHabilidades],
		TextoDeAvisos, respaldos, 'Reinicia Claude y Codex para aplicar los cambios.');
	console.log(mensaje);
	Ventana(mensaje, 'OK', 'Information');

}


function RestaurarCodex(opción) { // Quita lo de Trabajo Agéntico del AGENTS.md de Codex y pone en su lugar lo que eligió el usuario.

	if (HayEnlace) fs.unlinkSync(RutaCodex); // Borra solo el enlace, y el AGENTS.md de Trabajo Agéntico queda intacto.
	if (EsCopiaDelConstruido) fs.renameSync(RutaCodex, RespaldoCodex);
	switch (opción.tipo) {

		case 'respaldo':
			fs.renameSync(opción.ruta, RutaCodex); // Vuelve con su contenido y su fecha, y deja de ser un respaldo.
			break;
		case 'personal':
			Escribir(RutaCodex, ContenidoPersonal);
			break;
		case 'ninguno':
			break;
		default:
			throw new Error(`Opción desconocida para Codex: ${opción.tipo}.`);

	}

}


function RestaurarClaude() { // Le quita al CLAUDE.md lo de Trabajo Agéntico, como decidió ElegirAcciónClaude.

	switch (AcciónClaude.tipo) {

		case 'respaldo':
			fs.renameSync(RespaldoIgualDeClaude, RutaClaude); // Reemplaza al de hoy, que es igual pero con la línea, y deja de ser un respaldo.
			break;
		case 'borrar':
			fs.unlinkSync(RutaClaude);
			break;
		case 'quitarLínea':
			Escribir(RutaClaude, ClaudeSinLínea);
			break;
		case 'nada':
			break;
		default:
			throw new Error(`Acción desconocida para Claude: ${AcciónClaude.tipo}.`);

	}

}


function ElegirAcciónClaude() { // Qué hacer con el CLAUDE.md. Si sin la línea es igual a un respaldo, vuelve ese respaldo, con su fecha. Si solo tiene la línea y no hay respaldo, lo creó la instalación, y se borra. Si no, solo se le quita la línea, para no perder lo que el usuario cambió después de instalar.

	if (!TieneLínea) {
		return { tipo: 'nada', texto: null };
	} else if (RespaldoIgualDeClaude !== undefined) {
		return { tipo: 'respaldo',
			texto: `Tu ${RutaClaude} vuelve a ser el de antes de instalar, sin la línea de Trabajo Agéntico.` };
	} else if (ClaudeSinLínea.trim() === '' && RespaldosClaude.length === 0) {
		return { tipo: 'borrar',
			texto: `Se borra ${RutaClaude}, porque lo creó la instalación y solo tiene la línea de Trabajo Agéntico.` };
	} else {
		return { tipo: 'quitarLínea',
			texto: `A tu ${RutaClaude} se le quita la línea de Trabajo Agéntico, y lo demás queda como está.` };
	}

}


function QuitarLínea(contenido) { // Le quita al CLAUDE.md la línea de Trabajo Agéntico. Si sigue al principio, como la dejó la instalación, se va con la línea en blanco que la separaba de lo demás, y si no, se quita donde esté.

	const alPrincipio = LíneaClaude + (contenido.includes('\r\n') ? '\r\n\r\n' : '\n\n'); // Con los saltos de línea que usa el archivo, como hace la instalación.
	if (contenido.startsWith(alPrincipio)) {
		return contenido.slice(alPrincipio.length);
	} else {
		return contenido.split(/(?<=\n)/).filter(línea => línea.trim() !== LíneaClaude).join(''); // Parte el texto después de cada salto de línea, para que cada renglón se lleve el suyo.
	}

}


function EsRespaldoPropio(respaldo) { // Si un respaldo del AGENTS.md de Codex es del usuario: un archivo que no es una copia del construido. Un enlace solo se respalda si estaba roto, así que no hay nada que devolver.
	return fs.lstatSync(respaldo).isFile() && !fs.readFileSync(respaldo, 'utf8').startsWith(InicioDelConstruido);
}


function Fecha(ruta) { // Cuándo cambió por última vez el contenido de un archivo, como 12 de octubre de 2026 a las 15:45. Un respaldo la conserva, porque se hace cambiándole el nombre al archivo.
	return fs.statSync(ruta).mtime.toLocaleString('es', { dateStyle: 'long', timeStyle: 'short' });
}


function Mensaje(inicio, acciones, ...finales) { // El texto de una ventana: el inicio, la lista de lo que se hace y los párrafos del final, sin los que no aplican, que llegan vacíos.
	return [inicio, ...acciones.filter(Boolean).map(acción => `• ${acción}`), ...finales.filter(Boolean)].join('\n\n');
}


function Detener(motivo) { // Falla con ruido, como hace Fallar, y dice que lo que no se pudo fue restaurar.
	Fallar(`No se pudo restaurar: ${motivo}`);
}
