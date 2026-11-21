# Verificador

Así se crea el Verificador de un proyecto. Lo crea el primer paso con código del proyecto, junto con los dos comandos de sus copias de trabajo, que explica `<Trabajo Agéntico>/Habilidades/Copias de Trabajo.md`.

## Lo que se crea

En el primer paso con código, el plan incluye crear el Verificador, los registros de la aplicación y los dos comandos de las copias de trabajo, y completar el `AGENTS.md` del proyecto, o el de su subproyecto, con lo técnico que la IA necesita en cada sesión. El `package.json` del Verificador va en la raíz del proyecto o en la de su subproyecto. Si el proyecto usa una tecnología que tiene archivo en `<Trabajo Agéntico>/Conectores/`, se lee antes: dice lo que el proyecto ya trae hecho y lo que cambia para esa tecnología.

La subsección «Verificador» ya viene en la sección de Trabajo Agéntico del `AGENTS.md`, desde la plantilla, o en el de cada subproyecto. Llena lo que tiene entre corchetes dobles, que es dónde van las pruebas de aceptación y cuáles son los archivos del Verificador. Lo demás va después de la línea con la que termina esa sección. Lo que es igual en todos los proyectos, como el modelo del Revisor Principal, se queda en la carpeta de Trabajo Agéntico: no lo copies al proyecto.

## Cómo funciona

El Verificador corre, con un solo comando en la raíz del proyecto o en la de su subproyecto:

- El linter, que revisa el estilo del código y los errores comunes.
- La verificación de tipos, que también rechaza lo que no se usa, como con `noUnusedLocals` y `noUnusedParameters` en TypeScript. La de las pruebas tiene su propia configuración, como `pruebas/tsconfig.json`, porque las pruebas usan tipos que el código no tiene, y se corre aparte, porque el programa que corre las pruebas, como vitest, no revisa sus tipos.
- Las pruebas locales de código TypeScript o C# que escribe el Implementador mientras trabaja.
- Las pruebas de interfaz punta a punta, con el navegador de Playwright para las apps web o con FlaUI para las aplicaciones de escritorio.
- Las reglas: programas que revisan la estructura del proyecto, no línea por línea sino cómo se relacionan los archivos, por ejemplo que `src/nucleo` no importe nada de `src/proyecto`. Son las reglas de `AGENTS.md` que un programa puede comprobar.
- Las pruebas de aceptación.

Siempre se corre en uno de sus dos modos, para no esperar las pruebas lentas cada vez:

- **El Verificador ligero, `npm run verificador ligero`:** Corre todo, menos la revisión de los tipos de las pruebas, las pruebas pesadas, las de interfaz y las de errores ya arreglados.
- **El Verificador completo, `npm run verificador completo`:** Corre todo, también la revisión de los tipos de las pruebas, las pesadas, las de interfaz y las de errores. Las habilidades dicen en qué momentos se corre.

Las pruebas pesadas son las que, con la preparación que necesitan, tardan consistentemente más de 1 segundo en algún computador de desarrollo, como las que preparan una base de datos simulada. Las pruebas de interfaz son las que abren un navegador o una aplicación de escritorio. Cada clase de prueba va en su propia carpeta, dentro de `pruebas/`: `ligeras/`, `pesadas/` e `interfaz/`. Las de errores ya arreglados, que solo atrapan un error que ya se arregló, se quedan en la carpeta de su clase, pero su nombre empieza con «Error arreglado:». Si un tema tiene pruebas de dos clases, tiene un archivo en cada carpeta, como `ligeras/pagos.test.ts` y `pesadas/pagos.test.ts`. Las de aceptación van dentro de la carpeta de su clase, en `aceptacion/`, como `pruebas/interfaz/aceptacion/`. Los archivos que no son pruebas y sirven a más de una carpeta, como su `tsconfig.json`, van en la raíz de `pruebas/`. El ligero corre todas menos las de `pesadas/` e `interfaz/` y las que empiezan con «Error arreglado:», sin una lista que mantener, y así una prueba que quede fuera de esas carpetas igual se corre. En vitest, las de errores las salta con `-t "^(?!.*Error arreglado:)"`.

Las pruebas se separan de dos formas: la carpeta dice cuánto tarda la prueba o con qué corre, `ligeras/`, `pesadas/` o `interfaz/`, porque eso casi siempre lo decide su preparación, que comparte con las demás pruebas de su archivo. La marca «Error arreglado:» dice para qué existe, porque eso es de cada prueba. Por eso una prueba de error puede estar en cualquiera de las tres carpetas.

La palabra del modo la lee un programa pequeño, como `verificador.mjs`, que corre los pasos de verificación uno por uno y, con `completo`, también revisa los tipos de las pruebas y corre las pesadas, las de interfaz y las de errores. Sin la palabra, o con una que no conoce, se detiene y dice las dos que hay, en vez de escoger un modo por su cuenta.

Las pruebas de interfaz inician su propia copia de la aplicación en un puerto que sale de la ruta de su carpeta, para que varias copias de trabajo las corran al mismo tiempo sin chocar entre ellas ni con la aplicación del Director. Si ese puerto está ocupado, toman el siguiente libre. El puerto se elige una sola vez, al empezar, y se les pasa en una variable de entorno a los procesos que corren las pruebas, porque cada uno vuelve a leer la configuración. Las de Firefox corren en un solo proceso, una tras otra, porque cada proceso inicia su propio Firefox con un perfil nuevo, y varios a la vez saturan el disco. Además, si una de Firefox falla, se repite una vez, porque en su primer minuto Firefox a veces pasa del límite de tiempo. En Playwright, eso es `workers: 1` y `retries: 1` en el proyecto de Firefox. Las de Chromium y WebKit no se repiten.

El programa que corre los modos, como `verificador.mjs`, la configuración de las pruebas de interfaz, como `playwright.config.ts`, y la de los tipos de las pruebas, como `pruebas/tsconfig.json`, también son archivos del Verificador: cambiándolos se puede saltar una prueba, así que la subsección «Verificador» del `AGENTS.md` los nombra con los demás.

El Verificador es único para cada proyecto, o para cada subproyecto, y va dentro del proyecto, pero se puede apuntar al de un proyecto grande reciente para inspiración, no para contenido.

Solo comprueba, nunca modifica el código: el arreglo automático del linter lo corre el Implementador mientras trabaja. Las reglas de estilo de `<Trabajo Agéntico>/Locales/AGENTS.md` que un programa puede comprobar van también como reglas del linter, con mensajes que dicen cómo arreglar lo que se rompió, y casi todas se arreglan solas con el arreglo automático. En `<Trabajo Agéntico>/Locales/AGENTS.md` se quedan todas: el linter solo comprueba que se cumplieron.

Si el proyecto tiene interfaz, lleva además reglas de diseño:

- **En un solo lugar:** Los colores, las fuentes, los pesos, los tamaños de letra, los interlineados, los redondeados, los bordes, los espacios y las sombras se definen una sola vez, en el lugar que use su tecnología, como las variables de CSS o los recursos de XAML.
- **Nada a mano:** La regla rechaza esos valores escritos a mano en los demás archivos de estilos y en las plantillas, y dice dónde están y qué hacer, para que la IA no invente.
- **Los espacios:** Valen además los números más pequeños que el primer escalón y un ajuste fino de menos que eso sobre un solo escalón. Nada se multiplica ni se divide, salvo multiplicación por -1.
- **Iguales a las bases:** Cada uno se compara con la fila de su mismo nombre en `Diseño.md`, si las bases ya tienen sus valores. Lo demás de ese documento no cuenta.
- **Los anchos:** El del contenido también se compara con su fila. Los demás, como el de un campo de un formulario, son propios de cada elemento y se escriben con su número, sin variable.
- **Un valor nuevo:** Si hace falta un valor que la marca no tiene, el mensaje le dice a la IA que se lo pida al Director, sin agregarlo ella, porque los cambios en las bases los aprueba él.

También lleva una prueba de contraste: abre cada pantalla en cada tema y falla si un texto queda por debajo de 2,5 a 1, o de 2 a 1 si es grande. Cada proyecto puede cambiar esos límites.

El `AGENTS.md` del proyecto dice estas reglas, para que la IA las siga desde que programa, y no solo cuando el Verificador las rechaza. Si el conector de la tecnología las trae, ya están, y si no, se escriben en el proyecto. El Director las puede quitar si no las quiere.

Las reglas generales de cada lenguaje y las propias de un tipo de proyecto no están en Trabajo Agéntico: las trae la tecnología del proyecto, como dice su archivo de `<Trabajo Agéntico>/Conectores/`, o se escriben en el proyecto. Las reglas que son gustos del Director, como las de los comentarios, van en un archivo aparte que se copia en el proyecto, como `Locales/reglas-personales.mts`. El linter las carga solo si el archivo existe.
