---
name: crear-paso
description: Convierte en pasos de Pasos Pendientes las ideas aprobadas a las que ya les toca, con sus criterios de aceptación, y propone qué otras ideas aprobadas y tareas puntuales pendientes conviene hacer en el mismo paso. Traslada las ideas a sus documentos dueños y saca de Tareas Pendientes las tareas que entran. También corrige un paso que no cumple la definición de «Paso», o le suma una idea que encaja en él. Úsala cuando el Director quiera convertir una idea aprobada en un paso, planear varios pasos de una vez o corregir un paso pendiente.
argument-hint: "[la idea aprobada, o el paso que hay que corregir]"
disable-model-invocation: true
---

# Crear un paso

Idea: $ARGUMENTS

Si no viene nada, pregunta qué idea aprobada se convierte en paso, o qué paso hay que corregir.

Un paso es un avance planeado del proyecto, que se logra en una tanda de trabajo y junta en un núcleo de trabajo coherente lo que conviene hacer junto. Su camino completo es este: `/incluir-idea` aprueba la idea, esta habilidad la convierte en paso cuando ya le toca y `/realizar-paso` lo realiza. Lo que es pequeño y no encaja con nada más no necesita paso, y va directo de la idea a su realización.

Una idea puede dar varios pasos de una vez, como el plan de un proyecto. Esta habilidad también corrige un paso pendiente que no cumple la definición de «Paso» del Glosario, como cuando `/realizar-paso` se detiene por eso, o le suma una idea que encaja en él, como cuando lo propone `/incluir-idea`.

## 1. Leer antes de escribir

- Lee el `Leeme.md` de las bases, la idea en `Ideas Aprobadas.md`, con su especificación, y lo que diga de ella su documento dueño. Lee también `Pasos Pendientes.md`, para saber dónde va en la cola, y `Pasos Terminados.md`, para seguir su numeración.
- Si es un paso que hay que corregir, lee ese paso y su documento dueño.
- Lo que se convierte en paso tiene que ser una idea aprobada, y lo que se le suma a uno, una idea aprobada o una tarea puntual de `Tareas Pendientes.md`. Si no lo es, detente: primero va por `/incluir-idea`.
- Si la idea es de un subproyecto, lee sus documentos junto con los de las carpetas de arriba. Sus pasos van en los `Pasos Pendientes.md` de su carpeta, con su letra, como A1, y si todavía no existen, se crean desde la plantilla de `<Trabajo Agéntico>/Plantillas/Bases/`.

## 2. Juntar lo que va junto

Revisa todas las ideas aprobadas y las tareas puntuales pendientes, y propón las que conviene hacer en el mismo paso y caben en la misma tanda de trabajo, porque tocan lo mismo o salen mejor juntas, como corregir un error pendiente del formulario que el paso cambia, para probarlo una sola vez. Da la razón de cada una. El Director decide cuáles entran. Una tarea periódica nunca entra a un paso. Solo se junta lo de la misma área, como el software, porque cada paso es de una sola área.

## 3. Escribir el paso

Escribe cada paso con la forma que dice `Pasos Pendientes.md`:

- **Lo que se construye:** Lo que entrega, en una o dos frases, y la referencia a la sección del documento dueño de cada idea que junta, sin repetir la especificación. Las tareas que junta van escritas aquí, completas, porque salen de `Tareas Pendientes.md` y no tienen documento dueño, y cada una tiene su criterio en «Listo cuando». Si no se nota de qué área es el paso, como en un proyecto que tiene software y diseño, lo dice aquí, porque `/realizar-paso` sigue las instrucciones de un área a la vez.
- **Listo cuando:** Sus criterios de aceptación, uno por línea, cada uno con una condición y un resultado, como en «Cuando [condición], [resultado]». Cubren lo que pide la especificación, y nada más. Cada criterio se tiene que poder comprobar: con un programa, como las pruebas que corre el Verificador en el software, por la IA, como al leer un documento, o por una persona, cuando ni un programa ni la IA pueden, como con lo que pasa en una bodega. En ese caso, el criterio dice quién lo confirma, como «Lo confirma Rubén», y si no dice nadie, lo confirma el Director.
- **Falta definir:** Las decisiones que quedan por tomar antes de escribir el plan, si las hay.
- **Por qué aquí:** Por qué va en ese lugar de la cola.

Un paso no repite la especificación: dice qué piezas junta, en qué documento dueño está cada una y cómo se conectan. Si varios pasos comparten un límite de alcance o una condición de cierre que conviene explicar, basta un párrafo al comienzo de `Pasos Pendientes.md`.

Revisa que cada paso cumpla la definición de «Paso» del Glosario: que esté acotado, que lo que entrega esté relacionado y quepa en una tanda de trabajo, que sea de una sola área y que deje el proyecto funcionando. Si no la cumple, como cuando mezcla un diseño y un informe, propón cómo partirlo en varios pasos, cada uno con sus criterios.

## 4. La aprobación

Muéstrale al Director los pasos, con sus criterios, antes de escribirlos en las bases. Él los aprueba o pide cambios. Ningún paso entra a la cola sin su aprobación, porque sus criterios son el contrato del paso: contra ellos se revisa el plan, se escriben las pruebas de aceptación y se decide si el paso terminó.

## 5. Escribir en las bases

- Agrega los pasos a `Pasos Pendientes.md`, en su lugar de la cola, con los números que siguen a los de `Pasos Terminados.md`, sin repetir ninguno. Si la idea es urgente y afecta a todos los pasos, va primero.
- Traslada cada idea que entró a su documento dueño, como dice «Cuándo sale una idea de Ideas Aprobadas», en `<Trabajo Agéntico>/Habilidades/Gestión de Ideas.md`. Si de una idea solo entró la parte que ya tiene turno, traslada solo esa parte, como dice ese mismo apartado.
- Saca de `Tareas Pendientes.md` las tareas que entraron, porque ya son parte del paso.

Si corriges un paso, cambia solo lo que hacía falta, quítale la marca a un criterio que cambie, para que se vuelva a comprobar, y actualiza las citas que apuntaban al paso.

Lo que sale del paso al corregirlo, y no pasa a otro paso, vuelve a su lista: una tarea, a `Tareas Pendientes.md`, y una idea, a `Ideas Aprobadas.md`, con su prioridad. Si la idea ya estaba trasladada, en su documento dueño la especificación de lo que sale vuelve a cambiarse por la referencia.

Lo que el Director ya no quiere no vuelve a su lista: una idea se descarta como dice «Descartar una idea», en `<Trabajo Agéntico>/Habilidades/Gestión de Ideas.md`, y una tarea solo sale del paso.

## 6. Cerrar

1. Comprueba las citas de las bases, como dice `<Trabajo Agéntico>/Habilidades/Comprobar Bases.md`.
2. No prepares los cambios: el Director revisa el diff y decide cuándo prepararlos.
3. Resume en pocas líneas qué pasos quedaron en la cola, en qué orden, qué ideas y tareas junta cada uno y en qué archivos.
