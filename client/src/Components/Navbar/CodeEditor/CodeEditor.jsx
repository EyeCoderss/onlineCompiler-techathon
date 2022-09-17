import React,{useRef,useState} from "react";
import './CodeEditor.css';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

function CodeEditor(){
    const [result,setResult]=useState("");
    const [selects,setSelects]=useState("c");
    const editorRef = useRef(null);
    const outref = useRef(null);
    const errRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }
  
  function showValue() {
    alert(editorRef.current.getValue());
    
  }
  function setLanguage(e){
    setSelects(e.target.value)
    editorRef.current.setValue('');
  }
  function sendData() {
    fetch('http://localhost:5000/code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language: selects ,
            code: editorRef.current.getValue()
        })
    }).then(res => res.json()).then(res => {
        setResult(res.result);
        if (res.status == 200) {
            outref.current.value =res.result;
            errRef.current.value = "";
        } else {
            errRef.current.value = res.result;
            outref.current.value = "";
        }
    }).catch(e => console.log(e));
  }
    return(<>
      <div className="code-container">
        <div className="dropdown">
        <select className="dropdown-list">
            <option selected value="light-mode">Light Mode</option>
            <option value="dark-mode">Dark Mode</option>
            
        </select>
        <select value={selects} onChange={ setLanguage}className="dropdown-list">
            <option selected value="c">c</option>
            <option value="cpp">c++</option>
            <option  value="python">python</option>
        </select>
        <button className="submit" onClick={sendData}>Compile & Run</button>
        </div >
        <div className="editor-terminal">
            {/* <div className="editor">
            <textarea className="text-editor" placeholder="Enter Your Code Here!"/> 
            </div> */}
            
            <Editor
                height="100%"
                width="700px"
                
                defaultLanguage={selects}  
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
                className="text-editor"
                style={{borderRadius:"10px"}}
                
            />
         <div className="terminal">
            <textarea ref={errRef} className=" text-terminal" placeholder="Terminal"/>
            <textarea ref={outref} className="text-output" placeholder="Output"/>

         </div>
        </div>
      </div>
    </>
    )
}

export default CodeEditor;