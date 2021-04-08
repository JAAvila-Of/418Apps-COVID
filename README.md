*Puedes visitar la aplicación web en --> [VERCEL](https://418-apps-covid.vercel.app/ "Aun no tiene un dominio propio")*

---

# 418Apps - COVID :syringe:

Este proyecto utiliza el FrameWork [Svelte](https://svelte.dev) para dar vida al FrontEnd.

Si no conoces aún este FrameWork y no sabes como iniciar, puedes hacerlo con el template predeterminado de Svelte utilizando el [degit](https://github.com/Rich-Harris/degit) de Rich Harris de esta manera.

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Es importante tener [Node.js](https://nodejs.org) instalado.*


## ¿De qué trata?

Esta aplicación sirve para poder ver el avance de la vacunación :syringe: contra el COVID-19 en el Perú con los datos que son liberados por el gobierno y el ministerio de salud MINSA.

Los datos pueden ser consultados [Aquí](https://www.datosabiertos.gob.pe/dataset/vacunaci%C3%B3n-contra-covid-19-ministerio-de-salud-minsa "Los datos se descargan en CSV").

![portada](img/portada.gif)

## ¿Qué tecnologías se utilizan?

A lo largo de la construcción de esta App se ha utilizado:

* [Svelte](https://svelte.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [TailWindCSS](https://tailwindcss.com/)
* [RollUP](https://rollupjs.org)

## ¿Cómo correrlo en local?

No hay ningún misterio para usar la aplicación en local.

1.  Primero debes clonar el repositorio teniendo instalado GIT en tu PC local o solo descargarlo si no tienes GIT.
    ```bash
    git clone https://github.com/JAAvila-Of/418Apps-COVID.git
    cd 418Apps-COVID
    ```
2.  Luego deberás instalar las dependencias requeridas.
    ```bash
    npm install --save
    ```
3.  Luego correlo en DEV
    ```bash
    npm run dev
    ```

Y listo! Recuerda tener Node y NPM instalado

## ¿Cómo generas y conviertes la data desde la página oficial?

He diseñado unos script para convertir la información de CSV a lo que realmente necesito, sin embargo todo eso lo estaré subiendo en otro repositorio ya que haré unos videos :cinema: enseñando como hacerlo. 

## ¿Puedo hacer PR (Pull Request)?

¡Claro que Sí! ... Pero siguiendo unas pocas normas:

1. **No refactorices la estructura:** Aunque es cierto que se puede mejorar mucho el código añadiendo "buenas prácticas", la estrutura en sí misma NO, porque se me hace mucho más cómodo trabajar bajo la estructura ya establecida.
2. **No utilices Linter o algún otro:** Ya que deseo que sea simple de entender y viendo que hay muchos desarrolladores que están empezando y quisiera enfocarme en ellos, hagámoslo sencillo solo usando Prettier.
3. **No hagas PRs grandes:** Igual que lo anterior deseo enfocarme en los desarrolladores que están empezando. Mientras más pequeño sea el PR mejor, haré un merge rápido y así varios pueden colaborar!.
4. **No agregues tecnologías nuevas:** Esto es muy importante. No hace falta agregar algún otro FrameWork o tecnología A NO SER QUE SEA REALMENTE NECESARIO.

## Cosas con las que puedes hacer PR
* [x] Hacer que sea embedible (embed page) :floppy_disk:
* [x] Traducciones a lenguas nativas :speech_balloon:
* [x] Performance :rocket:
* [x] Testing :gem: