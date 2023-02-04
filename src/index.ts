#!/usr/bin/env node
import { program } from "commander";
import * as fs from "fs-extra";
import * as path from "path";
import * as yaml from "yaml";
import noindent from "noindent";

interface Options {
  config: string;
  output: string;
}

interface Config {
  links: {
    url: string;
    countapi?: string;
  }[];
}

program
  .version(JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), { encoding: "utf-8" })).version)
  .requiredOption("-o, --output <path>", "path to output")
  .requiredOption("-c, --config <path>", "path to config yaml file");

program.parse(process.argv);

const options = program.opts() as Options;

(async () => {
  const { links } = yaml.parse(await fs.readFile(options.config, { encoding: "utf-8" })) as Config;

  await fs.ensureDir(options.output);

  for (const [shorthand, linkCfg] of Object.entries(links ?? {})) {
    await fs.ensureDir(path.join(options.output, shorthand));
    const counterApiCode = `<script>fetch("https://api.countapi.xyz/hit/${linkCfg.countapi ?? ""}");</script>`;
    const html = noindent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0; url='${linkCfg.url}'" />
          ${linkCfg.countapi ? counterApiCode : ""}
        </head>
        <body>
          <p>Please follow <a href="${linkCfg.url}">this link</a>.</p>
        </body>
      </html>
      `);
    await fs.writeFile(path.join(options.output, shorthand, "index.html"), html);
    console.log(`Generated link for ${shorthand}`);
  }
})();
