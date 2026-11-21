---
name: implementar-cambio-minimo
description: Hace un cambio mínimo en un proyecto de software, de los que se comprueban con solo mirarlos, sea un texto, un estilo, un valor, un nombre o unas pocas líneas de código, directo en la rama principal, sin plan ni revisor y solo con el Verificador ligero, y lo deja sin preparar para que el Director lo revise. Solo la invoca el Director.
argument-hint: "[el cambio mínimo]"
disable-model-invocation: true
---

# Implementar un cambio mínimo

Cambio: $ARGUMENTS

Si no viene nada, pregunta qué cambio hacer.

El Director escogió esta vía porque el cambio le parece mínimo, así que no lleva casi nada de lo de un cambio menor: ni plan, ni pruebas nuevas, ni revisor, ni resumen, y del Verificador, solo el ligero. Lo tuyo es hacerlo, y detenerte solo si resulta más grande o más delicado de lo que parecía. La sesión está abierta en la raíz del proyecto, y trabajas directo en la rama principal. Nunca preparas ni confirmas nada: la preparación es del Director.

## 1. Antes de empezar

Comprueba que la carpeta esté en la rama principal y que no tenga nada sin preparar, tampoco archivos nuevos, porque al final tu cambio tiene que quedar solo. Lo que el Director ya preparó puede estar, y no lo tocas. Si algo falla, detente y avísale.

Si el cambio implementa una idea de `Ideas Aprobadas.md`, lee ahora «Cuándo sale una idea de Ideas Aprobadas» y su apartado «Implementarla», en `<Trabajo Agéntico>/Habilidades/Gestión de Ideas.md`, y síguelos: dicen qué revisar antes de empezar y cómo actualizar las bases al terminar.

## 2. La frontera

Un cambio mínimo es pequeño y se comprueba con solo mirarlo. No lo limites por su tipo: puede ser un texto, un estilo, un valor, un nombre o unas pocas líneas de código. Deja de serlo si para saber que quedó bien hace falta una prueba nueva, o si toca la base de datos, la arquitectura o la seguridad.

No investigues de más para saberlo: basta con lo que veas al hacer el cambio. Si ves que una prueba comprueba lo que vas a cambiar, pregúntale al Director si la cambias también.

Si no es mínimo, detente sin cambiar nada, dile al Director por qué y propón la vía que le toca: `/implementar-cambio`, si hace falta una prueba nueva o si toca la seguridad, o `/incorporar-idea` y después `/implementar-paso`, si toca la base de datos o la arquitectura. Si el cambio crece en el camino, detente igual y avísale.

## 3. El cambio

Haz el cambio y corre el arreglo automático del linter solo en los archivos que tocaste, para no cambiar nada más.

## 4. La comprobación

Relee lo que cambiaste, con `git diff`, y comprueba que hace lo que pidió el Director, y nada más. Después corre el Verificador ligero, hasta que pase: sus tipos y sus pruebas ligeras atrapan lo que no se ve mirando, como un nombre que quedó viejo en otro archivo. Si falla algo que tu cambio no tocó, avísale al Director en vez de arreglarlo, y si sigue fallando después de 10 vueltas, detente y avísale también. No corras el verificador completo: si algo se escapa, lo atrapa el próximo paso o cambio menor, que lo corre antes de empezar.

## 5. El final

Dile al Director, en pocas líneas, qué archivos cambiaste, si pasó el Verificador ligero y dónde mirar el cambio. Si corrige un error que se escapó de un paso o de un cambio anterior, agrega una línea con qué capa debió atraparlo. Si el cambio toca lógica, di qué líneas conviene mirar con más cuidado y qué pasaría si quedaron mal. No escribas resumen ni dejes nada en `Pasos/`. Tu cambio queda sin preparar, para que el Director lo revise.

Termina siempre el mensaje con este aviso, aunque el cambio parezca trivial, sin agrandarlo ni suavizarlo:

> **Revisa este cambio con cuidado antes de confirmarlo.** No quedó tan revisado como con `/implementar-paso` o `/implementar-cambio`: ningún revisor lo miró, no lleva pruebas nuevas y solo corrió el Verificador ligero, sin las pruebas pesadas ni las de interfaz. Por eso, te toca a ti leer cada línea del diff y comprobar que quedó bien, sobre todo la lógica: en esta vía, esa responsabilidad es tuya. **Si te parece necesario, prepara los cambios y corre `/revisar-y-corregir`:** El Revisor Principal lo revisa y se corrige lo que encuentre, y las correcciones quedan sin preparar, aparte de tu cambio.
