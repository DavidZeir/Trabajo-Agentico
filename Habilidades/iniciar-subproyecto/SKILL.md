---
name: iniciar-subproyecto
description: Le arma a una parte del proyecto su propia carpeta dentro de las bases, con su índice, su justificación y sus decisiones, y si hace falta, su carpeta en la raíz para su trabajo. Úsala cuando el Director quiera darle su propia carpeta a un tema o a una línea de trabajo que se mezcla con el resto del proyecto.
argument-hint: "[el subproyecto y su ruta, opcional]"
disable-model-invocation: true
---

# Iniciar un subproyecto

Subproyecto: $ARGUMENTS

Si no viene nada, pregunta qué parte del proyecto va en su propia carpeta.

Un subproyecto es una parte del proyecto con sus propios documentos, como una línea de productos en un negocio o la aplicación de escritorio en un software. Tiene su propia carpeta dentro de `Bases`, y si hace falta, otra en la raíz del proyecto para su trabajo.

## 1. Lo que vale en cada carpeta

Los documentos de una carpeta de las bases valen para ella y para las que tiene adentro. Una carpeta de adentro puede tener sus propios documentos, aunque se llamen igual, pero solo para agregar lo suyo, como sus decisiones o el diseño de un producto: nunca contradicen lo de arriba. Si algo choca, es una inconsistencia de las bases, y se resuelve con el Director. Lo que no está en una carpeta se busca en las de arriba. Puede haber tantos niveles como el Director quiera, y los intermedios no tienen reglas propias: cada carpeta tiene los documentos que necesite.

Cada subproyecto tiene una letra, en el orden en que se crean: A para el primero, B para el segundo, y después de Z siguen AA, AB y así. Sus decisiones se numeran con D y su letra, como DA-01, para no confundirse con las del proyecto, que van como D-01, y sus pasos, si los tiene, con su letra, como A1, para no chocar con los pasos del proyecto ni con los de otro subproyecto.

## 2. Antes de crear

1. Lee el `Leeme.md` de las bases y busca en todos sus documentos lo que ya hay del tema, para saber qué se va a ordenar en su carpeta. Busca también las letras que ya tienen los subproyectos, en sus `Leeme.md`, para darle la que sigue.
2. Pregúntale al Director lo que no haya dicho, una cosa a la vez:
   - **La ruta:** Dentro de `Bases`, como `Marca/Producto`. Si el subproyecto ya tiene una subcarpeta, la ruta es la suya.
   - **La justificación:** Las partes de su `Justificación.md`, en el punto 3.
   - **Una carpeta en la raíz:** Si el subproyecto la necesita para su trabajo, como unos diseños en HTML o su código. Si no es de código, no se anota en la sección «Subproyectos» del `AGENTS.md` del proyecto, que es solo para los de código, ni mueve nada de ella. Si es de código, su `AGENTS.md` y su Verificador se hacen como en un proyecto nuevo: el `AGENTS.md`, como dice esa misma sección, y el Verificador, en su primer paso con código, como dice `<Trabajo Agéntico>/Habilidades/Verificador.md`.

## 3. Crear la carpeta

En `Bases/[ruta]/` crea siempre tres documentos:

- **`Leeme.md`:** Su índice. Dice qué es el subproyecto y cuál es su letra, con la que se numeran sus decisiones y sus pasos, enlaza el Glosario y tiene su tabla «Por tema», como la del `Leeme.md` del proyecto.
- **`Justificación.md`:** Con estas secciones:
  - **«El propósito»:** Por qué se inicia el subproyecto.
  - **«Por qué tiene su carpeta»:** Qué hace que sus documentos vayan en su propia carpeta, y no mezclados con los del resto del proyecto.
  - **«Cómo se conecta»:** Qué toma del resto del proyecto y qué le aporta.
  - **«El alcance»:** Qué incluye y qué deja por fuera.
  - **«Los involucrados»:** Quiénes participan y quién es su responsable.
  - **«Cuándo termina»:** Si tiene un final, como la renovación de una bodega, qué tiene que pasar para darlo por terminado. Si sigue mientras exista el proyecto, como una línea de productos, se omite.
- **`Decisiones.md`:** Dice que sus decisiones se numeran con D y su letra.

Los demás documentos, como `Tareas Pendientes.md`, las listas de ideas o `Pasos Pendientes.md` con `Pasos Terminados.md`, se crean en la carpeta del subproyecto la primera vez que hacen falta, desde las plantillas de `<Trabajo Agéntico>/Plantillas/Bases/`. `Diseño.md` y el Glosario casi nunca hacen falta, porque lo común es que todo el proyecto comparta su marca y sus definiciones.

Cada documento de la carpeta que se llame igual que uno de arriba, como `Leeme.md`, `Decisiones.md` o `Tareas Pendientes.md`, empieza, justo después de su título, con este aviso, que enlaza al de su mismo nombre más cercano hacia arriba. Así, una sesión que abre solo el de la carpeta sabe que le falta leer el otro:

```
> **Se lee junto con** [el documento de arriba](ruta al de arriba) de las bases del proyecto: aquí solo va lo propio de [el subproyecto].
```

Esto vale también para los que se crean después, la primera vez que hacen falta.

Si el Director quiere una carpeta en la raíz, créala con la misma ruta de su carpeta en las bases, como `Marca/Producto/`.

## 4. Ordenar lo que ya había

Si las bases ya tenían cosas del subproyecto, sueltas en otros documentos o en una subcarpeta que no tiene la forma de un subproyecto, repártelas en los documentos de su carpeta sin perder nada, y quítalas de donde estaban. Si el subproyecto empieza desde cero, sáltate este punto.

- **Lo que hoy vale:** A un documento dueño del subproyecto, escrito en presente.
- **Las decisiones:** Las que ya tienen número en unas `Decisiones.md` se quedan ahí, con su número, porque son historia y otros documentos las pueden citar. Solo se actualiza a dónde apuntan, si su documento dueño pasa a la carpeta del subproyecto. Si arriba hay otro documento con el mismo nombre, como `Justificación.md`, la flecha lleva un enlace relativo con la sección, como `→ [Justificación](Marca/Producto/Justificaci%C3%B3n.md#el-propósito)`, porque el nombre solo llevaría al de arriba. Las que estaban sueltas en otros documentos, sin número, pasan a sus `Decisiones.md`, con los números de su letra, cada una apuntando a la sección de su documento dueño.
- **Las opciones abiertas:** A sus `Ideas por Decidir.md`.
- **Los pendientes:** A sus `Tareas Pendientes.md`.

## 5. Conectar con las bases de arriba

- **El índice:** El `Leeme.md` más cercano hacia arriba apunta al `Leeme.md` del subproyecto, en su tabla «Por tema». Si es la primera carpeta de un subproyecto en las bases, agrégale al `Leeme.md` de las bases un párrafo que explique lo que vale en cada carpeta y la numeración por letras, como en el punto 1.
- **La decisión:** Las `Decisiones.md` de arriba registran que se creó el subproyecto, con su ruta y su letra.

## 6. Cerrar

1. Comprueba las citas de las bases, como dice `<Trabajo Agéntico>/Habilidades/Comprobar Bases.md`.
2. Resume en pocas líneas qué se creó, qué se ordenó y en qué archivos.
