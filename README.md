# pipe-operator-for-jupyter-notebook
my attempt at implementing an R like pipe operator in jupyter notebook for IPython

# how to retrieve
```python
!git clone https://github.com/Benj1bear/pipe-operator-for-jupyter-notebook
```
# how to use
with the my my_pack library installed and the pipe.js file you should be able to pipe in an easy workflow using the pipe operator. Once in the jupyter notebook and the first cell has been run you can then use the shortcut Ctrl+Shift+L to insert a |> acting as the pipe operator. Make sure to run cells using Shift+Enter.
```python
[1,2,3] |> sum
# should print
# 6
```
# Notes
To unload the javascript whilst (I think) retaining the variables onced jupyter notebook is saved you can refresh the page.

For the pipe operator to work you need the my_pack module installed that's from my other repo 'my_pack' which has the interpret, pipe, and import_js functions that enable it to work.
