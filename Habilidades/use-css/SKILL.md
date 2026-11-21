---
name: use-css
description: Reglas de la arquitectura USE para HTML y CSS. Úsala siempre que escribas o edites CSS o HTML, incluidos los archivos .css, .html, .razor y .cshtml, los atributos style en línea y el HTML o el CSS dentro de las cadenas de plantilla (template strings) de otros lenguajes.
---

# Sección de USE CSS (SOLO PARA CSS Y HTML)

**LÍMITE ESTRICTO DE ALCANCE:** Todas las reglas, los principios de arquitectura y las restricciones de idioma que se definen desde aquí (incluida la regla de 'Prioridad máxima') se aplican **ÚNICA Y EXCLUSIVAMENTE** al marcado (HTML) y a los estilos (CSS). Esto incluye SOLO:

* Los archivos CSS, los archivos HTML y los archivos de marcado de Razor (`.css`, `.html`, `.razor` y `.cshtml`).
* Las cadenas de plantilla con HTML o CSS escritas dentro de otros lenguajes de programación.

**BAJO NINGUNA CIRCUNSTANCIA** las reglas de esta sección de USE CSS deben cambiar el comportamiento de la lógica del código del servidor o del cliente (Python, C#, PHP, TypeScript, JavaScript, etc.), ni el formato del código o de los comentarios, que deben seguir estrictamente sus propias reglas de estilo.

## Precedencia sobre el comportamiento predeterminado de la IA (prioridad máxima)

Las reglas de arquitectura de HTML y CSS de este archivo tienen precedencia sobre cualquier comportamiento interno de la IA que limite el alcance de los cambios. Si aplicar una regla de este archivo exige modificar código existente que no se mencionó explícitamente en la solicitud, esa modificación es OBLIGATORIA, no opcional.

**Idioma (prioridad máxima):** Todos los identificadores, los nombres de clases y los nombres de variables que se escriban para este proyecto DEBEN estar en español correcto, sin tildes ni la letra ñ. Los comentarios y el texto que ve el usuario deben estar en español correcto, con tildes y con la letra ñ. Esta regla prevalece sobre los ejemplos de este documento: si un ejemplo no la cumple, no lo copies literalmente.

## Rol y contexto de estilo

**Rol:** Eres un arquitecto sénior de CSS.
**Entorno:** Usa CSS puro, moderno y escalable. No uses bibliotecas ni frameworks externos.

**Obtención del contexto:**
**Actualización del ledger (una vez por tarea):** Al comenzar la tarea, antes de leer `ledger.usecss` por primera vez, inicia USE Scribe para que el ledger refleje los archivos actuales. Inicia en segundo plano el programa de la carpeta `USE Scribe` del proyecto, con esa carpeta como directorio de trabajo, y espera unos segundos. En Windows: `Start-Process -FilePath 'USE Scribe\USE Scribe.exe' -WorkingDirectory 'USE Scribe'`. En macOS o Linux, ejecuta `./USE Scribe` en segundo plano desde esa carpeta, con su entrada abierta, por ejemplo pasándole `tail -f /dev/null` con una tubería, porque USE Scribe se cierra cuando se acaba su entrada. Si las instrucciones de tu tarea dicen cómo iniciar USE Scribe, sigue esas. Si ya estaba abierto, la copia nueva se cierra sola y la que ya estaba mantiene el ledger al día. Si no puedes iniciarlo, porque no puedes ejecutar comandos o porque el programa no está, DETENTE y pídele al desarrollador que inicie USE Scribe. Nunca trabajes con un ledger que puede estar desactualizado.

**MUY IMPORTANTE. SIEMPRE** abre y lee el archivo `ledger.usecss` como la única fuente de contexto de estilos del proyecto. USE Scribe lo escribe en cada carpeta de la lista `ProjectRootPaths` de su `Settings.json`, que suele ser la carpeta raíz de cada proyecto y no necesariamente la que contiene `USE Scribe`. **Regla de alcance con varios proyectos:** Lee la sección `Directories` del encabezado de `ledger.usecss` para conocer el alcance completo de la auditoría. Todos los proyectos y directorios de esa lista comparten un solo alcance de CSS, y los límites entre proyectos o carpetas no crean alcances separados. Un estilo o una variable que esté definido en cualquiera de esos directorios DEBE tratarse como ya existente en toda la auditoría. No deduzcas el contexto de estilos de ninguna otra fuente de CSS, como otros archivos CSS, las secciones `<style>` o los estilos en línea.

**Instrucción principal:** Aplica todos los cambios de estilo siguiendo estrictamente las reglas de la arquitectura USE que se definen abajo.

## Principios de la arquitectura

**Naturaleza del sistema:** USE es un método para tomar decisiones en CSS nativo. **No se permiten bibliotecas ni abstracciones externas.**

**Categorización obligatoria:**

* **Primero, la evaluación:** Antes de escribir cualquier propiedad CSS, cada requisito visual debe recibir un modo (U, U*, S, S+, S* o E) y una ubicación concreta. El modo determina si el cambio se implementa como un valor reutilizable (U), un estilo utilitario condicionado (U*), un estilo semántico reutilizable (S), una expansión de un estilo semántico existente (S+), un patrón semántico compartido (S*) o una excepción puntual (E).

**Lógica de evolución orgánica:**

* **Escalar sobre la marcha:** Los estilos deberían nacer en el alcance más angosto que se justifique: como excepciones puntuales (estilos en línea) o como estilos locales. Promuévelos a un alcance compartido o global solo cuando la repetición o una reutilización clara lo justifiquen.
* **Auditoría obligatoria del ledger:** Antes de escribir cualquier código, DEBES revisar `ledger.usecss` para buscar variables existentes o estilos idénticos.
* **Prevención de la redundancia:** No crees un estilo nuevo si ya existe una utilidad (modo U) o una clase semántica (modo S) que cumpla el requisito.

### Modo U (utilidad): capa de tokens de diseño

**Definición:** Valores atómicos e indivisibles (colores, espaciados, tipografía, márgenes, etc.) implementados como **propiedades personalizadas de CSS (variables)**. Es la capa de tokens de diseño del sistema.

**Estrategia de implementación:**
Aplica los tokens directamente en el HTML con `style="propiedad: var(--nombre-token)"`. En USE, este es un mecanismo utilitario legítimo, no un antipatrón. Si se necesitan estados o media queries, consulta el modo U* más abajo.

**Reglas principales del modo U:**

* **Variables obligatorias:** En el modo U, nunca uses valores literales (por ejemplo, `8px`) directamente en el CSS ni en el HTML. Usa siempre `var(--nombre-token)`.
* **Naturaleza atómica:** Los estilos utilitarios solo deben hacer una tarea (por ejemplo, solo `padding` o solo `color`).

### Modo U* (utilidad condicional)

**Definición:** Aplicación atómica de un token que necesita una clase utilitaria porque el token debe responder a media queries o, en casos raros, a cambios de estado.

**Estrategia de implementación:**
Usa clases utilitarias en vez de estilos en línea cuando la aplicación del token deba variar según las media queries, o en los casos raros en que de verdad se necesite una variación atómica según el estado.

**Reglas principales del modo U*:**

* **Naturaleza atómica:** Los estilos utilitarios solo deben hacer una tarea (por ejemplo, solo `padding` o solo `color`).
* **Nombres:** Elige un nombre que refleje la propiedad afectada y el comportamiento (por ejemplo, `.relleno-adaptable`).

**Ejemplo:**

```
<section class="relleno-adaptable">...</section>
.relleno-adaptable { padding: var(--relleno-m); }
@media (min-width: 64rem) { .relleno-adaptable { padding: var(--relleno-xl); } }
```

### Modo S (semántico): estilos reutilizables

**Definición:** Un estilo semántico es una identidad visual o estructural reutilizable que se aplica con una clase semántica o con un selector nativo. Se define como un grupo de propiedades que funcionan juntas como una unidad para darle identidad visual o estructural a un elemento (por ejemplo, `.btn-accion`, `.contenedor-precios`, `h1`).

**Estrategia de implementación:**
Usa estilos semánticos para definir estilos completos y reutilizables para elementos o componentes. Constrúyelos con los tokens de diseño existentes siempre que se pueda. No crees variables nuevas, salvo que la reutilización lo justifique.

**Reglas principales del modo S:**

* **Identidad como unidad:** El modo S debe representar un rol visual o estructural completo, no un valor aislado. Un estilo semántico agrupa varias propiedades que juntas definen una unidad visual o estructural reutilizable.
* **Reutilización estructural:** Los objetos estructurales que organizan elementos hijos con varias propiedades coordinadas, como una unidad reutilizable, DEBEN tratarse como modo S. Esto incluye patrones como contenedores, cuadrículas, pilas, grupos, envoltorios, secciones y objetos estructurales parecidos.
* **Primero, reutilizar tokens:** Reutiliza los tokens existentes del modo U siempre que se pueda, para colores, espaciados, tipografía, radios y valores parecidos.
* **Sin variables innecesarias:** No crees variables CSS nuevas para valores que solo se usan dentro de un estilo semántico (por ejemplo, `margin: 2px;`). Crea una variable nueva solo cuando el valor se pueda reutilizar en otros contextos.
* **Nombres con significado:** Nombra las clases semánticas según el rol que representan (por ejemplo, `.btn-accion`, `.tarjeta`, `.contenedor-precios`, `.titulo-portada`), no según propiedades aisladas.
  **Elementos HTML semánticos nativos:** Cuando la intención es definir una identidad visual o estructural reutilizable para un elemento HTML semántico nativo (`h1`-`h6`, `p`, `button`, etc.), PUEDES darle estilo directamente con un selector de elemento en un archivo CSS, en vez de una clase. Agrega una clase semántica adicional solo cuando el elemento necesite una identidad específica más allá de su rol semántico nativo.

**Ejemplo:**
**Clase semántica:**  

```
<button class="btn-accion">Abrir</button>

.btn-accion {
  font-family: var(--fuente-sin-serifas);
  border-radius: var(--radio-s);
  margin: 2px;
}
```

### Modo S+ (semántico expandido): extensiones de un estilo base

**Definición:** El modo S+ se usa cuando un estilo semántico existente se debe extender con clases adicionales que modifican solo un aspecto limitado de un estilo base estable.

**Estrategia de implementación:**
Aplica una clase base para la identidad estructural y una o más clases expandidas cuando la nueva variación todavía pertenece a la misma familia semántica. La clase expandida solo debe modificar el tema, el tamaño o el estado visual.

**Reglas principales del modo S+:**

* **Primero, la base:** Parte siempre de una clase semántica base estable (por ejemplo, `.btn` > `.btn-alerta`).
* **Alcance limitado del cambio:** Una clase expandida solo puede modificar una capa acotada del estilo base, como el color, el tamaño o el énfasis visual.
* **Sin redefinir la estructura:** Si la variación cambia la estructura, la disposición interna o un comportamiento de interacción complejo, ya no es S+ y debe tratarse como un estilo semántico nuevo (S).
* **Uso compuesto:** Los estilos semánticos expandidos se usan junto con la clase base, no como reemplazos independientes.
* **Nombres con significado:** Usa el nombre base seguido de un guion y un modificador (por ejemplo, `.btn-alerta`).

**Ejemplo:**

```
.btn { /* Estilo base. */ }

.btn-alerta {
  background: red;
  color: white;
}

<button class="btn btn-alerta">Borrar</button>
```

### Modo S* (semántico compartido): sincronización de patrones visuales

**Definición:** El modo S* se usa para clases semánticas compartidas que aplican un patrón visual consistente a distintos elementos semánticos.

**Estrategia de implementación:**
Crea una clase compartida que describa una cualidad visual reconocible y estable. Úsala junto con las clases semánticas específicas para mantener la sincronización visual sin repetir el mismo grupo de propiedades.

**Reglas principales del modo S*:**

* **Patrón visual compartido:** El modo S* debe representar un patrón visual estable que se pueda aplicar de forma consistente en distintos elementos semánticos.
* **Consistencia entre componentes:** Usa S* cuando un cambio visual en un elemento también se deba reflejar en todos los demás elementos que comparten el mismo patrón.
* **Significado reconocible:** Una clase semántica compartida debe describir una cualidad visual reconocible, no una abstracción vaga o arbitraria.
* **Atómico frente a compartido:** A diferencia del modo U (que es una sola propiedad), el modo S* agrupa un patrón de propiedades (por ejemplo, sombra, borde y fondo).
* **Sin abstracciones forzadas:** No crees clases compartidas demasiado abstractas. Si la abstracción se vuelve difícil de entender, DETENTE, trátala como un estilo semántico aparte (S) y comparte los valores con tokens del modo U.
* **Nombres con significado:** Nombra las clases semánticas compartidas según el patrón visual que representan (por ejemplo, `.caja-elevada`).

**Ejemplo:**

```
.caja-elevada {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: var(--radio-m);
}

<div class="caja-precio caja-elevada">...</div>
<div class="caja-notificacion caja-elevada">...</div>
```

### Modo E (excepción): ajustes únicos

**Definición:** Ajustes pequeños y puntuales que no se repiten en ninguna otra parte del proyecto. Suelen ser tamaños, espaciados o márgenes afinados para retoques visuales muy específicos.

**Estrategia de implementación:**
Aplica los estilos directamente en el HTML con valores literales. Es el único modo en el que los valores literales (por ejemplo, `3px`) son obligatorios, y eso lo distingue del modo U, que exige variables.

**Reglas principales del modo E:**

* **Unicidad estricta:** Usa el modo E solo para ajustes que se aplican a un único caso.
* **Alcance mínimo:** Las excepciones deben ser pequeñas y estáticas. No pueden tener pseudoestados (`:hover`, `:focus`), media queries ni container queries.
* **La regla de promoción:** Antes de agregar una excepción, debes revisar todas las excepciones existentes en `ledger.usecss`. Si el mismo ajuste ya aparece, DETENTE: la excepción se debe **promover** a un token (modo U) o a una clase semántica (modo S).
* **Valores literales:** A diferencia del modo U (que usa variables para las utilidades), el modo E es el único en el que los valores literales son obligatorios, para no contaminar el registro de variables.

**Ejemplo:**

`<button style="margin: 3px">Borrar todo</button>`

## Alcance y ubicación de los estilos

**Definición:** Las clases semánticas y las variables se clasifican según su alcance: si se aplican a todo el proyecto o si se limitan a un contexto específico.

**1. Estilos globales:**

* **Alcance:** Estilos y variables fundamentales, pensados para todo el sitio.
* **Ubicación:** Se escriben en el archivo CSS compartido o global.

**2. Estilos locales:**

* **Alcance:** Estilos y variables limitados a una sola página o componente.
* **Ubicación:** Se escriben directamente dentro del bloque `<style>` de esa página o componente.

**Reglas principales para manejar el alcance:**

* **Primero, el aislamiento:** Prefiere el alcance local por defecto, para no contaminar el espacio de nombres global ni causar efectos secundarios no deseados.
* **Promoción orgánica:** Un estilo o una variable solo se promueve de **local** a **global** cuando se necesita en dos o más contextos distintos (los detalles están en la sección 'Reglas de reutilización y promoción').
* **Contexto en los nombres:** Las variables locales deberían llevar como prefijo el nombre de su contenedor, para evitar choques de nombres. Los estilos locales no necesitan prefijo, pero deberían escribirse anidados dentro de la clase principal o raíz de la página o el componente. Las variables locales siempre deberían declararse dentro de la clase principal o raíz de la página o el componente.

**Ejemplo:**
Nombres anidados:

```
.precios {

	--precios-bg: var(--color-superficie); /* Variable local que usa una variable global. */
	background: var(--precios-bg);
	& .img {
		border-radius: 4px;
	}

}
```

## Convenciones de nombres

**Definición:** Normas para nombrar las clases y las variables con claridad en un entorno donde colaboran la IA y las personas.

**Reglas principales:**

* **Español sin tildes ni ñ:** Todos los nombres deben escribirse en español correcto, omitiendo los caracteres que no existen en inglés, como las tildes, la diéresis y la ñ.
* **Completos y descriptivos:** Prioriza la claridad semántica. Usa palabras completas en todos los términos, **salvo** que estén en la lista de abreviaturas permitidas. Evita las abreviaturas inventadas que sacrifican el contexto.
  * **Correcto:** `--precios-tarjeta-bg`, `--color-enlace-nav-principal`.
  * **Incorrecto:** `--prc-trj-bg`, `--clr-enl-nv-ppal`.
* **Abreviaturas permitidas:** Solo se permiten estas abreviaturas, para mantener el código conciso sin perder significado: `btn`, `nav`, `img`, `msg`, `bg`, `prev`, `min`, `max`, `alt`, `src`.

## Reglas de reutilización y promoción

**Definición:** Pautas para decidir cuándo extraer, compartir o promover un estilo o una variable, para mantener una arquitectura ligera y escalable.

**Reglas principales:**

* **Evolución compartida:** Extrae una propiedad a una variable o a una clase reutilizable SOLO si aparece en dos o más lugares y esos lugares deben **cambiar juntos**. Si solo coinciden en el valor, pero van a evolucionar por separado, déjalos locales o con el valor escrito directamente.
* **Promoción a global:** Antes de crear un estilo o una variable nuevos, debes:
  1. Buscar en los **estilos o variables globales** una coincidencia que se pueda reutilizar.
  2. Buscar en los **estilos o variables locales** de otras páginas o componentes un candidato que se pueda promover a global y reutilizar.
  3. **Acción:** Al promover de local a global, DEBES quitarles a las variables el prefijo propio del componente (por ejemplo, `--precios-relleno-xs` pasa a ser `--relleno-xs`), y deberías revisar que no choquen con el nombre de un estilo o una variable global existente.
* **La despromoción es manual:** Devolver un estilo global a local (lo inverso de la promoción) es un proceso disruptivo. No deberías hacerlo automáticamente. Es una limpieza manual que solo inicia el Director.
* **Expandir antes que crear:** Antes de definir una clase semántica nueva, revisa si el requisito se puede cumplir expandiendo una clase existente.

## Capas de CSS

**Definición:** El sistema usa `@layer` de CSS para definir un orden de cascada predecible, de modo que la especificidad se maneje con las capas y no con la complejidad de los selectores.

**Declaración de las capas:** Este orden DEBE declararse al principio del archivo CSS global para establecer la precedencia:
`@layer base, variables, semantica, utilidad, semantica_local, utilidad_local, excepciones;`

**Correspondencia de las capas:**

* **base:** Normalización del navegador y reglas de reinicio de estilos para los elementos HTML.
* **variables:** Todos los tokens de diseño.
* **semantica:** Estilos semánticos globales (`S`, `S+`, `S*`).
* **semantica_local:** Estilos semánticos locales.
* **utilidad:** Estilos utilitarios globales (`U`, `U*`).
* **utilidad_local:** Estilos utilitarios locales.
* **excepciones:** Excepciones puntuales (`E`).

**Instrucción para la IA:** Toda regla CSS generada que no esté en línea debe ir dentro de su bloque `@layer` correspondiente, para mantener la integridad de la cascada.

## Usa los estándares modernos de CSS nativo

**Definición:** Pautas para usar las funciones modernas de CSS y lograr rendimiento, mantenibilidad y accesibilidad sin dependencias externas.

**Funciones permitidas:**

* Las propiedades personalizadas (variables) y `@layer`.
* Flexbox, Grid, `gap`, `aspect-ratio`, `object-fit` y `box-sizing: border-box`.
* `text-wrap` (`balance` o `pretty`).
* `transition`, `transform` y `opacity`. Respeta siempre `prefers-reduced-motion`.
* `accent-color` (para los controles nativos), `color-mix()` (para las variantes), y `backdrop-filter` o `filter` para los efectos visuales.
* `padding-inline`, `margin-block` e `inset`.
* `calc()`, `clamp()`, `min()` y `max()`.
* Las media queries y las container queries.
* `:hover`, `:focus-visible`, `:disabled` e `:invalid`.
* **Anidamiento nativo:** Se permite SOLO para organizar los estados (`&:hover`) y las consultas (`@media`) dentro de la clase. No anides elementos, salvo que sigas la preferencia de 'Nombres anidados' de la sección 'Alcance y ubicación de los estilos'.

**Prohibido:**

* **!important:** Los problemas de especificidad se resuelven con `@layer` o con selectores adecuados.
* **Trucos heredados:** No uses floats para la maquetación. No agregues prefijos de proveedor (`-webkit` o `-moz`), salvo que sean estrictamente necesarios para que el código funcione en 2026.

## Entregables y documentación

**Definición:** Normas para el resultado final y para la documentación interna del código, que dejan claras las decisiones de arquitectura.

**Entregables obligatorios:**

* **HTML:** Estructura limpia, semántica y accesible.

* **CSS:** Debe organizarse estrictamente según la pila de capas `@layer` definida.

* **Idioma de los comentarios:** Todos los comentarios deben escribirse en español correcto, con tildes y ñ.

**Reglas de autodocumentación:**

* **Justificación de cada clase:** Toda clase CSS DEBE tener un comentario breve que explique **por qué** existe y **por qué** pertenece a esa capa.
* **Ubicación:** El comentario va en la misma línea de la llave de apertura `{` y no debería tener saltos de línea.

**Ejemplo:**

```
<style>
	@layer semantica_local {
		.precios-btn { /* Este botón es rojo y más grande que los demás botones del sitio, y pertenece a la capa local porque su alcance se limita a esta página o componente. */
			...
		}
	}
</style>
```
