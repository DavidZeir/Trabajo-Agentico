---
name: incorporar-idea
description: Incorpora una idea nueva a las bases del proyecto, o quita algo del plan. Antes de escribir, revisa si se repite, si choca con lo decidido o con lo ya descartado y qué huecos de lógica deja, y propone la versión más simple que funciona. Úsala cuando el Director quiera agregar una idea al plan o quitar algo de él, o guardar una propuesta para decidirla después.
argument-hint: [la idea]
---

# Incorporar una idea

Idea: $ARGUMENTS

Si no viene nada, pregunta qué idea incorporar.

Al recibir una idea, no des por hecho ni preguntes de entrada dónde guardarla ni qué prioridad darle. Primero revisa las bases y coméntale al Director lo que encuentres.

Quitar algo del plan también es una idea, y pasa por este mismo proceso.

## 1. Leer antes de opinar

- Las bases están en la carpeta `Bases`, en la raíz del proyecto. Si no existe, detente y avísale al Director.
- Lee su índice (normalmente `Leeme.md`): cuál es el documento dueño de cada tema y dónde va cada cosa.
- Lee los documentos relacionados con la idea, y también `Decisiones.md`, `Ideas Aprobadas.md`, `Ideas por Decidir.md`, `Tareas Pendientes.md`, `Ideas Descartadas.md` y `Glosario.md` si existen.
- Busca las palabras clave de la idea en todos los `.md` de `Bases`, para encontrar lo relacionado que esté en otra parte.

## 2. Analizar y preguntar

No hagas ningún cambio todavía. Responde corto, y solo con lo que aplique:

- **¿Idea o tarea?:** Si no cambia el plan, porque es arreglar algo que las bases ya piden, resolver una deuda técnica o un mantenimiento, no es una idea sino una tarea, y lo demás de esta lista no aplica. Si es puntual, propón una prioridad alta, media o baja según lo que afecte y cuánto pueda esperar. Si debe repetirse, propón guardarla en «Periódicas».
- **Ya existe:** Si la idea o parte de ella ya está escrita, indica dónde.
- **Choca con lo decidido:** Qué regla o decisión contradice (D-xx, documento y sección).
- **Ya se descartó:** Si está en Ideas Descartadas, y qué razón nueva haría falta para reabrirla.
- **Huecos:** Lo que falta definir para poder implementarla, como preguntas concretas: la lógica de negocio, la arquitectura y las decisiones técnicas que no serían obvias al implementar, como una solución o un proveedor de servicios. No los detalles técnicos que un implementador decidiría solo.
- **¿Vale lo que cuesta?:** Si te parece que la idea aporta poco valor para lo que cuesta construirla y mantenerla, no la aceptes en silencio. Hazle al Director preguntas sobre lo que concretamente no te cuadra de esta idea: el costo que ves y el beneficio que no encuentras. Pregunta para entender por qué la quiere y para qué público. No es para convencerlo, porque puede saber algo que no está en las bases: con sus respuestas, o se aclara el valor, o él mismo ve el costo. Si con sus respuestas él decide seguir, sigue con la incorporación de la idea sin volver a discutirla.
- **La versión más simple que funciona:** Haz la propuesta mínima que funciona sin complejidad innecesaria. Critica la idea del Director si esta incorpora complejidad innecesaria.
- **Dónde va:** El documento dueño y la sección, y lo que cambiaría en el Glosario, en Decisiones o en `Pasos Pendientes.md`. Si la idea es tan grande que justifica un documento propio o toca un área del proyecto que no encaja bien en los documentos existentes, pregunta al Director si se crea un nuevo documento.
- **Pasos pendientes:** Si la idea crea o cambia un paso pendiente, revisa que cumpla la definición de «Paso» del Glosario de `AGENTS.md`. Si no la cumple, propón cómo partirlo.
- **¿Conviene incluirla en los pasos pendientes?:** Revisa los pasos pendientes. ¿Alguno necesita esta idea para poder completarse? Si se deja la idea para después, ¿se tendría que modificar algo que se va a construir en esos pasos previos? Si es así, explica qué habría que cambiar. Explica por qué conviene que, una vez aprobada, la idea pase a `Pasos Pendientes.md` o permanezca en `Ideas Aprobadas.md`.

Si es una tarea, el Director decide la clasificación a partir de tu propuesta. Si es periódica, sugiere una frecuencia cuando tengas motivos para hacerlo.

Si es una idea, cierra tu retroalimentación preguntando «¿Quieres que sea una idea aprobada o una idea por decidir? ¿Con qué prioridad?». Las ideas que se guardan en `Ideas por Decidir.md` o en `Ideas Aprobadas.md` llevan prioridad alta, media o baja. El Director puede decidir en ese momento, cambiar lo que había sugerido o seguir conversando. Si quiere seguir, continúa afinando la idea con él y espera su decisión antes de escribir en las bases.

## 3. Escribir

- Si el Director aceptó un documento nuevo, agrégalo al índice como documento dueño de su tema.
- Para guardar una propuesta por decidir, aprobarla, cambiar su prioridad, pasarla a pasos pendientes, reconsiderarla o descartarla, sigue el apartado correspondiente de `<Trabajo Agéntico>/Habilidades/Gestión de Ideas.md`.
- Un concepto nuevo importante que no sea obvio va al Glosario.
- Guarda cada tarea en una sola sección de `Tareas Pendientes.md` siguiendo el formato de ese archivo. Las puntuales, incluidos los hallazgos sin resolver de un paso, se retiran al completarlas. Las periódicas se conservan con su frecuencia y se actualiza su fecha de última ejecución. Registrar una tarea no genera una entrada en `Decisiones.md`.
- Usa los nombres del Glosario y el estilo de los documentos: lenguaje humano, concreto y corto.

## 4. Cerrar

- Busca otra vez las palabras clave en todos los documentos de `Bases`, y corrige lo que haya quedado contradicho o desactualizado.
- Comprueba las citas de las bases, como dice `<Trabajo Agéntico>/Habilidades/Comprobar Bases.md`.
- No prepares los cambios: el Director revisa el diff y decide cuándo prepararlos.
- Resume en pocas líneas qué cambió y en qué archivos.
