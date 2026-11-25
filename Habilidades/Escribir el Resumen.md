# Escribir el Resumen

Así escriben `realizar-paso` y `realizar-cambio`, al final, el resumen de un paso o de un cambio y su fila de `Pasos/Métricas.csv`. Donde los dos difieren, lo dice cada punto.

## El resumen

Escribe el resumen en `Resumen.md`, en la carpeta del paso o del cambio. Es el registro completo de lo que pasó, y reemplaza a las respuestas de los revisores, que se borran al terminar. Cuenta lo que pasó, y no repite lo aprobado en el plan, que en un paso son el principal y los de las etapas. Lleva estas secciones:

- **Lo que se construyó:** Cada pieza, la lógica de negocio nueva o cambiada y dónde está.
- **Cómo se ve:** Si el paso o el cambio cambió lo que ve el usuario, una captura de cada pantalla nueva o cambiada, en cada dispositivo donde funcione la interfaz, como el escritorio y un teléfono en una web, metida en el resumen con `![Qué muestra](Capturas/nombre.jpg)`, para que se vea al leerlo. Tómalas al final, como se miró la interfaz mientras se programaba. En un paso, tómalas en la copia de trabajo de integración, con todas las etapas ya fusionadas. Guárdalas en `Capturas/`, dentro de la carpeta del paso o del cambio, en JPEG, para que pesen poco. Así el Director ve el aspecto de una vez y pide todos los ajustes juntos. Las capturas no van en git, como dice el `.gitignore`.
- **Lo que cambió frente al plan:** Las decisiones del camino que cambiaron lo aprobado, o que agregaron algo que no estaba en el plan, con su razón.
- **Las decisiones del camino:** Las demás, las que se tomaron dentro de lo aprobado.
- **Las revisiones, vuelta por vuelta:** Cada hallazgo bloqueante de cada revisor, en una o dos líneas, con lo que se hizo con él: si se corrigió, y cómo, si se descartó por ser una decisión a propósito del plan, si pasó a las sugerencias por teórico, con los argumentos de los dos, o si quedó sin resolver. En un cambio, el único revisor es el Revisor de Etapa.
- **Los archivos:** Cada archivo creado o cambiado, con una línea de qué cambió.
- **Las pruebas:** El informe de `limpiar-pruebas`.
- **Las cifras:** En un paso, cuántas vueltas dio cada etapa con cada revisor, los conflictos al fusionar, las fallas del Verificador después de una fusión y las gemelas que fallaron por el código. En un cambio, cuántas vueltas dio con el Revisor de Etapa. En los dos, los minutos que trabajó la IA, sin contar lo que tardó el Director en contestar. Sácalos de la hora de los mensajes en el registro de tu sesión: en Claude, el `.jsonl` más reciente de la carpeta del proyecto en `%USERPROFILE%\.claude\projects\`, y en Codex, el más reciente de `%USERPROFILE%\.codex\sessions\`.
- **Las comprobaciones manuales:** Una lista corta de lo que las pruebas no alcanzaron a revisar y conviene que el Director mire antes de aprobar.
- **Los aprendizajes:** Los que dejó el paso o el cambio, en una o dos líneas cada uno. Si un tropiezo lo pudo haber atrapado el Verificador, su aprendizaje trae la regla del linter, la regla de estructura o la prueba que lo habría atrapado. Si un cambio corrige un error que se escapó de un paso o de un cambio anterior, uno de ellos es qué capa debió atraparlo, con la regla del linter, la prueba o la línea de `<Trabajo Agéntico>/Habilidades/Revisores.md` que lo habría atrapado. El Director decide qué se hace con ellos.
- **Lo que se vio de paso:** Los problemas que se encontraron y que ya venían de antes, sin ser del paso o del cambio.
- **Hallazgos sin resolver:** Los hallazgos bloqueantes que quedaron sin resolver cuando un revisor llegó a su techo, con por qué son bloqueantes, y en un paso, con el revisor y la etapa.
- **Correcciones por decidir:** Las sugerencias de los revisores, numeradas. No las arregles por tu cuenta: el Director lleva las que quiera, una a una, a `incluir-idea`. Lo que él quiera dejar para después, de aquí o de los hallazgos sin resolver, también pasa por `incluir-idea`, que decide con el Director si es una tarea o una idea y dónde va.

## La fila de las métricas

Agrega también una fila a `Pasos/Métricas.csv`. Si no existe, créalo con estas columnas: `Fecha,Tipo,Nombre,Etapas,Vueltas con el Revisor de Etapa,Vueltas con el Revisor Principal,Conflictos al fusionar,Fallas del Verificador al fusionar,Minutos,Gemelas fallidas`.

- **En un paso:** El tipo es `Paso`, y las vueltas suman las de todas las etapas y todas las revisiones. Las gemelas fallidas son las que fallaron por el código, y no porque la gemela estuviera mal, y la columna va vacía si `PruebasGemelas` está apagada.
- **En un cambio:** El tipo es `Cambio`, hay 1 etapa, las vueltas con el Revisor Principal, los conflictos y las fallas al fusionar son 0, y la columna de las gemelas va vacía, porque no hay gemelas.
