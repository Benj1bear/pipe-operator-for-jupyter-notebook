# pipe-operator-for-jupyter-notebook
my attempt at implementing an R like pipe operator in jupyter notebook for IPython
# current progress
It works, but I need to test it e.g. for quality assurance.
# how to retrieve
```python
!git clone https://github.com/Benj1bear/pipe-operator-for-jupyter-notebook
```
# how to use
with the my my_pack library installed and the pipe.js file you should be able to pipe in an easy workflow using the pipe operator. Once in the jupyter notebook and the first cell has been run you can then use the shortcut Ctrl+Shift+L to insert a |> acting as the pipe operator. 
```python
[1,2,3] |> sum
# should print
# 6
```
