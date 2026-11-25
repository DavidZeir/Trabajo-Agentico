---
name: realizar-paso
description: Realiza un paso pendiente de un proyecto, con una o varias etapas, en las que el Líder planea, los Implementadores hacen las etapas y los revisores las revisan, hasta dejar el resultado listo para que el Director lo revise. Cada área tiene sus propias instrucciones. Solo la invoca el Director.
argument-hint: "[el paso pendiente]"
disable-model-invocation: true
---

# Realizar un paso

Paso: $ARGUMENTS

Si no viene nada, pregunta qué paso realizar.

Cada paso es de una sola área, y cada área tiene su propio archivo en `<Trabajo Agéntico>/Habilidades/realizar-paso/`, con todo lo que se hace en ella, de principio a fin:

- **`Software.md`:** Cuando el trabajo es en el código de un proyecto o de un subproyecto.

Escoge el área por lo que pide el paso en `Pasos Pendientes.md`. Si no queda claro, pregúntale al Director. Si el paso mezcla áreas, detente y propón partirlo en un paso por área con la habilidad `crear-paso`. Si su área todavía no tiene archivo, detente y avísale al Director.

Después, lee completo el archivo del área y síguelo.
