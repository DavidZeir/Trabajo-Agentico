import fs from 'node:fs'; // Construye Locales/AGENTS.md, el que leen Claude y Codex, juntando lo de Trabajo Agéntico, que es igual para todos, con lo de quien lo usa.
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const Raíz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'); // La carpeta de Trabajo Agéntico, dos niveles arriba de Programas/Agents Global, la carpeta de este archivo.
const RutaDeLaPlantilla = path.join(Raíz, 'Plantillas', 'Agents Global.md'); // Lo de Trabajo Agéntico, que está en git.
const RutaPersonal = path.join(Raíz, 'Locales', 'Agents Personal.md'); // Lo de quien usa Trabajo Agéntico, que está fuera de git y puede no existir.
const RutaDestino = path.join(Raíz, 'Locales', 'AGENTS.md'); // El que leen Claude, por la línea de su CLAUDE.md, y Codex, por su enlace. Por eso no cambia de lugar.
const Aviso = // La primera línea del archivo, para que ninguna IA lo edite y sepa cómo volver a construirlo.
	'Este archivo lo construye `Programas/Agents Global/Construir.mjs`, juntando `Plantillas/Agents Global.md` y `Locales/Agents Personal.md`. No lo edites: edita esos dos y vuelve a correr `node "Programas/Agents Global/Construir.mjs"` en la carpeta de Trabajo Agéntico. Córrelo también después de traer cambios de Trabajo Agéntico, porque pudo cambiar `Plantillas/Agents Global.md`.';

if (!fs.existsSync(RutaDeLaPlantilla)) Detener(`no existe ${RutaDeLaPlantilla}.`); // Sin la plantilla no hay nada que construir.

const DeLaPlantilla = fs.readFileSync(RutaDeLaPlantilla, 'utf8').trim().replace('[[Ruta de Trabajo Agéntico]]', () => Raíz); // El glosario muestra la ruta de este computador. Las habilidades conservan el prefijo <Trabajo Agéntico>.
const Personal = fs.existsSync(RutaPersonal) ? fs.readFileSync(RutaPersonal, 'utf8').trim() : ''; // Quien todavía no tiene nada propio usa solo lo de Trabajo Agéntico.
const Contenido = [Aviso, DeLaPlantilla, Personal].filter(parte => parte !== '').join('\n\n') + '\n'; // Las partes van separadas por una línea en blanco, como secciones de un mismo archivo.

if (fs.existsSync(RutaDestino)) fs.chmodSync(RutaDestino, 0o644); // Le quita el modo de solo lectura que le dejó la construcción anterior, para poder reescribirlo.
fs.writeFileSync(RutaDestino, Contenido, 'utf8'); // En UTF-8 sin BOM, como los demás archivos de Trabajo Agéntico.
fs.chmodSync(RutaDestino, 0o444); // De solo lectura, para que nadie lo edite por error en vez de editar sus dos fuentes.
const Nota = Personal === '' ? ', solo con lo de Trabajo Agéntico, porque Locales/Agents Personal.md no existe o está vacío' : '';
console.log(`Construido Locales/AGENTS.md, con ${Buffer.byteLength(Contenido)} bytes${Nota}.`);


function Detener(motivo) { // Falla con ruido, en vez de dejar un AGENTS.md incompleto que Claude y Codex leerían sin avisar.
	console.error(`No se pudo construir el AGENTS.md: ${motivo}`);
	process.exit(1);
}
