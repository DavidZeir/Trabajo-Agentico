import fs from 'node:fs'; // Comprueba las citas de las bases de un proyecto: que cada enlace y cada documento nombrado existan, que cada sección citada esté en su documento, que el índice nombre todos los documentos y que cada idea aprobada tenga su enlace en su documento dueño. No juzga lo que dicen los documentos, porque eso necesita criterio y lo hacen las habilidades. Lo corren incorporar-idea, revisar-bases y revisar-codigo-vs-bases desde la raíz del proyecto, como dice Habilidades/Comprobar Bases.md. Si algo está mal, lo dice todo y sale con el código 1. También avisa, sin fallar, cuando a un documento le quedan corchetes dobles de su plantilla, que todavía hay que llenar.
import path from 'node:path';


const Argumentos = LeerArgumentos(process.argv.slice(2));
const CarpetaBases = path.resolve(Argumentos.carpeta ?? 'Bases'); // --carpeta sirve para probar el programa con otras bases. Sin él, son las de la carpeta Bases del proyecto donde se corre.
const RaízDelProyecto = path.dirname(CarpetaBases); // Las bases están en la raíz del proyecto, así que la raíz es la carpeta que las contiene.
const CarpetasQueNoSeRecorren = new Set(['node_modules', '.git', 'Temporal', 'Archivos', 'Secretos', 'Secrets']); // Al buscar un documento nombrado en el proyecto se saltan las dependencias, git y las copias de trabajo, que son enormes y no son del proyecto, Archivos, con lo del Director, que no va en git y puede tener miles de archivos, y Secretos y Secrets, con las claves, donde ninguna IA ni sus programas buscan nada.
const ArchivoIdeasAprobadas = 'Ideas Aprobadas.md';
const CitaDeSección = /«([^»\n]+)»,?\s+(?:en|de)\s+`([^`\n]+\.md)`/g; // Una sección citada con el documento que la tiene, como 'Chatbot de WhatsApp' en Ideas Aprobadas.md. Solo cuenta con en o de justo antes del documento, porque las comillas angulares también citan frases sueltas.
const DueñoDeDecisión = /`([^`/\\\n]+\.md)`,\s*"([^"\n]+)"/g; // El documento dueño y su sección al final de una decisión, después de la flecha, como lo pide la plantilla de Decisiones.md.
const DóndeVaAQuedar = /^\s*[-*]\s*\*\*Dónde va a quedar:\*\*\s*`([^`/\\\n]+\.md)`(?:,\s*"([^"\n]+)")?/; // La línea de una idea aprobada con su documento dueño y, si la nombra, su sección entre comillas dobles, como en la plantilla de Ideas Aprobadas.md. Sin comillas, como en un paso nuevo, no es una sección sino una descripción.
const Errores = []; // Todo lo que está mal, para decirlo de una vez y no de a uno por corrida.
const Revisados = { enlaces: 0, nombres: 0, secciones: 0 }; // Cuántas citas se revisaron de cada tipo, para que el resumen muestre que de verdad se revisó algo.

if (!fs.existsSync(CarpetaBases)) Detener('No encontré las bases:',
	[`No existe ${CarpetaBases}. Corre el programa desde la raíz del proyecto, donde está la carpeta Bases, o dile dónde están con --carpeta.`]);

const Documentos = LeerDocumentos(CarpetaBases);
const DocumentosPorNombre = new Map([...Documentos.values()].map(documento => [path.basename(documento.ruta), documento])); // Las citas nombran los documentos sin su carpeta, como Pasos Pendientes.md.
const DocumentosDelProyecto = BuscarDocumentos(RaízDelProyecto);
const Citas = BuscarCitasDeSección(); // Las citas de sección de todas las bases. Las usan la comprobación de las secciones y la de las ideas aprobadas.
ComprobarEnlaces();
ComprobarNombres();
ComprobarSecciones();
ComprobarÍndice();
ComprobarIdeasAprobadas();
const SinLlenar = BuscarCorchetesDobles(); // Solo se avisan, porque unas bases a medio llenar no rompen nada: se llenan cuando hagan falta.
if (SinLlenar.length > 0) console.warn(['Aviso: estas bases todavía tienen partes de su plantilla por llenar, entre corchetes dobles:',
	...SinLlenar.map(aviso => `- ${aviso}`)].join('\n'));
if (Errores.length > 0) Detener('Las bases tienen citas rotas:', Errores);
console.log([
	`Las bases están bien citadas. Revisé ${Cantidad(Documentos.size, 'documento', 'documentos')}, con ${Cantidad(Revisados.enlaces, 'enlace', 'enlaces')},`,
	`${Cantidad(Revisados.nombres, 'documento nombrado', 'documentos nombrados')} y ${Cantidad(Revisados.secciones, 'sección citada', 'secciones citadas')}.`,
].join(' '));


function LeerArgumentos(argumentos) { // Lee --carpeta, seguido de su valor. Es el único argumento, y sirve para probar el programa con otras bases.

	const leídos = {};
	for (let i = 0; i < argumentos.length; i += 2) {

		const nombre = argumentos[i].startsWith('--') ? argumentos[i].slice(2) : null; // Sin los dos guiones, o null si no los tiene.
		const valor = argumentos[i + 1];
		if (nombre !== 'carpeta' || valor === undefined) Detener('No entendí cómo me llamaron:',
			[`${argumentos[i]} no se conoce o le falta su valor. Se usa sin argumentos, desde la raíz del proyecto, o con --carpeta y la ruta de las bases.`]);
		leídos[nombre] = valor;

	}
	return leídos;

}


function LeerDocumentos(carpeta) { // Lee cada .md de las bases, con sus líneas, sus títulos y sus anclas. La clave es su ruta dentro de las bases, con barras normales.

	const documentos = new Map();
	for (const relativa of fs.readdirSync(carpeta, { recursive: true }).filter(archivo => archivo.endsWith('.md'))) {

		const ruta = path.join(carpeta, relativa);
		const texto = fs.readFileSync(ruta, 'utf8').replace(/```[\s\S]*?```/g, bloque => bloque.replace(/[^\n]/g, '')); // Los bloques de código quedan en blanco, con sus saltos de línea, para que sus ejemplos no cuenten como citas y los números de línea sigan siendo los del archivo.
		const líneas = texto.split(/\r?\n/);
		const títulos = Títulos(líneas);
		const inicios = líneas.map(línea => LimpiarFormato(línea.replace(/^\s*(?:[-*+]|\d+\.)?\s*/, ''))); // Cómo empieza cada línea, sin sangría, sin la viñeta o el número de una lista y sin negritas, porque una sección también puede ser una etiqueta en negrita al principio de un párrafo.
		const clave = relativa.replaceAll('\\', '/');
		documentos.set(clave, { relativa: clave, ruta, líneas, títulos, inicios, anclas: Anclas(títulos) });

	}
	return documentos;

}


function Títulos(líneas, patrón = /^#{1,6}\s+(.+?)\s*#*\s*$/) { // Los títulos de Markdown de unas líneas, sin su formato. De forma predeterminada son los de todos los niveles, y con otro patrón, los de uno solo.
	return líneas.map(línea => patrón.exec(línea)?.[1]).filter(título => título !== undefined).map(LimpiarFormato);
}


function LimpiarFormato(texto) { // El texto como se lee, sin su formato de Markdown: los enlaces quedan con su texto, sin negritas ni comillas invertidas, y con un solo espacio entre palabras.
	return texto.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*]/g, '').replace(/\s+/g, ' ').trim();
}


function Anclas(títulos) { // Las anclas que GitHub y VS Code les dan a los títulos: en minúsculas, sin signos y con guiones en vez de espacios. Un título repetido lleva -1, -2 y así, en el orden en que aparece.

	const vistas = new Map();
	return títulos.map(título => {

		const base = título.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-'); // \p{L} y \p{N} dejan las letras y los números de cualquier idioma, así que las tildes y las eñes se quedan, como en GitHub.
		const veces = vistas.get(base) ?? 0;
		vistas.set(base, veces + 1);
		return veces === 0 ? base : `${base}-${veces}`;

	});

}


function BuscarDocumentos(carpeta) { // Los nombres de todos los .md del proyecto, para saber si un documento nombrado existe en alguna parte. Se salta las carpetas de CarpetasQueNoSeRecorren.

	const nombres = new Set();
	for (const entrada of fs.readdirSync(carpeta, { withFileTypes: true })) {

		if (entrada.isDirectory() && !CarpetasQueNoSeRecorren.has(entrada.name)) {
			for (const nombre of BuscarDocumentos(path.join(carpeta, entrada.name))) nombres.add(nombre);
		} else if (entrada.isFile() && entrada.name.endsWith('.md')) {
			nombres.add(entrada.name);
		}

	}
	return nombres;

}


function BuscarCitasDeSección() { // Las secciones citadas con su documento en todas las bases, más el documento dueño y su sección al final de cada decisión. Se salta las citas que van entre comillas dobles, porque son ejemplos de cómo se escribe una cita, como el que trae Ideas Aprobadas.md.

	const citas = [];
	for (const [relativa, documento] of Documentos) {

		for (const [i, línea] of documento.líneas.entries()) {

			const revisada = PartePorRevisar(relativa, línea);
			for (const coincidencia of revisada.matchAll(CitaDeSección)) {

				const comillasAntes = (revisada.slice(0, coincidencia.index).match(/"/g) ?? []).length; // Si antes de la cita, en su línea, hay un número impar de comillas dobles, la cita está entre ellas.
				const cita = { relativa, número: i + 1, sección: LimpiarFormato(coincidencia[1]), citado: coincidencia[2] };
				if (comillasAntes % 2 === 0) citas.push(cita);

			}
			if (relativa === 'Decisiones.md') for (const [, citado, sección] of revisada.matchAll(DueñoDeDecisión)) citas.push(
				{ relativa, número: i + 1, sección: LimpiarFormato(sección), citado });

		}

	}
	return citas;

}


function PartePorRevisar(relativa, línea) { // Lo que se revisa de una línea. En Decisiones.md es solo lo que va después de la flecha, el documento dueño y su sección, porque lo demás es historia y puede nombrar documentos que ya cambiaron de nombre o que desaparecieron. Y de una decisión reemplazada no se revisa nada, porque ya no vale.

	if (relativa !== 'Decisiones.md') {
		return línea;
	} else if (línea.includes('*[Reemplazada por') || !línea.includes('→')) {
		return '';
	} else {
		return línea.slice(línea.lastIndexOf('→') + 1);
	}

}


function ComprobarEnlaces() { // Cada enlace de Markdown hacia otro archivo tiene que llevar a algo que existe, y si apunta a una sección, esa sección tiene que estar. Los enlaces a la web no se revisan.

	for (const [relativa, documento] of Documentos) {

		for (const [i, línea] of documento.líneas.entries()) {

			const sinCódigo = PartePorRevisar(relativa, línea).replace(/`[^`]*`/g, ''); // Sin lo que va entre comillas invertidas, que es código y no un enlace.
			for (const [, destino] of sinCódigo.matchAll(/\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)) {
				if (!/^[a-z][a-z0-9+.-]*:/i.test(destino)) ComprobarEnlace(relativa, documento, i + 1, destino); // Lo que empieza con un esquema, como https: o mailto:, va fuera del proyecto.
			}

		}

	}

}


function ComprobarEnlace(relativa, documento, número, destino) { // Comprueba un enlace: que exista el archivo al que lleva y, si tiene ancla, la sección. Un ancla sola, como #precios, es una sección del mismo documento.

	Revisados.enlaces++;
	const [rutaCodificada, ancla] = destino.split('#');
	const resolver = texto => path.resolve(path.dirname(documento.ruta), texto); // Los enlaces son relativos al documento que los tiene.
	const ruta = rutaCodificada === '' ? documento.ruta : Decodificar(rutaCodificada, resolver); // Los enlaces van codificados, como Pasos%20Pendientes.md.
	const anclaDecodificada = ancla === undefined ? undefined : Decodificar(ancla, texto => texto.toLowerCase()); // Queda en null si está mal codificada, y entonces no coincide con ninguna sección.
	if (ruta === null || !fs.existsSync(ruta)) {
		Errores.push(`${relativa}, línea ${número}: el enlace a ${destino} no lleva a ningún archivo.`);
	} else if (anclaDecodificada !== undefined && ruta.endsWith('.md') && !AnclasDe(ruta).includes(anclaDecodificada)) {
		Errores.push(
			`${relativa}, línea ${número}: el enlace a ${destino} lleva a su documento, pero ese documento no tiene la sección #${ancla}.`);
	}

}


function Decodificar(texto, después) { // Decodifica lo que va en un enlace, como %20 o %C3%B3, y le aplica después. Devuelve null si está mal codificado, como un % suelto, para que el enlace se reporte como roto.

	try {
		return después(decodeURIComponent(texto));
	} catch {
		return null;
	}

}


function AnclasDe(ruta) { // Las anclas de un documento de Markdown: las que ya se leyeron si es de las bases, y si no, las de su archivo.

	const documento = [...Documentos.values()].find(d => d.ruta === ruta);
	if (documento !== undefined) {
		return documento.anclas;
	} else {
		const líneas = fs.readFileSync(ruta, 'utf8').replace(/```[\s\S]*?```/g, '').split(/\r?\n/);
		return Anclas(Títulos(líneas));
	}

}


function ComprobarNombres() { // Cada documento nombrado entre comillas invertidas, como Pasos Pendientes.md, tiene que existir en las bases o en alguna parte del proyecto. Los que traen su carpeta, como src/Leeme.md, no se revisan, porque pueden ser del código o de un paso que todavía no se hace.

	const líneasPorNombre = new Map(); // Cada documento que no existe, con las líneas donde se nombra, para decirlo una sola vez por documento que lo nombra y no una por línea.
	for (const [relativa, documento] of Documentos) {

		for (const [i, línea] of documento.líneas.entries()) {

			for (const [, nombre] of PartePorRevisar(relativa, línea).matchAll(/`([^`/\\\n]+\.md)`/g)) {

				const clave = `${relativa}|${nombre}`;
				Revisados.nombres++;
				if (!DocumentosDelProyecto.has(nombre)) líneasPorNombre.set(clave, [...(líneasPorNombre.get(clave) ?? []), i + 1]);

			}

		}

	}
	for (const [clave, números] of líneasPorNombre) {

		const [relativa, nombre] = clave.split('|');
		Errores.push(
			`${relativa}, ${números.length === 1 ? 'línea' : 'líneas'} ${Lista(números)}: nombra ${nombre}, que no existe ni en las bases ni en el resto del proyecto.`);

	}

}


function ComprobarSecciones() { // Cada sección citada con su documento, como 'Chatbot de WhatsApp' en Ideas Aprobadas.md, tiene que ser un título de ese documento o el principio de uno de sus párrafos, como una etiqueta en negrita. Si el documento no es de las bases, no se revisa, y si no existe, ya lo dice ComprobarNombres.

	for (const cita of Citas) {

		const citado = DocumentosPorNombre.get(cita.citado);
		if (citado !== undefined) {

			Revisados.secciones++;
			if (!TieneSección(citado, cita.sección)) Errores.push(
				`${cita.relativa}, línea ${cita.número}: cita la sección «${cita.sección}» de ${cita.citado}, y ese documento no tiene ningún título ni párrafo que empiece así.`);

		}

	}

}


function ComprobarÍndice() { // El índice, Leeme.md, tiene que nombrar cada documento de las bases, con un enlace o entre comillas invertidas, porque es donde se ve cuál es el documento dueño de cada tema. Los de las subcarpetas no se revisan.

	const índice = Documentos.get('Leeme.md');
	if (índice === undefined) {
		Errores.push('Las bases no tienen su índice, Leeme.md, que dice cuál es el documento dueño de cada tema.');
	} else {

		const texto = índice.líneas.join('\n');
		const enlazados = [...texto.matchAll(/\]\(([^)#\s]+)/g)].map(m => Decodificar(m[1], ruta => path.basename(ruta))); // Los enlaces, como Pasos%20Pendientes.md, decodificados y sin su carpeta.
		const entreComillas = [...texto.matchAll(/`([^`\n]+\.md)`/g)].map(m => path.basename(m[1]));
		const nombrados = new Set([...enlazados, ...entreComillas]);
		const sinÍndice = [...Documentos.keys()].filter(r => !r.includes('/') && r !== 'Leeme.md' && !nombrados.has(r)); // Los documentos de la carpeta principal de las bases que el índice no nombra.
		for (const relativa of sinÍndice) Errores.push(
			`${relativa} no está en el índice, Leeme.md, que tiene que nombrar cada documento de las bases.`);

	}

}


function TieneSección(documento, sección) { // Si un documento tiene esa sección: un título igual o un párrafo que empieza así, como una etiqueta en negrita.
	return documento.títulos.includes(sección) || documento.inicios.some(inicio => inicio.startsWith(sección));
}


function ComprobarIdeasAprobadas() { // Cada idea de Ideas Aprobadas.md, que es un título de tercer nivel, dice dónde va a quedar: su documento dueño y, si la nombra, su sección. El documento dueño tiene que estar en las bases y citar la idea, para que quien lea ese tema sepa que existe, y la sección tiene que estar.

	const ideas = Documentos.get(ArchivoIdeasAprobadas);
	if (ideas !== undefined) {
		for (const idea of IdeasDe(ideas)) ComprobarIdea(idea);
	}

}


function IdeasDe(documento) { // Las ideas de Ideas Aprobadas.md, cada una con su nombre, su línea y lo que dice su línea Dónde va a quedar. Una idea va desde su título hasta el título siguiente.

	const ideas = [];
	let actual = null;
	for (const [i, línea] of documento.líneas.entries()) {

		const título = /^###\s+(.+?)\s*#*\s*$/.exec(línea)?.[1];
		const dónde = DóndeVaAQuedar.exec(línea);
		if (título !== undefined) {
			actual = { nombre: LimpiarFormato(título), número: i + 1, dueño: undefined, sección: undefined };
			ideas.push(actual);
		} else if (/^#{1,2}\s/.test(línea)) {
			actual = null; // Un título más alto, como el de una prioridad, cierra la idea anterior.
		} else if (dónde !== null && actual !== null) {
			actual.dueño = dónde[1];
			actual.sección = dónde[2] === undefined ? undefined : LimpiarFormato(dónde[2]);
		}

	}
	return ideas;

}


function ComprobarIdea(idea) { // Comprueba una idea aprobada: que diga dónde va a quedar, que su documento dueño esté en las bases y la cite, y que tenga la sección que nombra.

	const prefijo = `${ArchivoIdeasAprobadas}, línea ${idea.número}: la idea «${idea.nombre}»`;
	const dueño = idea.dueño === undefined ? undefined : DocumentosPorNombre.get(idea.dueño);
	if (idea.dueño === undefined) {
		Errores.push(
			`${prefijo} no dice dónde va a quedar, con su documento dueño entre comillas invertidas, como pide la plantilla.`);
	} else if (dueño === undefined) {
		Errores.push(`${prefijo} va a quedar en ${idea.dueño}, que no está en las bases.`);
	} else {

		const citasDelDueño = Citas.filter(c => c.relativa === dueño.relativa && c.citado === ArchivoIdeasAprobadas); // La cita tiene que estar en el documento dueño, y no en cualquier otro, porque es ahí donde se lee ese tema.
		const citada = citasDelDueño.some(c => c.sección === idea.nombre);
		if (idea.sección !== undefined) Revisados.secciones++;
		if (idea.sección !== undefined && !TieneSección(dueño, idea.sección)) Errores.push(
			`${prefijo} va a quedar en la sección «${idea.sección}» de ${idea.dueño}, y ese documento no tiene ningún título ni párrafo que empiece así.`);
		if (!citada) Errores.push(
			`${prefijo} no tiene su cita en ${idea.dueño}, su documento dueño, que debe citar «${idea.nombre}» en \`${ArchivoIdeasAprobadas}\`.`);

	}

}


function BuscarCorchetesDobles() { // Los documentos que todavía tienen corchetes dobles de su plantilla, con las líneas donde quedan. Los bloques de código ya quedaron en blanco al leerlos, así que sus ejemplos no cuentan.

	const avisos = [];
	for (const [relativa, documento] of Documentos) {

		const números = documento.líneas.flatMap((línea, i) => línea.includes('[[') ? [i + 1] : []);
		if (números.length > 0) avisos.push(`${relativa}, ${números.length === 1 ? 'línea' : 'líneas'} ${Lista(números)}.`);

	}
	return avisos;

}


function Cantidad(número, singular, plural) { // El número con su palabra en singular o en plural, como 1 enlace o 14 enlaces.
	return `${número} ${número === 1 ? singular : plural}`;
}


function Lista(números) { // Une los números como se dicen en español: 3, 7 y 12.
	return números.length === 1 ? String(números[0]) : `${números.slice(0, -1).join(', ')} y ${números.at(-1)}`;
}


function Detener(título, errores) { // Falla con ruido: dice todo lo que está mal y sale con el código 1.
	console.error([título, ...errores.map(error => `- ${error}`)].join('\n'));
	process.exit(1);
}
