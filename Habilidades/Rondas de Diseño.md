# Rondas de Diseño

Así trabajan `explorar-marca` y `explorar-diseno-web`: en rondas, cada una con varias opciones que hacen agentes por separado, hasta que el Director escoge. Lo que cambia entre las dos lo dice cada habilidad: de dónde parte, qué busca en las referencias, qué es cada opción y dónde queda lo elegido.

## Las referencias

Antes de la primera ronda, busca en las fuentes de abajo una referencia distinta para cada opción. Qué buscar en ellas lo dice cada habilidad, y no hace falta mirarlas todas: escoge las que le sirven al proyecto. Guarda la captura de cada referencia y anota de dónde salió y qué se toma de ella. Son inspiración: ninguna opción copia una referencia entera.

### Cómo se consultan

- **El navegador:** Usa el integrado de tu programa, como el panel lateral de la aplicación de escritorio de Claude, o Playwright si no tienes uno, porque varias fuentes rechazan a los lectores simples.
- **Las sesiones:** Si una fuente pide iniciar sesión, no escribas contraseñas. Pídele al Director que lo haga en el navegador integrado, donde la sesión queda guardada. Si no quiere, sigue con las demás.
- **Las verificaciones:** Si una fuente pide comprobar que eres humano, no lo resuelvas y sigue con las demás, porque esas comprobaciones suelen fallar en el navegador integrado, aun con el clic del Director.
- **Los MCP gratis:** SiteInspire y One Page Love tienen MCP gratis y sin clave, que es la vía más limpia para consultarlas. Si tu sesión no los tiene y `SugerirMcpDiseño` está encendida en las preferencias, sugiérele al Director conectarlos: explícale para qué sirven, que no piden cuenta ni pago, que se pueden quitar con un comando y que One Page Love registra la búsqueda y la IP, y avísale que si dice que no, no se lo vuelves a preguntar en este computador. Si acepta, corre los comandos de tu programa. Un MCP nuevo solo aparece en una sesión nueva, así que el Director decide si abre una ahora o si sigues aquí con sus sitios en el navegador. Si dice que no, pon `SugerirMcpDiseño` en `false`, en `<Trabajo Agéntico>/Locales/Preferencias.json`, y sigue con el navegador. En SiteInspire, explora por categorías, con `all_categories` y `explore_websites`, porque su búsqueda de texto libre confunde nombres.

  ```
  claude mcp add --transport http --scope user siteinspire https://www.siteinspire.com/api/mcp
  claude mcp add --transport http --scope user onepagelove https://api.onepagelove.com/mcp
  codex mcp add siteinspire --url https://www.siteinspire.com/api/mcp
  codex mcp add onepagelove --url https://api.onepagelove.com/mcp
  ```

- **Los MCP de pago:** Las bibliotecas más grandes de pantallas reales, [Refero](https://refero.design/), con sus estilos sacados de productos reales, [Mobbin](https://mobbin.com/) y [Nicelydone](https://nicelydone.club/), solo dejan entrar a los agentes por un MCP de pago. También lo tienen [Savee](https://savee.com/), MaxiBestOf y [Landingfolio](https://www.landingfolio.com/). Úsalos si el Director ya los tiene conectados. Contratarlos lo decide el Director.
- **El público:** Ninguna fuente filtra por público, así que tradúcelo a una industria y un estilo, y anota con cuáles escogiste cada referencia.
- **Lo pagado:** Los premios cobran por participar y varias galerías venden espacios, así que lo que más aparece no es necesariamente lo que mejor funciona.
- **Pocas páginas:** Mira pocas páginas por proyecto, a ritmo humano, porque algunas fuentes, como Fonts In Use y MaxiBestOf, solo permiten la consulta personal, y para una referencia por opción no hace falta más.
- **Las capturas:** Son del sitio real que enlaza la galería, y no de la imagen de la galería, que varias prohíben copiar. Van en `Temporal/diseno/referencias/`.
- **Una fuente que murió o cambió:** Díselo al Director, para corregir esta lista.

### La marca y el estilo, para `explorar-marca` y `explorar-diseno-web`

- **[BP&O](https://bpando.org/):** Crítica de identidades completas, con su estrategia, su oficio y su lenguaje.
- **[Brand New](https://www.underconsideration.com/brandnew/):** Cambios de identidad, por industria y por color, letra y forma. Sin cuenta solo muestra el antes y el después, y la crítica completa pide la suscripción del Director.
- **[Branding Style Guides](https://brandingstyleguides.com/):** Manuales de marcas reales, por sector, región, idioma y año, también en español y de Colombia.
- **[Mindsparkle](https://mindsparklemag.com/):** Identidades aplicadas, por temas como café, hotel o inmobiliaria.
- **[SiteInspire](https://www.siteinspire.com/) y [One Page Love](https://onepagelove.com/):** Cómo se ven los sitios de una industria, por tema, género, color y letra, para ver qué lenguaje visual habla ese público.
- **[Fonts In Use](https://fontsinuse.com/):** Las letras en su uso real, por industria, letra, formato y época. Su licencia es personal y no comercial, así que aquí mira muy pocas páginas.
- **[The Component Gallery](https://component.gallery/):** Para la voz y el tono, porque marca cuáles sistemas de diseño documentan el suyo.
- **[Identity Designed](https://identitydesigned.com/) y [Typewolf](https://www.typewolf.com/):** Archivos de casos de identidad y de parejas de letras, que se detuvieron en 2024 y en 2025.
- **[Color Hunt](https://colorhunt.co/):** Ánimos de color, sin contexto de marca. Comprueba el contraste.
- **[Cosmos](https://www.cosmos.so/explore):** Imágenes sueltas, sin encargo ni autor claro, para el carácter, cuando el proyecto no encaja en una industria, como lo rebelde o lo político.
- **[3dicons](https://3dicons.co):** Íconos 3D con licencia CC0, que se pueden usar directo.

### La composición, para `explorar-diseno-web`

- **Sitios completos:**
  - **[SiteInspire](https://www.siteinspire.com/):** Por estilo, tipo, tema y plataforma, sobre todo editoriales, culturales y de estudios.
  - **[One Page Love](https://onepagelove.com/):** Páginas de una sola sección y secciones sueltas, como precios, testimonios o preguntas, por género, color, plataforma y letra.
  - **[Awwwards](https://www.awwwards.com/websites/):** Marcas expresivas, por categoría, tecnología, país y letra, con sesgo hacia las agencias.
  - **[MaxiBestOf](https://maxibestof.one/):** Sectores fuera de la tecnología, en unas 70 categorías, de gobierno a niños, con las letras de cada sitio. Una parte grande es de pago.
- **Según el proyecto:**
  - **[CSS Design Awards](https://www.cssdesignawards.com/website-gallery):** Por industria y color.
  - **[Recent](https://recent.design/websites):** Marcas atrevidas o con mucho movimiento.
  - **[Lapa Ninja](https://www.lapa.ninja/) y [SaaS Landing Page](https://saaslandingpage.com/):** Productos SaaS o de IA.
  - **[The FWA](https://thefwa.com/):** Proyectos experimentales o interactivos. Solo tiene búsqueda.
  - **[Dark Mode Design](https://www.darkmodedesign.com/):** Si el proyecto ya escogió un tema oscuro.
- **Componentes y patrones:**
  - **[The Component Gallery](https://component.gallery/):** Cómo resuelven decenas de sistemas de diseño un mismo componente.
  - **[GOV.UK Design System](https://design-system.service.gov.uk/):** Servicios públicos, trámites y formularios accesibles.
  - **[Carbon](https://carbondesignsystem.com/):** Productos empresariales y de datos. Se lee sin cuenta. Su [MCP gratis](https://www.carbondesignsystem.com/getting-started/carbon-mcp/onboarding-and-setup), que pide una cuenta de IBM, sirve sobre todo para construir con Carbon.
  - **[UI-Patterns](https://ui-patterns.com/):** La razón detrás de una estructura, con el problema y la solución de cada patrón. Invita a los agentes, y publica todo su texto en [`llms-full.txt`](https://ui-patterns.com/llms-full.txt).
  - **[Material](https://m3.material.io/), [Polaris](https://shopify.dev/docs/api/polaris) y [Atlassian](https://atlassian.design/):** Solo para leer cómo resuelven un patrón, sin reusar el código ni el estilo de Polaris y Atlassian.
- **Para afinar en las rondas siguientes:**
  - **[Navbar Gallery](https://www.navbar.gallery):** Barras de navegación.
  - **[CTA Gallery](https://www.cta.gallery):** Botones y llamadas a la acción.
  - **[Footer Design](https://www.footer.design):** Pies de página.

## Una ronda

1. Dale a cada opción una dirección distinta, con su referencia, y escríbela en pocas líneas, en `Temporal/diseno/ronda-N/opcion-N/Dirección.md`. En la primera ronda van 5 opciones, salvo que el Director pida otro número.
2. Lanza un agente por opción, todos al mismo tiempo: un agente de tu propio programa, con el modelo y el razonamiento de `Implementador` en las preferencias. En Claude, lánzalo con la familia, como `sonnet`, y en Codex, con su nombre exacto, el que muestra el comprobador. Cada uno recibe el encargo, su dirección, su referencia, los lineamientos de `Diseño.md` que tocan a su opción y esta sección, y no ve las demás opciones, para que no se parezcan.
3. Cada agente hace su opción en HTML estático, en su carpeta, sin tocar el código del proyecto:
   - **El contenido:** El real del proyecto, nunca un texto de relleno.
   - **Las variables:** Los colores, las letras y los espacios van como variables de CSS al comienzo, para que después pasen directo al CSS global del proyecto.
   - **Las letras:** Las de la marca, si las tiene, o las de Google Fonts.
   - **Los dispositivos:** Se ve bien en el escritorio y en un teléfono, con un contraste que se pueda leer.
   - **Las capturas:** En el escritorio y en un teléfono, en su carpeta, en JPEG, para que pesen poco al archivarlas. Se toman con el navegador, en una pestaña propia, porque los agentes lo comparten y se mueven las pestañas unos a otros.
4. Arma la página de comparación, `Temporal/diseno/ronda-N/index.html`: las opciones lado a lado, cada una con sus capturas, el enlace a su referencia, una línea con su idea y el enlace a su página. Si hay un diseño actual, va primero, como punto de partida. Dale al Director el enlace a esa página.
5. Espera al Director, porque escoger es lo que él aporta. Él escoge una, mezcla varias o pide otra ronda, con sus comentarios. Si no le convence ninguna, la ronda siguiente prueba direcciones nuevas.
6. La ronda siguiente parte de lo que dijo el Director, con las opciones que él quiera: puede seguir con las mismas ramas, quedarse con una sola o abrir otras. Las rondas terminan cuando él diga cuál queda.

## Al terminar

Lo elegido entra a las bases con `incluir-idea`, como dice cada habilidad. La página de la opción elegida y sus capturas se copian a las bases, en `Bases/Diseño/`, como muestra de lo que dice `Diseño.md`. Después, borra `Temporal/diseno/referencias/`, porque esas capturas son de sus dueños y no van al repositorio. Los enlaces quedan en cada `Dirección.md`. Lo demás de `Temporal/diseno/`, con las rondas, las opciones que no se escogieron y las páginas de comparación, se mueve a `Pasos/AAAA-MM-DD Nombre de la exploración/`, con la fecha de hoy, para poder volver a ellas si es necesario. Sus capturas no van en git, como dice el `.gitignore`.
