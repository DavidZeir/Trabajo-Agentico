## Trabajo Agéntico

> **Aviso para la IA:** Esta plantilla está sin llenar. Lo que va entre corchetes dobles se llena con el Director, como dice `<Trabajo Agéntico>/Habilidades/Llenar las Plantillas.md`. Cuando no quede ninguno, borra este aviso.

Este proyecto se desarrolla con el flujo de Trabajo Agéntico. Las bases están en la carpeta `Bases`, en la raíz del proyecto, y su `Leeme.md` dice dónde está cada tema. La carpeta `Pasos/` es el historial de los pasos y los cambios, y no es la fuente de verdad, que son las `Bases` y el resultado del trabajo. No la leas ni busques en ella, salvo la carpeta del paso o del cambio en que estás trabajando. Si crees que el historial te sirve, por ejemplo para saber por qué se hizo algo que no explican ni las `Bases` ni el resultado del trabajo, pídeme permiso.

La carpeta `Archivos/` tiene lo del proyecto que no va en git: mis notas, referencias y recursos, las entregas, como un programa compilado o un informe enviado, y, en las áreas donde el resultado del trabajo es un archivo pesado, como un diseño o un video, el resultado mismo. La organizo yo: no la leas, no busques, no escribas ni borres en ella por tu cuenta, salvo lo que yo te pida o lo que cite una base. Algunas carpetas de `Archivos/` pueden ser enlaces a carpetas compartidas con otras personas. En ellas no cambies, muevas ni borres nada sin que yo te lo autorice, aunque te haya pedido leerlas o una base las cite, porque lo que cambies ahí les llega a esas personas y git no lo puede deshacer.

Si el proyecto tiene código, su Verificador ligero se corre con `npm run verificador ligero`, el completo, con `npm run verificador completo`, y la aplicación se inicia con `npm run iniciar`, en la raíz, o en el subproyecto que tocas. Antes de trabajar en un subproyecto, lee su `AGENTS.md`, si tiene.

Si te pido una habilidad y no la tienes, no la improvises: avísame, porque es posible que en este equipo falte configurar las habilidades de Trabajo Agéntico, como explica su `Habilidades/Leeme.md`.

### Subproyectos

Si el proyecto tiene subproyectos, aquí van uno por línea, con su carpeta y qué es, como «`Web/`: La web, en Cloudflare Workers». Cuando se crea el primero, las dos subsecciones siguientes se mudan al `AGENTS.md` de cada subproyecto, que empieza con la línea «Este es un subproyecto de [nombre del proyecto]. Lo general está en el `AGENTS.md` de la raíz».

Ninguno por ahora: todo el código está en la raíz.

### Copias de trabajo

[[La llena la IA en el primer paso que escribe código, con lo que lleva entre corchetes dobles, cuando ya existan los comandos de las copias de trabajo. Hasta entonces se deja así.]]

Cada etapa de `/realizar-paso` se hace en su propia copia de trabajo, dentro de `Temporal/`. Dos comandos dejan lista la copia de trabajo e inician la aplicación, sin pasos a mano, y los escribe el primer paso con código. Como `/realizar-cambio` trabaja en la carpeta principal, de aquí solo usa `npm run iniciar`.

- **`npm run alistar`:** Deja la copia de trabajo lista y nunca se corre en la carpeta principal. Si algo falla, se detiene con un mensaje que dice qué hacer.
- **`npm run iniciar`:** Inicia la aplicación sin chocar con la del Director ni con la de otra copia de trabajo, deja su salida en `Temporal/` y dice su proceso, para cerrar solo esa.

### Verificador

[[La llena la IA en el primer paso que escribe código, con lo que lleva entre corchetes dobles, cuando ya exista el Verificador. Hasta entonces se deja así.]]

Estos archivos deciden si el código pasa el Verificador, así que en `/realizar-paso`, desde que empiezan las etapas, ningún agente los cambia.

[[Se dejan las líneas de lo que tiene el Verificador del proyecto, y se agregan las que falten, como las pruebas de interfaz.]]

- **Pruebas de aceptación:** [[Sus carpetas, una por cada clase de prueba que tenga el proyecto, dentro de la carpeta de esa clase, como `pruebas/ligeras/aceptacion/`, `pruebas/pesadas/aceptacion/` y `pruebas/interfaz/aceptacion/`.]]
- **Comandos:** [[Los `package.json` con el comando `verificador` y el programa que corre sus dos modos, como `verificador.mjs`, que con la palabra `ligero` salta la revisión de los tipos de las pruebas, `pruebas/pesadas/`, `pruebas/interfaz/` y las pruebas cuyo nombre empieza con «Error arreglado:».]]
- **Pruebas enfocadas:** [[Cómo se corre solo una parte de las pruebas mientras se programa: un archivo, una carpeta o una prueba por su nombre. Si el proyecto tiene varios tipos de pruebas, cómo se enfoca cada uno, como `npx vitest run pruebas/ligeras/archivo.test.ts`, `npx playwright test pruebas/interfaz/archivo.interfaz.ts --project=chromium` o `dotnet test --filter NombreDeLaPrueba`. Y dónde se corre.]]
- **Pruebas:** [[Su configuración, como `vitest.config.mts` y `playwright.config.ts`.]]
- **Linter:** [[Su configuración y sus reglas.]]
- **Tipos:** [[Su configuración, como `tsconfig.json`, y la de las pruebas, como `pruebas/tsconfig.json` y `pruebas/interfaz/tsconfig.json`.]]
- **Reglas de estructura:** [[Su programa.]]
- **Reglas de diseño:** [[Su programa y el archivo donde se definen los colores, las fuentes, los pesos, los tamaños de letra, los interlineados, los redondeados, los bordes, los espacios y las sombras, que no se escriben a mano en ningún otro. Si Diseño.md ya tiene sus valores, un valor nuevo lo aprueba el Director, y la IA no lo agrega por su cuenta.]]
- **Prueba de contraste:** [[Su archivo y dónde se cambian sus límites.]]

------------------------------------------------------------------------------------------