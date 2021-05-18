- in `NormalDecomposer`, be carreful of the duplicated `Int32Array` instead of `Float32Array` (since we use `map` on indices)

- Add a prefix in the ctor of EigenValue/EigenVectors? It is pertinent since several
series can have be decomposed into eigen vectors? => add a prefix to the name?: `S` --> `ES1`

- In `Decomposer.names()`, refact: name is the same as the serie's name? Check!!!

- 