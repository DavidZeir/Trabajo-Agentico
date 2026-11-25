# Incluir Idea

Las bases de un proyecto se construyen y se mantienen conversando con la IA. Las ideas nuevas terminan en `/incluir-idea`, vengan de donde vengan: del Director, de lo que encuentra el Revisor Principal en las bases o de una diferencia entre lo que ya está hecho y las bases. Su diagrama es `Incluir Idea.html`.

Las bases quedan siempre bajo el control del Director, porque un error en ellas cuesta más que uno en el trabajo. Un trabajo mal hecho se repite hasta que cumpla con las bases, pero una idea mal incluida daña todos los trabajos que vienen después.

1. **Diseño en la cabeza del Director:** Sin IA, razonamiento propio.

2. **Bases:** Validación conversacional y construcción de archivos `.md` de las bases. Se usa una IA de muy alta inteligencia (con acceso al resultado del trabajo si se trata de una migración) como interlocutor crítico para validar el diseño, factibilidad y posibles huecos de lógica o faltantes no planeados.

   Es crítico de dos formas distintas.

   - **Con la lógica es firme:** Los huecos de lógica en la idea, las contradicciones, las repeticiones y lo que ya se descartó se resuelven antes de registrar la idea como aprobada, porque si no, dañan las bases.
   - **Con el valor de la idea es más flexible:** Si una idea parece aportar poco valor para lo que cuesta construirla y mantenerla, se lo pregunta al Director una sola vez, y después respeta lo que él decida, porque qué se construye lo decide el Director.

   Una idea por decidir puede conservar la duda que se quiere retomar. Una idea aprobada puede dejar preguntas abiertas. En ambos casos se anota qué sigue abierto.

   Las bases describen lo que el proyecto ya es y lo que se planea: plan, arquitectura, diseño y solución preliminar de posibles problemas que se encontrarían en la implementación. Se usan descripciones concretas y pulidas en lenguaje humano sin entrar en exceso a detalle técnico si no es necesario. Se puede agregar detalle técnico si se encuentra que una solución técnica o proveedor de servicios no sería obvia para los Implementadores.

   Se hace en la carpeta `Bases` de la raíz del proyecto, que siempre va en el repositorio, para que git muestre cada cambio y el Director lo vaya aprobando. La copia pública del código, si se hace, la deja fuera. Esa carpeta nace de la plantilla de Trabajo Agéntico, que trae los documentos mínimos, con su estructura y sin contenido (ver «Inicio de un proyecto», en `Configuración.md`). Usar las habilidades `/incluir-idea` y `/revisar-bases` a medida que se vayan necesitando.

3. **Revisar Bases:** Con una segunda IA de otra empresa como opinión independiente (Revisor Principal). Abrirle al Revisor Principal una sesión en su propia aplicación, en la raíz del proyecto, y usar la habilidad compartida `/revisar-bases`. El Director resuelve con esa misma sesión, uno a uno, los puntos que encuentre, y lo que decida incluir lo incluye ella con `/incluir-idea`. No se hace un flujo automático para esto porque las bases deben estar siempre totalmente bajo el control del Director.

4. **Nuevas Ideas:** El Director usa `/incluir-idea` para guardar cada idea donde corresponda.

   La IA revisa si la idea ya está documentada, si contradice alguna decisión, si tiene huecos de lógica o si falta definir algo para realizarla. Comenta lo que encontró, propone dónde encajaría la idea y termina preguntando «¿Quieres que sea una idea aprobada o una idea por decidir? ¿Con qué prioridad?». El Director puede decidir en ese momento o seguir conversando antes de guardar la idea.

   Si se trata de una tarea puntual, la IA propone prioridad alta, media o baja. Si ve que la tarea debe repetirse, propone guardarla en «Periódicas» y sugiere una frecuencia cuando tenga elementos para hacerlo. El Director decide. Para anotarla en `Tareas Pendientes.md`, la IA pregunta solo por los datos que falten.

   - **Idea por decidir:** Va en `Ideas por Decidir.md` con la prioridad para retomarla: alta, media o baja.
   - **Idea aprobada:** Va en `Ideas Aprobadas.md` con su prioridad, escrita como quedaría en el documento dueño cuando se programe como paso o se implemente. Mientras tanto, en el documento dueño queda un texto corto con su referencia. Si lo aprobado ya está hecho, o si escribirlo es todo lo que pide la idea, va de una vez a su documento dueño, sin pasar por `Ideas Aprobadas.md`.
   - **Descartada después de discutirla a fondo:** El descarte queda registrado en `Decisiones.md`. Si corresponde incluirlo en `Ideas Descartadas.md`, se anota el motivo y se cita el número de esa decisión.

   La idea aprobada permanece en su lista hasta que se programa como paso o se realiza. La habilidad que recibe el pedido sigue `Habilidades/Gestión de Ideas.md`.

5. **Revisar lo hecho contra las bases:** Cuando el proyecto ya tiene algo hecho, también se compara con las bases, para encontrar dónde no coinciden. En el software se hace con `/revisar-codigo-vs-bases`, que compara el código completo con las bases. Conviene hacerlo antes de un paso importante, después de muchos cambios o al retomar un proyecto que estuvo quieto.
