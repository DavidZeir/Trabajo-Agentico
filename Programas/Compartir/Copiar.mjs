import { execFileSync } from 'node:child_process'; // Hace la copia pública de un proyecto: copia sus archivos, tal como están en su carpeta, a la carpeta de su repositorio público, sin lo que es de Trabajo Agéntico, para compartir el proyecto sin el flujo. Deja fuera las bases, el historial de los pasos, el .ignore y la carpeta Archivos, y quita la sección de Trabajo Agéntico del AGENTS.md y los bloques de las bases y los pasos del .gitignore. Con la carpeta de Trabajo Agéntico hace la copia pública del método: copia lo suyo tal cual, sin sus ideas aprobadas, descartadas ni por decidir ni sus referencias, que son del proceso con que el Director lo hace evolucionar. No prepara, no confirma ni sube nada: lo que llega a la carpeta pública lo revisa, lo confirma y lo sube el Director. Se corre con node "Programas/Compartir/Copiar.mjs" "carpeta del proyecto" "carpeta pública". Solo necesita Node y git.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const [Origen, Destino] = LeerArgumentos(process.argv.slice(2));
const CarpetaTrabajoAgéntico = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'); // La carpeta de Trabajo Agéntico, que contiene a Programas.
const EsTrabajoAgéntico = path.relative(CarpetaTrabajoAgéntico, Origen) === ''; // Si lo que se copia es el mismo Trabajo Agéntico, que no usa el flujo sino que es el flujo. En Windows, path.relative compara sin distinguir mayúsculas, así que reconoce la carpeta aunque se escriba distinto.
const PlantillaGitignore = path.join(CarpetaTrabajoAgéntico, 'Plantillas', 'Plantilla .gitignore'); // De aquí salen los bloques del flujo que se quitan del .gitignore, con el mismo texto que el inicio de un proyecto copia en el suyo.
const RutasDelFlujo = ['Bases/', 'Pasos/', '.ignore', 'Archivos/', 'Fuera de Git.md']; // Lo que es solo de Trabajo Agéntico y no se copia. Las que terminan en barra son carpetas. De Archivos, git solo trae su Leeme.md, que le habla al Director del flujo y no al que usa la copia pública. Fuera de Git.md le dice al Director qué copiar o enlazar en otro computador, con sus carpetas personales, como las de OneDrive.
const RutasDelDesarrolloDelMétodo = ['Ideas Aprobadas.md', 'Ideas Descartadas.md', 'Ideas por Decidir.md', 'Referencias.md']; // Lo de Trabajo Agéntico que no se copia, porque es del proceso con que el Director hace evolucionar el método y no del método.
const RutasQueNoSeCopian = (EsTrabajoAgéntico ? RutasDelDesarrolloDelMétodo : RutasDelFlujo).map(ruta => ruta.toLowerCase()); // De un proyecto no se copia el flujo, y de Trabajo Agéntico, lo de su desarrollo. Van en minúsculas porque se comparan sin distinguir mayúsculas, para que una variante como bases/ o Ideas por decidir.md tampoco llegue a la copia pública.
const LoQueNoSeCopia = EsTrabajoAgéntico ? 'del desarrollo del método' : 'del flujo'; // Para los mensajes de error, que en los proyectos dicen lo mismo de siempre.
const TítuloDeLaSección = '## Trabajo Agéntico'; // El AGENTS.md de un proyecto del flujo empieza con esta sección, que sale de Plantillas/Agents Proyecto.md.
const LíneaDeGuiones = /^-{10,}\s*$/; // La línea que separa la sección de Trabajo Agéntico de lo propio del proyecto. Puede traer espacios o tabulaciones al final.

ComprobarCarpetas();
const Archivos = ListarArchivos();
const Contenidos = new Map(Archivos.map(ruta => [ruta, fs.readFileSync(path.join(Origen, ruta))])); // Todos los archivos se leen antes de vaciar la carpeta pública, para que uno que no se pueda leer, como uno bloqueado por otro programa, detenga la copia sin haberla tocado.
if (!EsTrabajoAgéntico) { // Trabajo Agéntico se copia tal cual: su AGENTS.md se arma en Locales y no va en git, y su .gitignore no tiene los bloques de la plantilla, que son para los proyectos.
	Contenidos.set('AGENTS.md', QuitarSecciónDelAgents(LeerDelOrigen('AGENTS.md')));
	Contenidos.set('.gitignore', QuitarBloquesDelGitignore(LeerDelOrigen('.gitignore')));
}
ComprobarCopia();
VaciarDestino(); // Solo se toca la carpeta pública después de preparar y comprobar todo, para que un error no la deje a medias.
for (const [ruta, contenido] of Contenidos) Escribir(ruta, contenido);
MostrarResultado();


function LeerArgumentos(argumentos) { // Las dos carpetas, la del proyecto y la pública, como rutas completas.

	if (argumentos.length !== 2) Detener('No entendí cómo me llamaron:',
		['Se usa con dos carpetas: node "Programas/Compartir/Copiar.mjs" "carpeta del proyecto" "carpeta pública".']);
	return argumentos.map(carpeta => path.resolve(carpeta));

}


function ComprobarCarpetas() { // Antes de tocar nada, que las dos carpetas existan, que sean distintas y que la pública sea un repositorio de git sin cambios pendientes, porque se va a vaciar.

	const errores = [];
	for (const carpeta of [Origen, Destino])
		if (!fs.existsSync(carpeta)) errores.push(`No existe ${carpeta}.`);
	if (errores.length > 0) Detener('No encontré las carpetas:', errores);
	const estáDentro = (carpeta, otra) => !path.relative(carpeta, otra).startsWith('..') && !path.isAbsolute(path.relative(carpeta, otra)); // Si otra es carpeta o está dentro de ella. En otro disco, la ruta relativa sale completa, y no se cruzan.
	if (estáDentro(Origen, Destino) || estáDentro(Destino, Origen)) Detener('Las carpetas se cruzan:',
		['La carpeta pública no puede ser la del proyecto, ni estar dentro de ella, ni contenerla.']); // Si se cruzaran, vaciar la pública borraría el proyecto.
	if (!fs.existsSync(path.join(Origen, '.git'))) Detener('El proyecto no es un repositorio de git:',
		[`${Origen} no tiene .git, y hace falta para saber qué archivos ignora su .gitignore.`]);
	if (!fs.existsSync(path.join(Destino, '.git'))) Detener('La carpeta pública no es un repositorio de git:',
		[`${Destino} no tiene .git. Tiene que ser el clon del repositorio público, porque el programa la vacía antes de copiar.`]); // Así nunca se vacía una carpeta cualquiera por un error al escribir la ruta.
	const pendientes = Git(Destino, 'status', '--porcelain');
	if (pendientes !== '') Detener('La carpeta pública tiene cambios sin confirmar:',
		['Vaciarla los borraría. Confírmalos o descártalos, y vuelve a correr el programa.', ...pendientes.split('\n')]);

}


function ListarArchivos() { // Los archivos del proyecto como están en su carpeta, con o sin confirmar, menos los que ignora su .gitignore y los que no se copian. Git solo dice cuáles ignora, y así nunca se copian las claves, como .dev.vars, ni lo que se arma solo, como node_modules o .wrangler.

	const listados = Git(Origen, 'ls-files', '--cached', '--others', '--exclude-standard', '-z').split('\0');
	const ignoradosEnGit = new Set(Git(Origen, 'ls-files', '--cached', '--ignored', '--exclude-standard', '-z').split('\0')); // Los que ya estaban en git cuando el .gitignore empezó a ignorarlos. --exclude-standard solo filtra los que no están en git, así que estos se quitan aparte, para que lo ignorado nunca llegue a la copia pública.
	return [...new Set(listados)].filter(ruta => ruta !== '' && !ignoradosEnGit.has(ruta)
		&& fs.statSync(path.join(Origen, ruta), { throwIfNoEntry: false })?.isFile() // Sin los borrados que git todavía tiene en su índice, ni los que en la carpeta pasaron a ser una carpeta.
		&& !RutasQueNoSeCopian.some(noSeCopia => noSeCopia.endsWith('/') ? ruta.toLowerCase().startsWith(noSeCopia)
			: ruta.toLowerCase() === noSeCopia));

}


function LeerDelOrigen(ruta) { // Un archivo de texto del proyecto que hay que cambiar antes de copiarlo. Si no está entre los que se copian, se detiene, porque todo proyecto del flujo lo tiene.
	if (!Contenidos.has(ruta)) Detener(`No encontré ${ruta}:`, [`${path.join(Origen, ruta)} no existe o lo ignora su .gitignore, y todo proyecto de Trabajo Agéntico lo tiene.`]);
	return Contenidos.get(ruta).toString('utf8');
}


function QuitarSecciónDelAgents(texto) { // Quita del AGENTS.md la sección de Trabajo Agéntico, desde su título, en la primera línea, hasta la línea de guiones, con las líneas en blanco que le siguen, para que empiece en lo propio del proyecto.

	const líneas = texto.split('\n');
	const fin = líneas.findIndex(línea => LíneaDeGuiones.test(línea));
	if (líneas[0] !== TítuloDeLaSección || fin === -1) Detener('El AGENTS.md no tiene la forma que espero:',
		[`Tiene que empezar con ${TítuloDeLaSección} y tener después una línea de guiones, que la separa de lo propio del proyecto.`]);
	let siguiente = fin + 1;
	while (siguiente < líneas.length && líneas[siguiente].trim() === '') siguiente++;
	return líneas.slice(siguiente).join('\n');

}


function QuitarBloquesDelGitignore(texto) { // Quita del .gitignore los bloques de la plantilla que nombran las bases o los pasos, buscando su texto exacto. Los demás bloques de la plantilla, como el de Temporal/, se quedan, porque también los usa el código del proyecto.

	const bloquesDelFlujo = fs.readFileSync(PlantillaGitignore, 'utf8').split(/\n\s*\n/).map(bloque => bloque.trim())
		.filter(bloque => bloque.includes('/Bases/') || bloque.includes('/Pasos/'));
	let resultado = texto;
	for (const bloque of bloquesDelFlujo) {

		if (!resultado.includes(`\n\n${bloque}`)) Detener('El .gitignore no tiene un bloque de la plantilla:',
			[`No encontré, con una línea en blanco antes, el bloque que empieza con ${bloque.split('\n')[0]}. Pudo cambiar en la plantilla o en el proyecto.`]);
		resultado = resultado.replace(`\n\n${bloque}`, '');

	}
	return resultado;

}


function ComprobarCopia() { // Una última revisión de lo que se va a copiar, por si se coló una ruta que no se copia o, en un proyecto, quedó algo de la sección o de los bloques.

	const errores = [];
	for (const ruta of Archivos)
		if (RutasQueNoSeCopian.some(noSeCopia => ruta.toLowerCase().startsWith(noSeCopia)))
			errores.push(`Se iba a copiar ${ruta}, que es ${LoQueNoSeCopia}.`);
	if (!EsTrabajoAgéntico) {

		const agents = Contenidos.get('AGENTS.md');
		const gitignore = Contenidos.get('.gitignore');
		if (agents.includes(TítuloDeLaSección)) errores.push(`El AGENTS.md todavía tiene la sección ${TítuloDeLaSección}.`);
		if (gitignore.includes('/Bases/') || gitignore.includes('/Pasos/'))
			errores.push('El .gitignore todavía nombra /Bases/ o /Pasos/.');

	}
	if (errores.length > 0) Detener(`La copia todavía tiene cosas ${LoQueNoSeCopia}:`, errores);

}


function VaciarDestino() { // Borra todo lo de la carpeta pública menos .git, para que lo que se borró en el proyecto también desaparezca de ella.
	for (const entrada of fs.readdirSync(Destino).filter(nombre => nombre !== '.git'))
		fs.rmSync(path.join(Destino, entrada), { recursive: true, force: true });
}


function Escribir(ruta, contenido) { // Escribe un archivo en la carpeta pública, en la misma ruta que tiene en el proyecto, creando sus carpetas si faltan.
	fs.mkdirSync(path.dirname(path.join(Destino, ruta)), { recursive: true });
	fs.writeFileSync(path.join(Destino, ruta), contenido);
}


function MostrarResultado() { // Dice qué cambió en la carpeta pública desde su último commit, con lo que muestra git, para que el Director lo revise antes de confirmarlo.

	const cambios = Git(Destino, 'status', '--short', '--untracked-files=all');
	if (cambios === '') {
		console.log(`La copia pública quedó igual a su último commit: no hay nada nuevo para subir. Se copiaron ${Archivos.length} archivos.`);
	} else {

		console.log(`Se copiaron ${Archivos.length} archivos. Esto cambió en ${Destino}, con ?? para lo nuevo, M para lo cambiado y D para lo borrado:`);
		console.log(cambios);
		console.log('\nNo preparé, no confirmé ni subí nada: revísalo y confírmalo desde la carpeta pública.');

	}

}


function Git(carpeta, ...argumentos) { // Corre git en una carpeta y devuelve su salida, sin los saltos de línea del final. Solo se usa para leer, nunca para cambiar nada.
	return execFileSync('git', argumentos, { cwd: carpeta, encoding: 'utf8' }).trimEnd();
}


function Detener(título, errores) { // Falla con ruido: dice todo lo que está mal y sale con el código 1.
	console.error([título, ...errores.map(error => `- ${error}`)].join('\n'));
	process.exit(1);
}
