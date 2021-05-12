```ts
const df = new DataFrame({
    positions: createSerie( {data: new Array(30).fill(0).map( (v,i) => i+1 ),  itemSize: 3} ),
    a        : createSerie( {data: new Array(10).fill(0).map( (v,i) => i**2 ), itemSize: 1} ),
    U        : createSerie( {data: new Array(30).fill(0).map( (v,i) => i+2 ),  itemSize: 3} ),
    S        : createSerie( {data: new Array(60).fill(0).map( (v,i) => i+3 ),  itemSize: 6} )
})

const names =  getNames(df, Type.Scalar)

console.log( names )
console.log( getSerie(df, Type.Scalar, 'x') )
console.log( getSerie(df, Type.Vector3, 'U') )
```

Should display
```sh
[  'x',   'y',   'z',   'a',
    'id',  'U',   'Ux',  'Uy',
    'Uz',  'Sxx', 'Sxy', 'Sxz',
    'Syy', 'Syz', 'Szz'
]
```
```sh
Serie {
    array: [
        1,  4,  7, 10, 13,
    16, 19, 22, 25, 28
    ],
    itemSize: 1,
    shared: false,
    name_: 'x'
}
```
```sh
Serie {
    array: [
        1,  2,  3,  4,  5,  6,  7,  8,  9,
    10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25, 26, 27,
    28, 29, 30
    ],
    itemSize: 3,
    shared: false,
    name_: 'U'
}
```