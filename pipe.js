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

// command shortcuts
Jupyter.keyboard_manager.command_shortcuts.add_shortcut('Shift-Enter', {
    help : 'preprocess cell',
    handler : 
    function (event) {
        console.log("hello");
    }
});

// editing shortcuts
Jupyter.keyboard_manager.edit_shortcuts.add_shortcut('Shift-Enter', {
    help : 'preprocess cell',
    handler : 
    function (event) {
        // add cell, focus it, hide output, interpret, replace
        let cell=Jupyter.notebook.get_selected_cell();
        let code=cell.get_text();
        if (code.includes("|>") !== true){return}
        console.log("interpreting code...");
        cell.set_text("interpret('"+code+"',pipe,'|>')");
        // update
        cell=Jupyter.notebook.get_selected_cell();
        cell.execute();
        // update
        cell=Jupyter.notebook.get_selected_cell();
        cell.set_text(code);
    }
});
