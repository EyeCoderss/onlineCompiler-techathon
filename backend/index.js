const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const express = require("express");
const { json } = require("body-parser");
const morgan = require("morgan");
const fs = require("fs").promises;
const app = express();
const port  = process.env.PORT || 5000;
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
  const { stdout, stderr } = await exec(snippet);
  if (stderr != "") {
    return { status: 404, result: stderr };
  }
  return { status: 200, result: stdout };
}
app.post("/code", async (req, res) => {
  lang = req.body.language;
  code = req.body.code;
  inp = req.body.input || null;
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
      break;
    case "java" :
      ext = "java";
  }
  try {
    let err = await fs.writeFile("/app/code." + ext, code);
    if(inp){
      err = await fs.writeFile("/app/input.txt",inp);
    }
    let snippet = "";
    switch (lang) {
      case "cpp":
        if(inp){
          snippet = "g++ /app/code.cpp && ./a.out < /app/input.txt";
        }else{
          snippet = "g++ /app/code.cpp && ./a.out";
        }
        break;
      case "c":
        if(inp){
          snippet = "gcc /app/code.c && ./a.out < /app/input.txt";
        }else{
          snippet = "gcc /app/code.c && ./a.out";
        }
        break;
      case "python3":
        if(inp){
          snippet = "python3 /app/code.py < /app/input.txt";
        }else{
          snippet = "python3 code.py";
        }
        break;
      case "java" :
        if(inp){
          snippet = "javac /app/code.java && java /app/code.class < input.txt";
        }else{
          snippet = "javac /app/code.java && java /app/code.class ";
        }
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