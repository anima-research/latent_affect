# Latent Affect

The source of the website of Latent Affect, a research program at Anima Labs. The site describes the program as "Empirical research into the emotional and motivational structure of language model cognition". It is a static site with two pages, a landing page and a paper template.

## What's here

- `index.html` is the landing page, with three sections:
  - About, with the subsections "Starting point", "Preliminary findings" and "Where it's going";
  - Papers, with one placeholder entry, credited to Scott Sauers, that links to the paper template;
  - Related work, which links to two Anthropic publications, "Emotion Concepts in Large Language Models" and "On the Functional Role of Emotion Concepts".
- `sauers_paper_title.html` is the paper template. It has the site's logo and a breadcrumb back to the landing page, and no paper text.
- `style.css` styles the landing page and `paper.css` the paper template. Both pages also load `css/theme.css`, which holds normalize.css and a set of color variables.
- `toc.js` highlights the entry in the landing page's table of contents for the section that crosses the top third of the window as you scroll. `sprites_swarm.js` animates small drifting dots on the landing page.
- `exports/` holds the images: the landing page's background, the paper template's header background and the logo.
- `Dockerfile` and `nginx.conf` serve the site with nginx.
- `.gitignore` ignores every file except web assets (HTML, CSS, JavaScript, images and fonts) and the files it names.
- `LICENSE` is the MIT License.

## Viewing it

The pages load their own styles, scripts and images by relative paths, and their fonts from Google Fonts. So in a clone of the repository, opening `index.html` in a browser shows the site.

To serve it with Docker, set `PORT` to the port nginx should listen on:

```sh
docker build -t latent-affect .
docker run -e PORT=8080 -p 127.0.0.1:8080:8080 latent-affect
```

Then open http://127.0.0.1:8080. The `-p` option publishes the port on the loopback address only.
