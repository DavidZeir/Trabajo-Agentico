---
name: revisar-y-corregir
description: Revisa código con el Revisor Principal y corrige lo que encuentre, vuelta tras vuelta, hasta que no encuentre nada bloqueante o hasta el techo de vueltas. El alcance puede ser lo preparado, un archivo o una carpeta, o un tema, y no puede haber nada sin preparar, para que las correcciones queden aparte. No prepara ni confirma nada. Úsala para el código que se hizo fuera de un paso o de un cambio. Solo la invoca el Director.
argument-hint: "[alcance: preparados, una ruta o un tema] [tope N, opcional]"
disable-model-invocation: true
---

# Revisar y corregir

Alcance: $ARGUMENTS

Revisas código con el Revisor Principal y corriges lo que encuentre, vuelta tras vuelta, hasta que no encuentre nada bloqueante o hasta el techo de vueltas. Sirve para el código que se hizo fuera de un paso o de un cambio, que no pasó por su propia revisión. Por ahora es solo para código: las bases se revisan con `revisar-bases`.

Nunca prepares ni confirmes nada, y no toques lo que el Director ya preparó. Tus correcciones quedan sin preparar, solas, para que él vea cuánto cambiaste sin que se mezcle con lo suyo.

## 1. Antes de empezar

1. Comprueba las preferencias del Director como dice `<Trabajo Agéntico>/Habilidades/Comprobar Preferencias.md`. Aquí cuentan tres: el modelo y el razonamiento del Líder, que son los de tu sesión, los del Revisor Principal y el techo de vueltas `RevisarYCorregir`. Si el alcance trae un tope, como «tope 3», ese vale solo para esta vez.
2. Comprueba con `git status` que no haya nada sin preparar, ni cambios ni archivos nuevos fuera de git. Si hay algo, detente y pídele al Director que lo prepare. Así, al final, lo no preparado son solo tus correcciones.
3. Saca lo que vas a revisar, según el alcance. Si no viene ninguno, es lo preparado:
   - **Lo preparado:** Con `git diff --cached`, que también muestra los archivos nuevos.
   - **Un archivo o una carpeta:** Su texto completo.
   - **Un tema, dicho en palabras:** Escoge los archivos que lo tratan, completos, y dile al Director cuáles son antes de llamar al revisor.

   Si lo que sale no tiene código, como unos documentos, detente y díselo al Director.
4. Escribe, en dos a cinco líneas, lo que se quiso lograr con ese código, sacado de la conversación o del mismo código. Es lo que el revisor recibe en vez de un plan. Si no lo tienes claro, pregúntaselo al Director.
5. Si el proyecto tiene Verificador, corre el ligero. Si ya falla, avísale al Director antes de seguir, porque esa falla no viene de lo que vas a corregir.

## 2. Las vueltas

1. Llama al Revisor Principal, con el papel de Revisor Puntual, desde la raíz del proyecto, como dice `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. En el pedido van lo que se quiso lograr y lo que vas a revisar.
2. Guarda cada respuesta en `Temporal/revisar-y-corregir/`, fuera de git, como `Revisor Puntual 1.md`, `Revisor Puntual 2.md` y así.
3. Corrige lo bloqueante. Si crees que el revisor se equivoca, respóndele con argumentos en la vuelta siguiente, como dice «Las respuestas» de `<Trabajo Agéntico>/Habilidades/Llamar a Revisores.md`. Las sugerencias no las corrijas: van al resumen, para que el Director decida.
4. Si el proyecto tiene Verificador, corre el ligero después de corregir, hasta que pase. Si sigue fallando después de 10 vueltas, detente y avísale al Director. Tu código tiene que funcionar con cualquier dato válido, y no solo con los de las pruebas. Si una prueba no se puede pasar así, porque te parece mal hecha o porque choca con lo que se quiso lograr, detente y avísale al Director, en vez de forzar el código para que pase.
5. Vuelve a llamarlo. En el pedido van lo mismo de la primera vuelta, tus respuestas y, aparte, tus correcciones: `git diff`, que solo muestra lo que no está preparado, más el texto completo de los archivos nuevos que hayas creado.
6. Termina cuando el revisor no encuentre nada bloqueante o al llegar al techo. Si en la última vuelta todavía queda algo bloqueante, no lo sigas corrigiendo: va al resumen, como sin resolver.

## 3. El final

1. Si corregiste algo y el proyecto tiene Verificador, corre el completo, hasta que pase, con el mismo techo de 10 vueltas. Si para que pase tienes que corregir algo más y todavía te quedan vueltas, vuelve a las vueltas con esas correcciones, para que el revisor también las vea. Si ya no te quedan, van al resumen como corregidas sin revisar.
2. Borra `Temporal/revisar-y-corregir/`.
3. Dale al Director un resumen corto en el chat:
   - **Las vueltas:** Cuántas dio el revisor y qué corregiste en cada una, una línea por corrección.
   - **Lo que quedó sin resolver:** Lo bloqueante que seguía al llegar al techo, con por qué es bloqueante.
   - **Las sugerencias:** Numeradas, para que el Director decida cuáles lleva a `realizar-cambio`.
   - **El Verificador:** Si pasó el completo, y lo que corregiste para que pasara que quedó sin revisar. O si el proyecto no tiene Verificador.
