# Gestión de Contactos

Cómo se llena y se usa `Contactos.md`, el documento de las bases con las personas que trabajan en el proyecto y los contactos de afuera. Lo siguen `Gestión de Pasos.md` y `Gestión de Tareas.md` para anotar quién confirma algo, y cualquier sesión que guarde un contacto.

## Lo que entra

Solo datos de trabajo, como el correo de una persona en la empresa o el teléfono de la empresa de un proveedor. Lo que entra a las bases queda para siempre en el historial de git, aunque después se borre, y lo ve cualquiera que tenga el repositorio. Un dato privado de una persona, o un contacto que no todos deben ver, va en `Archivos/` o en una carpeta compartida con sus permisos.

## Las personas del proyecto

Cada persona que trabaja en el proyecto lleva el nombre, su correo, el correo con que firma sus confirmaciones en git y, si sirve, su cargo.

Cuando alguien confirma un criterio de un paso o completa una tarea, la IA busca en la tabla el correo de git de la sesión y anota el nombre de esa persona. Si no está en la tabla, le pregunta su nombre y la agrega.

## Los contactos de afuera

Cada contacto de afuera, como un proveedor o un cliente, lleva su nombre, su empresa, qué es para el proyecto, su correo y su teléfono.
