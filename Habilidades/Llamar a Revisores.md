# Llamar a Revisores

Así se llama a un revisor desde una habilidad de Trabajo Agéntico. La habilidad dice a cuál llama, en qué momento, qué tiene que revisar y en qué carpeta se guardan sus respuestas.

## A cuál se llama

Lo dicen las preferencias del Director, `<Trabajo Agéntico>/Locales/Preferencias.json`, en la sección del programa de la sesión: el Revisor Principal, en `RevisorPrincipal`, y el Revisor de Etapa, en `RevisorEtapa`. Cada uno dice su programa, por lo general el de la otra empresa, o el mismo si el Director tiene una sola suscripción.

## Los comandos

Se le llama por la terminal, en solo lectura, con el nombre exacto del modelo en vez de `<modelo>`, el que muestra `Comprobar.mjs` junto a la familia que piden las preferencias, con su razonamiento en vez de `<razonamiento>` y, en Codex, con el archivo donde se guarda su respuesta, como dice «Las respuestas», en vez de `<archivo de la respuesta>`:

- **Claude:**

  ```
  claude -p --model <modelo> --effort <razonamiento> --tools "Read,Grep,Glob" --disallowedTools "Edit,Write,NotebookEdit,Bash,mcp__*"
  ```

- **Codex:**

  ```
  codex exec -m <modelo> -c 'model_reasoning_effort="<razonamiento>"' -s read-only --color never -o "<archivo de la respuesta>"
  ```

Si el comando no está instalado, avísale al Director, porque él es quien lo instala, y recuérdale que lo instale desde un PowerShell normal, y no desde una terminal de Claude o de Codex. Así queda instalado en el sistema, a la vista de todos los programas, y no encerrado dentro del paquete de una de esas apps. Se instala con `npm install -g @anthropic-ai/claude-code@latest` o con `npm install -g @openai/codex@latest`.

Si la llamada falla porque el comando no encuentra el modelo o no lo acepta, no lo cambies por otro modelo ni por una versión anterior. Lo más probable es que el comando esté desactualizado y todavía no conozca los modelos nuevos: detente y pídele al Director que lo actualice desde un PowerShell normal, con el mismo comando con que se instala.

## El pedido

En cada pedido van el papel del revisor, como «Revisor de Plan» o «Revisor de Etapa», el texto de `<Trabajo Agéntico>/Habilidades/Revisores.md` y lo que tiene que revisar. Los cambios van dentro del pedido, sacados con `git diff`, porque con `claude -p` el revisor no puede correr comandos. Pásale el pedido por la entrada estándar, porque con los cambios adentro puede pasar del largo que Windows permite en un comando. Llámalo desde la carpeta que tiene el código que revisa. No le digas que algo ya fue aprobado ni le pases argumentos a favor.

## Si se queda sin cupo

Si una llamada falla, revisa su salida y su registro para confirmar si fue por el cupo de su suscripción. Si fue por el cupo, el mensaje dice a qué hora vuelve, como «try again at 7:10 AM» en Codex o «resets 1:10am» en Claude. Si faltan 12 horas o menos, espera hasta esa hora y vuelve a llamarlo. Si faltan más, detente y avísale al Director.

## Las respuestas

Cada respuesta se guarda con el papel y la vuelta en el nombre, como `Revisor de Plan 1.md` o `Revisor de Etapa 2.md`, en la carpeta que dice la habilidad.

Si crees que un hallazgo bloqueante es un caso teórico o muy poco probable, no lo dejes a un lado por tu cuenta: respóndele al revisor con tus argumentos en la vuelta siguiente. Si te da la razón, lo retira, y si no, lo mantiene. Solo en la última vuelta la última palabra es tuya: si un hallazgo que ya discutieron sigue ahí y tú sigues pensando que es teórico, pásalo a las sugerencias del resumen, con los argumentos de los dos, como pide la regla 'Nada de robustez especulativa' de `AGENTS.md`.
