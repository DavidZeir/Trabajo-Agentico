---
name: limpiar-pruebas
description: Limpia las pruebas con dos listas, las que nunca se borran y las que siempre se borran, decide las demás, marca las de errores ya arreglados y ordena las que quedan por clase y por tema. El Director la invoca sobre todo el proyecto, el Líder la sigue al final de un paso y la sesión, al final de un cambio.
disable-model-invocation: true
---

# Limpiar las pruebas

Si te invocó el Director, recorres todas las pruebas del proyecto. Si la sigues desde `/implementar-paso` o desde `/implementar-cambio`, recorres todas las pruebas que agregó o cambió el paso o el cambio: en un paso, según `git diff` contra la rama principal, y en un cambio, las que no están preparadas y las nuevas. En ambos casos, se revisan todos los tipos de pruebas: las de aceptación, las hechas por los Implementadores, etc.

## 1. Antes de empezar

Si te invocó el Director, revisa que la carpeta esté en la rama principal y que no tenga cambios sin confirmar, porque al final tus cambios tienen que quedar solos. Si no, detente y avísale. Si todo está bien, avísale que, mientras trabajas, no use esta carpeta.

## 2. La limpieza

Cada prueba se decide con estas dos listas. Si está en las dos, se queda.

- **Nunca se borran:**
  - Una por cada criterio de aceptación, para que ninguno quede sin prueba.
  - Una por cada regla de negocio.
  - Todas las de seguridad, que son las que revisan que nadie entre sin ser quien dice, vea o cambie lo que no es suyo, falsifique un dato, se salte un límite o saque lo que debe quedar oculto.
  - Una de punta a punta de la ruta feliz de cada funcionalidad.
- **Siempre se borran:**
  - **Las redundantes:** Las que revisan lo mismo que otra que se queda.
  - **Las que dependen de cómo está hecho el código internamente:** Las que revisan cómo lo hace, como qué funciones internas se llamaron, y no lo que hace, porque se rompen con cambios que no cambian el resultado.
  - **Las que ya no prueban nada:** Las de algo que ya no existe en el código.

**La zona gris:** Las que no están en ninguna de las dos listas las decides tú, y se quedan las que cuidan más de lo que cuestan. Una prueba cuida más mientras más probable y más grave sea el error que solo ella atrapa, y cuesta más mientras más tarde su ejecución y más se rompa con cambios que no cambian el resultado.

**Las de errores ya arreglados:** Las que solo atrapan un error que ya se arregló no se borran: se quedan en la carpeta y en el archivo de su tema, y su nombre empieza con «Error arreglado:», para que el Verificador ligero las salte y el completo las corra. El código de cada arreglo lleva un comentario que describe el arreglo y el error que evita, y nombra la prueba que lo cuida, como alerta para quien lo cambie en el futuro. Si no lo tiene, agrégaselo.

Se borran también los archivos y las funciones de apoyo que queden sin uso.

Después, se ordenan las que quedan:

- **Por clase:** Cada prueba va en la carpeta de su clase: `interfaz/` si abre un navegador o una aplicación, `pesadas/` si, con la preparación que necesita, como una base de datos simulada, tarda consistentemente más de 1 segundo en algún computador de desarrollo, y `ligeras/` el resto. Las de aceptación van en la carpeta `aceptacion/` de su clase.
- **Por tema:** Dentro de su clase, cada prueba va en el archivo de su tema. Un tema puede tener un archivo en `ligeras/` y otro en `pesadas/`.

Solo borras y mueves pruebas, y les pones la marca de error arreglado: no escribas pruebas nuevas ni reescribas las que quedan. Al mover una prueba, se van con ella su preparación y sus importaciones, sin cambiar lo que revisa. No subas los tiempos límite ni toques el Verificador. Del código del proyecto, solo tocas los comentarios de alerta de los errores arreglados.

## 3. Al terminar

Corre el Verificador completo. Si falla por la limpieza, como una importación rota o una preparación que no se fue con su prueba, arregla eso o deshaz el cambio que lo causó, y vuelve a correrlo. Si falla por otra cosa, no la arregles, porque esa falla no es de la limpieza: si te invocó el Director, avísale, y si vienes de un paso o de un cambio, vuelve a esa habilidad, que la arregla como cualquier falla del Verificador.

Después, escribe el informe:

- Cuántas pruebas borraste por cada motivo de «Siempre se borran».
- Cuántas pruebas marcaste como errores ya arreglados.
- Las que borraste de la zona gris, cada una con su razón en una línea.
- Los comentarios de alerta que agregaste, y dónde.
- Cuántas pruebas cambiaron de clase.
- Las líneas de código de pruebas que había antes y las que quedan.

Si te invocó el Director, muéstrale el informe, guárdalo como `Pasos/AAAA-MM-DD Limpiar pruebas/Resumen.md`, con la fecha de hoy, y deja tus cambios sin preparar, para que el Director los revise. Nunca los confirmes. Si vienes de un paso o de un cambio, el informe va en su resumen, y lo demás sigue como dice esa habilidad.
