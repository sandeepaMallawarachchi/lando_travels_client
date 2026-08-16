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

function extractSEO(html) {
  const tags = [];

  const patterns = [
    /<title>[\s\S]*?<\/title>/gi,
    /<meta\s+name="description"[^>]*>/gi,
    /<link\s+rel="canonical"[^>]*>/gi,
    /<meta\s+property="og:[^"]+"[^>]*>/gi,
    /<meta\s+name="twitter:[^"]+"[^>]*>/gi,
  ];

  for (const pattern of patterns) {
    const matches = html.match(pattern);

    if (matches) {
      tags.push(...matches);
    }
  }

  return tags.join("\n");
}

function removeSEO(html) {
  let result = html;

  result = result.replace(
    /<title>[\s\S]*?<\/title>/gi,
    ""
  );

  result = result.replace(
    /<meta\s+name="description"[^>]*>/gi,
    ""
  );

  result = result.replace(
    /<link\s+rel="canonical"[^>]*>/gi,
    ""
  );

  result = result.replace(
    /<meta\s+property="og:[^"]+"[^>]*>/gi,
    ""
  );

  result = result.replace(
    /<meta\s+name="twitter:[^"]+"[^>]*>/gi,
    ""
  );

  return result;
}

for (const route of routes) {
  console.log(`Pre-rendering ${route}`);

  const appHtml = render(route);

  const seoTags = extractSEO(appHtml);
  const cleanAppHtml = removeSEO(appHtml);

  let html = template;

  /*
   * Put route-specific SEO metadata inside <head>.
   */
  html = html.replace(
    "</head>",
    `${seoTags}\n</head>`
  );

  /*
   * Put only the actual React application inside #root.
   */
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${cleanAppHtml}</div>`
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