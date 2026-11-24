# Archivos

Esta carpeta es del Director. Aquí va lo del proyecto que no va en git: sus notas, sus ideas sin ordenar, referencias, recursos, datos, capturas y respaldos, las entregas, como un programa compilado o un informe enviado, y, en las áreas donde el resultado del trabajo es un archivo pesado, como un diseño o un video, el resultado mismo. Lo que manda en cada caso lo dicen las bases, que pueden citar un archivo de aquí. La organiza como quiera, con las carpetas y los archivos que le sirvan.

- **Fuera de git:** Nada de lo que se pone aquí entra al repositorio, salvo este archivo, que está para que la carpeta llegue con cada clon y diga para qué es. Por eso aquí cabe lo personal, lo privado y lo que pesa mucho. En otro computador, lo demás se copia a mano o se enlaza, como dice `Fuera de Git.md`.
- **Fuera del alcance de la IA:** Claude y Codex no leen esta carpeta, no buscan en ella y no cambian ni borran nada aquí por su cuenta, como dice el `AGENTS.md` del proyecto. Si el Director quiere que usen algo de aquí, se lo pide o lo cita en una base.
- **Las bases mandan:** Lo que vale para el proyecto está en `Bases/`. Una idea que nace aquí entra a las bases con `/incorporar-idea`.

## Un orden sugerido

Si le sirve al Director, este orden funciona en cualquier área. Cada carpeta se crea cuando hace falta, y se puede adaptar:

- **`Referencias`:** Lo que se consulta, pero no entra al resultado, como normas, manuales, catálogos de proveedores, ejemplos de la competencia o estudios.
- **`Recursos`:** Lo que entra al resultado, como logos, fotos, plantillas, fuentes tipográficas, datos de entrada o grabaciones.
- **`Trabajos`:** Una carpeta por trabajo, con la fecha al principio, como `2026-11-23 Informe de ventas`. Lleva lo que se edita y el resultado final, como un programa compilado, un diseño terminado o un informe enviado.
- **`Histórico`:** Lo que ya no se usa, pero se guarda, como versiones anteriores, material de un sistema viejo o trabajos cerrados.

## Carpetas compartidas

Una carpeta de aquí puede ser un enlace a una carpeta compartida en un servicio como Dropbox, OneDrive o Google Drive. Así, varias personas y varios computadores trabajan con los mismos archivos, sin copias que se desactualicen, y los permisos de cada persona los pone ese servicio. Por ejemplo, `Recursos` puede enlazar a una carpeta compartida con todo el equipo, y `Gerencia`, a una compartida solo con quien deba verla, con sus propios `Trabajos` e `Histórico` adentro. Si el proyecto ya tiene su carpeta en el servicio, se puede enlazar cada una de sus subcarpetas con su mismo nombre, y la carpeta completa como `Archivos Sueltos`, para llegar también a los archivos que están sueltos en ella. Lo que pesa demasiado para el servicio, o no hace falta compartir ni sincronizar, va en carpetas normales de aquí, que solo están en cada computador.

- **El enlace se crea en cada computador:** Cada persona tiene la carpeta compartida en un lugar distinto, así que la IA le pregunta dónde está y crea el enlace. En Windows, con el modo de programador activo y sin administrador:

  ```
  cmd /c mklink /D "Archivos\[Nombre]" "[Ruta de la carpeta compartida en este computador]"
  ```

  Cada carpeta enlazada se anota en `Fuera de Git.md`, con su nombre en el servicio y no con su ruta, que cambia en cada computador.
- **Disponible sin conexión:** La carpeta compartida tiene que estar marcada así en el servicio. Si sus archivos están solo en la nube, la IA no los puede leer.
- **Lo que se cambia aquí les llega a todos:** Un cambio o un borrado en una carpeta enlazada se sincroniza a cada persona que la comparte, y git no lo puede deshacer. Por eso la IA no cambia, mueve ni borra nada en ellas sin que el Director se lo autorice, aunque le haya pedido leerlas. Para quitar un enlace se borra solo el enlace, con `cmd /c rmdir "Archivos\[Nombre]"`, sin `/s`, que no toca lo que hay en la carpeta compartida.
- **Las copias de trabajo no las llevan:** Una copia de trabajo no trae `Archivos/` ni sus enlaces.
