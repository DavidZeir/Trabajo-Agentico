# Diseño

> **Aviso para la IA:** Esta plantilla está sin llenar. Lo que va entre corchetes dobles se llena con el Director, como dice `<Trabajo Agéntico>/Habilidades/Llenar las Plantillas.md`. Cuando no quede ninguno, borra este aviso.

Lo que identifica al proyecto y cómo se ve en todos sus medios: su esencia, su voz, su logo, sus colores, sus letras, sus espacios y sus formas, y las reglas que siguen sus piezas. Lo aplican sus páginas y todos sus textos, como los correos y los mensajes, y cualquier cambio de diseño conserva su esencia.

La marca y el diseño van juntos en este documento. Si el proyecto los maneja con equipos distintos, uno para la marca y otro para sus productos, se puede dividir en dos.

Los valores van solo en las tablas, donde el Verificador los compara con el código. El resto del documento nombra la variable, como `color-primario` o `espacio-m`, y no repite su número, porque un número suelto se queda viejo cuando cambia el código, y nadie lo revisa.

## La esencia

[[Qué es la marca y cómo quiere que se sienta: Lo que transmite, su personalidad y lo que nunca quiere parecer. Lo decide el Director.]]

**En pocas palabras:** [[Las palabras que la describen, como confiable, cercana o sofisticada. Lo decide el Director.]]

**A la vista, se reconoce por:** [[Lo que la hace reconocible, como sus colores, su fondo o sus títulos. Lo decide el Director.]]

**El estilo:** [[Cómo se ven sus controles, como los botones y los campos. Por ejemplo: plano, con colores sólidos y sin sombras, con relieve suave, con sombras suaves, de vidrio, translúcido sobre un fondo desenfocado, neobrutalista, con bordes gruesos y sombras duras, de arcilla, con un volumen suave, como de plastilina, u otro que le sirva mejor al proyecto. Lo decide el Director: muéstrale una página con un botón y un campo hechos en cada estilo, para que los compare.]]

## Lineamientos generales

Las reglas que siguen todas las piezas del proyecto, en cualquier medio, como una página, una imagen o un video.

[[Las reglas de diseño que valen para todo el proyecto, una por renglón, cada una con su porqué. Lo decide el Director. Por ejemplo: que lo más importante de cada pieza sea lo que más se destaca, que el mismo caso se resuelva siempre igual, que los grupos se separen con espacio antes que con líneas o recuadros, o que solo vaya el texto que hace falta para entender.]]

## La voz y el tono

[[Cómo habla la marca: si trata de tú o de usted, si es seria o cercana, técnica o sencilla, con frases de ejemplo. Lo decide el Director.]]

## El logo

[[Sus versiones y dónde va cada una. Lo decide el Director.]]

## Los colores

Todos son obligatorios, con los mismos nombres del código. Cada valor va en hexadecimal de 6 caracteres, sin `#`, como 00ffff, para que el Verificador lo pueda comparar con el código, y el color de las sombras lleva además su opacidad, en porcentaje sin el signo, como 000000 14. Solo compara lo que está en estas tablas. Los nombres dicen el papel de cada color, y dónde se usa cada uno lo dice la sección de cada medio, como «La web».

| Marca | Valor |
|---|---|
| `color-primario` | [[Lo decide el Director]] |
| `color-primario-luz` | [[Lo calcula la IA]] |
| `color-primario-sombra` | [[Lo calcula la IA]] |
| `color-sobre-primario` | [[Lo calcula la IA]] |
| `color-secundario` | [[Lo decide el Director]] |
| `color-secundario-luz` | [[Lo calcula la IA]] |
| `color-secundario-sombra` | [[Lo calcula la IA]] |
| `color-sobre-secundario` | [[Lo calcula la IA]] |
| `color-terciario` | [[Lo decide el Director]] |
| `color-terciario-luz` | [[Lo calcula la IA]] |
| `color-terciario-sombra` | [[Lo calcula la IA]] |
| `color-sobre-terciario` | [[Lo calcula la IA]] |

| Neutros | Valor |
|---|---|
| `color-fondo` | [[Lo decide el Director]] |
| `color-fondo-luz` | [[Lo calcula la IA]] |
| `color-fondo-sombra` | [[Lo calcula la IA]] |
| `color-fondo-secundario` | [[Lo calcula la IA]] |
| `color-fondo-invertido` | [[Lo pone la IA. Inicia con el color-texto-fuerte.]] |
| `color-texto` | [[Lo decide el Director]] |
| `color-texto-fuerte` | [[Lo calcula la IA]] |
| `color-texto-suave` | [[Lo calcula la IA]] |
| `color-texto-invertido` | [[Lo pone la IA. Inicia con el color-fondo-sombra.]] |
| `color-borde` | [[Lo decide el Director]] |
| `color-borde-suave` | [[Lo calcula la IA]] |
| `color-borde-fuerte` | [[Lo calcula la IA]] |
| `color-seleccion` | [[Lo calcula la IA: combina uno de los colores de la marca con el color-fondo, de modo que el color-texto se lea bien encima.]] |

[[Cada estado y el color de las sombras traen dos opciones, una para el tema claro y otra para el oscuro. Lo calcula la IA: deja la del tema principal de la marca.]]

| Estados | Valor |
|---|---|
| `color-exito` | [[Claro: 2a7349. Oscuro: 6fce9a.]] |
| `color-exito-fondo` | [[Claro: e4f3ea. Oscuro: 16291f.]] |
| `color-exito-borde` | [[Claro: 87b39a. Oscuro: 437c5d.]] |
| `color-alerta` | [[Claro: bf5b00. Oscuro: f0a859.]] |
| `color-alerta-fondo` | [[Claro: fbf0d9. Oscuro: 2e2211.]] |
| `color-alerta-borde` | [[Claro: dda66d. Oscuro: 8f6535.]] |
| `color-error` | [[Claro: c0392b. Oscuro: f08b80.]] |
| `color-error-fondo` | [[Claro: fbe6e3. Oscuro: 321714.]] |
| `color-error-borde` | [[Claro: de9087. Oscuro: 91514a.]] |
| `color-informacion` | [[Claro: 2b6cb0. Oscuro: 7fb5ee.]] |
| `color-informacion-fondo` | [[Claro: e6f0fa. Oscuro: 14233a.]] |
| `color-informacion-borde` | [[Claro: 89aed5. Oscuro: 4a6c94.]] |

| Color de las sombras | Valor |
|---|---|
| `color-sombra` | [[Claro: 000000 14. Oscuro: 000000 45.]] |

### El tema de color alternativo

Opcional: Es el tema oscuro si la marca es clara, o es el tema claro si es oscura. Solo cambian los neutros, los estados y el color de las sombras, porque los colores de la marca son los mismos en los dos temas, para que se reconozca igual. Si esta tabla se llena el Verificador compara sus colores con el código. Si se deja vacía, no los compara.

[[Si hay tema de color alternativo lo decide el Director: pregúntaselo, y si no lo quiere, deja la tabla vacía. Si lo quiere, cada estado y el color de las sombras llevan la opción de este tema.]]

| Tema alternativo | Valor |
|---|---|
| `color-fondo` | [[Lo calcula la IA]] |
| `color-fondo-luz` | [[Lo calcula la IA]] |
| `color-fondo-sombra` | [[Lo calcula la IA]] |
| `color-fondo-secundario` | [[Lo calcula la IA]] |
| `color-fondo-invertido` | [[Lo pone la IA. Inicia con el color-texto-fuerte.]] |
| `color-texto` | [[Lo calcula la IA]] |
| `color-texto-fuerte` | [[Lo calcula la IA]] |
| `color-texto-suave` | [[Lo calcula la IA]] |
| `color-texto-invertido` | [[Lo pone la IA. Inicia con el color-fondo-sombra.]] |
| `color-borde` | [[Lo calcula la IA]] |
| `color-borde-suave` | [[Lo calcula la IA]] |
| `color-borde-fuerte` | [[Lo calcula la IA]] |
| `color-seleccion` | [[Lo calcula la IA: combina uno de los colores de la marca con el color-fondo, de modo que el color-texto se lea bien encima.]] |
| `color-exito` | [[Claro: 2a7349. Oscuro: 6fce9a.]] |
| `color-exito-fondo` | [[Claro: e4f3ea. Oscuro: 16291f.]] |
| `color-exito-borde` | [[Claro: 87b39a. Oscuro: 437c5d.]] |
| `color-alerta` | [[Claro: bf5b00. Oscuro: f0a859.]] |
| `color-alerta-fondo` | [[Claro: fbf0d9. Oscuro: 2e2211.]] |
| `color-alerta-borde` | [[Claro: dda66d. Oscuro: 8f6535.]] |
| `color-error` | [[Claro: c0392b. Oscuro: f08b80.]] |
| `color-error-fondo` | [[Claro: fbe6e3. Oscuro: 321714.]] |
| `color-error-borde` | [[Claro: de9087. Oscuro: 91514a.]] |
| `color-informacion` | [[Claro: 2b6cb0. Oscuro: 7fb5ee.]] |
| `color-informacion-fondo` | [[Claro: e6f0fa. Oscuro: 14233a.]] |
| `color-informacion-borde` | [[Claro: 89aed5. Oscuro: 4a6c94.]] |
| `color-sombra` | [[Claro: 000000 14. Oscuro: 000000 45.]] |

## Las letras

Sus tres fuentes, sus pesos, su interlineado y su escala de tamaños. Las fuentes van con su nombre, como Georgia, y los pesos, el interlineado y los tamaños, en números sin unidad, como los de un programa de diseño, para que el Verificador los pueda comparar con el código de cualquier tecnología.

| Letras | Valor |
|---|---|
| `fuente-destacada` | [[Lo decide el Director]] |
| `fuente-normal` | [[Lo decide el Director]] |
| `fuente-monoespaciada` | ui-monospace |
| `peso-normal` | 400 |
| `peso-seminegrita` | 600 |
| `peso-negrita` | 700 |
| `interlineado-s` | 1.2 |
| `interlineado-m` | 1.5 |
| `interlineado-l` | 1.7 |

| Tamaños | Normal |
|---|---|
| `texto-3xl` | 48 |
| `texto-2xl` | 32 |
| `texto-xl` | 24 |
| `texto-l` | 20 |
| `texto-m` | 16 |
| `texto-s` | 14 |
| `texto-xs` | 12 |

Si un medio necesita otra escala, más apretada, la tabla de los tamaños lleva otra columna, como `| Tamaños | Normal | Compacto |`. La regla de diseño de cada medio compara la columna que tenga configurada, y si no se configura ninguna, compara la Normal.

### Los estilos de texto

Qué lleva cada nivel de texto, con los nombres de las tablas de este documento. Cada proyecto agrega o quita los niveles que quiera.

| Estilo | Fuente | Peso | Tamaño | Interlineado | Color |
|---|---|---|---|---|---|
| Título principal | `fuente-destacada` | `peso-negrita` | `texto-2xl` | `interlineado-s` | `color-texto-fuerte` |
| Título secundario | `fuente-destacada` | `peso-negrita` | `texto-xl` | `interlineado-s` | `color-texto-fuerte` |
| Subtítulo | `fuente-destacada` | `peso-negrita` | `texto-l` | `interlineado-s` | `color-texto-fuerte` |
| Texto normal | `fuente-normal` | `peso-normal` | `texto-m` | `interlineado-m` | `color-texto` |
| Código | `fuente-monoespaciada` | `peso-normal` | `texto-m` | `interlineado-m` | `color-texto` |

## Los espacios

La escala de los espacios, que dice qué tan aireada o compacta es la marca. Van en números sin unidad, para que el Verificador los pueda comparar con el código.

[[Los espacios escritos son el medio. Lo decide el Director: menciónale que también pueden ser más compactos, con 2, 4, 6, 8, 12, 16, 20, 24 y 32, o más aireados, con 6, 8, 12, 16, 20, 24, 32, 48 y 64.]]

| Espacios | Valor |
|---|---|
| `espacio-3xs` | 4 |
| `espacio-2xs` | 6 |
| `espacio-xs` | 8 |
| `espacio-s` | 12 |
| `espacio-m` | 16 |
| `espacio-l` | 20 |
| `espacio-xl` | 24 |
| `espacio-2xl` | 32 |
| `espacio-3xl` | 48 |

Si una medida cae entre dos escalones y con ninguno de los dos se ve bien, se crea un escalón intermedio, que suma un escalón y otro más pequeño y lo dice en su nombre, como `espacio-xl-mas-3xs`, que es `espacio-xl` más `espacio-3xs`. Va en esta tabla, entre sus dos vecinos. Para menos que el primer escalón, basta un ajuste fino con `calc`.

Qué escalón va en cada caso, con el nombre del código, como `espacio-m`, para que el mismo caso lleve siempre el mismo espacio. Cada proyecto agrega o quita los casos que quiera.

| Caso | Espacio |
|---|---|
| Entre secciones | `espacio-2xl` en el teléfono y `espacio-3xl` en el escritorio |
| Entre un título y su texto | `espacio-s` |
| Entre párrafos | `espacio-m` |
| Dentro de un botón | `espacio-xs` arriba y abajo, y `espacio-l` a los lados |
| Entre un ícono y su texto | `espacio-xs` |

## Las formas y los íconos

Los redondeados, los bordes y las sombras van en números sin unidad, para que el Verificador los pueda comparar con el código. Cada sombra lleva su desplazamiento horizontal, su desplazamiento vertical y su desenfoque.

[[Cómo son los bordes, las sombras y el estilo de los íconos. Lo decide el Director.]]

[[Los redondeados escritos son el medio. Lo decide el Director: menciónale que también pueden ser rectos, con 0, 0 y 0, o muy redondeados, con 8, 16 y 24.]]

| Redondeados | Valor |
|---|---|
| `radio-s` | 4 |
| `radio-m` | 8 |
| `radio-l` | 12 |

| Bordes | Valor |
|---|---|
| `borde-s` | 1 |
| `borde-m` | 2 |
| `borde-l` | 4 |

[[Las sombras escritas son el medio. Lo decide el Director: menciónale que también pueden ser sin sombras, con 0 0 0, o duras, sin desenfoque, como 2 2 0, 4 4 0 y 8 8 0.]]

| Sombras | Valor |
|---|---|
| `sombra-s` | 0 1 2 |
| `sombra-m` | 0 4 12 |
| `sombra-l` | 0 12 32 |

Los números son el desplazamiento horizontal, el vertical y el desenfoque.

## La interfaz

Lo que comparten todos los medios del proyecto, como la web o una aplicación. Lo propio de cada uno, como sus medidas, está en su sección.

### Lineamientos

- **Las explicaciones de apoyo, en un ícono (i):** Donde haga falta explicar algo, va un ícono (i), y no un párrafo en la pantalla. Lo que el usuario necesita para no equivocarse, como el formato de un campo, queda a la vista.
- **El texto seleccionado:** Va sobre `color-seleccion`, con la letra en `color-texto`, igual en todos los medios, y no en el color del navegador o del sistema. La letra va fija porque, con solo el fondo, los textos más suaves quedarían con poco contraste.

### Los controles

Los controles básicos son el botón, el campo y el enlace, con sus estados, como el foco y el desactivado, y siguen «El estilo» de «La esencia». Cada control nuevo sale de ellos, con los mismos bordes, redondeados, sombras y rellenos, para que todo se vea de la misma familia, y solo se crea cuando un paso lo necesita. Esta lista dice en pocas palabras cómo se ve cada uno, con los nombres de las variables y sin repetir sus números, como `color-primario` o `radio-s`, y cada control nuevo se agrega a ella.

- **Botón:** [[En pocas palabras, su fondo, su texto, su borde, su redondeado y su sombra, y cómo cambia al pasar el puntero, al presionarlo, con el foco y desactivado. Lo calcula la IA en el primer paso que toque la interfaz: hace los controles en «El estilo» de «La esencia», o rehace los que ya traiga el proyecto, y se los muestra al Director.]]
- **Campo:** [[Lo mismo que el botón, para un campo de texto, también cuando tiene un error. Lo calcula la IA, junto con el botón.]]
- **Enlace:** [[Su color y su subrayado, y cómo cambia al pasar el puntero y con el foco. Lo calcula la IA, junto con el botón.]]

Todos los controles desactivados se destiñen con la misma opacidad, en porcentaje sin el signo, para que el Verificador la pueda comparar con el código.

| Controles | Valor |
|---|---|
| `opacidad-desactivado` | 50 |

## La web

Lo propio de las páginas del proyecto. Lo que comparten con los demás medios está en «La interfaz». Si el proyecto tiene otros medios, como una aplicación, piezas gráficas o videos, cada uno lleva su propia sección, con la misma forma.

### Lineamientos

- **Las explicaciones de apoyo:** La explicación se abre al tocar el ícono (i) o al hacerle clic, también con el teclado, y no solo al pasar el puntero, que en un teléfono no existe.

### El ancho del contenido

El ancho máximo del contenido de las páginas, en números sin unidad, para que el Verificador lo pueda comparar con el código.

| La web | Valor |
|---|---|
| `ancho-contenido` | 1120 |

### Dirección visual

[[Cómo se aplica la marca a las páginas: la composición, la jerarquía de los títulos y los componentes. Se llena con `/explorar-diseno-web` o con el Director.]]
