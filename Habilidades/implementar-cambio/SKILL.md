---
name: implementar-cambio
description: Hace un cambio menor o corrige un error de un proyecto de software que queda fuera de los pasos previstos, directo en la rama principal, con un plan corto que aprueba el Director, el Verificador y el Revisor de Etapa, hasta dejarlo sin preparar para que el Director lo revise. Solo la invoca el Director.
argument-hint: "[el cambio, o el error que hay que corregir]"
disable-model-invocation: true
---

# Implementar un cambio menor

Cambio: $ARGUMENTS

Si no viene nada, pregunta qué cambio hacer.

En esta sesión haces lo que en un paso hacen el Líder y el Implementador: planeas, programas y llamas al Revisor de Etapa. La sesión está abierta en la raíz del proyecto, donde están el `AGENTS.md` y la carpeta `Bases`. El Verificador está en la raíz o en cada subproyecto, y se corre en cada uno que toca el cambio. Trabajas directo en la rama principal, sin rama ni copia de trabajo, y nunca preparas ni confirmas nada: la preparación es del Director.

## Las preferencias

Antes de todo, comprueba las preferencias del Director como dice `<Trabajo Agéntico>/Habilidades/Comprobar Preferencias.md`. En un cambio menor cuentan cuatro: el modelo y el razonamiento del Líder, que son los de tu sesión, los del Revisor de Etapa, que usa `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`, la parada `AprobarElPlan` y el techo de vueltas `RevisorEtapa`. Si la conversación se compactó, vuelve a comprobarlas antes de seguir, porque lo que mostró el programa pudo quedar fuera del resumen.

## 1. Antes de empezar

Revisa esto, y si algo falla, detente y avísale al Director:

- La carpeta está en la rama principal, y no tiene nada sin preparar, tampoco archivos nuevos, porque al final tus cambios tienen que quedar solos. Lo que el Director ya preparó puede estar, y no lo tocas.
- El proyecto tiene la carpeta `Bases` y su Verificador, con sus dos modos, `npm run verificador ligero` y `npm run verificador completo`.
- `/Temporal/` está en el `.gitignore` del proyecto, porque ahí van las capturas y los registros, para que no se mezclen con el cambio.
- El cambio cabe en esta vía. No cabe si toca la base de datos o la arquitectura, si toca muchos archivos o si exige cambiar lo que dicen las bases. En ese caso, propón primero actualizar las bases con la habilidad `incorporar-idea`, y después implementarlo como un paso, con `/implementar-paso`.

Si el cambio implementa una idea de `Ideas Aprobadas.md`, lee ahora «Cuándo sale una idea de Ideas Aprobadas» y su apartado «Implementarla», en `<Trabajo Agéntico>/Habilidades/Gestión de Ideas.md`, y síguelos: dicen qué revisar antes de empezar y cómo actualizar las bases al terminar.

Si todo está bien, avísale al Director que, mientras trabajas, no use esta carpeta ni su servidor de desarrollo.

## 2. El plan

Si el cambio toca la interfaz, sigue primero `<Trabajo Agéntico>/Habilidades/Llenar las Plantillas.md`.

Escribe un plan corto, en un solo archivo y sin etapas: `Pasos/AAAA-MM-DD Nombre corto del cambio/Plan.md`, con la fecha de hoy. El plan dice qué hay que lograr y sus límites, no cómo escribir el código. Si es un error, dice también cómo se reproduce.

Si la parada `AprobarElPlan` está encendida, el Director lo lee y pide correcciones hasta darle su visto bueno. Si está apagada, sigues sin esperarlo, y el Director lee el plan en el resumen. El plan no pasa por el Revisor Principal.

Desde ahí, el plan no se reescribe. Lo que pase después va al final del plan, en estas tres secciones, que llenas a medida que avanzas, para que otra sesión pueda retomar si esta se suspende:

- **Avance:** Lo que falta por hacer, con una casilla por cada cosa, que marcas cuando la terminas.
- **Preguntas:** Cada pregunta al Director, con su respuesta cuando llegue.
- **Decisiones del camino:** Cada decisión que no estaba en lo aprobado, con su razón.

Si necesitas una decisión del Director, pregúntale y escribe también la pregunta en la sección «Preguntas» del plan. Si el cambio crece en el camino y ya no cabe en esta vía, detente y avísale, como en el punto 1.

## 3. La aplicación

Cuando necesites ver la aplicación, iníciala con `npm run iniciar`, que no choca con lo que tenga abierto el Director y nunca usa los datos de producción. Cuando algo falle, lee su registro, en vez de adivinar. Si el proyecto no tiene ese comando, propónle al Director crearlo, como dice `<Trabajo Agéntico>/Habilidades/Copias de Trabajo.md`, en vez de adivinar.

Cierra solo lo que iniciaste tú, por su proceso, y nunca por su nombre: porque el Director puede tener corriendo lo suyo que se llame igual.

## 4. La implementación

1. Antes de cambiar el código, corre el Verificador completo. Si ya falla, avísale al Director antes de seguir.
2. Si es un error, la primera prueba que escribes es la que lo atrapa: falla mientras el error exista y pasa cuando esté arreglado. Si el error se ve en un navegador u otro programa, la prueba usa ese programa, como en las pruebas de aceptación de un paso, y no lo imita con código propio. Comprueba que falla antes de arreglarlo.
3. Programa el cambio. Si toca la interfaz, lee antes `Diseño.md`, si las bases lo tienen, y síguelo. Si te hace falta un color o un tamaño que no está en `Diseño.md`, no lo inventes ni cambies las bases: pregúntale al Director. Mientras trabajas, corre el arreglo automático del linter, que deja casi todo el estilo como piden las reglas. El Verificador correrá el mismo linter, pero solo comprueba: nunca modifica el código. Para ir probando, corre las pruebas enfocadas de lo que tocas, como dice el `AGENTS.md`, y las de interfaz solo en Chromium: los tres navegadores quedan para el Verificador completo.
4. Si el cambio tiene interfaz, mírala y corrige lo que veas antes de pasar al Verificador completo: la web, con scripts de Playwright, y la de escritorio o la móvil, con capturas de la pantalla o del emulador. Las capturas van en `Temporal/`.
5. Cuando el cambio esté listo, corre el Verificador completo, hasta que pase. Si sigue fallando después de 10 vueltas, detente y avísale al Director. No cambies las pruebas de aceptación de los pasos anteriores ni el Verificador. Tu código tiene que cumplir el plan con cualquier dato válido, y no solo con los de las pruebas. Si una prueba no se puede pasar así, porque te parece mal hecha o porque choca con el plan, detente y avísale al Director, en vez de forzar el código para que pase.

## 5. El Revisor de Etapa

Cuando el Verificador completo pase, llama al Revisor de Etapa desde la raíz del proyecto, como dice `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. En el pedido van el plan y tus cambios, menos los de `Pasos/`: lo no preparado, sacado con `git diff`, y los archivos nuevos, que `git diff` no muestra.

Guarda cada respuesta en `Temporal/revisores/`, fuera de git, como `Revisor de Etapa 1.md`, `Revisor de Etapa 2.md` y así. Corrige lo bloqueante, vuelve a pasar el Verificador ligero y llámalo de nuevo, otra vez con todos tus cambios. Si crees que se equivoca, respóndele con argumentos en la vuelta siguiente, y él decide, salvo lo teórico en la última vuelta, que decides tú, como dice «Las respuestas» de `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. Su techo de vueltas es `RevisorEtapa`: si en la última todavía queda algo bloqueante, no te detienes: lo anotas para la sección «Hallazgos sin resolver» del resumen.

## 6. El final

Cuando el Revisor de Etapa apruebe, o al llegar al techo, sigue la habilidad `limpiar-pruebas`, en `<Trabajo Agéntico>/Habilidades/limpiar-pruebas/SKILL.md`, que termina con el Verificador completo. Si te devuelve una falla del Verificador completo que no viene de la limpieza, arréglala y vuelve a correr el completo, hasta que pase, con el mismo techo de 10 vueltas.

Después, escribe el resumen y la fila de `Pasos/Métricas.csv`, como dice `<Trabajo Agéntico>/Habilidades/Escribir el Resumen.md`.

Al terminar, cierra lo que iniciaste, como dice el punto 3, y borra `Temporal/revisores/`, con las respuestas del Revisor de Etapa. Tus cambios quedan sin preparar en la rama principal, para que el Director los revise. No repitas el resumen en el chat: dale al Director solo el enlace al resumen, y dile los datos que agregaste a `Pasos/Métricas.csv`.
