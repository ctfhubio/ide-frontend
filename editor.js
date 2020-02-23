/**
 * global vars to store info
 * @param editorlang
 * @param lang_n_source 
*/

let editorlang = 'cpp';
let lang_n_source  ={};
    lang_n_source['cpp']="";
    lang_n_source['c']="";
    lang_n_source['python2']="";
    lang_n_source['python3']="";
    lang_n_source['nodejs8']="";

/**
 * On language change set editor language as pre user request
 * push the language and code in a array
*/
document.querySelector('select').onchange = function(){   
    let lang = this.selectedOptions[0].getAttribute('data'); 
    let lang_value = this.selectedOptions[0].value; 
    
    // get existing source code
    let source_code = window.editor.getValue();

    // get current lang from global editorlang
    // prepare and push in global lang_n_source
    var lang_name = editorlang;
    var source = source_code;
    lang_n_source[lang_name] = source;

    // update editorlang
    editorlang = lang_value;

    // update lang in editor
    window.monaco.editor.setModelLanguage(editor.getModel(), lang);
    
    // check if we already have code for selected lang
    let prevoius_code = lang_n_source[editorlang];

    // if yes push it to editor
    if(prevoius_code.length!=0){
        window.editor.setValue(prevoius_code);
    }
    else{
        window.editor.setValue('');
    }

}   

/**
 * Monaco editor  
*/

require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.17.1/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
        baseUrl: 'https://unpkg.com/monaco-editor@0.17.1/min/'
    };
    importScripts('https://unpkg.com/monaco-editor@0.17.1/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById('container'), {
        value: [].join('\n'),
        language: 'cpp',
        theme: 'vs-dark'
    });
});

