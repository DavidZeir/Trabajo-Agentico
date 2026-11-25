# Gestión de Pasos

Cómo se resuelve lo que le falta definir a un paso, cómo se marcan sus criterios de aceptación y cómo se cierra. Lo sigue `realizar-paso` al empezar y al cerrar un paso, y cualquier sesión que marque un criterio, como cuando una persona cuenta que algo ya se cumplió. Los pasos se crean y se corrigen con `/crear-paso`. La forma de un paso y la de sus marcas están en `Pasos Pendientes.md`.

## Lo que falta definir

Si falta una decisión para poder hacer un paso, se anota solo en ese paso, en su «Falta definir». Antes de escribir el plan del paso, se resuelve con el Director, con `/incluir-idea`, que escribe cada respuesta donde corresponde y quita la nota.

## Marcar un criterio

Un criterio que la IA no puede comprobar, como lo que pasa en una bodega, lo confirma la persona que dice el criterio o, si no dice ninguna, el Director. Basta con su palabra: la IA anota lo que contó, con su nombre, como dice «Las personas del proyecto», en `Gestión de Contactos.md`. Si la IA ve que quien confirma no es la persona que dice el criterio, como por el usuario de git de la sesión, se lo dice antes de marcarlo.

Un criterio que comprueba la IA lleva en su marca cómo lo comprobó.

Si un criterio se cumple mientras el paso sigue abierto, como cuando otro espera a una persona, se marca debajo de él, con la fecha, quién lo comprobó y cómo. Cuando todos los criterios se comprueban a la vez, como con las pruebas de aceptación del software, el paso se cierra sin marcarlos uno por uno, y su línea de cierre dice quién lo comprobó y cómo.

## Cerrar un paso

Cuando el paso cumple todos sus criterios, muévelo completo, con sus marcas, de `Pasos Pendientes.md` al principio de la lista de `Pasos Terminados.md`, y añade su línea de cierre, con la fecha de hoy, quién lo cerró y cómo se comprobó:

```
**Terminado el AAAA-MM-DD:** Lo comprobó la IA: las pruebas de aceptación pasaron en el Verificador completo. Ver el [resumen](enlace al resumen del paso).
**Terminado el AAAA-MM-DD:** Lo cerró la IA, con todos sus criterios marcados. El último lo confirmó [su nombre].
**Terminado el AAAA-MM-DD:** Lo confirmó [su nombre]: [lo que contó].
```

En el software, la línea enlaza el resumen del paso, en `Pasos/`. Actualiza las citas que apuntaban a su antigua sección. La especificación sigue en su documento dueño.

Si le queda un criterio que confirma una persona, el paso todavía no termina: marca los que ya se cumplieron, déjalo en `Pasos Pendientes.md` y dile al Director cuál falta y quién lo confirma.

Un paso terminado es un registro: lo que dice no se cambia. Solo se actualizan sus referencias, si un documento dueño cambia de nombre o de sección.
