import { execFileSync, spawnSync } from 'node:child_process'; // Instala Trabajo Agéntico en este computador: comprueba sus preferencias, guarda el AGENTS.md que ya había, enlaza el de Codex, agrega la línea de Claude y enlaza las habilidades en Claude y en Codex, después de que el usuario lo apruebe en una ventana de Windows.
import fs from 'node:fs';
import path from 'node:path';
import { CarpetaCodex, CarpetaHabilidades, CarpetasDeEnlaces, ComprobarWindows, DestinoDeEnlace, Escribir,
	EsEnlaceRotoAHabilidadDeOtraCarpeta, Existe, Fallar, InicioDelConstruido, LeerEstadoCodex, LíneaClaude, NombreDeRespaldo, Raíz,
	RutaClaude, RutaCodex, RutaConstruido, RutaPersonal, Ventana } from './Común.mjs'; // Lo que comparte con Restaurar.mjs.


const RutaConstruir = path.join(Raíz, 'Programas', 'Agents Global', 'Construir.mjs');
const RutaComprobarPreferencias = path.join(Raíz, 'Programas', 'Preferencias', 'Comprobar.mjs');
const RutaReemplazoCodex = path.join(CarpetaCodex, 'AGENTS.override.md'); // Si existe, Codex lo lee en vez de AGENTS.md, y no vería el de Trabajo Agéntico.

ComprobarWindows(Detener);
ComprobarPreferencias();
if (Existe(RutaReemplazoCodex)) Detener(
	`existe ${RutaReemplazoCodex}. Codex lo lee en vez de AGENTS.md, así que no vería el de Trabajo Agéntico. Quítalo o cámbiale el nombre, y vuelve a correr este programa.`);

const EstadoCodex = LeerEstadoCodex(); // Cómo está hoy el AGENTS.md de Codex.
const ContenidoCodex = EstadoCodex === 'archivo' ? fs.readFileSync(RutaCodex, 'utf8') : '';
const EsCopiaDelConstruido = ContenidoCodex.startsWith(InicioDelConstruido); // Pasa si el enlace se volvió una copia del archivo, por ejemplo cuando Codex lo reemplaza al editarlo desde su configuración.
const ContenidoPropio = EsCopiaDelConstruido ? '' : ContenidoCodex; // Una copia del construido no es del usuario: ya trae lo de Trabajo Agéntico, y si se importara, su versión vieja volvería en cada construcción.
const ContenidoPersonal = fs.existsSync(RutaPersonal) ? fs.readFileSync(RutaPersonal, 'utf8') : '';
const HayQueGuardar = ContenidoPropio.trim() !== '' && ContenidoPropio.trim() !== ContenidoPersonal.trim(); // No hace falta si no hay nada propio, o si una corrida anterior ya lo copió y se detuvo antes de terminar.
if (HayQueGuardar && ContenidoPersonal.trim() !== '') Detener(
	`tu ${RutaCodex} y ${RutaPersonal} tienen contenidos distintos, y no los mezclo sin que decidas. Junta lo que quieras conservar en ${RutaPersonal}, quita el de Codex y vuelve a correr este programa.`);
if (EstadoCodex === 'otroEnlace') Detener(
	`tu ${RutaCodex} es un enlace a otro archivo, ${fs.readlinkSync(RutaCodex)}, y no lo toco. Si quieres usar el de Trabajo Agéntico, quita ese enlace y vuelve a correr este programa.`);

const Habilidades = fs.readdirSync(CarpetaHabilidades).filter(nombre => Existe(path.join(CarpetaHabilidades, nombre, 'SKILL.md'))); // Las carpetas de Habilidades/ que tienen su SKILL.md. Los archivos con instrucciones comunes no son habilidades, así que no se enlazan.
const EnlacesDeHabilidades = CarpetasDeEnlaces.flatMap(carpeta => Habilidades
	.filter(nombre => nombre !== 'usar-computador' || carpeta === path.join(CarpetaCodex, 'skills')) // La habilidad de control del computador solo aplica a Codex y no se enlaza en Claude.
	.map(nombre => {

	const enlace = path.join(carpeta, nombre);
	const destino = path.join(CarpetaHabilidades, nombre);
	return { carpeta, nombre, enlace, destino, estado: EstadoDeHabilidad(enlace, destino) };

}));
const Ocupado = EnlacesDeHabilidades.find(h => h.estado === 'ocupado'); // Algo que no es de Trabajo Agéntico donde iría el enlace de una habilidad, como una habilidad de otro con el mismo nombre.
if (Ocupado !== undefined) Detener(
	`en ${Ocupado.enlace} hay algo que no es el enlace a la habilidad ${Ocupado.nombre} de Trabajo Agéntico, y no lo toco. Si quieres usar la de Trabajo Agéntico, quítalo o cámbiale el nombre, y vuelve a correr este programa.`);
const PorEnlazar = EnlacesDeHabilidades.filter(h => h.estado !== 'enlazado'); // Los que faltan, y los rotos de otra carpeta de Trabajo Agéntico, que se cambian porque ya no llevan a ninguna parte.

const ContenidoClaude = fs.existsSync(RutaClaude) ? fs.readFileSync(RutaClaude, 'utf8') : null; // null si el usuario todavía no tiene CLAUDE.md.
const ClaudeListo = ContenidoClaude !== null && ContenidoClaude.split(/\r?\n/).some(línea => línea.trim() === LíneaClaude);
const RespaldoCodex = NombreDeRespaldo(RutaCodex);
const RespaldoClaude = NombreDeRespaldo(RutaClaude);
const Acciones = []; // Lo que va a cambiar en este computador, para mostrárselo al usuario antes de hacerlo.
if (HayQueGuardar) Acciones.push(`Tu AGENTS.md de Codex se copia a ${RutaPersonal}, donde sigue siendo tuyo.`);
if (EsCopiaDelConstruido) Acciones.push(
	`Tu AGENTS.md de Codex es una copia de uno que construyó Trabajo Agéntico, así que no se copia a ${RutaPersonal}, porque traería una versión vieja de Plantillas/Agents Global.md. Si ahí tenías reglas propias, están al final del respaldo.`);
if (EstadoCodex === 'archivo') Acciones.push(`El original queda como respaldo, en ${RespaldoCodex}.`);
if (EstadoCodex === 'enlaceRoto') Acciones.push(
	`El enlace viejo de Codex, que apunta a un archivo que ya no existe, queda como respaldo en ${RespaldoCodex}.`);
if (EstadoCodex !== 'enlazado') Acciones.push(
	`En ${RutaCodex} queda un enlace al AGENTS.md de Trabajo Agéntico, que trae lo tuyo más lo de Trabajo Agéntico.`);
if (!ClaudeListo && ContenidoClaude !== null) Acciones.push(
	`A tu ${RutaClaude} se le agrega una línea al principio, que trae ese mismo AGENTS.md, y antes se guarda una copia en ${RespaldoClaude}.`);
if (!ClaudeListo && ContenidoClaude === null) Acciones.push(`Se crea ${RutaClaude}, con la línea que trae ese mismo AGENTS.md.`);
for (const carpeta of CarpetasDeEnlaces) {

	const nuevos = PorEnlazar.filter(h => h.carpeta === carpeta && h.estado === 'falta').map(h => h.nombre);
	const cambiados = PorEnlazar.filter(h => h.carpeta === carpeta && h.estado === 'enlaceRoto').map(h => h.nombre);
	if (nuevos.length > 0) Acciones.push(
		`En ${carpeta} se crean los enlaces a estas habilidades de Trabajo Agéntico: ${nuevos.join(', ')}.`);
	if (cambiados.length > 0) Acciones.push(
		`En ${carpeta}, los enlaces rotos de estas habilidades, que apuntaban a otra carpeta de Trabajo Agéntico, se cambian por enlaces a las de aquí: ${cambiados.join(', ')}.`);

}
const Lista = Acciones.map(acción => `• ${acción}`).join('\n\n');
const Pregunta = `Trabajo Agéntico va a hacer esto en tu computador:\n\n${Lista}\n\nNo se borra nada. ¿Quieres continuar?`;

if (Acciones.length === 0) {

	Construir();
	console.log(
		'Ya estaba instalado: el AGENTS.md de Codex es el enlace, el CLAUDE.md tiene la línea y las habilidades tienen sus enlaces.');

} else if (Ventana(Pregunta, 'YesNo', 'Question') === 'Yes') {

	Instalar();
	console.log(`Instalado. Así quedó:\n\n${Lista}\n\nReinicia Claude y Codex para aplicar los cambios.`);
	Ventana(`Listo. Así quedó:\n\n${Lista}\n\nReinicia Claude y Codex para aplicar los cambios.`, 'OK', 'Information');

} else {
	console.log('No se cambió nada, porque el usuario eligió No.');
}


function Instalar() { // Hace los cambios que aprobó el usuario, en un orden que nunca deja a Codex ni a Claude sin reglas: primero guarda y construye, y después enlaza.

	if (HayQueGuardar) Escribir(RutaPersonal, ContenidoPropio);
	try {
		Construir(); // Antes de enlazar, para que el enlace apunte a un archivo que ya existe y ya trae lo del usuario.
	} catch {
		Detener('no se pudo construir Locales/AGENTS.md, y en la consola está el motivo. No se cambió nada en Codex ni en Claude.');
	}
	if (EstadoCodex !== 'enlazado') EnlazarCodex();
	if (!ClaudeListo) AgregarLíneaDeClaude();
	for (const habilidad of PorEnlazar) EnlazarHabilidad(habilidad);

}


function EnlazarCodex() { // Crea el enlace de Codex. Si no se puede, le devuelve su nombre a lo que había, para que Codex quede como estaba.

	const hayAnterior = EstadoCodex === 'archivo' || EstadoCodex === 'enlaceRoto';
	fs.mkdirSync(CarpetaCodex, { recursive: true });
	if (hayAnterior) fs.renameSync(RutaCodex, RespaldoCodex);
	try {
		fs.symlinkSync(RutaConstruido, RutaCodex, 'file'); // No necesita permisos de administrador, porque la configuración activa el modo de programador de Windows.
	} catch (error) {

		if (hayAnterior) fs.renameSync(RespaldoCodex, RutaCodex);
		Detener(
			`no se pudo crear el enlace de Codex (${error.code}). Activa el modo de programador de Windows, como dice Configuración.md, y vuelve a correr este programa. El AGENTS.md de Codex quedó como estaba.`);

	}

}


function AgregarLíneaDeClaude() { // Pone la línea que trae el AGENTS.md al principio del CLAUDE.md del usuario, sin tocar lo demás, y antes guarda una copia.

	if (ContenidoClaude === null) {
		Escribir(RutaClaude, LíneaClaude + '\n');
	} else {

		const salto = ContenidoClaude.includes('\r\n') ? '\r\n' : '\n'; // Respeta los saltos de línea que ya usaba el archivo.
		fs.copyFileSync(RutaClaude, RespaldoClaude);
		Escribir(RutaClaude, LíneaClaude + salto + salto + ContenidoClaude);

	}

}


function EstadoDeHabilidad(enlace, destino) { // Qué hay donde va el enlace de una habilidad: nada, el enlace a la de aquí, un enlace roto a la de otra carpeta de Trabajo Agéntico, como queda al moverla, u otra cosa, que no se toca.

	const datos = fs.lstatSync(enlace, { throwIfNoEntry: false });
	if (datos === undefined) {
		return 'falta';
	} else if (datos.isSymbolicLink() && DestinoDeEnlace(enlace).toLowerCase() === destino.toLowerCase()) {
		return 'enlazado';
	} else if (datos.isSymbolicLink() && EsEnlaceRotoAHabilidadDeOtraCarpeta(enlace)) {
		return 'enlaceRoto';
	} else {
		return 'ocupado';
	}

}


function EnlazarHabilidad({ carpeta, enlace, destino, estado }) { // Crea el enlace de carpeta de una habilidad, que en Windows se llama junction y no necesita el modo de programador. Si en su lugar había un enlace roto, primero lo quita.

	fs.mkdirSync(carpeta, { recursive: true });
	if (estado === 'enlaceRoto') fs.unlinkSync(enlace); // Quita solo el enlace, que ya no llevaba a ninguna parte.
	try {
		fs.symlinkSync(destino, enlace, 'junction');
	} catch (error) {
		Detener(
			`no se pudo crear el enlace ${enlace} (${error.code}). Lo demás quedó instalado. Vuelve a correr este programa cuando se arregle.`);
	}

}


function ComprobarPreferencias() { // Corre Comprobar.mjs antes de cambiar nada, porque sin unas preferencias que estén bien, las habilidades no pueden empezar.

	const corrida = spawnSync(process.execPath, [RutaComprobarPreferencias], { encoding: 'utf8' });
	if (corrida.status !== 0) Detener(
		`las preferencias no sirven, y sin ellas las habilidades no pueden empezar.\n\n${corrida.stderr.trim()}`);

}


function Construir() { // Corre Construir.mjs, que junta lo de Trabajo Agéntico con lo del usuario en Locales/AGENTS.md.
	execFileSync(process.execPath, [RutaConstruir], { stdio: 'inherit' });
}


function Detener(motivo) { // Falla con ruido, como hace Fallar, y dice que lo que no se pudo fue instalar.
	Fallar(`No se pudo instalar: ${motivo}`);
}
