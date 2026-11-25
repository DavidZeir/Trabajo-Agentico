# Cómo funciona esta carpeta

Las plantillas de Trabajo Agéntico: las de cada proyecto del flujo, que se copian como dice «Inicio de un proyecto», en `Configuración.md`, la del `AGENTS.md` global, el que leen Claude y Codex en todas las sesiones, y la de las preferencias del Director.

- `Agents Global.md`: Lo de Trabajo Agéntico en el `AGENTS.md` global: el Glosario y las reglas que la IA sigue siempre. `Programas/Agents Global/Construir.mjs` lo junta con `Locales/Agents Personal.md` en `Locales/AGENTS.md`.
- `Agents Proyecto.md`: La sección de Trabajo Agéntico que va en el `AGENTS.md` de cada proyecto. Sus subsecciones se llenan en el primer paso con código: la de copias de trabajo nombra los dos comandos que alistan e inician la carpeta aparte, en `Temporal/`, donde cada Implementador hace su etapa en paralelo con los demás, y la del Verificador, qué archivos protege `/realizar-paso`.
- `Archivos/`: La carpeta `Archivos` de un proyecto nuevo, solo con su `Leeme.md`, que explica que ahí va lo del proyecto que no va en git, como las notas del Director, las entregas o un resultado del trabajo que pesa mucho. También sugiere un orden para la carpeta y explica que algunas de sus carpetas pueden ser enlaces a carpetas compartidas de un servicio como Dropbox, que se crean como dice `Configuración.md`. Ese `Leeme.md` es lo único de la carpeta que entra a git, para que llegue con cada clon.
- `Bases/`: La carpeta `Bases` de un proyecto nuevo, con los documentos mínimos, su estructura y sus valores predeterminados.
- `Fuera de Git.md`: La lista de los archivos que hacen falta para trabajar en un proyecto y que git no trae, con por qué quedan fuera. No se copia al iniciar el proyecto: la IA la crea en su raíz cuando deja fuera de git el primero, como dice el `AGENTS.md` global.
- `Plantilla .claude/`: La carpeta `.claude` con la que empieza cada proyecto, con su `settings.json`: las reglas duras que impone Claude Code, para que sus herramientas no abran los archivos de claves, de llaves ni de contraseñas, y para que no suba a la fuerza. Solo frenan a la IA, y no a los programas del proyecto, que sí leen sus claves. Negar `.env` o `.dev.vars` niega también sus variantes, como `.env.example`, y Claude no deja abrir una excepción dentro de una regla que niega, así que la IA tampoco lee los archivos de muestra. Codex todavía no tiene unas iguales.
- `Plantilla .editorconfig`: El `.editorconfig` con el que empieza cada proyecto, para que los editores también escriban en LF.
- `Plantilla .gitattributes`: El `.gitattributes` con el que empieza cada proyecto, para que los archivos de texto vayan en LF, también en Windows.
- `Plantilla .gitignore`: El `.gitignore` con el que empieza cada proyecto.
- `Plantilla .ignore`: El `.ignore` con el que empieza cada proyecto, para que las búsquedas de Claude y Codex se salten `Pasos/` y `Archivos/`.
- `Preferencias.json`: La plantilla de `Locales/Preferencias.json` para quien tiene una sola suscripción, de Claude o de Codex, con los revisores del mismo programa, y las paradas, las vueltas máximas, las pruebas gemelas y la sugerencia de los MCP de diseño en sus valores predeterminados.
- `Preferencias Dos Suscripciones.json`: La misma plantilla, para quien tiene las dos suscripciones, con los revisores de la otra empresa. La configuración copia tal cual la que aplica a las suscripciones del Director, y las dos tienen siempre las mismas claves.

Las cinco plantillas que empiezan con «Plantilla» llevan esa palabra al principio del nombre para que no actúen aquí, en Trabajo Agéntico, porque git, los editores y las búsquedas reconocen esos archivos por su nombre, en cualquier carpeta. Con su nombre de verdad:

- **El `.editorconfig` y el `.gitattributes`:** Se confundirían con los que Trabajo Agéntico tiene en su raíz, que son una copia de estos, para que sus propios archivos también vayan en LF.
- **El `.gitignore`:** Git dejaría fuera del repositorio lo que dice, como la carpeta `Bases/` de aquí.
- **El `.ignore`:** Las búsquedas de Claude y Codex se saltarían lo que dice.
- **La carpeta `.claude`:** Claude Code les aplicaría sus reglas a las sesiones que se abran en esta carpeta.

Al copiarlos a un proyecto, quedan con su nombre de verdad. Los dos de `Agents` no lo necesitan, porque ninguno se llama exactamente `AGENTS.md`.

Las plantillas que tienen algo que llenar empiezan con un aviso, que remite a `Habilidades/Llenar las Plantillas.md`, donde dice cuándo y cómo se llenan con el Director, y cada cosa que falta va entre corchetes dobles, con lo que va ahí y quién lo decide. El aviso se borra cuando ya no queda ningún corchete doble. Las que crecen con el tiempo, como `Decisiones.md`, no lo llevan.

Cuando cambia una plantilla de los proyectos, el cambio se lleva a los de `Locales/Proyectos.md`. Cuando cambia `Agents Global.md`, se vuelve a construir `Locales/AGENTS.md`.
