# Realizar un paso de software

Eres el Líder: planeas, repartes las etapas entre los Implementadores, las fusionas, corriges lo que encuentren el Revisor de Puerta y el Revisor Final, y le reportas al Director. Si en cambio el Líder te lanzó como Implementador, sigue solo la sección «El trabajo del Implementador». La sesión está abierta en la raíz del proyecto, la carpeta principal, donde están el `AGENTS.md` y la carpeta `Bases`. El Verificador está en la raíz o en cada subproyecto, y se corre en cada uno que toca el paso.

## Dónde queda cada cosa

- **`Pasos/` y `Bases`:** Tú y los agentes los leen y los escriben siempre en la carpeta principal, por su ruta completa, y nunca en una copia de trabajo, donde pueden estar viejos.
- **La carpeta del paso:** `Pasos/AAAA-MM-DD Nombre corto del paso/`, con la fecha de hoy. Ahí quedan solo el plan principal, `Plan.md`, el plan de cada etapa, como `Plan Etapa nombre-etapa.md`, la vista del código, `Vista del Código.html`, el resumen, `Resumen.md`, y las capturas del resumen, en `Capturas/`, si el paso cambió lo que ve el usuario.
- **Las ramas:** La de integración, `paso/nombre-paso-corto`, sale de la rama principal. La de cada etapa, `etapa/nombre-paso-corto/nombre-etapa`, sale de la de integración. Los nombres van en minúsculas, con guiones y sin tildes.
- **Las copias de trabajo:** En `Temporal/nombre-paso-corto/`: `integracion/` para la rama de integración, y una carpeta por etapa, con el nombre de la etapa. Cada una se alista con `npm run alistar`. Si el proyecto tiene subproyectos de código, los que nombra la sección «Subproyectos» de su `AGENTS.md`, la copia trae solo los que toca, como dice «Las copias de un proyecto con subproyectos» en `<Trabajo Agéntico>/Habilidades/Copias de Trabajo.md`, y `npm run alistar` se corre dentro de cada uno.
- **Las respuestas de los revisores:** En `Temporal/nombre-paso-corto/revisores/` de la carpeta principal, fuera de git, porque solo sirven mientras corre el paso. Las de cada etapa van en su propia carpeta, `revisores/nombre-etapa/`. Se borran al cerrar el paso.
- **Los archivos protegidos:** Las pruebas de aceptación y los archivos del Verificador, como los dice la subsección «Verificador» del `AGENTS.md` del proyecto. Desde que empiezan las etapas, ningún agente los cambia. Solo al final del paso se permite la limpieza de las pruebas.

## Cómo se llama a los revisores

Antes de llamar a cualquier revisor, lee `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`: dice a cuál se llama, con qué comando, qué va en el pedido y qué hacer si se queda sin cupo. Las respuestas van en las carpetas de revisores que dice «Dónde queda cada cosa».

## Las preferencias

Antes de todo, comprueba las preferencias del Director como dice `<Trabajo Agéntico>/Habilidades/Comprobar Preferencias.md`. En un paso cuentan todas: los modelos de tu programa, para los Implementadores y los revisores, las paradas `AprobarElPlan`, `RevisarLasPruebas` y `RevisarCadaEtapa`, que este archivo dice dónde van, el techo de vueltas de cada revisor, en `VueltasMáximas`, si haces las gemelas de «La revisión integrada», en `PruebasGemelas`, y desde cuántas líneas una pieza va en su propia etapa, en `LíneasParaEtapaPropia`. Si la conversación se compactó, vuelve a comprobarlas antes de seguir, porque lo que mostró el programa pudo quedar fuera del resumen.

## 1. Antes de empezar

Revisa esto, y si algo falla, detente y avísale al Director:

- La carpeta está en la rama principal, y la rama no tiene cambios sin confirmar, porque al final no se podría hacer la fusión.
- El paso cumple la definición de «Paso» del Glosario. Si no la cumple, propón corregirlo en `Pasos Pendientes.md` con la habilidad `crear-paso`.
- El proyecto tiene la carpeta `Bases`.
- El proyecto tiene su Verificador, con sus dos modos, `npm run verificador ligero` y `npm run verificador completo`, los comandos de las copias de trabajo, `npm run alistar` y `npm run iniciar`, y las subsecciones «Copias de trabajo» y «Verificador» de su `AGENTS.md` ya están llenas, sin corchetes dobles. La excepción es el primer paso con código del proyecto, o el de un subproyecto de código nuevo: ahí el plan crea el Verificador y los dos comandos de las copias de trabajo, y llena las subsecciones, como dicen `<Trabajo Agéntico>/Habilidades/Verificador.md` e `<Trabajo Agéntico>/Habilidades/Copias de Trabajo.md`.
- `/Temporal/` está en el `.gitignore` del proyecto.

Si el paso tiene «Falta definir», resuélvelo con el Director, como dice «Lo que falta definir», en `<Trabajo Agéntico>/Habilidades/Gestión de Pasos.md`. Si el paso toca la interfaz y a `Diseño.md` le falta algo por llenar, complétalo con el Director, como dice `<Trabajo Agéntico>/Habilidades/Llenar las Plantillas.md`. Los dos van antes del plan, porque los Implementadores no le pueden preguntar al Director. Si con eso cambian las bases, pídele al Director que confirme esos cambios antes de seguir, porque las copias de trabajo salen de la última confirmación, y la fusión, al final, pide la rama principal sin cambios.

Si todo está bien, avísale al Director que, hasta la fusión, no haga cambios en la rama principal, para que lo que llegue con la fusión sea exactamente lo que se verificó, y que no suspenda el computador. Recomiéndale también activar el control remoto de esta sesión, si quiere seguir el paso desde el celular.

## 2. El plan

Escribe el plan principal del paso y el plan de cada etapa, junto al principal, en la carpeta del paso. Las etapas salen de las piezas del paso: primero parte el paso en piezas, y de cada una di qué recibe y qué entrega, cuántas líneas de código estimas que requiera y si el proyecto ya ha hecho algo así. Después, decide las etapas con estas reglas:

- **La frontera clara:** Una pieza tiene una frontera clara si ningún lado necesita ver lo que decide el otro, fuera del contrato: lo que el plan fija que se entregan, como las rutas y sus parámetros, o lo que recibe y devuelve una función. Es la prueba para partir, porque cada Implementador decide sin ver lo que deciden los demás.
- **Una pieza en su propia etapa:** La que tiene una frontera clara, si pasa de unas `LíneasParaEtapaPropia` líneas o si el proyecto nunca ha hecho algo así, como un formato de archivo o una integración con otro servicio.
- **El servidor y la interfaz de una función:** Son piezas distintas si cumplen dos condiciones. Primero, que el contrato entre los dos se pueda fijar de antemano y sin ambigüedades: las rutas, sus parámetros y lo que devuelve cada ruta. Segundo, que cada uno pase de unas `LíneasParaEtapaPropia` líneas.
- **Las piezas pequeñas:** Las de menos de unas `LíneasParaEtapaPropia` líneas, o sin una frontera clara, van en la etapa de la pieza con la que más se relacionan, porque cada etapa de más cuesta una copia de trabajo, dos revisores y una fusión.
- **En paralelo o en serie:** Dos etapas van en paralelo si ninguna depende de lo que decida la otra fuera del contrato. Si una no compila o no funciona sin el código de la otra, van en serie, pero cada una aparte.
- **El mismo archivo:** Dos etapas que cambian el mismo archivo van en serie, salvo que solo le agreguen líneas sueltas, como una ruta o un texto, que juntas tú al fusionar.

Lo que dicen los planes:

- **Qué dice el plan principal:** Es corto. Abre con «Lo que entendí»: cómo entendiste el paso, en tus palabras, y lo que te parece equivocado o contradictorio en `Pasos Pendientes.md` o en las bases, como un número o una palabra que chocan, con cómo lo tomaste. Después van las decisiones de negocio, las piezas, en una tabla con lo que recibe y entrega cada una, sus líneas y si el proyecto ya ha hecho algo así, y las etapas, con lo que logra cada una en una o dos líneas y un enlace a su plan. El detalle va en los planes de las etapas, y lo que está en un plan no se repite aquí: se enlaza, para que el Director no lea dos veces lo mismo. Cuáles etapas van en paralelo y cuáles en serie, y el contrato de las que dependen una de otra. Para las que van en paralelo, qué archivos toca cada una.
- **Qué dice el plan de cada etapa:** Lo que la etapa tiene que lograr y lo que no debe tocar. No dice cómo escribir el código: eso lo decide el Implementador.

Desde que los planes quedan aprobados, lo aprobado no se reescribe. Lo que pase después va al final del plan principal, en estas tres secciones, que llenas a medida que avanzas, para que otra sesión pueda retomar si esta se suspende:

- **Avance:** Lo que falta por hacer, con una casilla por cada cosa, que marcas cuando la terminas.
- **Preguntas:** Cada pregunta al Director, con su respuesta cuando llegue.
- **Decisiones del camino:** Cada decisión que no estaba en lo aprobado, con su razón.

Cuando estén los planes, llama al Revisor de Plan, desde la carpeta principal. En el pedido van el paso de `Pasos Pendientes.md`, con sus criterios de aceptación, el plan principal, los planes de las etapas y el número de `LíneasParaEtapaPropia`, porque el revisor no lee las preferencias. Corrige lo que encuentre y vuelve a llamarlo, hasta que no encuentre nada bloqueante. Lo que creas teórico lo discutes con él, como dice «Las respuestas» de `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. Su techo de vueltas es `RevisorPlan`.

Si la parada `AprobarElPlan` está encendida, el Director lee los planes y pide correcciones. Si en la última vuelta todavía quedaba algo bloqueante, se lo muestras junto con los planes, y también lo que pasaste a las sugerencias por teórico, con los argumentos de los dos, para que lo vea antes de aprobar. Cada corrección vuelve a pasar por el Revisor de Plan, hasta que el Director da su visto bueno. Si al aprobar te pide revisar algún resultado intermedio, anótalo en el «Avance» del plan principal: ahí te detienes, se lo muestras y esperas su aprobación para seguir.

Si la parada `AprobarElPlan` está apagada, los planes quedan aprobados cuando el Revisor de Plan no encuentra nada bloqueante, o al llegar a su techo, y sigues sin esperar al Director, que los lee en el resumen. Lo bloqueante que quede lo anotas para la sección «Hallazgos sin resolver» del resumen.

## 3. Las pruebas de aceptación

Si ningún criterio del paso se vuelve prueba, porque todos los comprueba la IA o los confirma una persona, haz solo el punto 1 y salta los demás.

1. Crea la rama de integración y su copia de trabajo, y alístala con `npm run alistar`.
2. En la copia de trabajo de integración, convierte los criterios de aceptación del paso en pruebas. Un criterio que ningún programa puede comprobar, porque lo comprueba la IA, como al leer un documento, o lo confirma una persona, como el que dice «Lo confirma Rubén», no se vuelve prueba: queda para el registro del paso. Cada prueba va en la carpeta `aceptacion/` de su clase, como dice el `AGENTS.md`. Prueban lo que el paso tiene que lograr, no cómo está hecho por dentro. Si un criterio depende de lo que hace un navegador u otro programa, como enviar un formulario, la prueba usa ese programa, como Playwright para el navegador, y no lo imita con código propio. La que necesita ese programa es de interfaz, y a las de interfaz y a las pesadas solo las corre el Verificador completo. Si el Verificador todavía no corre ese programa, pídele al Director agregarlo.
3. Córrelas como pruebas enfocadas y comprueba que todas fallan, porque falta lo que el paso tiene que lograr y no por un error de la misma prueba. Si alguna pasa, está mal: corrígela, o avísale al Director si pasa porque su criterio ya se cumple. Repite esto cada vez que las corrijas.
4. Llama al Revisor de Pruebas, desde la copia de trabajo de integración. En el pedido van los criterios de aceptación, el plan principal y las pruebas. Corrige lo que encuentre y vuelve a llamarlo, hasta que no encuentre nada bloqueante. Lo que creas teórico lo discutes con él, como dice «Las respuestas» de `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. Su techo de vueltas es `RevisorPruebas`: si en la última todavía queda algo bloqueante, anótalo para la sección «Hallazgos sin resolver» del resumen.
5. Si la parada `RevisarLasPruebas` está apagada, las pruebas no pasan por el Director: quedan aprobadas cuando el Revisor de Pruebas no encuentra nada bloqueante, o al llegar al techo. Si está encendida, muéstrale al Director la lista de las pruebas, con lo que comprueba cada una en palabras y el enlace a su archivo, y espera su aprobación. Si pide cambios, vuelven a pasar por el Revisor de Pruebas.
6. Confirma las pruebas en la rama de integración, si el paso tiene alguna. Desde ahí, son archivos protegidos.

## 4. Las etapas

Antes de empezar las etapas, corre el Verificador completo en la carpeta principal. Si ya falla, avísale al Director antes de seguir.

Para cada etapa, crea su rama y su copia de trabajo desde la rama de integración, y lánzale un Implementador: un agente de tu propio programa, con el modelo y el razonamiento de `Implementador` en las preferencias. En Claude, lánzalo con la familia, como `sonnet`, y en Codex, con su nombre exacto, el que muestra el comprobador. Las etapas que van en paralelo se lanzan al mismo tiempo, y las que van en serie, cuando la anterior ya esté fusionada.

A cada Implementador le dices cuál es su etapa, la ruta de su copia de trabajo, la de su rama, la del plan principal y la de su plan en la carpeta principal, la de `Temporal/nombre-paso-corto/revisores/nombre-etapa/` y la de este archivo, su techo de vueltas con el Revisor de Etapa, que es `RevisorEtapa` en las preferencias, y que siga la sección «El trabajo del Implementador».

Si un Implementador necesita una decisión del Director, te la pasa: tú se la preguntas al Director y la escribes también en la sección «Preguntas» del plan principal, para que no se pierda si la sesión se reinicia. Esa etapa espera la respuesta, y las demás siguen. Si un Implementador te entrega hallazgos sin resolver del Revisor de Etapa, anótalos para la sección «Hallazgos sin resolver» del resumen, y su etapa sigue igual a la revisión integrada. Si el Director te escribe en medio del paso para detener o dirigir algo, avísales a los Implementadores que corresponda.

Si alguna etapa tiene una aplicación de escritorio, puedes pedir permisos de Computer Use para ver su funcionamiento.

## 5. El trabajo del Implementador

En esta sección eres el Implementador de una etapa: la sigues en tu propia copia de trabajo, y el resto de este archivo es para el Líder.

1. Lee el plan principal, el plan de tu etapa, lo que necesites de `Bases` y lo que ellas citen de `Archivos/`, en la carpeta principal, porque tu copia de trabajo no trae `Archivos/`. Si tu etapa toca la interfaz, lee también `Diseño.md`, si las bases lo tienen, y síguelo. Si hace falta un color o un tamaño que no está en `Diseño.md`, no lo inventes ni cambies las bases: avísale al Líder. Haz solo lo que pide el plan de tu etapa, y no cambies nada que no haga falta para cumplirlo. El plan principal es solo contexto, para que entiendas el paso y sus decisiones de negocio: lo que pide para otras etapas no lo haces. Si crees que necesitas tocar algo fuera de tu plan, detente y avísale al Líder.
2. Alista tu copia de trabajo con `npm run alistar`. Si falla, o si necesita algún paso a mano, avísale al Líder, con el mensaje del comando, en vez de resolverlo por tu cuenta. Nunca copies las claves.
3. Si tu etapa toca HTML o CSS y el proyecto usa USE Scribe, ábrelo como dice la habilidad `use-css`, pero desde la carpeta `USE Scribe` de tu copia de trabajo, y no desde la principal. Su `Settings.json` tiene rutas relativas, así que vigila las carpetas de tu copia de trabajo, y el `ledger.usecss` que lees es el de tu copia de trabajo. Puede correr al mismo tiempo que los demás, porque USE Scribe deja abrir una instancia por cada `Settings.json`.
4. Programa tu etapa. Si tu etapa crea el Verificador, sigue `<Trabajo Agéntico>/Habilidades/Verificador.md`, y si crea los comandos de las copias de trabajo, `<Trabajo Agéntico>/Habilidades/Copias de Trabajo.md`. Mientras trabajas, corre el arreglo automático del linter, que deja casi todo el estilo como piden las reglas. El Verificador corre el mismo linter, pero solo comprueba: nunca modifica el código. Para ir probando, corre las pruebas enfocadas de lo que tocas, como dice el `AGENTS.md`, y las de interfaz solo en Chromium: los tres navegadores quedan para el Verificador completo.
5. Si tu etapa tiene interfaz, mírala y corrige lo que veas antes de pasar al Verificador ligero: la web, con scripts de Playwright, y la de escritorio o la móvil, con capturas de la pantalla o del emulador. Inicia la aplicación con `npm run iniciar`, y nunca con los datos de producción. Las capturas y los registros van en la carpeta `Temporal/` de tu copia de trabajo. Cuando algo falle, lee los registros, en vez de adivinar. Si el proyecto todavía no tiene registros, avísale al Líder.
6. Cuando la etapa esté lista, corre el Verificador ligero en tu copia de trabajo, hasta que pase. Si sigue fallando después de 10 vueltas, detente y avísale al Líder. Nunca cambies los archivos protegidos. Tu código tiene que cumplir el criterio con cualquier dato válido, y no solo con los de las pruebas. Si una prueba no se puede pasar así, porque te parece mal hecha o porque choca con el plan, detente y avísale al Líder, en vez de forzar el código para que pase.
7. Confirma tus cambios en tu rama.
8. Llama al Revisor de Etapa, desde tu copia de trabajo, como dice `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. En el pedido van el plan principal, el plan de tu etapa y tus cambios contra la rama de integración, sacados con `git diff paso/nombre-paso-corto...HEAD`, y sus respuestas van en `Temporal/nombre-paso-corto/revisores/nombre-etapa/` de la carpeta principal. Corrige lo bloqueante, vuelve a pasar el Verificador ligero, confirma y llámalo otra vez. Si crees que se equivoca, respóndele con argumentos en la vuelta siguiente, y él decide, salvo lo teórico en la última vuelta, que decides tú, como dice «Las respuestas» de `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. Tu techo de vueltas es el que te dio el Líder: si en la última todavía queda algo bloqueante, no te detienes, y lo entregas como hallazgos sin resolver.
9. Cuando el Revisor de Etapa apruebe, o al llegar al techo, cierra lo que iniciaste y entrégale al Líder un resumen corto: qué hiciste, cuántas vueltas diste con el Revisor de Etapa y por qué te devolvió, sus sugerencias, los hallazgos sin resolver, si quedaron, lo que viste de paso, que ya venía de antes, y tus aprendizajes.

Cierra solo lo que iniciaste tú, por su proceso, y nunca por su nombre, porque las demás copias de trabajo y la carpeta principal pueden tener corriendo programas que se llaman igual.

Si necesitas una decisión del Director, pásasela al Líder y espera su respuesta.

## 6. La revisión integrada

Cuando un Implementador entregue su etapa:

1. Compara con `git diff` los archivos protegidos de la etapa contra los de la rama de integración, porque si un Implementador cambió una prueba para que pasara, el Verificador de su copia de trabajo pasaría haciendo trampa. Si los tocó, reversa ese cambio, detén el paso y avísale al Director, porque es algo raro que necesita su atención.
2. Si no los tocó, su Verificador es el mismo de la rama de integración: corre el Verificador ligero en la copia de trabajo de la etapa.
3. Si `PruebasGemelas` está encendida, escribe, sin mirar el código de la etapa, una gemela de cada prueba de aceptación que cubre la etapa y que se pueda repetir con otros datos del mismo tipo. Por ejemplo, si la prueba le aplica un cupón del 10 % a una compra de 100 000 pesos, la gemela le aplica uno del 15 % a una de 80 000. Además, si el criterio dice qué pasa en sus bordes, como un cupón del 0 % o del 100 %, escribe una gemela más por cada borde, porque ahí es donde más se queda corto el código. Lo que se repite por cada borde es solo esa prueba, y no su archivo completo. Córrelas en la copia de trabajo de la etapa, sin confirmarlas. Si alguna falla y la gemela está bien hecha, el código hizo trampa o se quedó corto: arréglalo como dice «Los arreglos». Bórra las pruebas gemelas antes de fusionar la etapa.
4. Llama al Revisor de Puerta, desde la copia de trabajo de la etapa. En el pedido van el plan principal, el plan de la etapa y sus cambios contra la rama de integración.
5. Si pasa y la parada `RevisarCadaEtapa` está encendida, muéstrale al Director un resumen corto de la etapa: qué hizo, cómo le fue con el Revisor de Puerta y, si tiene interfaz, sus capturas. Espera su aprobación. Si pide cambios, hazlos como dice «Los arreglos», más abajo, y vuelven a pasar por el Verificador ligero y por el Revisor de Puerta.
6. Cuando pase, fusiona la etapa en la rama de integración, en su copia de trabajo, y resuelve los conflictos. Después de cada fusión, corre el Verificador ligero en la copia de trabajo de integración, para saber enseguida qué fusión dañó algo.

Cuando todos los Implementadores hayan entregado y todas las etapas estén fusionadas:

1. Corre el Verificador completo en la copia de trabajo de integración, con las pruebas de aceptación.
2. Llama al Revisor Final, desde la copia de trabajo de integración. En el pedido van todos los cambios del paso contra la rama principal, sacados con `git diff` de la rama principal a la de integración, sin el plan ni los criterios, para que revise a ciegas.
3. Descarta lo que reporte que sea una decisión a propósito del plan.

Con el Verificador, el Revisor de Puerta y el Revisor Final:

- **Lo teórico:** Lo discutes con el revisor, y solo en la última vuelta puedes pasarlo a las sugerencias, con los argumentos de los dos, como dice «Las respuestas» de `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`.
- **Los arreglos:** Si algo no pasa, lo corriges tú, sin devolvérselo al Implementador, en la copia de trabajo donde se encontró: la de la etapa, en la puerta, o la de integración, después de fusionar. El arreglo vuelve a pasar por el Verificador ligero y por el revisor que lo encontró. Si lo que falló fue el Verificador completo, el arreglo vuelve a pasar por el completo.
- **El techo:** El de cada revisor está en las preferencias, en `RevisorPuerta` y `RevisorFinal`. Si en la última vuelta el revisor todavía encuentra algo bloqueante, no te detienes: lo anotas para la sección «Hallazgos sin resolver» del resumen y sigues. La excepción es el Verificador: si sigue fallando después de 3 vueltas, detente y avísale al Director, porque el código no pasa.

## 7. El final

Cuando el Verificador pase y terminen las revisiones, sigue la habilidad `limpiar-pruebas`, en `<Trabajo Agéntico>/Habilidades/limpiar-pruebas/SKILL.md`, en la copia de trabajo de integración, y confirma la limpieza en la rama de integración. Si la limpieza te devuelve una falla del Verificador completo que no viene de ella, arréglala como dice «Los arreglos» de la revisión integrada.

Después, escribe el resumen y la fila de `Pasos/Métricas.csv`, como dice `<Trabajo Agéntico>/Habilidades/Escribir el Resumen.md`.

Con el resumen, deja en la carpeta del paso `Vista del Código.html`, una vista solo para el Director, para que entienda la parte del código que cambió antes de revisar los cambios. Lleva dos dibujos en Mermaid, que la página dibuja sola al abrirse, sin coordenadas a mano. No se instala nada: la página carga Mermaid de internet, con una línea como `<script src="https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"></script>`, en una versión fija:

- **Dónde está cada cosa:** Las piezas que cambiaron y quién llama a quién, en un diagrama de flujo con grupos, de unas 12 cajas como máximo y con un verbo en cada flecha. El color dice solo qué es nuevo, qué se movió sin cambiar y qué ya existía. Cada caja lleva pocas palabras, y lo que hace aparece en un panel al tocarla.
- **Qué decide el sistema:** Un diagrama de flujo clásico, con rombos para las decisiones, por cada regla de negocio nueva o cambiada: desde lo que llega hasta cada resultado posible, incluidos los errores.

Debajo de los dibujos va, en texto, lo que no cambió. En Mermaid, los textos con paréntesis, comas o dos puntos van entre comillas, porque si no, el dibujo no sale.

Al terminar, no repitas el resumen en el chat: dale al Director solo el enlace al resumen y a la vista del código, y dile los datos que agregaste a `Pasos/Métricas.csv`.

Después viene la fusión, que haces tú, y se la cuentas al Director junto con el enlace al resumen. Traes a la rama principal los cambios de la rama de integración, `paso/nombre-paso-corto`, sin prepararlos ni confirmarlos, para que el Director los revise: en git es un `merge --squash`, sin el historial de la rama, seguido de un `reset`, que los saca de la preparación sin tocar los archivos. Si la rama principal tiene otros cambios sin confirmar, no fusiones nada y avísale al Director. La carpeta de este paso y su fila en `Pasos/Métricas.csv` están sin confirmar en la carpeta principal, pero no impiden la fusión: quedan sin preparar junto con los cambios fusionados, para que el Director los confirme juntos. Después de traerlos, instala en la carpeta principal las dependencias que haya cambiado el paso, y corre ahí el Verificador completo. Si falla, avísale al Director antes de que confirme. Si después de la fusión el Director pide correcciones, hazlas en la carpeta principal, y vuelve a correr ahí el Verificador completo y a llamar al Revisor Final.

## 8. La retroalimentación y el cierre

- **La retroalimentación:** El Director te cuenta lo que hay que ajustar para la próxima vez. Propón los cambios a los archivos de Trabajo Agéntico o a las bases. El Director decide qué se agrega. Lo que toque el diseño entra por `incluir-idea`.
- **Las bases:** Revisa que las bases sigan describiendo lo que hace el código. Si hay que corregirlas, sugiérele al Director usar `incluir-idea`.
- **El registro del paso:** Cierra el paso como dice «Cerrar un paso», en `<Trabajo Agéntico>/Habilidades/Gestión de Pasos.md`. Si le queda un criterio que confirma una persona, el paso se queda abierto.
- **Lo temporal:** Cuando el Director confirme los cambios en la rama principal, cierra lo que quede abierto en las copias de trabajo y bórralas junto con sus ramas, las de las etapas y la de integración, con `git worktree remove --force` y `git branch -D`. Después borra `Temporal/nombre-paso-corto/revisores/`, con las respuestas de los revisores, y `Temporal/nombre-paso-corto/`, si quedó vacía.
