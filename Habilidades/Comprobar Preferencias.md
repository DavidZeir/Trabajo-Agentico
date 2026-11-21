# Comprobar Preferencias

Así comprueba una habilidad de Trabajo Agéntico las preferencias del Director, `<Trabajo Agéntico>/Locales/Preferencias.json`, antes de empezar. Ahí está lo que cada Director decide a su manera: la familia del modelo y el razonamiento de cada papel, como `opus` con `high`, en la sección de cada programa, las paradas, que son los momentos en que la IA espera al Director, las vueltas máximas, el techo de cada revisor, las pruebas gemelas, que el Líder hace o no después de cada etapa, las líneas para una etapa propia, desde las que una pieza de un paso va en su propia etapa, y la sugerencia de los MCP de diseño, que las habilidades de diseño hacen hasta que el Director diga que no.

Corre este programa con tu modelo y tu razonamiento:

```
node "<Trabajo Agéntico>/Programas/Preferencias/Comprobar.mjs" --modelo <tu modelo> --razonamiento <tu razonamiento>
```

Tu modelo va con su nombre completo, como `claude-opus-5-5`. Saca tu modelo y tu razonamiento de los datos de la sesión que da tu programa, con los mismos nombres del selector de la ventana: en la app de escritorio de Claude, con la herramienta `get_session` y la sesión `self`, que dice `model` y `effort`. Si no sabes con certeza tu razonamiento, pregúntaselo al Director.

- **Si sale con el código 1:** Las preferencias están mal. Detente y muéstrale al Director lo que dice el programa.
- **Si sale con el código 2:** Tu sesión no es la que piden las preferencias. Detente y dale dos opciones: cambiar el modelo o el razonamiento en la ventana de tu programa, o cambiar las preferencias.
- **Si pasa:** Te muestra lo que piden las preferencias, y lo sigues en toda la habilidad. Cada familia sale con el nombre exacto de su versión de hoy, el que le da `<Trabajo Agéntico>/Programas/Preferencias/Modelos.json`: con ese se llama a los revisores y se lanzan los agentes de Codex, y con la familia, los de Claude, que no aceptan el nombre exacto. En una parada encendida esperas al Director, y en una apagada sigues solo. Ningún revisor da más vueltas que su techo, las pruebas gemelas solo se hacen si están encendidas, las piezas de un paso se parten en etapas con las líneas que piden, y los MCP de diseño solo se sugieren si esa sugerencia está encendida.
