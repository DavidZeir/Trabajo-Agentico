# Web Core

Lo que hace falta saber en los proyectos web hechos desde Web Core, la plantilla de TypeScript y Cloudflare.

## Cómo se empieza un proyecto

- **Con el generador de Core:** El proyecto se crea con `Programas/crear-proyecto.mts` de Web Core Público, el clon de `github.com/DavidZeir/Web-Core`, que tiene lo que se copió desde Web Core con `Programas/Compartir/Copiar.mjs`. En la copia privada de Web Core, la que tiene sus bases, el generador se detiene sin crear nada. Si en el computador no hay un clon de Web Core Público, se clona antes, en cualquier carpeta. El comentario del principio de ese archivo dice cómo se corre y qué valores pide. Los que no sepas, pregúntaselos al Director.
- **Antes de clonar:** El generador solo escribe en una carpeta vacía, así que se corre antes de clonar el repositorio. Como después ya no se puede clonar en ella, se conecta con el repositorio vacío de GitHub con `git init` y `git remote add origin [dirección del repositorio]`.
- **Lo que sigue:** Al final, el generador dice lo que falta hacer a mano. El resto del pedido de `Configuración.md` se hace como para un proyecto que ya existía, porque la copia de Web Core ya trae su `AGENTS.md`, su `CLAUDE.md` y su `.gitignore`. Lo explica el párrafo de «Inicio de un proyecto», en `Configuración.md`, que empieza con «Si el proyecto ya existía».
- **La marca:** Como Web Core no conoce las bases, al copiarlas se declara su documento de diseño en `Programas/reglas-diseno-proyecto.mts`, con `export const DocumentoDeDiseño = "Bases/Diseño.md";`. Desde ahí, la regla de diseño compara sola apenas ese documento tenga valores. Sus nombres son los mismos de `static/css/global.css`, uno a uno. La plantilla de ese documento trae como predeterminados los mismos valores de `static/css/global.css`, así que si cambia uno, cambia el otro.

## En cada computador

- **La sesión de Cloudflare:** Se inicia una vez por computador con `npx wrangler login`, desde la carpeta del worker de cualquiera de esos proyectos. Sin ella falla lo que usa los recursos remotos, como la IA de Cloudflare, que nunca corre en local.
- **Los navegadores de Playwright:** Los baja el Director desde un PowerShell sin administrador, con `cd [carpeta del worker]` y después `npx playwright install chromium firefox webkit`. Se vuelven a bajar cuando cambia la versión de Playwright.

## Lo que el proyecto ya trae

- **Los comandos de las copias de trabajo:** `alistar.mjs` e `iniciar.mjs` sirven sin cambios en cualquier proyecto de Web Core, así que no hay que crearlos.
- **El Verificador:** `Programas/verificador.mjs` y las reglas de estructura, `Programas/reglas-plantilla.mts`, ya vienen hechos. Los scripts `verificador` y `reglas` del `package.json` del worker los abren en la carpeta del worker, donde están sus herramientas.
- **Las reglas de diseño:** `Programas/reglas-diseno.mts`, como dice `Habilidades/Verificador.md`, viene hecho y encendido, en el script `reglas`. Exige usar las variables de `static/css/global.css`, y las compara con la marca si el proyecto la declaró, como dice «Cómo se empieza un proyecto». Mientras ese documento no tenga valores, solo exige las variables.
  - **Los colores:** Van en hexadecimal de 6 caracteres, sin `#`, y uno con otra forma hace fallar la regla. Los del tema alternativo solo se comparan si `Diseño.md` los trae, y ese tema solo puede cambiar colores: si cambia un tamaño, un espacio o cualquier otro valor de la escala, como variable o como propiedad, la regla falla. En las páginas, un `color-mix()` vale si mezcla variables de la paleta, o una de ellas con `transparent`. Para aclarar u oscurecer un color, se sugiere mezclarlo con `--color-fondo` o con `--color-texto-fuerte`, y no con blanco o negro, porque normalmente son el 'blanco' y el 'negro' de la marca y cambian con el tema. Una variable de color que no existe en `global.css` hace fallar la regla, también dentro de una mezcla.
  - **Los tamaños, los redondeados, los bordes, los espacios y los anchos:** Van en números sin unidad, y la regla los convierte con `1rem` igual a 16. El redondeado completo, `--radio-completo`, no se compara, porque vale lo mismo en todos los proyectos. De los anchos, solo se comparan las variables `--ancho-*`. Los demás, como el de un campo de un formulario, son propios de cada elemento y se escriben con su número, sin variable.
  - **Las fuentes, los pesos y los interlineados:** De las fuentes compara solo el primer nombre, porque los demás son repuestos, y los pesos y los interlineados, tal cual.
  - **Los espacios:** Un ajuste fino le suma o le resta a una sola variable menos que el primer escalón, con `calc`, un número más pequeño que ese escalón se escribe directo, y solo se multiplica por -1, para un margen negativo. Lo que depende de la pantalla va en `clamp`, `min` o `max`, con la escala en sus extremos.
  - **Las sombras:** Una caja lleva `--sombra-s`, `--sombra-m` o `--sombra-l`, varias separadas por comas, o `none`. Las tres tallas van en px sin unidad: el desplazamiento horizontal, el vertical y el desenfoque. Su color, `--color-sombra`, que usan todas, va en hexadecimal con su opacidad, como 000000 14, y, como los estados, tiene un valor para cada tema. Las demás sombras, como las de un texto, se escriben con su valor.
  - **Los bordes:** Un borde o un contorno, como el del foco, lleva su grosor con `--borde-s`, `--borde-m` o `--borde-l`, o va en `0` o en `none`, y su color, con una variable de color.
  - **La opacidad de lo desactivado:** Un control desactivado la lleva con `--opacidad-desactivado`, y las demás opacidades se escriben con su valor. Va en porcentaje sin el signo: 0.5 en el código es 50 en el documento.
  - **Los factores de texto:** Si los textos de la web se ven de otro tamaño que esos números, se declaran en `Programas/reglas-diseno-proyecto.mts` `FactorTamañoTextoEscritorio`, como 1.25, y `FactorTamañoTextoMóvil`, que se aplica dentro de un `@media (max-width)`. Los dos valen 1 si no se declaran, y los redondeados, los bordes, los espacios y los anchos no llevan factor.
  - **Las columnas que lee la regla:** En cada tabla, la que se llama Valor. En la de los tamaños, la de su escala, que es la Normal, salvo que `Programas/reglas-diseno-proyecto.mts` declare otra con `ColumnaDeLaEscala`, como `"Compacto"`. Una tabla sin ninguna de esas columnas no se compara.
  - **Las escalas de otros medios:** Si un medio necesita otra escala, que no va en proporción con la de la web, la tabla de los tamaños la trae en otra columna, como `| Tamaños | Normal | Compacto |`. Si se declara una columna que ninguna tabla tiene, la regla falla y lo dice.
  - **Lo demás propio de cada proyecto:** Como una página excluida, también va en `Programas/reglas-diseno-proyecto.mts`, que se carga solo si existe.
  - **Quien no la quiera:** La quita del script `reglas`.
  - **Un proyecto que ya tiene páginas:** La enciende después de pasar a variables lo que tiene escrito a mano, con `/implementar-cambio`.
  - **Sus pruebas:** `Programas/pruebas-reglas-diseno.mts` prueba a la regla por sí sola, sin mirar la web. No está en el Verificador porque puede tardar más de 5 segundos: Se corre a mano cada vez que se edita la regla, como dice su primer comentario.
  - **El original:** Está en Web Core, y cada proyecto que la use guarda una copia idéntica. Cuando cambia, el cambio se lleva a esos proyectos.
- **La prueba de contraste:** `pruebas/interfaz/contraste.interfaz.ts`, como dice `Habilidades/Verificador.md`, mide con `@axe-core/playwright`. Sus límites se cambian en `ContrasteMínimoTextoNormal` y `ContrasteMínimoTextoGrande`. Para axe-core, grande es desde 24 píxeles, o desde unos 18,7 en negrita, que solo cuenta desde el peso 700.
- **Los controles básicos:** `static/css/global.css` trae el botón, los campos, los enlaces y el foco, con el estilo de Web Core. El primer paso que toque la interfaz los rehace en el estilo de la marca, como dice «Los controles» de `Diseño.md`.
  - **Qué páginas mide:** Las rutas de `src/rutas.ts` y del núcleo, así que una página nueva queda medida sola. Una ruta que no muestre una página, o que haga algo al abrirla, va en `RutasQueNoSonPáginas`, y si no está, la prueba falla y lo dice.
  - **Cuándo corre:** En el Verificador completo, y solo en Chromium.
  - **Quien no la quiera:** Borra ese archivo y la dependencia.
- **Las reglas generales de TypeScript del linter:** El original está en Web Core, en `Programas/reglas-typescript.mts`, y cada proyecto hecho desde Web Core guarda una copia idéntica. Cuando cambian, el cambio se lleva a los proyectos de `Locales/Proyectos.md` que están hechos desde Web Core.

## Las reglas personales

Si hay reglas personales del linter en `Locales/reglas-personales.mts`, su copia va en `Programas/reglas-personales.mts` del proyecto. El linter las carga solo si el archivo existe, y el `.gitignore` de la raíz las deja fuera de git, estén donde estén.

## Pruebas enfocadas

En la subsección «Verificador» del `AGENTS.md` del proyecto, las pruebas enfocadas también se pueden correr con `npx vitest related --run src/archivo.ts`, que corre las pruebas que importan ese archivo, aunque sea de forma indirecta.
