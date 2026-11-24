# Cómo funciona esta carpeta

Las habilidades propias existen una sola vez, aquí, con una carpeta por habilidad. Aquí se editan y aquí quedan en git.

Claude y Codex buscan sus habilidades cada uno en su propia carpeta:

- `%USERPROFILE%\.claude\skills\`
- `%USERPROFILE%\.codex\skills\`

La documentación de Codex ya solo nombra `%USERPROFILE%\.agents\skills\` para las habilidades de cada usuario, pero Codex todavía lee la suya.

Ahí, cada habilidad de esta carpeta tiene una carpeta con el mismo nombre que no es una copia: es un enlace de carpeta (en Windows se llama junction) que apunta a la de aquí. Al abrir el enlace, Windows muestra lo que hay aquí. Por eso se ve el mismo `SKILL.md` en los tres lugares: es un solo archivo, y si se cambia desde cualquiera, cambia en los tres. Esos enlaces los crea `Programas/Agents Global/Instalar.mjs`, al configurar Trabajo Agéntico en cada computador. La habilidad `usar-computador` solo aplica a Codex y solo se enlaza en su carpeta.

Las habilidades de terceros no viven aquí: cada programa las instala en su propia carpeta.

## Los archivos con instrucciones comunes

Los demás archivos de esta carpeta, fuera de este `Leeme.md`, son instrucciones comunes que usan las habilidades: cada una los nombra en el paso donde los necesita. No son habilidades, así que no se enlazan.

- `Revisores.md`: Las instrucciones que reciben los revisores en el flujo.
- `Llamar a Revisores.md`: Cómo se llama a los revisores por la terminal, con el comando de cada programa, lo que va en el pedido y qué hacer si se quedan sin cupo. Su programa, su modelo y su razonamiento salen de las preferencias del Director.
- `Verificador.md`: Cómo se crea el Verificador de un proyecto. Lo sigue el primer paso con código.
- `Copias de Trabajo.md`: Cómo se crean los dos comandos de las copias de trabajo de un proyecto, `npm run alistar` y `npm run iniciar`. Lo siguen el primer paso con código y el cambio menor que le agrega los comandos a un proyecto que ya tiene código. Además, `implementar-paso` sigue su sección «Las copias de un proyecto con subproyectos» en cada paso de un proyecto con subproyectos, para que cada copia de trabajo traiga solo los que toca.
- `Gestión de Ideas.md`: Cómo se guardan y trasladan las ideas del proyecto. Lo consulta `incorporar-idea` al registrar lo que decide el Director, e `implementar-cambio` e `implementar-cambio-minimo` al implementar directamente una idea aprobada.
- `Comprobar Bases.md`: Cómo comprueban `incorporar-idea`, `iniciar-subproyecto`, `revisar-bases` y `revisar-codigo-vs-bases` que las bases de un proyecto estén bien citadas, con `Programas/Bases/Comprobar.mjs`, y qué hacen con las citas rotas.
- `Escribir el Resumen.md`: Cómo escriben `implementar-paso` e `implementar-cambio` el resumen de un paso o de un cambio menor, con sus secciones, y su fila de `Pasos/Métricas.csv`.
- `Rondas de Diseño.md`: Cómo trabajan `explorar-marca` y `explorar-diseno-web`: en rondas, con un agente por opción, las fuentes de las referencias y la página de comparación.
- `Llenar las Plantillas.md`: Cuándo y cómo se llena con el Director lo que en las bases de un proyecto todavía es plantilla, entre corchetes dobles. Lo siguen `implementar-paso`, `implementar-cambio` y `explorar-diseno-web` antes de trabajar en la interfaz, y lo nombran el aviso de cada plantilla y `Comprobar Bases.md`.
- `Comprobar Preferencias.md`: Cómo comprueba una habilidad las preferencias del Director antes de empezar, y qué hace si están mal o si la sesión no es la que piden.

## Cómo saber que es un enlace

El Explorador lo muestra como una carpeta normal y no dice a dónde apunta. En PowerShell, este comando sí lo muestra, con `<JUNCTION>` y el destino entre corchetes:

```
cmd /c dir "$env:USERPROFILE\.codex\skills"
```

## Cómo agregar otra habilidad

1. Crear su carpeta aquí, con su `SKILL.md`.
2. Volver a correr `node "Programas/Agents Global/Instalar.mjs"` en la carpeta de Trabajo Agéntico. Crea en Claude y en Codex los enlaces de las habilidades que todavía no los tienen, después de pedir permiso en una ventana. Se puede correr desde la terminal de Claude o de Codex, porque no instala ningún programa. En los demás computadores se corre después de traer los cambios de Trabajo Agéntico.

## De dónde sacar habilidades de otros

Para una tarea puntual, como de mercadeo, de ventas o de finanzas, puede servir una habilidad de estos catálogos, tal cual o adaptada. Se copia a su carpeta aquí, con el archivo de la licencia de su repositorio, y queda como una habilidad propia: se edita aquí y se enlaza como dice «Cómo agregar otra habilidad». El primero que se mira es el de Anthropic, porque es el oficial.

- **[knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), de Anthropic:** Un complemento por área para Claude Cowork, como ventas, finanzas, legal, mercadeo, diseño, recursos humanos, soporte, datos y producto. Su licencia, Apache 2.0, pide además avisar en cada archivo lo que se le cambió.
- **[alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills):** Un catálogo grande, de ingeniería, mercadeo, producto, cumplimiento, finanzas, operaciones, investigación y asesoría para la gerencia. Su licencia es MIT.
- **[borghei/Claude-Skills](https://github.com/borghei/Claude-Skills):** Otro catálogo grande, de áreas parecidas, que trae también agentes y herramientas en Python, entre ellas unas para LinkedIn. Su licencia es MIT con Commons Clause, que no deja vender las habilidades ni cobrar por un servicio que dependa de ellas.
- **[phuryn/product-engineering](https://github.com/phuryn/product-engineering), de The Product Compass:** 43 habilidades en seis paquetes, para llevar un producto con agentes de programación desde la idea hasta los primeros clientes, pensadas para quien revisa el producto y no el código. Hay habilidades para decidir qué construir, como los segmentos, la competencia y la propuesta de valor, para revisar y lanzar una aplicación hecha con IA, con auditorías de seguridad y de rendimiento, para trabajar con varios agentes, para montar un SaaS con Next.js, Supabase, Clerk y Netlify, y para que un texto no suene escrito por una IA. Su compañero, [phuryn/pm-skills](https://github.com/phuryn/pm-skills), trae más de 100 habilidades de gestión de producto. Los dos tienen licencia MIT.
- **[slavingia/skills](https://github.com/slavingia/skills):** Habilidades para emprender un negocio, como validar la idea, conseguir los primeros clientes y poner los precios, sacadas del libro The Minimalist Entrepreneur, de Sahil Lavingia. No tiene licencia, así que no se puede copiar: solo se le toman ideas.

## Cómo quitar un enlace sin perder la habilidad

Solo con este comando de PowerShell, que quita el enlace y deja intacta la habilidad de aquí:

```
cmd /c rmdir "$env:USERPROFILE\.codex\skills\nombre"
```

Nunca con un borrado recursivo, como `Remove-Item -Recurse` o borrar una carpeta que tenga el enlace adentro: se llevaría también la habilidad de aquí.

Para quitar de una vez los enlaces de todas las habilidades de aquí, junto con lo demás que Trabajo Agéntico conectó a Claude y a Codex, se corre `node "Programas/Agents Global/Restaurar.mjs"`, como explica `Locales/Leeme.md`.

## Si se mueve Trabajo Agéntico

Si esta carpeta cambia de lugar o de nombre, los enlaces quedan rotos. Se arreglan volviendo a correr `node "Programas/Agents Global/Instalar.mjs"` desde la carpeta nueva, que cambia cada enlace roto por uno nuevo.
