# Gestión de Tareas

Cómo se guardan y se completan las tareas de `Tareas Pendientes.md`, y cómo pasan las puntuales completadas a `Tareas Terminadas.md`. Lo sigue `incluir-idea` al guardar una tarea, y cualquier sesión que complete una. La forma de cada documento está en su plantilla.

## Todas las tareas

- Cada tarea va en una sola sección de `Tareas Pendientes.md`.
- Si una tarea depende de algo, se anota qué espera.
- Registrar una tarea no genera una entrada en `Decisiones.md`.
- Quien completa una tarea lo dice, y basta con su palabra: la IA anota su nombre, como dice «Las personas del proyecto», en `Gestión de Contactos.md`.

## Las tareas puntuales

Van en la sección de su prioridad: alta, media o baja. Una tarea que se incluye en un paso sale de `Tareas Pendientes.md`, porque desde ese momento es parte del paso. Solo las puntuales pueden entrar a un paso.

Al completarla, la tarea sale de `Tareas Pendientes.md` y pasa al principio de la lista de `Tareas Terminadas.md`, como estaba, con su línea de cierre: la fecha, quién la completó y lo que se hizo, si hace falta contarlo. Una tarea terminada es un registro: lo que dice no se cambia. Solo se actualizan sus enlaces, si su destino cambia de nombre o se borra.

## Las tareas periódicas

Van en la sección «Periódicas». Cada una dice cada cuánto se repite, y la fecha y el nombre de quien la hizo la última vez. Si todavía no se ha hecho, lleva la fecha prevista para la primera vez.

Al completarla, la tarea se queda en `Tareas Pendientes.md`, y se le actualizan la fecha y el nombre. Con esa fecha y su frecuencia se calcula cuándo vuelve a tocar.
