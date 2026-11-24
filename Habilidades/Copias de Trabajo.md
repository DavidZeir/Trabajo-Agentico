# Copias de Trabajo

Así se crean los dos comandos de las copias de trabajo de un proyecto, `npm run alistar` y `npm run iniciar`. Los crea el primer paso con código del proyecto, junto con el Verificador, que explica `<Trabajo Agéntico>/Habilidades/Verificador.md`. Si a un proyecto que ya tiene código le faltan los comandos, se los agrega un cambio menor, que también llena la subsección «Copias de trabajo» de su `AGENTS.md`.

## Lo que se crea

Los dos comandos van en el `package.json` del Verificador, en la raíz del proyecto o en la de su subproyecto. Si el proyecto usa una tecnología que tiene archivo en `<Trabajo Agéntico>/Conectores/`, se lee antes: dice lo que el proyecto ya trae hecho, como estos dos comandos, y lo que cambia para esa tecnología.

La subsección «Copias de trabajo» ya viene en la sección de Trabajo Agéntico del `AGENTS.md`, desde la plantilla, o en el de cada subproyecto. Llena lo que tiene entre corchetes dobles.

## Los comandos

Ninguno de los dos necesita pasos a mano. Si algo falla, cada uno se detiene con un mensaje que dice qué hacer. Si el proyecto tiene subproyectos, `npm run alistar` se corre dentro de cada uno que trae la copia.

- **`npm run alistar`:** Deja una copia de trabajo lista, y nunca se corre en la carpeta principal:
  - **Archivos que se copian de la carpeta principal:** Los que hacen falta y no están en git, porque una copia de trabajo nueva solo trae lo que está en git. Por ejemplo, `USE Scribe/USE Scribe.exe`, que la aplicación necesita, y las reglas personales del linter, para que el Verificador de la copia de trabajo también las use. Nunca las claves.
  - **Archivos que se enlazan:** Las claves de desarrollo, con un enlace simbólico a las de la carpeta principal, para que nunca se copien. El enlace se crea, como con `cmd /c mklink`, sin permisos de administrador, cuando Windows tiene activo el modo de programador. Si no se puede crear, el comando se detiene y dice que hay que activar ese modo, en vez de copiarlas.
  - **Dependencias:** Los paquetes que el proyecto descarga, como `node_modules`, que git no trae: el comando que los instala en la copia de trabajo, como `npm ci`, y la carpeta donde se corre.
  - **Base de datos:** El comando que crea la base de datos local y le carga datos de prueba inventados, nunca los de producción. Si la aplicación no tiene base de datos, esta parte no va.
- **`npm run iniciar`:** Inicia la aplicación sin chocar con la del Director ni con la de otra copia de trabajo, deja su salida en `Temporal/` y dice su proceso, para cerrar solo esa. Según el tipo de aplicación del proyecto:
  - **Aplicación web:** El comando que la inicia en un puerto libre, en qué carpeta y dónde deja su salida. Los puertos que usa la carpeta principal, para no repetirlos. Nunca con los datos de producción.
  - **Aplicación de escritorio:** El comando que la compila y la abre, en qué carpeta y dónde deja sus registros. Si se pueden abrir dos copias a la vez y cómo se reconoce la que abrió la sesión, para cerrar solo esa. Dónde guarda su configuración y sus datos, para no tocar los del Director ni los de producción.
  - **Aplicación móvil:** El emulador o el simulador que se usa, el comando que la compila y la instala en él, y dónde se ven sus registros. El servidor al que se conecta, que nunca es el de producción.

## Las copias de un proyecto con subproyectos

Aquí, los subproyectos son los de código, los que nombra la sección «Subproyectos» del `AGENTS.md` del proyecto. Un subproyecto que solo tiene su carpeta dentro de `Bases` no cuenta, porque `Bases` llega completa a cada copia.

La copia de trabajo trae solo los archivos de la raíz, `Bases` y los subproyectos que toca su paso o su etapa. Se crea así:

1. `git worktree add --no-checkout <ruta> <rama>`.
2. `git -C <ruta> sparse-checkout set --cone Bases <subproyecto> <otro subproyecto>`.
3. `git -C <ruta> checkout <rama>`.

La carpeta principal no cambia, y lo que se confirma en la copia conserva intactos los demás subproyectos. Si hace falta mirar uno que la copia no trae, se lee en la carpeta principal.
