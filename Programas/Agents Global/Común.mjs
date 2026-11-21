import { execFileSync } from 'node:child_process'; // Lo que comparten Instalar.mjs y Restaurar.mjs: las rutas, los respaldos, los enlaces de las habilidades y las ventanas de Windows, para que una corrección, como las de seguridad del PowerShell, les llegue a los dos. No se corre solo.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


export const Raíz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'); // La carpeta de Trabajo Agéntico, dos niveles arriba de Programas/Agents Global, la carpeta de este archivo.
export const RutaPersonal = path.join(Raíz, 'Locales', 'Agents Personal.md'); // Donde queda lo que el usuario ya tenía en el AGENTS.md de Codex.
export const RutaConstruido = path.join(Raíz, 'Locales', 'AGENTS.md'); // El que construye Construir.mjs, y el que leen Codex y Claude.
export const CarpetaCodex = process.env.CODEX_HOME || path.join(os.homedir(), '.codex'); // Codex usa la carpeta que diga CODEX_HOME, si existe esa variable.
export const RutaCodex = path.join(CarpetaCodex, 'AGENTS.md');
export const RutaClaude = path.join(os.homedir(), '.claude', 'CLAUDE.md');
export const LíneaClaude = '@' + RutaConstruido.replaceAll('\\', '/').replaceAll(' ', '\\ '); // Con / y con una barra invertida antes de cada espacio, porque si no, Claude corta la ruta en el primer espacio.
export const CarpetaHabilidades = path.join(Raíz, 'Habilidades'); // Las habilidades de Trabajo Agéntico, a las que apuntan los enlaces que crea Instalar.mjs en Claude y en Codex.
export const CarpetasDeEnlaces = [path.join(path.dirname(RutaClaude), 'skills'), path.join(CarpetaCodex, 'skills')]; // Donde Claude y Codex buscan sus habilidades, y donde van los enlaces a las de aquí.
export const InicioDelConstruido = 'Este archivo lo construye `Programas/'; // Así empieza el AGENTS.md que construye Construir.mjs. Llega solo hasta Programas/ para que también reconozca las copias hechas cuando ese programa estaba en otra ruta, como Programas/Construir AGENTS.mjs. Si cambia ese comienzo allá, hay que cambiarlo aquí.
const Título = 'Trabajo Agéntico';
const RutaPowerShell = path.join(process.env.SystemRoot ?? '', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe'); // Con la ruta completa, porque sin ella Windows busca primero en la carpeta actual, y correría un powershell.exe que alguien haya puesto ahí.
const PowerShellConfiable = !!process.env.SystemRoot && path.isAbsolute(RutaPowerShell) && fs.existsSync(RutaPowerShell); // Si falta SystemRoot, la ruta queda relativa a la carpeta actual, donde cualquiera pudo poner otro powershell.exe.


export function ComprobarWindows(detener) { // Detiene el programa con su función detener si no está en Windows, o si no encuentra el PowerShell de Windows, sin el que no hay ventanas para pedirle permiso al usuario.

	if (process.platform !== 'win32') detener('este programa es para Windows, como la configuración de Trabajo Agéntico.');
	if (!PowerShellConfiable) detener(
		`no encontré el PowerShell de Windows, porque falta la variable SystemRoot o no existe ${RutaPowerShell}, y sin él no puedo pedirte permiso en una ventana. No se cambió nada.`);

}


export function LeerEstadoCodex() { // Dice cómo está el AGENTS.md de Codex: enlazado al de Trabajo Agéntico, un archivo del usuario, un enlace roto, un enlace a otro archivo o sin existir.

	const datos = fs.lstatSync(RutaCodex, { throwIfNoEntry: false });
	if (datos === undefined) {
		return 'falta';
	} else if (!datos.isSymbolicLink()) {
		return 'archivo';
	} else {

		const destino = DestinoDeEnlace(RutaCodex);
		if (destino.toLowerCase() === RutaConstruido.toLowerCase()) {
			return 'enlazado';
		} else if (fs.existsSync(destino)) {
			return 'otroEnlace';
		} else {
			return 'enlaceRoto';
		}

	}

}


export function DestinoDeEnlace(ruta) { // A dónde apunta un enlace, como el de Codex o los de las habilidades, con la ruta completa y sin el prefijo \\?\ que a veces le pone Windows.
	return path.resolve(path.dirname(ruta), fs.readlinkSync(ruta).replace(/^\\\\\?\\/, ''));
}


export function EsEnlaceAHabilidadDeAquí(enlace) { // Si el enlace apunta a una habilidad de esta carpeta de Trabajo Agéntico, aunque esa habilidad ya no exista.
	return DestinoDeEnlace(enlace).toLowerCase().startsWith(CarpetaHabilidades.toLowerCase() + path.sep);
}


export function EsEnlaceRotoAHabilidadDeOtraCarpeta(enlace) { // Si el enlace está roto y apunta a una habilidad de otra carpeta de Trabajo Agéntico, como queda al moverla. Si el destino existe, es de otra instalación que sigue en uso, y no cuenta.
	const destino = DestinoDeEnlace(enlace);
	return !EsEnlaceAHabilidadDeAquí(enlace) && /[\\/]Habilidades[\\/][^\\/]+$/i.test(destino) && !fs.existsSync(destino);
}


export function NombreDeRespaldo(ruta) { // El primer nombre libre para el respaldo, como AGENTS.md.respaldo o AGENTS.md.respaldo-2, para no pisar uno anterior.

	let candidato = `${ruta}.respaldo`;
	for (let número = 2; Existe(candidato); número++) candidato = `${ruta}.respaldo-${número}`;
	return candidato;

}


export function Respaldos(ruta) { // Los respaldos de ese archivo con los nombres que da NombreDeRespaldo, ordenados por su número, empezando por el que no tiene.

	const carpeta = path.dirname(ruta);
	const patrón = new RegExp(`^${path.basename(ruta).replaceAll('.', '\\.')}\\.respaldo(?:-(\\d+))?$`); // Solo escapa los puntos, porque AGENTS.md y CLAUDE.md no tienen otros caracteres especiales.
	const nombres = (fs.existsSync(carpeta) ? fs.readdirSync(carpeta) : []).map(nombre => ({ nombre, partes: patrón.exec(nombre) }));
	return nombres.filter(n => n.partes !== null).sort((a, b) => Number(a.partes[1] ?? 1) - Number(b.partes[1] ?? 1))
		.map(n => path.join(carpeta, n.nombre));

}


export function Existe(ruta) { // Como fs.existsSync, pero también ve los enlaces rotos, que fs.existsSync da por inexistentes.
	return fs.lstatSync(ruta, { throwIfNoEntry: false }) !== undefined;
}


export function Escribir(ruta, contenido) { // Escribe en UTF-8 sin BOM, como los demás archivos de Trabajo Agéntico, y crea su carpeta si falta.
	fs.mkdirSync(path.dirname(ruta), { recursive: true });
	fs.writeFileSync(ruta, contenido, 'utf8');
}


export function Ventana(mensaje, botones, ícono) { // Abre una ventana de Windows encima de las demás y devuelve el botón que eligió el usuario, como Yes, No u OK. La contesta el usuario y nadie más, aunque el programa lo corra una IA.

	return CorrerPowerShell([
		'Add-Type -AssemblyName System.Windows.Forms',
		'$dueña = New-Object System.Windows.Forms.Form -Property @{ TopMost = $true }', // Una ventana invisible encima de todas, para que el mensaje no quede detrás de otras.
		`$respuesta = [System.Windows.Forms.MessageBox]::Show($dueña, ${TextoDePowerShell(mensaje)}, ${TextoDePowerShell(Título)}, '${botones}', '${ícono}')`,
		'$dueña.Dispose()',
		'Write-Output $respuesta',
	]);

}


export function VentanaDeOpciones(mensaje, opciones, textoDelBotón) { // Como Ventana, pero el usuario elige una de las opciones, que empiezan con la primera marcada, y contesta con textoDelBotón o con Cancelar. Devuelve el número de la opción elegida, desde 0, o null si canceló.

	const respuesta = CorrerPowerShell([
		'Add-Type -AssemblyName System.Windows.Forms, System.Drawing',
		'[System.Windows.Forms.Application]::EnableVisualStyles()', // Para que los botones y las opciones se vean como en las demás ventanas de Windows.
		`$ventana = New-Object System.Windows.Forms.Form -Property @{ Text = ${TextoDePowerShell(Título)}; TopMost = $true; ShowIcon = $false; StartPosition = 'CenterScreen'; FormBorderStyle = 'FixedDialog'; MaximizeBox = $false; MinimizeBox = $false; AutoSize = $true; AutoSizeMode = 'GrowAndShrink'; Font = [System.Drawing.SystemFonts]::MessageBoxFont }`, // Encima de las demás, del tamaño de lo que tiene adentro y con la letra de los mensajes de Windows.
		"$columna = New-Object System.Windows.Forms.FlowLayoutPanel -Property @{ FlowDirection = 'TopDown'; WrapContents = $false; AutoSize = $true; Padding = [System.Windows.Forms.Padding]::new(12) }",
		`$columna.Controls.Add((New-Object System.Windows.Forms.Label -Property @{ Text = ${TextoDePowerShell(mensaje)}; AutoSize = $true; MaximumSize = [System.Drawing.Size]::new(560, 0); UseMnemonic = $false; Margin = [System.Windows.Forms.Padding]::new(0, 0, 0, 8) }))`, // El mensaje se parte en renglones de 560 puntos de ancho, y sin UseMnemonic un & de una ruta no se vería.
		`$opciones = @(foreach ($texto in @(${opciones.map(TextoDePowerShell).join(', ')})) { $opción = New-Object System.Windows.Forms.RadioButton -Property @{ Text = $texto; AutoSize = $true }; $columna.Controls.Add($opción); $opción })`,
		'$opciones[0].Checked = $true',
		"$botones = New-Object System.Windows.Forms.FlowLayoutPanel -Property @{ FlowDirection = 'RightToLeft'; AutoSize = $true; Anchor = 'Right'; Margin = [System.Windows.Forms.Padding]::new(0, 12, 0, 0) }", // Los botones van a la derecha, como en los mensajes de Windows.
		"$cancelar = New-Object System.Windows.Forms.Button -Property @{ Text = 'Cancelar'; DialogResult = 'Cancel' }",
		`$aceptar = New-Object System.Windows.Forms.Button -Property @{ Text = ${TextoDePowerShell(textoDelBotón)}; DialogResult = 'OK' }`,
		'$botones.Controls.AddRange(@($cancelar, $aceptar))', // De derecha a izquierda, así que Cancelar queda en la esquina.
		'$columna.Controls.Add($botones)',
		'$ventana.Controls.Add($columna)',
		'$ventana.AcceptButton = $aceptar', // Enter elige el botón de aceptar, y Esc o la X, Cancelar.
		'$ventana.CancelButton = $cancelar',
		'$ventana.Add_Shown({ $ventana.Activate() })',
		'$resultado = $ventana.ShowDialog()',
		'$elegida = 0..($opciones.Count - 1) | Where-Object { $opciones[$_].Checked } | Select-Object -First 1',
		'$ventana.Dispose()',
		"if ($resultado -eq 'OK') { Write-Output $elegida } else { Write-Output 'Cancelar' }",
	]);
	return respuesta === 'Cancelar' ? null : Number(respuesta);

}


function CorrerPowerShell(líneas) { // Corre un script en el PowerShell de Windows y devuelve lo que escribió, sin los espacios del final.

	const script = ["$ProgressPreference = 'SilentlyContinue'", ...líneas].join('\n'); // Sin la primera línea, PowerShell escribe en la consola un aviso de progreso la primera vez que carga sus módulos.
	const codificado = Buffer.from(script, 'utf16le').toString('base64'); // PowerShell recibe el script en UTF-16, y así le llegan bien las tildes y las eñes.
	return execFileSync(RutaPowerShell, ['-NoProfile', '-EncodedCommand', codificado], { encoding: 'utf8' }).trim();

}


function TextoDePowerShell(texto) { // Un texto entre comillas simples de PowerShell, que toma también las comillas inclinadas como comillas simples, así que todas se duplican.
	return `'${texto.replace(/['\u2018\u2019\u201A\u201B]/g, comilla => comilla + comilla)}'`;
}


export function Fallar(mensaje) { // Falla con ruido: lo dice en la consola y en una ventana, y sale sin cambiar nada más.

	console.error(mensaje);
	if (PowerShellConfiable) Ventana(mensaje, 'OK', 'Error'); // Sin el PowerShell de Windows no hay ventana, y basta con la consola.
	process.exit(1);

}
