## Glosario

- **Carpeta de Trabajo Agéntico:** En este computador, `<Trabajo Agéntico>` representa `[[Ruta de Trabajo Agéntico]]`.
- **Director:** Yo. Dirijo el trabajo en su conjunto: defino los objetivos, decido, apruebo y priorizo. Las IAs y los agentes me proponen. Así me llaman la documentación y las habilidades, nunca me llaman 'el humano'.
- **Usuario:** Quien usa el resultado del trabajo, como una aplicación, una web, un manual o un servicio. A mí no se me llama así.
- **Resultado del trabajo:** Lo que produce el trabajo de un proyecto, sea del área que sea. Puede ser código, un documento, un informe, una presentación, una plantilla, un diseño, un video, una hoja de cálculo o un tablero de indicadores.
- **Líder:** La sesión principal de la IA en un paso o en un cambio menor, con el modelo y el razonamiento que piden mis preferencias, en `<Trabajo Agéntico>/Locales/Preferencias.json`. Planea, reparte las etapas, las junta, corrige lo que encuentran los revisores y me reporta.
- **Implementador:** Agente que lanza el Líder para hacer una etapa. Pueden ser varios en paralelo.
- **Verificador:** El programa sin IA que comprueba el trabajo de un proyecto con un solo comando, en su raíz o en la de cada subproyecto. Responde si pasa o no pasa, y qué falló. En el software corre el linter, los tipos, las pruebas y las reglas de estructura, siempre en uno de sus dos modos: el Verificador ligero, `npm run verificador ligero`, que salta la revisión de los tipos de las pruebas, las pruebas pesadas, las de interfaz y las de errores ya arreglados, y el Verificador completo, `npm run verificador completo`, que corre todo.
- **Revisor de Etapa:** Una IA en solo lectura, que revisa cada etapa con su plan y sus cambios. Su programa, su modelo y su razonamiento los fijan mis preferencias, como los del Revisor Principal.
- **Revisor Principal:** Una IA en solo lectura, por lo general de otra empresa. Su programa, su modelo y su razonamiento los fijan mis preferencias, en `<Trabajo Agéntico>/Locales/Preferencias.json`, cuando lo llama una habilidad, o los elijo yo cuando lo abro en su propia aplicación. En el software, con `/implementar-paso`, revisa como Revisor de Plan los planes del paso, como Revisor de Pruebas las pruebas de aceptación, como Revisor de Puerta cada etapa antes de que se fusione y como Revisor Final el conjunto completo.
- **Bases:** Los documentos de cada proyecto que dicen lo que el proyecto ya es y lo que se va a hacer, con sus razones. Son su fuente de verdad, junto con el resultado del trabajo, y cada cambio en ellas lo aprueba el Director con `/incorporar-idea` o con el traslado de una idea aprobada a su documento dueño.
- **Pasos Pendientes:** El documento del proyecto con los pasos que faltan por terminar, incluido el que está en curso, en orden y con sus criterios de aceptación.
- **Pasos Terminados:** El documento único del proyecto con los pasos finalizados, sus criterios de aceptación y su fecha de cierre.
- **Paso:** Un avance previsto en los pasos pendientes del proyecto, que en el software se implementa con `/implementar-paso`:
  - Debe estar acotado. Antes de empezar, queda claro qué resultado se va a entregar y qué cambios quedan fuera del paso, aunque estén relacionados con el mismo tema.
  - Se hace en una sola sesión del Líder.
  - Tiene un solo objetivo, que se dice en una frase sin objetivos secundarios enlazados con la palabra «y».
  - Tiene criterios de aceptación claros que el Verificador puede comprobar al terminar la sesión.
  - Deja el proyecto funcionando, aunque el paso siguiente no exista todavía.
  - Puede tener decisiones pendientes, anotadas en su «Falta definir», que el Líder resuelve con el Director antes de escribir su plan.
- **Criterios de aceptación:** Lo que tiene que cumplirse para dar un paso por terminado. Antes de hacer el paso, el Líder los convierte en comprobaciones, que después corre el Verificador. En el software, esas comprobaciones son las pruebas de aceptación.
- **Etapa:** La parte de un paso que un Implementador hace solo. En el software, tiene su propia rama y su propia copia de trabajo.
- **Habilidad:** Un programa escrito en español que ejecuta la IA: instrucciones de texto que le dicen qué hacer en un proceso, en qué orden y con qué límites, como `/implementar-paso`. Las de Trabajo Agéntico están en `<Trabajo Agéntico>/Habilidades/`.
- **Aprendizaje:** Lo que la IA aprende de un tropiezo en un paso o en un cambio menor, algo que le hizo perder tiempo o la hizo equivocarse, para que no le vuelva a pasar en otra sesión. El tropiezo puede estar en el código, en las pruebas, en las herramientas, en un servicio externo o en el mismo flujo de Trabajo Agéntico. Un hallazgo de un revisor o una falla del Verificador pueden dejar un aprendizaje, pero no lo dejan un error que se arregla enseguida, una decisión que se toma en el camino ni un problema que ya venía de antes. Hay un aprendizaje si el tropiezo cumple tres cosas:
  - **Costó:** Tiempo investigando, un intento que no funcionó o un error que alguien tuvo que atrapar, sea el Verificador, un revisor o yo.
  - **Se puede repetir:** La próxima sesión, sin saberlo, caería igual.
  - **No se ve:** No se descubre leyendo el código o los documentos.

### En el software

- **Pruebas enfocadas:** Un subconjunto de las pruebas (ligeras, pesadas, de interfaz y de errores) de lo que se está tocando, que se corren aparte mientras el Implementador programa, como dice el `AGENTS.md` del proyecto. Sirven para ir probando el código escrito.
- **Rama de integración:** La rama donde el Líder fusiona las etapas de un paso. Sale de la rama principal y vuelve a ella con la fusión a la rama principal.
- **Copia de trabajo:** Una carpeta aparte con los archivos de una rama, para trabajar en ella sin tocar la carpeta del proyecto (en git, worktree). Cada etapa tiene la suya, en `Temporal/`, y lo que se cambia ahí llega al proyecto solo cuando se fusiona.
- **Subproyecto:** Una carpeta dentro del proyecto con una parte de su código que funciona por su cuenta, como la web o la aplicación de escritorio, con su propio `AGENTS.md` y su propio Verificador. Solo los tiene un proyecto con varias partes así: si tiene una sola, su código va en la raíz.

## Reglas de Git

No hagas nada con git que no sea una simple lectura por tu cuenta. Solo actúa cuando yo lo pida en ese momento, con estas frases:

- 'Prepara los cambios': Agrégalos al área de preparación (Staged), sin confirmarlos.
- 'Confirma los cambios': Confirma solo lo que ya está en el área de preparación (Staged), sin preparar nada más ni tocar los cambios que quedan sin preparar. Si no hay nada preparado, avísame y no confirmes nada. En git esto se llama commit, pero al hablarme di siempre 'confirmar', como en '¿confirmo los cambios?'.
- 'Sube los cambios': Primero, trae lo nuevo que tenga esa rama en el remoto y pon encima las confirmaciones que todavía no estén allá (en git es un `pull --rebase`). Si hay conflictos, deja todo como estaba, dime qué archivos chocan y cómo los resolverías, y no subas nada hasta que yo decida. Si no hay conflictos, sube los cambios normalmente. Nunca subas a la fuerza (`push --force`).
- 'Baja los cambios': Trae lo nuevo que tenga la rama en el remoto, pero solo si se puede sin mezclar nada (en git es un `pull --ff-only`). Si git no lo deja, porque aquí hay cambios que chocan con los del remoto o porque la rama se separó, no hagas nada más y avísame. Si llegó algo, dime en pocas líneas qué llegó y quién lo hizo, agrupado por tema, como unas novedades. Si no llegó nada, dime que ya estaba al día.

Antes de empezar una tarea que va a cambiar archivos de un repositorio con remoto, haz lo mismo que con 'Baja los cambios'.

Una autorización que te haya dado antes no vale para cambios nuevos.

En el flujo de Trabajo Agéntico, los agentes tienen estos permisos de git, sin preguntarme:

- **`/implementar-paso`:** Los agentes crean y borran sus ramas y sus copias de trabajo, confirman en ellas y las fusionan en la rama de integración. Al terminar el paso, el Líder trae sus cambios a la rama principal, sin prepararlos ni confirmarlos, para que yo los revise.
- **`/implementar-cambio`:** La misma sesión hace de Líder y de Implementador, y trabaja directo en la rama principal, sin rama ni copia de trabajo. Nunca prepara ni confirma nada: lo que yo ya preparé se queda como está, y sus cambios quedan sin preparar.

En los dos, nada se confirma en la rama principal ni se sube sin mis frases.

No agregues ninguna atribución a Claude ni a Codex: ni la línea 'Co-Authored-By' al final de los mensajes de las confirmaciones, ni el 'Generated with Claude Code' en lo que se publique en GitHub.

## Reglas de trabajo

- Si una decisión mía sobre algo ya hecho te parece mala, contradíceme con razones: explica por qué razón la pude haber tomado en su momento, qué argumentos hay en contra y cuál es tu recomendación. No descartes una solución solo porque un comentario o un documento diga que yo la rechacé antes.

- No cambies las pruebas para que pasen (subir sus tiempos límite, quitar verificaciones o saltarlas) si no te lo pido. Si una prueba falla o se pasa del tiempo por algo que no es tu cambio, repórtalo con los datos medidos y propón opciones, sin tocar la configuración.

- Cuando agregues o cambies una regla en un AGENTS.md, el global o el de un proyecto, no la agregues sin que yo lo decida. Si es una regla sobre el código, dime además si se puede comprobar con el linter, con un programa o con una prueba, y cuánto costaría.

- Si necesitas algo a lo que no tienes acceso, como código, documentos o datos, pídeme el acceso en vez de suponer cómo es.

- Si te falta una herramienta para hacer o probar algo, como Playwright para probar una interfaz web en un navegador de verdad, no la imites con código propio ni la instales tú: pídeme que la instale. Las herramientas que faltan las instalo siempre yo, incluidas las que quedan fuera del proyecto, como las de `npm install -g`, `npx playwright install`, `pip install` o `winget`. Las instalo desde un PowerShell normal, porque las apps de escritorio de Claude y de Codex guardan dentro de su propio paquete lo que se instala desde ellas, y eso genera un desorden en el disco duro: copias escondidas que el resto de Windows no ve y que se borran si la app se reinstala.

- Los archivos de texto van en UTF-8 sin BOM. Si los lees con Windows PowerShell 5.1, indica la codificación con `-Encoding UTF8`: sin eso, las tildes y las eñes salen dañadas.

- Si la conversación empieza con el resumen de una conversación anterior, es porque se compactó, y de las habilidades que venías siguiendo puede haber quedado solo el comienzo, o nada. Antes de seguir, vuelve a leer completo el `SKILL.md` de cada una.

- Nunca abras, leas ni busques dentro de una carpeta que se llame `Secretos` o `Secrets`, ni en archivos de secretos, como `.env`, `.dev.vars` o las llaves privadas `.pem`, `.key` y `.pfx`, con ninguna herramienta ni comando, y exclúyelos de tus búsquedas. Nunca escribas un secreto en el código, en un documento, en el chat ni en un comando. Si una tarea necesita uno, detente y avísame, y si ves uno por accidente, avísame sin repetirlo.

- Si dejas fuera de git un archivo que hace falta para trabajar en el proyecto, anótalo en `Fuera de Git.md`, en la raíz, con qué es, de dónde se copia y qué pasa si falta, porque en otro computador hay que copiarlo a mano. Si ese archivo no existe, créalo con `<Trabajo Agéntico>/Plantillas/Fuera de Git.md`. Fuera de git van las claves, para que nunca queden en el repositorio, lo personal, como las reglas propias del linter, para no imponérselo a quien use el proyecto, y lo que pesa mucho, como un modelo o una herramienta, porque cada versión se queda para siempre en el historial y vuelve más lentos el clon y cada descarga.

## Reglas generales

Algunos ejemplos hablan de código, pero las reglas también se aplican a cualquier trabajo fuera del desarrollo de software. Cuando trabajes con documentos, datos, imágenes u otros materiales, aplica el principio equivalente a lo que estés haciendo.

1. **Haz lo más simple que funciona (KISS)**. Prefiere una arquitectura simple y directa. No agregues capas, patrones pesados, abstracciones, configuraciones ni dependencias que hoy no hacen falta (YAGNI).

2. **Nada de robustez especulativa**. Antes de agregar complejidad por una condición de carrera o un caso de seguridad que sea hipotético o muy poco probable, explícame cómo fallaría en concreto, qué tan probable es y cuánta complejidad agrega, y espera a que yo decida. No amplíes el alcance en silencio por una robustez teórica, pero tampoco calles ante riesgos que veas.

3. **Reutiliza antes de duplicar**. Prefiere reutilizar lo que ya existe, como funciones, plantillas o componentes, antes de duplicarlo. Pero reutiliza solo cuando las dos partes tienen que cambiar juntas, como el cálculo del precio que usan el carrito y la factura, que nunca pueden dar dos precios distintos. Si solo se parecen, pero van a evolucionar por separado, como el reporte de ventas y el de contabilidad, que hoy tienen las mismas columnas, pero tal vez mañana no, déjalas aparte, aunque se repitan unas líneas. Juntarlas en una sola, llena de casos especiales para servirles a las dos, es peor que repetirlas.

4. **Limpio antes que parche**. Si el arreglo limpio cabe dentro del alcance del problema, hazlo así, aunque haya que reescribir. Antes de reescribir, escribe pruebas que fijen lo que hace el código actual y córrelas antes y después. Bórralas al final, salvo que cubran algo que las demás pruebas no cubren. Si las vas a dejar, pregúntame antes.

5. **Proporción de los cambios**. Si un problema menor exige cambios grandes (otros módulos, el modelo de datos o una API pública), no los hagas automáticamente: primero explícame las dos salidas, el parche y el arreglo limpio con su tamaño, y yo decido.

6. **No toques lo que no es de la tarea**. No modifiques ni reorganices material ajeno a la tarea, salvo que te lo pida explícitamente. En el código, esto incluye reordenar, refactorizar y eliminar o alterar comentarios o líneas en blanco. Los comentarios solo se borran junto con el código que borras, y los del código que cambias se actualizan con él. Tampoco modifiques el código de bibliotecas de terceros.

7. **Falla con ruido, no en silencio**. Si falta algo indispensable o llega un dato inválido, detén el trabajo y explica el problema. En el código, detén la ejecución con un error claro, en vez de seguir con un valor por defecto que esconda el problema.

8. **Borra lo que sobra**. Lo que tu cambio deja sin uso es parte del cambio: bórralo, sin dejarlo comentado, 'por si acaso' ni como compatibilidad innecesaria con la versión anterior, salvo que yo lo pida. Si te pido que algo se quede sin uso, ponle un comentario que diga para qué se queda. Git ya guarda lo borrado. El código muerto que encuentres fuera de tu tarea no lo borres: avísame.

## Reglas del código (aplicables a todos los lenguajes)

1. **Crece cuando aporte**. El código nace en el alcance más angosto. Separa o comparte una función o una clase solo cuando eso aporte hoy, por ejemplo cuando dos lugares tienen que cambiar juntos. Una función o una clase grande está bien mientras partirla no aporte. Lo único que va aparte desde el principio son las reglas del negocio, separadas de la infraestructura (base de datos, red, servicios externos), para poder probarlas solas.

2. **Reimplementa lo pequeño**. Si de una biblioteca solo se usa una parte pequeña, que se puede probar entera, y entender o rodear su comportamiento cuesta más que escribirla, escríbela propia y con pruebas.

3. **Pruebas solo si se piden**. No agregues pruebas unitarias al proyecto de pruebas si no te lo he pedido, salvo las pruebas temporales de la regla 'Limpio antes que parche' y las que pide el flujo de Trabajo Agéntico.
