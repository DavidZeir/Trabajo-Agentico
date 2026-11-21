# Configuración

Lo que se hace una sola vez: configurar Trabajo Agéntico en cada computador y empezar cada proyecto. Los procesos de cada día están en `Procesos/`.

## Configurar 'Trabajo Agéntico'

Una sola vez en cada computador.

1. Instalar los programas. Con una sola suscripción, de Claude o de Codex, se instala solo lo de ese programa. Todo se instala desde un PowerShell abierto desde el menú Inicio, como administrador o sin administrador, según diga cada programa, y nunca desde la terminal de una app de Claude o de Codex. Esas apps guardan dentro de su propio paquete lo que se instala desde sus terminales, y eso deja copias escondidas que el resto de Windows no ve y que se borran si la app se reinstala.

   - **Git:** En un PowerShell como administrador, con `winget install --id Git.Git -e`, o desde su página.
   - **Node.js, en su versión LTS:** En un PowerShell como administrador, con `winget install --id OpenJS.NodeJS.LTS -e`, o desde su página. Trae `npm`, con el que se instalan los comandos de Claude y de Codex y se corren los Verificadores de los proyectos. Después de instalarlo hay que abrir un PowerShell nuevo, para que encuentre `npm`.
   - **Las aplicaciones de Claude y de Codex:** Desde sus páginas de descarga.
   - **La directiva de ejecución de PowerShell:** En un PowerShell sin administrador, con `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. Windows viene con una que no deja correr scripts, y sin este cambio PowerShell no deja usar `npm`, `claude`, `codex` ni los Verificadores. Solo cambia en el usuario, deja correr los scripts del computador y les sigue pidiendo firma a los que vienen de internet. Se deshace con `Set-ExecutionPolicy -Scope CurrentUser Undefined`.
   - **Los comandos de terminal de Claude y de Codex:** Hacen falta además de las aplicaciones, porque con ellos se llama a los revisores. Se instalan en un PowerShell sin administrador, porque quedan en la carpeta del usuario, con `npm install -g @anthropic-ai/claude-code@latest` y `npm install -g @openai/codex@latest`, y con los mismos comandos se actualizan. Después, cada uno se abre una vez en ese PowerShell, con `claude` y `codex`, para iniciar sesión, y si ya la tiene de su app, no la pide. Para verificar que funcionan, se le pide a la app de Claude o de Codex que les haga una pregunta corta a los dos. No sirven los que traen las aplicaciones, porque viven en carpetas internas que cambian con cada actualización y no tienen la sesión iniciada en la terminal.
   - **MarkText:** Es opcional, y sirve para leer los `.md` con su formato.
   - **Lo de cada tecnología:** Lo que solo necesitan los proyectos de una tecnología, como el SDK de un lenguaje, la sesión de un servicio o los navegadores de Playwright, está en el archivo de esa tecnología en `Conectores/`. Se instala la primera vez que se trabaja en uno de esos proyectos en este computador.

2. Activar el modo de programador de Windows, que deja crear enlaces simbólicos sin ser administrador. Lo necesitan el enlace del `AGENTS.md` de Codex y el de las claves en las copias de trabajo. En Windows 10 está en Configuración, Actualización y seguridad, Para programadores, y en Windows 11, en Configuración, Sistema, Para programadores.

3. Crear la carpeta donde va a quedar Trabajo Agéntico, fuera de OneDrive y de Dropbox.

4. Abrir Claude o Codex en esa carpeta y pegarle este pedido, con la cuenta de GitHub donde está Trabajo Agéntico:

   > Clona el repositorio https://github.com/DavidZeir/Trabajo-Agentico directamente en esta carpeta, sin crear otra adentro. Pregúntame si tengo `Agents Personal.md`, `reglas-personales.mts` y `Preferencias.json` en la carpeta `Locales/` de otro computador, y si los tengo, espera a que los copie en la de aquí. Si no tengo `Preferencias.json`, pregúntame si tengo una sola suscripción, de Claude o de Codex, o las dos, y créalo copiando tal cual, sin editarla, la plantilla que aplica: `Plantillas/Preferencias.json` si tengo una sola, que pone los revisores en el mismo programa, o `Plantillas/Preferencias Dos Suscripciones.json` si tengo las dos, que los pone en la otra empresa, para que miren el trabajo con otros ojos. Después conéctalo a Claude y a Codex: corre `node "Programas/Agents Global/Instalar.mjs"`, que comprueba esas preferencias, construye su `AGENTS.md`, guarda el que ya tenga el computador, hace el enlace de Codex y la línea de Claude, y enlaza cada habilidad en `.claude\skills` y en `.codex\skills`. Ese programa abre una ventana para que yo apruebe lo que va a hacer: espera a que la conteste, y si la ventana no aparece, pídeme que lo corra yo en un PowerShell sin administrador.

   Con eso, las habilidades y las reglas del `AGENTS.md` quedan disponibles en cualquier carpeta del computador. Lo que este paso conecta a Claude y a Codex se deshace con `node "Programas/Agents Global/Restaurar.mjs"`, como explica `Locales/Leeme.md`.

5. Para evitar que el computador se suspenda por inactividad en medio de un paso, revisar la configuración de cada programa que se use. En Claude de escritorio, activar la opción de mantener el computador despierto. En Codex de escritorio, activar 'Prevent sleep while running' en Configuración → General, disponible por el momento solo en macOS y Linux.

6. Leer `Prácticas del Director.md`: unos consejos cortos para trabajar con el agente principal, que no son parte del método, pero que hacen la diferencia en el día a día.

## Inicio de un proyecto

1. Crear el repositorio en GitHub, privado y vacío: sin README, sin `.gitignore` y sin licencia.

2. En el computador crear la carpeta donde va a quedar todo el proyecto, con el nombre del proyecto, que es el que van a usar sus bases. No debe quedar dentro de OneDrive ni de Dropbox, porque sincronizar una carpeta con git da problemas.

3. Abrir Claude o Codex en esa carpeta y pegarle este pedido, con la dirección del repositorio:

   > Vamos a empezar un proyecto nuevo en esta carpeta, con el flujo de Trabajo Agéntico. Haz esto, en orden:
   >
   > 1. Busca la carpeta de Trabajo Agéntico en este computador. Para encontrarla, mira a dónde apunta el enlace `incorporar-idea`, que está en `%USERPROFILE%\.claude\skills` o en `%USERPROFILE%\.codex\skills`. Ese enlace apunta a la carpeta `Habilidades/incorporar-idea` de Trabajo Agéntico, así que Trabajo Agéntico es la carpeta que contiene a `Habilidades`. Si no encuentras el enlace, detente y avísame, porque es posible que falte configurar Trabajo Agéntico en este computador.
   > 2. Pregúntame qué tipo de proyecto es, y dame como opciones los archivos de la carpeta `Conectores/` de Trabajo Agéntico, menos su `Leeme.md`, y la opción «otro». Si elijo uno, léelo antes de seguir: dice cómo se empieza ese tipo de proyecto, y donde diga algo distinto de estos pasos, vale lo que dice él.
   > 3. Clona el repositorio https://github.com/[cuenta]/[repositorio] directamente en esta carpeta, sin crear otra adentro. Está vacío, y es donde va a quedar el proyecto.
   > 4. Copia aquí las carpetas `Plantillas/Bases` y `Plantillas/Archivos` de Trabajo Agéntico, con los nombres `Bases` y `Archivos`. En `Archivos` va lo mío que no es el resultado del trabajo ni las bases, fuera de git, como lo explica su `Leeme.md`.
   > 5. Copia aquí el archivo `Plantillas/Agents Proyecto.md` de Trabajo Agéntico, con el nombre `AGENTS.md`.
   > 6. Crea aquí un `CLAUDE.md` con una sola línea, `@AGENTS.md`. Claude Code lee el `AGENTS.md` por su cuenta cuando no hay un `CLAUDE.md`, pero no en todas las sesiones, y esa línea hace que lo lea siempre.
   > 7. Copia aquí los archivos `Plantillas/Plantilla .gitignore`, `Plantillas/Plantilla .ignore`, `Plantillas/Plantilla .gitattributes` y `Plantillas/Plantilla .editorconfig` de Trabajo Agéntico, con los nombres `.gitignore`, `.ignore`, `.gitattributes` y `.editorconfig`, y la carpeta `Plantillas/Plantilla .claude`, con el nombre `.claude`, cuyas reglas no dejan que Claude abra los archivos de claves, de llaves y de contraseñas, ni que suba a la fuerza. Los dos últimos hacen que los archivos de texto vayan en LF, también en Windows, para que no se mezclen con las líneas que escriben Claude y Codex. Las bases y los pasos van en el repositorio, para que cada cambio quede en su historial y yo lo apruebe con git. Por eso el repositorio es privado: si algún día quiero compartir el código, se publica una copia sin las bases ni los pasos en otro repositorio, como dice el `.gitignore`.
   > 8. Pon el nombre del proyecto en el título de `Bases/Leeme.md`. Es el nombre de esta carpeta.
   > 9. Pregúntame por el propósito del proyecto, y escríbelo en «El propósito» de `Bases/Justificación.md`, como dice `Habilidades/Llenar las Plantillas.md` de Trabajo Agéntico. Si todavía no lo tengo claro, déjalo para después.
   > 10. Pregúntame con qué nombre y correo se firman las confirmaciones de este proyecto, y configúralos solo en este repositorio. 
   > 11. Anota el nombre de esta carpeta en `Locales/Proyectos.md` de Trabajo Agéntico, la lista de los proyectos de este computador que usan el flujo, para que les lleguen los cambios de las plantillas. Si no existe, créalo. Ese archivo no va en git.
   > 12. Al final, dime qué quedó en la carpeta y pregúntame si preparo, confirmo y subo los cambios.

   Si es la primera vez en ese computador, git pide entrar a GitHub.

4. Cuando la IA pregunte si prepara, confirma y sube los cambios, decirle que sí.

Desde ahí, las sesiones se abren siempre en la carpeta del proyecto. Si «El propósito» de `Justificación.md` quedó para después, es la primera idea que conviene incorporar, con `/incorporar-idea`.

Si el proyecto ya existía y tiene su propio `AGENTS.md`, no se crea uno nuevo: se le agrega al principio la sección de `Plantillas/Agents Proyecto.md`, y lo que ya tenía queda después de la línea con la que termina. También se le crea el `CLAUDE.md` con `@AGENTS.md`, o se le agrega esa línea al principio si ya tenía uno. Si no tiene `.gitignore`, también se le copia el de la plantilla, y si ya tiene uno, se le agrega lo que le falte de ella, con sus bloques tal cual, porque `Programas/Compartir/Copiar.mjs` los busca por su texto. Con el `.ignore` se hace lo mismo. Con el `.gitattributes` y el `.editorconfig` también, y si el proyecto ya tenía archivos en CRLF, se pasan a LF. Si no tiene `.claude/settings.json`, se le copia la carpeta de la plantilla, y si ya tiene uno, se le agregan las reglas que le falten. Y también se anota en `Locales/Proyectos.md` de Trabajo Agéntico.

Si el proyecto ya usa el flujo y solo se clona en otro computador, al clonarlo llega todo lo que está en git, pero faltan tres cosas:

- Anotarlo en `Locales/Proyectos.md` de Trabajo Agéntico, la lista de los proyectos de ese computador.
- Copiarle las reglas personales del linter, si están en `Locales/`. El archivo de su tecnología, en `Conectores/`, dice en qué carpeta del proyecto van.
- Copiarle desde el otro computador lo que dice su `Fuera de Git.md`, si lo tiene, como la carpeta `Archivos/`.
