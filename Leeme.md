# Trabajo Agéntico

El trabajo asistido por agentes de IA, que es el cambio de paradigma que está pasando en este momento. Es un sistema para llevar un trabajo de punta a punta, desde la idea hasta la ejecución, con todo lo que hay en medio, como planear, revisar, supervisar, administrar o hacer la publicidad. El Director dirige y decide, y los agentes proponen y ejecutan.

La idea es potenciar las herramientas que ya existen, como las suscripciones de unos 20 dólares al mes de Codex o de Claude que muchos ya tienen, para que nadie tenga que suscribirse a servicios adicionales de IA que prometen administrar su negocio por una nueva cuota mensual. Para eso, hay que dejar de usar la IA solo como un chatbot, al que se le pregunta algo y se le copia la respuesta, y ponerla a trabajar dentro de un sistema estructurado. Ese sistema tiene tres piezas:

- **Documentos:** Archivos `.md` con las reglas, las explicaciones de los procesos y las bases de cada proyecto, que son su fuente de verdad.
- **Habilidades:** Programas escritos en español que ejecuta la IA, como `/incluir-idea`. Están en `Habilidades/`.
- **Programas:** Código que hace sin IA lo que no necesita criterio, como el Verificador, que comprueba el trabajo de cada proyecto. Los que sirven a todos los proyectos van en `Programas/`. En cualquier área sirven igual los scripts propios, las bibliotecas o los servidores MCP que hagan lo que haría un programa pequeño, y un proceso puede empezar como un programa, por ejemplo en TypeScript o JavaScript, que le da el esqueleto y llama a la IA solo en las partes que necesitan criterio.

## Cómo funciona

Con esas piezas, cualquier trabajo que se pueda delegar en agentes sigue la misma forma:

- **Una fuente de verdad que controla el Director:** Las bases de cada proyecto, donde cada idea entra con su aprobación, como explica `Procesos/Incluir Idea.md`.
- **Un plan por pasos:** `Pasos Pendientes.md` indica qué sigue y `Pasos Terminados.md` conserva los pasos finalizados con sus criterios de aceptación.
- **Comprobaciones automáticas:** Donde un programa pueda revisar el trabajo, como hace el Verificador.
- **Un revisor de otra empresa:** Mira el trabajo con otros ojos. Quien tiene una sola suscripción puede usar uno del mismo programa, como lo dicen sus preferencias, aunque pierde ese otro ángulo.
- **La aprobación del Director antes de que algo salga:** Nada se publica, se envía ni se sube sin que él lo apruebe. Las demás paradas, como aprobar el plan o revisar cada etapa, las enciende o las apaga él en sus preferencias.
- **La retroalimentación:** Lo que falla en un trabajo mejora las instrucciones para el siguiente.

Lo que se hace una sola vez, en cada computador o al empezar un proyecto, está en `Configuración.md`. El resto de este archivo dice en qué áreas se usa Trabajo Agéntico y cómo está armado: dónde va cada cosa y cuándo usar agentes auxiliares.

## El software

El software es donde Trabajo Agéntico nació y donde ya está probado, en proyectos reales. Ahí, después de las bases, la ejecución tiene tres procesos, de mayor a menor, cada uno con su explicación en `Procesos/`:

- `Realizar Paso.md`: Un paso pendiente, que los agentes implementan con pruebas y revisiones, hasta la aprobación del Director.
- `Realizar Cambio.md`: Un cambio, que es un paso en pequeño, para lo que queda fuera de los pasos previstos.
- `Realizar Ajuste.md`: Un ajuste, para lo que es pequeño y se comprueba con solo mirarlo.

El Verificador de cada proyecto comprueba el código, y lo de cada tecnología está en `Conectores/`.

## Otras áreas

Trabajo Agéntico lleva la dirección de cada área, que es decidir y cambiar cómo se trabaja, como las reglas, los precios, las plantillas y los procesos. La operación del día a día, como cada cotización o cada respuesta a un cliente, la hace su propio programa, como el ERP, con su propio responsable. Trabajo Agéntico sí puede construir o cambiar ese programa, como cualquier proyecto. Es lo mismo que en el software, donde construye y cambia la aplicación, y la aplicación atiende a sus usuarios.

Fuera del software todavía no está probado, pero su forma sirve igual para cualquier trabajo que se pueda delegar en agentes. En cada área, la pieza difícil es la de las comprobaciones automáticas: hay que encontrar qué puede comprobar un programa, como que las cuentas cuadren. Algunas áreas donde se podría aplicar:

- **Marketing:** El plan y la voz de la marca como fuente de verdad, los textos revisados por otra IA, comprobaciones de ortografía, enlaces y largo, y la aprobación del Director antes de publicar.
- **Servicio al cliente:** La base de conocimiento como fuente de verdad, con reglas como lo que no se puede prometer, y cada cambio aprobado por el Director antes de pasar al programa que atiende a los clientes.
- **Ventas:** La política comercial, los precios y las plantillas de las propuestas como fuente de verdad, y cada cambio aprobado por el Director antes de pasar a los programas de la operación, como el ERP o el chatbot de servicio al cliente.
- **Contenido y manuales:** Guías y artículos que salen de las bases y se revisan contra ellas.
- **Finanzas:** El presupuesto y la definición de las métricas como fuente de verdad, y cuadres automáticos en los informes con los que decide el Director, como un Verificador de los números.
- **Legal y cumplimiento:** El manual de reglas y las políticas como fuente de verdad, y las plantillas de los contratos revisadas contra él, con la aprobación del Director al final.
- **Gerencia:** Informes y seguimiento de los pendientes, con las decisiones anotadas como en `Decisiones.md`.

## Dónde va cada cosa

Cada proceso tiene su explicación en `Procesos/`: qué pasa en cada punto, qué hace el Director y las razones de las decisiones. Los papeles y los términos están en el Glosario de `Locales/AGENTS.md`, para que todas las IAs los tengan siempre a la vista. Las explicaciones no dicen cómo se escribe el código ni nada propio de un proyecto. Son para el Director: ninguna IA las carga sola.

Cada explicación lleva el nombre de su habilidad principal y tiene al lado su diagrama, con el mismo nombre, como `/realizar-paso`, `Realizar Paso.md` y `Realizar Paso.html`. Cada archivo cumple una función.

- **La habilidad:** Es el documento dueño de las instrucciones que sigue la IA para ejecutar el proceso.
- **La explicación:** Es el documento dueño de las razones por las que el proceso se hace así. No repite el texto de la habilidad ni de los archivos con instrucciones comunes de `Habilidades/`: cuenta en pocas palabras lo que pasa, con las razones de las decisiones, y cuando un punto necesita el detalle, nombra la habilidad que lo tiene. Lo que sí trae completo es lo que dibuja su diagrama: los actores, la secuencia de cada punto, los ciclos con sus techos y los casos en que algo se detiene.
- **El diagrama:** Representa la explicación para el Director. Si hay diferencias entre ambos archivos, vale la explicación. Las IAs no lo leen, salvo para volver a dibujarlo.

Cuando cambia algo de un proceso, se cambia en este orden: primero la habilidad o el archivo con instrucciones comunes de `Habilidades/` que lo tiene, después su explicación y al final su diagrama, aunque la idea haya salido de leer la explicación.

Lo que una explicación le pide hacer a una IA está en la habilidad de ese momento, para que ninguna habilidad tenga que leer las explicaciones. Si más de una habilidad necesita lo mismo, va una sola vez en un archivo con instrucciones comunes de `Habilidades/`, como `Llamar a Revisores.md`, y cada habilidad lo nombra en el paso donde lo necesita. Las repeticiones cortas, como las secciones del final del plan, se quedan en cada habilidad, para que la IA no tenga que saltar entre archivos por unas pocas líneas. Lo que es solo para el Director, como sus decisiones, las razones o los costos, no va en ninguna habilidad ni en esos archivos. Los términos del Glosario no se copian, porque todas las IAs ya lo tienen.

Cada lugar lo tiene a la vista alguien distinto: `Locales/AGENTS.md` lo cargan todas las sesiones; `Habilidades/Revisores.md`, cada revisor en su revisión; una habilidad, solo la IA que la usa y en ese momento; un archivo con instrucciones comunes de `Habilidades/` que comparten las habilidades, solo la IA que llega a él desde una de ellas, en el paso donde lo necesita; las explicaciones, sus diagramas, `Configuración.md` y este archivo, nadie por su cuenta. Por eso, para decidir dónde va algo nuevo:

- Si es un papel o un término de Trabajo Agéntico, va en el Glosario, en `Plantillas/Agents Global.md`.
- Si es por qué una pieza de Trabajo Agéntico se llama así, como un término o una habilidad, y qué nombres se descartaron, va en `Nombres.md`.
- Si define cómo es un proceso, como un punto o una decisión, va en su explicación, en `Procesos/`.
- Si una habilidad empieza a seguir o a proponer otra, o si cambia lo que se repite y su techo, se actualiza `Procesos/Mapa de las Habilidades.html`.
- Si se hace una sola vez, en cada computador o al empezar un proyecto, va en `Configuración.md`.
- Si es para presentarle Trabajo Agéntico a quien lo está conociendo, va en `Presentación.md`.
- Si es la portada del repositorio, lo mínimo para saber qué es, adónde ir y con qué licencia sale, va en `README.md`, que enlaza lo demás sin repetirlo. El texto de la licencia está en `LICENSE`, y el permiso para usar las plantillas y lo que hacen las IAs sin las condiciones de la AGPL, en `Permiso Adicional.md`.
- Si es una práctica del Director al trabajar con el agente, que ninguna habilidad pide ni comprueba, va en `Prácticas del Director.md`.
- Si es una regla para armar el flujo, como dónde va cada cosa o cuándo usar agentes auxiliares, va aquí.
- Si explica una carpeta, lo que tiene y cómo se usa, va en su `Leeme.md`. Una carpeta que no necesita explicación no lleva Leeme.
- Las ideas para cambiar Trabajo Agéntico, y lo que se consulta para tomarlas, van en cuatro archivos de la raíz. Son de cada Director, que puede cambiar el método a su gusto: si existen, se usan, y si no, no pasa nada, porque se crean cuando hagan falta. Por eso no vienen en la copia pública, que trae solo el método. Las tres listas de ideas no siguen [Gestión de Ideas](Habilidades/Gestión%20de%20Ideas.md), que es para las bases de los proyectos: Trabajo Agéntico no se cambia con su propio método, porque auditar el método con el mismo método se vuelve un enredo. Los cuatro archivos son:
  - `Ideas por Decidir.md`: Las propuestas que el Director quiere retomar antes de decidir, con la prioridad para retomarlas y su duda, si la hay.
  - `Ideas Aprobadas.md`: Las ideas que el Director aprobó, con por qué pueden esperar y dónde irían cuando entren. Cuando una se realiza, sale de allí y queda escrita en su lugar.
  - `Ideas Descartadas.md`: El motivo de cada idea que el Director discutió a fondo y descartó, para que se pueda consultar si vuelve a plantearse.
  - `Referencias.md`: Los marcos, los métodos y los artículos de otros que sirven para compararlos con el flujo o para tomarles ideas.
- Si es un paquete o un catálogo de habilidades de otros, para copiarlas y usarlas, va en `Habilidades/Leeme.md`.
- Si es una regla que la IA sigue siempre, haga lo que haga, va en `Plantillas/Agents Global.md` si es para todos los que usan Trabajo Agéntico, o en `Locales/Agents Personal.md` si es un gusto del Director.
- Si es algo que cada Director decide a su manera, como los modelos de cada papel, las paradas del flujo, las vueltas máximas de los revisores o las pruebas gemelas, va en `Locales/Preferencias.json`, y sus valores predeterminados van en las dos plantillas, `Plantillas/Preferencias.json` y `Plantillas/Preferencias Dos Suscripciones.json`, que tienen las mismas claves.
- Si no va en git, como lo propio del Director o lo que se arma en cada computador, va en `Locales/`.
- Si es algo que deben buscar los revisores, va en `Habilidades/Revisores.md`.
- Si es algo con lo que nace cada proyecto, va en su plantilla, en `Plantillas/`. Una plantilla, como las de las bases, dice qué es su documento y qué forma tiene, y casi nada del método: las reglas para manejarlo, como cuándo entra algo, quién lo decide o cómo se cierra, van una sola vez en un archivo con instrucciones comunes de `Habilidades/`, como `Gestión de Ideas.md` o `Gestión de Pasos.md`, y la plantilla lo nombra en una línea. La plantilla se copia a cada proyecto, así que una regla escrita en ella hay que llevarla a todos cada vez que cambia, mientras que en `Habilidades/` cambia una sola vez para todos.
- Si es de una tecnología, como lo que se instala para trabajarla o lo que ya trae un proyecto hecho con ella, va en su archivo de `Conectores/`, que solo se lee en los proyectos que la usan.
- Si es lo que hace la IA en un momento del flujo, se menciona en la explicación del proceso y se detalla en la habilidad de ese momento. Si lo necesita más de una habilidad, se detalla una sola vez en un archivo con instrucciones comunes de `Habilidades/`, y la explicación lo enlaza.
- Si es propio de un área en un paso, un cambio o un ajuste, va en el archivo de esa área, dentro de la carpeta de su habilidad, como `Habilidades/realizar-paso/Software.md`.
- Si es de un proyecto, lo técnico que la IA necesita en cada sesión va en su `AGENTS.md`, y el diseño, lo que ya es y lo que se va a construir, y por qué, en su carpeta `Bases`.
- Lo que deja cada paso o cambio queda en la carpeta `Pasos/` del proyecto: es su historial, y no la fuente de verdad.
- Si es un trabajo que un programa puede hacer sin IA, igual en todos los proyectos, el programa va en `Programas/`.
- Si un programa lo puede comprobar, además va al linter o al Verificador.

## Cuándo usar agentes auxiliares

Al construir este flujo, o cualquier otro con IA, cada trabajo lo hace un solo agente, salvo que haya una razón para repartirlo. Un agente aparte suele gastar más tókenes y pierde contexto en cada traspaso: solo sabe lo que se le dice, y lo que descubre llega resumido al agente principal.

- **Sí:**
  - **Una visión independiente:** Revisar el trabajo de otro sin su contexto ni sus argumentos, como los revisores.
  - **Partes de verdad independientes, cuando la velocidad importa:** No tocan lo mismo ni dependen de lo que decida la otra, y cada una toma tanto tiempo que hacerlas a la vez ahorra mucho. Por ejemplo, investigar varias fuentes distintas al mismo tiempo.
  - **Mucho material del que solo importa la conclusión:** Recorrerlo en otro agente, que solo devuelve la conclusión. Así el agente principal no relee ese material cada vez que responde.
  - **Una parte que debe hacerse con menos herramientas:** Leer lo que viene de fuera, como correos o sitios web, sin poder escribir ni enviar nada, y pasarle al agente principal solo los datos estructurados de lo que necesita, sin texto libre.
- **No:**
  - **Para partes que dependen entre sí:** Cada agente decidiría sin ver lo que decidieron los otros, y después chocan.
  - **Para tareas pequeñas:** El traspaso cuesta más que hacerlas directo.
- **Tal vez:**
  - **Para enfocar:** Un contexto limpio ayuda en una tarea larga y aislada, pero solo si no depende de lo que ya se habló.
