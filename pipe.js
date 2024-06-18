pipe_operator = document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === "L") {        
        // get cell,get cursor, set text, set cursor
        let cell = Jupyter.notebook.get_selected_cell();
        // to allow inserts
        // just make sure that these are on the same line then you're done
        let cursor = cell.code_mirror.getCursor();
        // constrain to one line only
        let lines = cell.get_text().split("\n");
        console.log(lines);
        console.log(lines.length);
        let line = lines[cursor.line];
        let line_before = lines.slice(0,cursor.line).join("\n")+"\n";
        let line_after = "\n"+lines.slice(cursor.line+1).join("\n");
        // before and after for the individual line
        line = line.slice(0,cursor.ch)+" |> "+line.slice(cursor.ch)
        // adjust for code cell before and after then combine together
        if (cursor.line > 0){
            line=line_before+line;
        }
        // +1 because it's an index
        if (cursor.line+1 < lines.length){
            line=line+line_after;
        }
        cell.set_text(line);
        // set the cursor
        cursor.ch += 4;
        cell.code_mirror.setCursor(cursor);
  }
});
function custom_run_cell() {
    /* my function for preprocessing jupyter notebook cells */
    // get cell, get input, overwrite with interpretation with javascript
    let cell=Jupyter.notebook.get_selected_cell();
    let code=cell.get_text();
    if (code.includes("|>") === true){
        // to ensure it's always a string for the remainder of insertions
        code=code.split("'").join("\\\\\'")
        code=code.split('"').join('\\\\\"')
        let line = 'code=\"\"\"'+code+'\"\"\"';// needs more work done for more complex string inputs
        // interpret piping only (it will give a string)
        line+="\ninterpretation=interpret(code,pipe,'|>')"
        // format for multiple line javascript execution
        line+='\ncode="\\\\n".join(code.split("\\n"))'
        line+='\ninterpretation="\\\\n".join(interpretation.split("\\n"))'
        line+="\ninterpretation='\\\"'.join(interpretation.split(\"'\"))"
        line+='\ninterpretation="\\\'".join(interpretation.split(\'"\'))'
        // executing javascript
        cell_str="Jupyter.notebook.get_selected_cell()"
        line+="\nJavascript('"+cell_str+".set_text(\"'+interpretation+'\");"
        line+=cell_str+".execute();"+cell_str+".set_text(\"'+code+'\");')"
        cell.set_text(line);
        // update
        cell=Jupyter.notebook.get_selected_cell();
    }
    cell.execute();
    // Jupyter.notebook.select_next();
    // // insert cell below or move on to next
    // if (Jupyter.notebook.get_selected_cell() === cell){
    //     Jupyter.notebook.insert_cell_below();
    //     Jupyter.notebook.select_next();
    // }
}
// command shortcuts
Jupyter.keyboard_manager.command_shortcuts.add_shortcut('Shift-Enter', {
    help : 'preprocess cell',
    handler : custom_run_cell
});
// editing shortcuts
Jupyter.keyboard_manager.edit_shortcuts.add_shortcut('Shift-Enter', {
    help : 'preprocess cell',
    handler : custom_run_cell
});
