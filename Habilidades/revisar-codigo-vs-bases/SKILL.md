---
name: revisar-codigo-vs-bases
description: Compara el código actual del proyecto con las especificaciones vigentes de sus bases. Reporta lo que el código hace distinto, lo que falta y lo que las bases no describen. También sugiere qué código sobra. Úsala cuando el código haya crecido, para comprobar que las bases siguen siendo la fuente de verdad.
argument-hint: "[tema, paso o carpeta a revisar, opcional]"
disable-model-invocation: true
---

# Revisar el código contra las bases

Compara el código actual con todos los documentos de `Bases`, empezando por su `Leeme.md`. Para esta comparación, ignora únicamente `Ideas por Decidir.md`, `Ideas Aprobadas.md`, `Ideas Descartadas.md` y `Pasos Terminados.md`. Lee `Pasos Pendientes.md` solo para no tener en cuenta lo que falta construir: lo que las bases especifican para un paso pendiente no es una diferencia, aunque el código todavía no lo haga aún o lo haga diferente. Si el alcance es un paso, usa su entrada en `Pasos Pendientes.md` o en `Pasos Terminados.md` solo para saber qué especificación revisar.

- Lo que las bases especifican y el código no hace o hace de otra manera.
- Lo que el código hace y las bases no describen, cuando es lógica de negocio o arquitectura.
- La interfaz que se sale de `Diseño.md`, si las bases lo tienen, como un color, una letra o un texto con otro tono. Si hace falta ver cómo se ve una página, ábrela con el navegador.
- El código que sobra: Lo que nada usa, las funciones redundantes, el código comentado y el código «por si acaso» para casos improbables, como caminos alternos para fallas que no pasan, compatibilidad innecesaria con lo viejo u opciones que nadie usa. También lo que las bases ya no piden, como lo que quedó de una idea descartada o reemplazada.

Alcance: $ARGUMENTS

Si no viene nada, revisa el proyecto completo. Si viene un tema, un paso o una carpeta, revisa eso y lo que necesite del resto.

## Reglas

- Las bases están en la carpeta `Bases`, en la raíz del proyecto. Si no existe, detente y avísale al Director.
- Antes de leer las bases, comprueba sus citas, como dice `<Trabajo Agéntico>/Habilidades/Comprobar Bases.md`.
- Si las bases tienen subproyectos, con su propia carpeta dentro de `Bases`, compara el código con todas juntas: los documentos de cada carpeta y los de las de arriba, sobre todo los que se llaman igual, como las `Decisiones.md`, se leen como si fueran un solo documento, y los que ignoras, los ignoras en todas las carpetas. Si el código de un subproyecto sigue algo de su carpeta que contradice las bases de arriba, repórtalo como una diferencia, porque un subproyecto solo agrega lo suyo y nunca las contradice.
- Si el proyecto es muy grande para revisarlo de una vez, revísalo por partes, según el mapa de carpetas del `AGENTS.md`, y di qué partes revisaste.
- No decidas cuál de los dos está bien: reporta la diferencia. Esa decisión es del Director.
- No te vuelvas excesivamente detallista: las bases no describen cada detalle del código, y lo que un buen implementador decidiría solo no es una diferencia.
- No edites ningún archivo sin que el Director te lo pida.

## Qué entregar

En español, corto y concreto, y primero lo más importante. Lo que coincide no lo menciones.

1. **Citas rotas**, si el programa encontró alguna, como las dice él.
2. **Diferencias**, cada una en una o dos líneas: indica qué falta, qué funciona de otra manera o qué hace el código que las bases no describen, con el documento, la sección y el archivo de código correspondiente.
3. **Sugerencias de limpieza**, con el código que sobra. Cada una en una línea: el archivo y por qué sobra.
4. **Preguntas**, cuando no esté claro qué quisieron decir las bases.

Después, el Director decide cada diferencia, una a una: primero con `/incorporar-idea` y, si hay que corregir el código, después con `/implementar-cambio`. Las sugerencias de limpieza que acepte se borran con `/implementar-cambio`.
