import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const routes = [
  "/",
  "/about",
  "/inbound",
  "/outbound",
  "/corporate",
  "/contact",
  "/support",
];

const distDir = path.resolve("dist");
const templatePath = path.join(distDir, "index.html");
const serverEntryPath = path.resolve(
  "dist/server/entry-server.js"
);

const template = await fs.readFile(templatePath, "utf-8");

const serverModule = await import(
  pathToFileURL(serverEntryPath).href
);

const { render } = serverModule;

for (const route of routes) {
  console.log(`Pre-rendering ${route}`);

  const appHtml = render(route);

  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  if (route === "/") {
    await fs.writeFile(
      path.join(distDir, "index.html"),
      html,
      "utf-8"
    );
  } else {
    const routeDir = path.join(
      distDir,
      route.replace(/^\/+/, "")
    );

    await fs.mkdir(routeDir, {
      recursive: true,
    });

    await fs.writeFile(
      path.join(routeDir, "index.html"),
      html,
      "utf-8"
    );
  }
}

console.log("Pre-rendering completed successfully.");