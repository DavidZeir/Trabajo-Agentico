# Cómo funciona esta carpeta

Aquí va lo de Trabajo Agéntico que no va en git. De esta carpeta, solo este archivo está en git: lo demás queda en el computador de cada quien, para que nadie publique lo suyo ni se lo imponga a los demás.

Lo propio del Director se copia a mano a un computador nuevo, desde otro, como dice `Configuración.md`:

- `Agents Personal.md`: Lo que el Director le agrega al `AGENTS.md` global, como sus reglas de estilo o sus preferencias de trabajo. `Programas/Agents Global/Construir.mjs` lo junta con `Plantillas/Agents Global.md`, que tiene lo de Trabajo Agéntico, en el `AGENTS.md` de aquí, que es el que leen Claude y Codex. Si no existe o está vacío, ese `AGENTS.md` queda solo con lo de Trabajo Agéntico. Al instalar, `Programas/Agents Global/Instalar.mjs` pone aquí lo que ya tenía el `AGENTS.md` de Codex de ese computador, salvo que sea una copia del `AGENTS.md` construido: de esa solo deja un respaldo en `.codex`, y lo propio que tuviera se pasa aquí a mano.
- `reglas-personales.mts`: Las reglas personales del linter, para los proyectos de TypeScript. Cada proyecto tiene su copia, y su linter la carga si existe.
- `Preferencias.json`: Lo que el Director decide: la familia del modelo y el razonamiento de cada papel, como `opus` con `high`, en una sección por cada programa que usa, las paradas, que son los momentos en que la IA lo espera, las vueltas máximas, el techo de cada revisor, las pruebas gemelas, que el Líder hace o no después de cada etapa, y la sugerencia de los MCP de diseño, que las habilidades de diseño hacen hasta que el Director diga que no. Si los revisores de un programa son de ese mismo programa, no hay revisor externo.

  Nace de una de las dos plantillas de `Plantillas/`: `Preferencias.json`, para una sola suscripción, o `Preferencias Dos Suscripciones.json`, para las dos. `Programas/Preferencias/Comprobar.mjs` lo revisa al instalar y al empezar cada habilidad. El nombre exacto de la versión de hoy de cada familia lo pone `Programas/Preferencias/Modelos.json`, que se actualiza en Trabajo Agéntico cuando sale una versión nueva. La parada de antes de subir no se debería apagar: ese programa la rechaza. El razonamiento lo revisa contra los niveles que acepta Claude o Codex, y no contra los de cada modelo: si un modelo no tiene el nivel que se le pide, su programa puede usar uno menor.

Lo que se arma en cada computador no se copia:

- `AGENTS.md`: El Glosario de Trabajo Agéntico y las reglas globales para todos los proyectos, el archivo que leen Claude y Codex en todas las sesiones. No se edita: lo construye `Programas/Agents Global/Construir.mjs`, juntando `Plantillas/Agents Global.md`, que es igual para todos, con `Agents Personal.md`, que es lo propio del Director.
- `Proyectos.md`: Los proyectos de este computador que usan Trabajo Agéntico, para llevarles los cambios de lo que se copia a ellos, como las plantillas de `Plantillas/`. No se copia porque solo se supervisan los configurados en el computador local, que son los que están al alcance de actualización.

## Cómo leen Claude y Codex el AGENTS.md

- Codex lee sus reglas globales de `%USERPROFILE%\.codex\AGENTS.md`. Ese archivo no es una copia: es un enlace simbólico que apunta al `AGENTS.md` de aquí.
- Claude lee `%USERPROFILE%\.claude\CLAUDE.md`, que tiene sus instrucciones propias y trae el `AGENTS.md` de aquí directamente, sin pasar por el enlace de Codex, con la línea `@[carpeta de Trabajo Agéntico]/Locales/AGENTS.md`. La ruta va con `/` en vez de `\` y con una barra invertida antes de cada espacio, como en `Trabajo\ Agéntico`. Esa barra es obligatoria: sin ella, Claude corta la ruta en el primer espacio y no carga las reglas.

Así, cada vez que se construye el `AGENTS.md` de aquí, cambian las reglas de los dos programas desde la siguiente sesión. Las sesiones que ya están abiertas siguen con lo que cargaron al empezar.

## Cuidado al editarlo

No se edita: se editan sus dos fuentes y se vuelve a construir, como dice su primera línea. Por eso queda de solo lectura. Si alguien lo editara desde `.codex` o desde la configuración de Codex, Codex podría reemplazar el enlace por un archivo normal, y las dos copias se separarían sin avisar.

## Cómo saber que el enlace sigue bien

El Explorador lo muestra como un archivo normal. En PowerShell, este comando debe mostrar `<SYMLINK>` y el destino entre corchetes:

```
cmd /c dir "$env:USERPROFILE\.codex"
```

## Cómo volver a crear el enlace

Si se perdió, por ejemplo al reinstalar Codex, se vuelve a correr `node "Programas/Agents Global/Instalar.mjs"` en la carpeta de Trabajo Agéntico.

Si en `.codex` quedó un `AGENTS.md`, el programa lo guarda en `Agents Personal.md`, aquí, y deja un respaldo, después de pedir permiso en una ventana. La excepción es una copia del `AGENTS.md` construido, que el programa reconoce por su primera línea: de esa solo deja el respaldo, porque traería una versión vieja de `Plantillas/Agents Global.md`. Si esa copia tenía reglas propias que no están en `Agents Personal.md`, hay que pasarlas a mano desde el respaldo.

Funciona sin permisos de administrador porque Windows tiene activo el modo de programador, como pide la configuración de Trabajo Agéntico, en su `Configuración.md`.

## Cómo quitar el enlace sin perder las reglas

Este comando de PowerShell borra solo el enlace y deja intacto el `AGENTS.md` de aquí:

```
cmd /c del "$env:USERPROFILE\.codex\AGENTS.md"
```

## Cómo dejar el computador como estaba

Si el usuario ya no quiere Trabajo Agéntico en su computador, se corre `node "Programas/Agents Global/Restaurar.mjs"` en la carpeta de Trabajo Agéntico. Ese programa deshace lo que la configuración conectó a Claude y a Codex: quita los enlaces a las habilidades de aquí, el enlace de Codex y la línea de Claude, y devuelve lo que había antes, con los respaldos que dejó `Programas/Agents Global/Instalar.mjs`. Antes de cambiar nada, pide permiso en una ventana, y si hay que elegir qué `AGENTS.md` queda en Codex, el usuario lo elige ahí. No toca nada dentro de la carpeta de Trabajo Agéntico.

Si la carpeta se movió después de instalar, no quita los enlaces rotos ni la línea vieja, porque no puede comprobar que sean de esta instalación: los nombra, para quitarlos a mano. Después se vuelve a correr, para que devuelva los respaldos.

## Si se mueve Trabajo Agéntico

Si esta carpeta cambia de lugar o de nombre, el enlace de Codex queda roto y la línea de Claude apunta a un lugar que no existe. Se arregla corriendo `node "Programas/Agents Global/Instalar.mjs"` desde la carpeta nueva, que cambia el enlace roto por uno nuevo y agrega la línea nueva, y quitando a mano la línea vieja de `%USERPROFILE%\.claude\CLAUDE.md`.
