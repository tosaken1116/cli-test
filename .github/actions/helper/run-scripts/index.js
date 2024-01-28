import fs from "fs";
import { exec } from "child_process";
import core from "@actions/core";

// 入力パラメータの取得
const path = core.getInput("path");

// 指定されたパスのpackage.jsonを読み込む
const packageJsonPath = `${path}/package.json`;
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
const scripts = packageJson.scripts;

Object.keys(scripts).forEach((script) => {
    exec(`npm run ${script}`, { cwd: path }, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error executing script ${script}: ${err}`);
            process.exit(1);
        }
        console.log(`Output for script ${script}: ${stdout}`);
    });
});
