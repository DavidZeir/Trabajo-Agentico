---
name: incluir-idea
description: Incluye una idea nueva en las bases del proyecto, o quita algo del plan. Antes de escribir, revisa si se repite, si choca con lo decidido o con lo ya descartado y qué huecos de lógica deja, y propone la versión más simple que funciona. Úsala cuando el Director quiera agregar una idea al plan o quitar algo de él, o guardar una propuesta para decidirla después.
argument-hint: [la idea]
---

# Incluir una idea

Idea: $ARGUMENTS

Si no viene nada, pregunta qué idea incluir.

Al recibir una idea, no des por hecho ni preguntes de entrada dónde guardarla ni qué prioridad darle. Primero revisa las bases y coméntale al Director lo que encuentres.

Quitar algo del plan también es una idea, y pasa por este mismo proceso.

## 1. Leer antes de opinar

- Las bases están en la carpeta `Bases`, en la raíz del proyecto. Si no existe, detente y avísale al Director.
- Lee su índice (normalmente `Leeme.md`): cuál es el documento dueño de cada tema y dónde va cada cosa.
- Lee los documentos relacionados con la idea, y también `Decisiones.md`, `Ideas Aprobadas.md`, `Ideas por Decidir.md`, `Tareas Pendientes.md`, `Ideas Descartadas.md` y `Glosario.md` si existen.
- Busca las palabras clave de la idea en todos los `.md` de `Bases`, para encontrar lo relacionado que esté en otra parte.
- Si la idea es de un subproyecto, con su propia carpeta dentro de `Bases`, lee sus documentos junto con los de las carpetas de arriba, como si fueran uno solo. La idea se escribe en su carpeta, y su documento dueño también es de su carpeta: si cambia un documento de arriba, es una idea de arriba, y va en las ideas de arriba. Y como un subproyecto solo agrega lo suyo, también choca con lo decidido si contradice las bases de arriba.

## 2. Analizar y preguntar

No hagas ningún cambio todavía. Responde corto, y solo con lo que aplique:

- **¿Idea o tarea?:** Si no cambia el plan, porque es arreglar algo que las bases ya piden, resolver una deuda técnica o un mantenimiento, no es una idea sino una tarea, y lo demás de esta lista no aplica. Si es puntual, propón una prioridad alta, media o baja según lo que afecte y cuánto pueda esperar. Si debe repetirse, propón guardarla en «Periódicas».
- **Ya existe:** Si la idea o parte de ella ya está escrita, indica dónde.
- **Choca con lo decidido:** Qué regla o decisión contradice (D-n, documento y sección).
- **Ya se descartó:** Si está en Ideas Descartadas, y qué razón nueva haría falta para reabrirla.
- **Huecos:** Lo que falta definir para poder realizarla, como preguntas concretas: la lógica de negocio, la arquitectura y las decisiones técnicas que no serían obvias al implementar, como una solución o un proveedor de servicios. No los detalles técnicos que un implementador decidiría solo.
- **¿Vale lo que cuesta?:** Si te parece que la idea aporta poco valor para lo que cuesta construirla y mantenerla, no la aceptes en silencio. Hazle al Director preguntas sobre lo que concretamente no te cuadra de esta idea: el costo que ves y el beneficio que no encuentras. Pregunta para entender por qué la quiere y para qué público. No es para convencerlo, porque puede saber algo que no está en las bases: con sus respuestas, o se aclara el valor, o él mismo ve el costo. Si con sus respuestas él decide seguir, sigue incluyéndola sin volver a discutirla.
- **La versión más simple que funciona:** Haz la propuesta mínima que funciona sin complejidad innecesaria. Critica la idea del Director si esta incorpora complejidad innecesaria.
- **Dónde va:** El documento dueño y la sección, y lo que cambiaría en el Glosario, en Decisiones o en `Pasos Pendientes.md`. Si la idea es tan grande que justifica un documento propio o toca un área del proyecto que no encaja bien en los documentos existentes, pregunta al Director si se crea un nuevo documento.
- **Pasos pendientes:** Si la idea crea un paso o cambia uno pendiente, no lo escribas aquí: cuando esté aprobada, el paso se escribe o se corrige con `/crear-paso`.
- **¿Conviene incluirla en los pasos pendientes?:** Revisa los pasos pendientes. ¿Alguno necesita esta idea para poder completarse? Si se deja la idea para después, ¿se tendría que modificar algo que se va a construir en esos pasos previos? Si es así, explica qué habría que cambiar. Si encaja en un paso que ya está en la cola, porque toca lo mismo o sale mejor junto, propón que, una vez aprobada, se sume a ese paso con `/crear-paso`. Si no encaja, pero ya le toca y conviene hacerla como paso, por su tamaño o porque va junto con otras ideas o tareas, propón que se convierta en paso con `/crear-paso`. Si no, se queda en `Ideas Aprobadas.md`, con su prioridad. Explica por qué.

Si es una tarea, el Director decide la clasificación a partir de tu propuesta. Si es periódica, sugiere una frecuencia cuando tengas motivos para hacerlo.

Si es una idea, cierra tu retroalimentación preguntando «¿Quieres que sea una idea aprobada o una idea por decidir? ¿Con qué prioridad?». Las ideas que se guardan en `Ideas por Decidir.md` o en `Ideas Aprobadas.md` llevan prioridad alta, media o baja. El Director puede decidir en ese momento, cambiar lo que había sugerido o seguir conversando. Si quiere seguir, continúa afinando la idea con él y espera su decisión antes de escribir en las bases.

## 3. Escribir

- Si el Director aceptó un documento nuevo, agrégalo al índice como documento dueño de su tema.
- Para guardar una propuesta por decidir, aprobarla, cambiar su prioridad, reconsiderarla o descartarla, sigue el apartado correspondiente de `<Trabajo Agéntico>/Habilidades/Gestión de Ideas.md`.
- Un concepto nuevo importante que no sea obvio va al Glosario.
- Guarda cada tarea como dice `<Trabajo Agéntico>/Habilidades/Gestión de Tareas.md`.
- Usa los nombres del Glosario y el estilo de los documentos: lenguaje humano, concreto y corto.

## 4. Cerrar

- Busca otra vez las palabras clave en todos los documentos de `Bases`, y corrige lo que haya quedado contradicho o desactualizado.
- Comprueba las citas de las bases, como dice `<Trabajo Agéntico>/Habilidades/Comprobar Bases.md`.
- No prepares los cambios: el Director revisa el diff y decide cuándo prepararlos.
- Resume en pocas líneas qué cambió y en qué archivos.
