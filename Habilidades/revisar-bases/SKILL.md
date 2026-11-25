---
name: revisar-bases
description: Revisa en frío las bases del proyecto, como un implementador que solo tiene esos documentos, y busca especificaciones de lógica de negocio incompletas o contradictorias, arquitectura defectuosa y tecnologías desaconsejables. Úsala antes de realizar un paso pendiente.
argument-hint: "[tema o paso a revisar, opcional]"
disable-model-invocation: true
---

# Revisar las bases

Vas a implementar este sistema desde cero y solo tienes los documentos de la carpeta `Bases`, en la raíz del proyecto (empieza por su `Leeme.md`). Revisa esas bases y busca problemas como:

- Especificaciones de lógica de negocio incompletas o contradictorias.
- Arquitectura ineficiente, defectuosa o más compleja de lo necesario.
- Tecnologías elegidas desaconsejables.
- Prácticas actuales que el diseño ignora y que cambiarían algo de las bases, por ejemplo cómo se miden, vigilan y limitan los agentes. Si el alcance toca la arquitectura o las tecnologías, investígalas en la web y cita las fuentes. No traigas modas que sumen complejidad sin resolver nada de este sistema.

Alcance: $ARGUMENTS

Si no viene nada, haz una revisión general de las bases. Si viene un tema o un paso, revisa eso y lo que necesite de los demás documentos.

## Reglas

- Antes de leer las bases, comprueba sus citas, como dice `<Trabajo Agéntico>/Habilidades/Comprobar Bases.md`.
- No asumas nada: lo que tendrías que suponer porque los documentos no lo dicen, conviértelo en una pregunta.
- No te vuelvas excesivamente detallista. La especificación no tiene que describir cada detalle. Lo que un buen implementador decidiría solo no es un hueco.
- También son contradicciones: una idea que `Ideas Descartadas.md` ya descartó pero sigue apareciendo en otro documento, y un concepto con un nombre distinto al que le da el Glosario.
- Si las bases tienen subproyectos, con su propia carpeta dentro de `Bases`, revisa todas juntas: los documentos de cada carpeta y los de las de arriba, sobre todo los que se llaman igual, como las `Decisiones.md`, se leen como si fueran un solo documento. Un subproyecto solo agrega lo suyo, así que también es una contradicción lo que dice distinto de las bases de arriba.
- Comprueba si alguna decisión de las bases contradice una idea de `Ideas Aprobadas.md`. Señala también si falta la referencia en su documento dueño o si una referencia apunta a una idea que ya salió de `Ideas Aprobadas.md`.
- No leas `Ideas por Decidir.md` durante la revisión.
- No edites ningún archivo sin que el Director te lo pida.

## Qué entregar

En español, corto y concreto, con el documento y la sección de cada punto, y primero lo más importante. Lo que está bien no lo menciones.

1. **Citas rotas**, si el programa encontró alguna, como las dice él.
2. **Problemas**, por tipo (lógica de negocio, arquitectura, tecnologías y prácticas actuales). Cada uno en una o dos líneas: qué está mal, por qué y qué harías en su lugar.
3. **Preguntas** para terminar de cerrar la especificación, primero las que cambiarían la lógica de negocio o la arquitectura.

Después, resuelve las preguntas con el Director. Cuando te pida incluir una respuesta, hazlo con la habilidad `incluir-idea`.
