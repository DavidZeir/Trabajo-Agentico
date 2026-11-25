# Nombres

Por qué las piezas de Trabajo Agéntico se llaman como se llaman, y qué nombres se descartaron, con su razón. Sirve para no repetir una discusión que ya se hizo y para que, si un nombre se vuelve a cambiar, se sepa qué se pesó. Lo que significa cada término está en el Glosario, en `Plantillas/Agents Global.md`: aquí solo va por qué se llama así.

## Las tres vías

Paso, cambio y ajuste van de mayor a menor: se escoge una según el tamaño y el riesgo del trabajo, y ninguna exige que antes haya pasado otra. Aun así, los tres nombres se leen fácil como una secuencia, en la que primero se avanza, después se corrige y al final se pule, y muchas veces ese es el orden real, porque después de un paso suelen venir cambios y ajustes sobre lo que entregó. Lo que deja claro que son vías aparte es la definición de cada una en el Glosario.

### Paso

- **Qué nombra:** Un avance planeado del proyecto, que se logra en una tanda de trabajo y lo deja funcionando.
- **Por qué:** «Dar un paso» es avanzar, y su tamaño es el de algo que se hace de una vez, no el de una fase larga.
- **Lo descartado:**
  - **Etapa:** Ya nombra la parte de un paso que hace un Implementador, con su rama y su copia de trabajo. Además, suena a una fase de algo más grande y planeado desde el principio, más cercana a un subproyecto.

### Cambio

- **Qué nombra:** Un trabajo directo, fuera de la cola de los pasos, que corrige o agrega algo pequeño y necesita probarse, como una fórmula que hay que probar con varios casos.
- **Por qué:** Es la palabra más común para ese trabajo, y la que ya usaban los proyectos, también en las filas de `Métricas.csv`.
- **Lo que se acepta:** Choca con los cambios de git, como en «terminé el cambio, prepara los cambios», y un «cambio» suelto en un documento se puede leer como la vía.

### Ajuste

- **Qué nombra:** Un trabajo directo que se comprueba con solo mirarlo, como corregir una errata.
- **Por qué:** En el uso diario, un ajuste es algo pequeño: se ajusta un margen, un texto o un valor. Y es una palabra aparte de cambio, así que las dos vías no se confunden.
- **Lo que se acepta:** También se dice «ajustar una fórmula», que puede necesitar pruebas. Eso lo resuelve la frontera de la vía: si hace falta una prueba nueva, deja de ser un ajuste. Además, algunos documentos usan «ajuste» en su sentido de siempre, como en «un ajuste fino».
- **Lo descartado:**
  - **Retoque:** Suena a un acabado cosmético, como pulir una foto, y se queda corto cuando se corrige una línea de lógica.
  - **Cambio mínimo:** Repite cambio y duplica el choque con git.

## Los verbos de las habilidades

### Realizar

- **Qué nombra:** El verbo de las habilidades de las tres vías: `realizar-paso`, `realizar-cambio` y `realizar-ajuste`. También se usa para llevar a cabo una idea aprobada, como en «realizar una idea».
- **Por qué:** Tiene la connotación de traer algo a la realidad. Suena natural con las tres vías, como en «realizar un cambio» o «realizar un ajuste», sirve en cualquier área y no solo en el software, y al escribir `/realizar` el menú muestra las tres juntas, justo cuando hay que escoger una. Tampoco se confunde con `crear-paso`, porque crear un paso es escribirlo, y realizarlo es llevarlo a cabo.
- **Lo descartado:**
  - **Implementar:** «Implementar un ajuste» suena forzado, y la palabra se asocia más con el software.
  - **Ejecutar:** En el software es correr un programa, algo que ya está escrito, cuando la sesión todavía planea y programa.
  - **Aplicar:** Hace pensar en algo ya hecho que solo se pone encima, como un parche o una configuración.
  - **Hacer:** Es casi sinónimo de crear, así que `/hacer-paso` se confundiría con `/crear-paso`.
  - **Un verbo por vía, como `/cambiar` y `/ajustar`:** Las tres vías quedan sueltas en el menú, y `/cambiar` trae de vuelta el choque con los cambios de git.

### Incluir

- **Qué nombra:** El verbo de `incluir-idea`, que recibe una idea nueva o algo que se quiere quitar del plan, lo revisa contra lo decidido y lo registra en las bases.
- **Por qué:** Tiene un registro menos formal y menos acartonado, parejo con realizar. Y toda idea que pasa por la habilidad queda incluida en las bases: en una de sus tres listas, aunque se descarte, o directo en su documento dueño.
- **Lo descartado:**
  - **Incorporar:** Dice mejor que la idea tiene que encajar con lo que ya hay, pero su registro es más elevado.
  - **Integrar:** Es más técnico, choca con la rama de integración y sugiere que la idea siempre termina encajando, como si ya estuviera aprobada.
  - **Añadir:** Suena a una suma, y sin la eñe queda `anadir-idea`.
  - **Agregar:** Suena un poco informal.

## Los papeles

### Implementador

- **Qué nombra:** El agente que hace una etapa de un paso.
- **Por qué se queda, aunque las habilidades digan realizar:** Implementa una etapa, y ahí implementar sigue siendo el verbo correcto. «Realizador», en cambio, es quien dirige una película o un programa de televisión.

## La estructura del proyecto

### Subproyecto

- **Qué nombra:** Una parte del proyecto con sus propios documentos, como una línea de productos en un negocio o la aplicación de escritorio en un servicio de software. Sus bases van en su propia carpeta dentro de `Bases`, y si tiene código, su carpeta lleva su propio `AGENTS.md` y su Verificador.
- **Por qué:** Así se piensa un proyecto grande: manejar una empresa es un proyecto, y dentro de él hay proyectos más pequeños, como las compras, el sitio web o el diseño. Además, es un solo término, definido una vez en el Glosario, en vez de una explicación que se repite en cada frase.
- **Lo que se acepta:** Puede sonar a un proyecto aparte, cuando nace junto al proyecto y sus bases son parte de las de arriba, solo que en archivos separados. Lo aclaran su definición en el Glosario y el aviso «Se lee junto con» al principio de sus documentos.
- **Lo descartado:**
  - **Cambiarle el nombre al todo, como en Visual Studio, donde una solución tiene proyectos:** Solución suena raro en un documento de negocio, negocio no sirve para un proyecto personal, iniciativa es frío y burocrático, marca se queda corta porque las bases son más que la marca, y producto no le sirve a la promoción. Además, obligaba a cambiar «proyecto» en todo Trabajo Agéntico.
  - **Parte, como palabra normal, sin definirla:** Se regó por todas las habilidades, y no quedaba claro cuándo era el término y cuándo la palabra de siempre.
  - **Subcarpeta o subcarpeta de código:** Dice dónde está, pero no qué es. `Bases` y `Pasos` también son subcarpetas, «subcarpeta de código» era largo, y no serviría para los subproyectos que tienen bases propias sin código.
