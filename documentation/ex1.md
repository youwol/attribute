```ts
import { createSerie, DataFrame } from '@youwol/dataframe'
import {
    AttributeManager, PositionDecomposer, 
    EigenValuesDecomposer, EigenVectorsDecomposer,
    NormalsDecomposer, FunctionalDecomposer
} from '@youwol/attribute'

const df = new DataFrame({
    positions: createSerie( {data: [...], itemSize: 3} ),
    indices:   createSerie( {data: [...], itemSize: 3} ),
    a: createSerie( {data: [...], itemSize: 1} ),
    U: createSerie( {data: [...], itemSize: 3} ),
    S: createSerie( {data: [...], itemSize: 6} )
})

const mng = new AttributeManager(df, [
    new PositionDecomposer,
    new ComponentDecomposer,
    new EigenValuesDecomposer,
    new EigenVectorDecomposer,
    new NormalsDecomposer('n'),
    new FunctionalDecomposer(1, 'MyAttr', (df: DataFrame) => {
        const fct = (x,y,z) => x**2 - y***3 + Math.abs(z)
        const positions = df.get('positions')
        positions.map( p => fct(p[0], p[1], p[2]) )
    })
])

// ['x','y','z',
//  'a',
//  'Ux','Uy','Uz',
//  'Sxx','Sxy','Sxz','Syy', 'Syz','Szz',
//  'S1', 'S2', 'S3',
//  'nx', 'ny', 'nz',
//  'MyAttr'
// ]
console.log( mng.names(1) ) // itemSize=1

// ['positions','U', 'S1', 'S2', 'S3', 'n']
console.log( mng.names(3) ) // itemSize=3

// ['S']
console.log( mng.names(6) ) // itemSize=6

// [] nothing...
console.log( mng.names(9) ) // itemSize=9

// First eigen value
console.assert( mng.serie(1, 'S1') !== undefined )

// First eigen vector
console.assert( mng.serie(3, 'S1') !== undefined )

// z-component of the normals
console.assert( mng.serie(1, 'nz') !== undefined )

// normal vectors
console.assert( mng.serie(3, 'n') !== undefined )
```