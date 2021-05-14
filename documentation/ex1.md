```ts
import { createSerie, DataFrame } from '@youwol/dataframe'
import {
    AttributeManager, PositionDecompositor, 
    EigenValuesDecompositor, EigenVectorsDecompositor
} from '../lib/decompose'

const df = new DataFrame({
    positions: createSerie( {
        data: new Array(30).fill(0).map( (v,i) => i+1 ),
        itemSize: 3
    }),
    a: createSerie({
        data: new Array(10).fill(0).map( (v,i) => i**2 ),
        itemSize: 1
    }),
    U: createSerie({
        data: new Array(30).fill(0).map( (v,i) => i+2 ),
        itemSize: 3
    }),
    S: createSerie({
        data: new Array(60).fill(0).map( (v,i) => i+3 ),
        itemSize: 6
    })
})

const mng = new AttributeManager(df)
mng.add( new PositionDecompositor)
mng.add( new ComponentDecompositor )
mng.add( new EigenValuesDecompositor)
mng.add( new EigenVectorDecompositor)

// ['x','y','z','a','Ux','Uy','Uz','Sxx','Sxy','Sxz','Syy','Syz','Szz', 'S1', 'S2', 'S3']
console.log( mng.names(1) ) 

// ['positions','U']
console.log( mng.names(3) )

// ['S']
console.log( mng.names(6) )

// []
console.log( mng.names(9) )

const serie = mng.serie(1, 'x')
```