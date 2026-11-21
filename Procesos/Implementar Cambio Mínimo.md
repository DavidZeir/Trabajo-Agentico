# Implementar Cambio Mínimo

Para un cambio pequeño en un proyecto de software, que se comprueba con solo mirarlo, se usa `/implementar-cambio-minimo`. Puede ser un texto, un estilo, un valor, un nombre o unas pocas líneas de código. Lo hace una sola sesión, directo en la rama principal, y solo la invoca el Director. Su diagrama es `Implementar Cambio Mínimo.html`.

## El proceso

1. **Antes de empezar:** La sesión comprueba que esté en la rama principal y que no haya nada sin preparar, para que su cambio quede solo. Lo que el Director ya preparó se queda como está.
2. **La frontera:** No investiga de más, porque la investigación pesaría más que el cambio: le basta con lo que ve al hacerlo. Si para saber que quedó bien hace falta una prueba nueva, o si toca la base de datos, la arquitectura o la seguridad, no es un cambio mínimo: se detiene sin hacerlo y propone la vía que le toca: `/implementar-cambio`, si hace falta una prueba nueva o si toca la seguridad, o `/incorporar-idea` y después `/implementar-paso`, si toca la base de datos o la arquitectura. También se detiene si el cambio crece en el camino. Si ve que una prueba comprueba lo que va a cambiar, le pregunta al Director antes de cambiarla.
3. **El cambio:** Lo hace y corre el arreglo automático del linter solo en los archivos que tocó, para no cambiar nada más.
4. **La comprobación:** Relee lo que cambió y corre el Verificador ligero, hasta que pase, con un techo de 10 vueltas. Si falla algo que el cambio no tocó, le avisa al Director en vez de arreglarlo.
5. **El final:** Le dice al Director qué archivos cambió, si pasó el Verificador ligero y dónde mirar el cambio. Si corrige un error que se escapó de un paso o de un cambio anterior, le dice además qué capa debió atraparlo, y si toca lógica, qué líneas conviene mirar con más cuidado. Nunca prepara ni confirma nada, así que sus cambios quedan sin preparar. Termina siempre con un aviso: el cambio no quedó tan revisado como con `/implementar-paso` o `/implementar-cambio`, y le toca al Director leer cada línea del diff y comprobar que quedó bien, porque en esta vía esa responsabilidad es suya. El aviso también le recuerda que, si le parece necesario, puede preparar los cambios y correr `/revisar-y-corregir`.

## Lo que se salta

No comprueba las preferencias, solo consulta las bases si el Director pide implementar una idea de `Ideas Aprobadas.md`. En ese caso sigue `Habilidades/Gestión de Ideas.md`. Tampoco lleva plan, pruebas nuevas, Revisor de Etapa, Verificador completo, limpieza de pruebas ni resumen, y no deja nada en `Pasos/`, tampoco en `Métricas.csv`. Si el cambio contradice las bases, lo nota el Director, que fue quien lo pidió, o `/revisar-codigo-vs-bases`. Se puede saltar todo eso porque la vía la escoge el Director, y nunca la IA: al invocarla, el Director decide que el riesgo es mínimo y asume la responsabilidad.

## Por qué corre solo el Verificador ligero

Un cambio mínimo no siempre es de interfaz: cambiar un nombre, un valor o unas pocas líneas de código puede romper justo lo que mira el ligero, los tipos o las pruebas ligeras, y lo que asegura que un nombre no quedó viejo en otro archivo son los tipos. No corre el completo, para que siga siendo rápido. Lo que el ligero no corre, como una prueba de interfaz que espera un texto viejo, lo atrapa el próximo paso o cambio menor, que corre el completo antes de empezar.

## El riesgo

Que esta vía se vuelva la cómoda y se cuelen cambios más delicados de lo que parecen, sin prueba ni revisor. Lo frenan la frontera, la revisión del Director, que en un cambio mínimo es de pocas líneas y que el aviso final le recuerda, y la retroalimentación: si un error se cuela por aquí, el cambio menor que lo arregle lo va a mostrar cuando diga qué capa debió atraparlo.
