---
name: explorar-marca
description: Explora la marca de un proyecto que todavía no la tiene, o que la quiere cambiar. En rondas, varios agentes proponen cada uno una marca distinta, con su paleta, sus letras, su voz y su tono, sus formas y una muestra aplicada, a partir de referencias de galerías de diseño escogidas según el público, hasta que el Director escoge una. La elegida entra a las bases con incorporar-idea. No hace el logo. Solo la invoca el Director.
argument-hint: "[lo que se busca en la marca, opcional]"
disable-model-invocation: true
---

# Explorar la marca

Pedido: $ARGUMENTS

Exploras la marca de un proyecto: cómo se ve y cómo habla. Partes solo de lo que el proyecto va a hacer, sin un diseño previo. Si el proyecto ya tiene marca y lo que se busca es aplicarla a su web, la habilidad es `explorar-diseno-web`.

## 1. Antes de empezar

1. Comprueba las preferencias del Director como dice `<Trabajo Agéntico>/Habilidades/Comprobar Preferencias.md`. Aquí cuentan el modelo y el razonamiento del Líder, que son los de tu sesión, y los del Implementador, que usan los agentes de las opciones.
2. Si `SugerirMcpDiseño` está encendida en las preferencias y tu sesión no tiene los MCP gratis de las fuentes de diseño, sugiérele al Director conectarlos, como dice «Los MCP gratis» en `<Trabajo Agéntico>/Habilidades/Rondas de Diseño.md`. Va aquí, al empezar, porque un MCP nuevo solo aparece en una sesión nueva.
3. Lee en las bases para qué existe el proyecto, para quién es y con qué carácter. Si no lo dicen, pregúntaselo al Director antes de seguir, porque sin el público no hay cómo escoger las referencias.
4. Escribe el encargo en cinco a diez líneas: qué tiene que transmitir la marca, a quién y qué debe evitar. Muéstraselo al Director y espera su visto bueno.

## 2. Las rondas

Sigue `<Trabajo Agéntico>/Habilidades/Rondas de Diseño.md`. Escoge las referencias según el público y el carácter del proyecto, que dicen sus bases, y no según lo que se ve bien en general: un proyecto para desarrolladores, uno de ferretería y uno político polémico hablan lenguajes visuales distintos. Cada opción es una marca, en una sola página, con:

- **El nombre:** Escrito con las letras de la marca, sin un logo dibujado, que es trabajo de `crear-logo`.
- **Los colores:** Cada color con su nombre y su uso, como el fondo, el texto, el acento o los avisos.
- **Las letras:** Sus tres fuentes, la destacada, la normal y la monoespaciada, con su interlineado y su escala de tamaños.
- **La voz y el tono:** Cómo habla la marca: si trata de tú o de usted, si es seria o cercana, técnica o sencilla, con frases de ejemplo para un título, un botón, un mensaje de error y un correo corto.
- **Las formas y los íconos:** Las esquinas, los bordes, las sombras y el estilo de los íconos.
- **El estilo:** El que mejor le sirva al proyecto, según las referencias que encuentres para su público y su carácter. Los de `Diseño.md` son solo ejemplos, y puede ser otro. Con un botón, un campo y un enlace hechos en ese estilo, también con el foco y desactivados.
- **Una muestra aplicada:** Un encabezado, un botón y una tarjeta, con contenido real del proyecto.

## 3. El final

1. Con la opción elegida, propón su entrada en `Diseño.md` de las bases con `incorporar-idea`: la esencia, los colores, también los de la interfaz, las letras, los espacios, las formas y los íconos, y la voz y el tono.
2. Guarda la opción elegida y archiva las demás, como dice «Al terminar» de `<Trabajo Agéntico>/Habilidades/Rondas de Diseño.md`.
3. Dile al Director que el logo va aparte, con `crear-logo`, y que para aplicar la marca a la web está `explorar-diseno-web`.
