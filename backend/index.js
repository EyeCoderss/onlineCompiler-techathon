const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const express = require("express");
const { json } = require("body-parser");
const morgan = require("morgan");
const fs = require("fs").promises;
const port=process.env.PORT || 5000;
// const { response } = require("express");
// const { write } = require("node:fs");
const app = express();
app.use(morgan("dev"));
app.use(json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("X-powered-by");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method == "OPTIONS") {
    res.status(200);
    res.end();
  } else {
    next();
  }
});
/*{
  language : string,
  code : string,
  input: string,
}*/
async function runCode(snippet) {
  if(typeof snippet == "string"){
        const { stdout, stderr } = await exec(snippet);
        if (stderr != "") {
        return { status: 404, result: stderr };
        }
        return { status: 200, result: stdout };
  }

}
app.post("/code", async (req, res) => {
  lang = req.body.language;
  code = req.body.code;
  let ext = "";
  switch (lang) {
    case "c":
      ext = "c";
      break;
    case "cpp":
      ext = "cpp";
      break;
    case "python":
      ext = "py";
  }
  try {
    let err = await fs.writeFile("code." + ext, code);
    let snippet = "";
    switch (lang) {
      case "cpp":
        snippet = "g++ code.cpp & a.exe";
        break;
      case "c":
        snippet = "gcc code.c & a.exe";
        break;
      case "python":
        snippet = "python code.py";
        break;
    }
    let codeResult = await runCode(snippet);
    res.status(200);
    res.send(codeResult);
  } catch (err) {
    console.log(err);
    res.status(200);
    res.send({
      status: 400,
      result: err.stderr,
    });
  }
});
app.listen(port, () => {
  console.log("listening on http://localhost:5000");
});
// const ls = spawn("node", ["server"]);

// ls.on("close", (code) => {
//   console.log(`child process exited with code ${code}`);
// });