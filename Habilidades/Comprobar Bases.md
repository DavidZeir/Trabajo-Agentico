# Comprobar las Bases

Así comprueba una habilidad de Trabajo Agéntico que las bases de un proyecto estén bien citadas: que cada enlace y cada documento nombrado existan, que cada sección citada esté en su documento, que cada índice nombre los documentos de su carpeta y que cada idea de unas `Ideas Aprobadas.md` tenga su cita en su documento dueño. También revisa las carpetas de los subproyectos. No juzga lo que dicen los documentos, porque eso lo hacen las habilidades.

Desde la raíz del proyecto, corre este programa:

```
node "<Trabajo Agéntico>/Programas/Bases/Comprobar.mjs"
```

- **Si sale con el código 1:** Dice cada cita rota, con su documento y su línea. Si tu habilidad cambió las bases, corrige las que rompió tu cambio. Las demás, muéstraselas al Director, sin corregirlas, porque todo cambio a las bases pasa por él.
- **Si sale con el código 0:** Todas las citas están bien, y dice cuántas revisó. Sigue con lo que pide tu habilidad.
- **Si avisa que quedan corchetes dobles:** No es un error, y no cambia el código con el que sale. Son partes de las bases que todavía no se llenan. Si tu habilidad las necesita, llénalas con el Director, como dice `<Trabajo Agéntico>/Habilidades/Llenar las Plantillas.md`.
