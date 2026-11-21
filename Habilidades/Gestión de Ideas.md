# Gestión de Ideas

El Director elige el destino de la idea después de conversar con la IA. Las ideas por decidir y las aprobadas se guardan con la prioridad que elija: alta, media o baja. Si al guardarla falta la prioridad, pregúntasela.

## Guardar una idea por decidir

Guarda la idea en `Ideas por Decidir.md` con la duda que el Director quiera retomar, si la mencionó. Si ya figura allí, actualiza esa misma entrada con los cambios que indique. Guardar una idea nueva en este archivo no cambia nada más en las bases: no genera una decisión, ni una referencia en el documento dueño, ni una entrada en el Glosario.

## Aprobar una idea

Cuando el Director aprueba una idea, guárdala en `Ideas Aprobadas.md`. Escribe lo aprobado como su especificación, en presente («se guarda», no «se guardará») y como quedaría en el documento dueño, para facilitar el traslado. Anota también por qué puede esperar y en qué documento dueño y sección va a quedar. Incluye solo las preguntas que quedaron abiertas en la conversación. Lo aprobado forma parte del diseño y el proyecto puede funcionar mientras espera su implementación.

Registra la aprobación siguiendo las reglas de `Decisiones.md`. En el documento dueño deja una sola referencia, como "Ver la idea aprobada «Nombre corto» en `Ideas Aprobadas.md`".

Si lo aprobado ya está hecho, como lo que encuentra `/revisar-codigo-vs-bases` en el software, o si escribirlo en las bases es todo lo que pide la idea, escríbelo de una vez en su documento dueño, sin pasar por `Ideas Aprobadas.md`.

Si venía de `Ideas por Decidir.md`, retira su entrada de ese archivo. Si el Director aprueba una idea antes descartada, retira la entrada de `Ideas Descartadas.md` y actualiza la decisión anterior según las reglas de `Decisiones.md`.

## Cambiar prioridad

Si el Director solo cambia la prioridad, mueve la entrada a la sección correspondiente del mismo archivo. En `Ideas por Decidir.md`, la prioridad indica cuándo retomar la idea. En `Ideas Aprobadas.md`, ayuda a elegir cuál abordar primero.

## Cuándo sale una idea de Ideas Aprobadas

Trasladar una idea es moverla a su documento dueño:

- En el documento dueño se sustituye la referencia por la especificación de la entrada, con los ajustes que pida su lugar en el documento.
- Los demás documentos de las bases enlazan el documento dueño en vez de repetir la especificación.
- Se retira la entrada de `Ideas Aprobadas.md`.
- La decisión escrita cuando se aprobó la idea se conserva sin cambios en `Decisiones.md`, y no se agrega una decisión nueva por el traslado.

### Agregarla a Pasos Pendientes

Cuando el Director pide incluir la idea en `Pasos Pendientes.md`, `/incorporar-idea` hace el traslado y anota los pasos en orden siguiendo el formato de ese archivo. Cada paso lleva su objetivo, sus criterios de aceptación y la referencia a la especificación, sin repetirla. En «Por qué aquí», explica por qué cada paso ocupa ese lugar.

Si la idea es urgente y afecta a todos los pasos, va como el primer paso de `Pasos Pendientes.md`. Si queda una decisión abierta, anótala en «Falta definir» del paso que depende de ella.

### Implementarla

Cuando el Director pide implementarla, como con `/implementar-cambio` o `/implementar-cambio-minimo` en el software, la idea permanece en `Ideas Aprobadas.md` mientras el cambio está en curso. Si la idea tiene preguntas abiertas, o si al implementarla hace falta cambiar lo aprobado, detente y pídele al Director que lo resuelva antes con `/incorporar-idea`. Cuando la idea ya está implementada, haz el traslado y presenta las bases junto con el resultado del trabajo al Director.

### Reconsiderarla

Si el Director vuelve a poner en duda la aprobación de la idea, mueve la idea de `Ideas Aprobadas.md` a `Ideas por Decidir.md` con la duda que quiere resolver y la prioridad para retomarla. Retira la referencia del documento dueño y actualiza `Decisiones.md` para que la aprobación anterior deje de figurar como vigente.

## Descartar una idea

Cuando el Director descarta una idea después de discutirla a fondo, registra la decisión y su porqué en una o dos líneas en `Decisiones.md`, aunque la idea nunca se haya aprobado. En `Ideas Descartadas.md` no van ideas menores ni lo que se rechazó sin mayor discusión. En cada entrada que corresponda, anota el motivo y cita el número de la decisión. Si el Director aprueba otra idea en su lugar, sigue el apartado «Aprobar una idea». Las alternativas que solo propuso la IA o que se mencionaron de pasada quedan fuera de ambos archivos.

- Si estaba en `Ideas por Decidir.md`, retira su entrada al descartarla.
- Si estaba aprobada, retira la entrada de `Ideas Aprobadas.md` y las referencias que apuntaban a ella. Actualiza la aprobación anterior según las reglas de `Decisiones.md`.
- Si ya estaba especificada, retira lo descartado del documento dueño y de los documentos que lo enlazan, y actualiza la decisión anterior.
