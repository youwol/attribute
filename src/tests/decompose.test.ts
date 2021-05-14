import { createSerie, DataFrame } from '@youwol/dataframe'
import { PositionDecompositor, AttributeManager, EigenValuesDecompositor, ComponentDecompositor } from '../lib/decompose'

test('test 1 on AttributeManager', () => {
    const df = new DataFrame({
        positions: createSerie( {data: new Array(30).fill(0).map( (v,i) => i+1 ), itemSize: 3} ),
        a        : createSerie( {data: new Array(10).fill(0).map( (v,i) => i**2 ), itemSize: 1}),
        U        : createSerie( {data: new Array(30).fill(0).map( (v,i) => i+2 ), itemSize: 3} ),
        S        : createSerie( {data: new Array(60).fill(0).map( (v,i) => i+3 ), itemSize: 6} )
    })

    const mng = new AttributeManager(df)
    mng.add( new PositionDecompositor)
    mng.add( new ComponentDecompositor )

    const sol = [
        [ 'x',   'y',   'z', 'a',  'Ux', 'Uy',  'Uz',  'Sxx', 'Sxy', 'Sxz', 'Syy', 'Syz', 'Szz' ],
        [ 'positions', 'U' ],
        [ 'S' ],
        [ ]
    ]
    const sizes = [1, 3, 6, 9]
    sizes.forEach( (size,i) => expect(mng.names(size)).toEqual(sol[i]) )

    const itemSize = 1
    const names = mng.names( itemSize )
    names.forEach( name => console.log(name, mng.serie(itemSize, name)) )
})

test('test 2 on AttributeManager', () => {
    const df = new DataFrame({
        U        : createSerie( {data: new Array(30).fill(0).map( (v,i) => i+2 ), itemSize: 3} ),
        S        : createSerie( {data: new Array(60).fill(0).map( (v,i) => i+3 ), itemSize: 6} )
    })

    const mng = new AttributeManager(df)
    mng.add( new PositionDecompositor)
    mng.add( new ComponentDecompositor )
    mng.add( new EigenValuesDecompositor)

    const sol = [ 'Ux', 'Uy',  'Uz',  'Sxx', 'Sxy', 'Sxz', 'Syy', 'Syz', 'Szz', 'S1', 'S2', 'S3' ]
    console.log( mng.names(1) )
    expect(mng.names(1)).toEqual(sol)

    console.log( mng.serie(1, 'S1') )
})


// test('"decompose" on dataframe', () => {
//     const df = new DataFrame({
//         positions: createSerie( {data: new Array(30).fill(0).map( (v,i) => i+1 ), itemSize: 3} ),
//         a        : createSerie( {data: new Array(10).fill(0).map( (v,i) => i**2 ), itemSize: 1}),
//         U        : createSerie( {data: new Array(30).fill(0).map( (v,i) => i+2 ), itemSize: 3} ),
//         S        : createSerie( {data: new Array(60).fill(0).map( (v,i) => i+3 ), itemSize: 6} )
//     })

    
//     const names =  getNames(df, Type.Scalar)
//     console.log(names)

//     const sol = [
//         'x',   'y',   'z',
//         'a',
//         //'id', 
//         'U',   'Ux',  'Uy',  'Uz',
//         'Sxx', 'Sxy', 'Sxz', 'Syy', 'Syz', 'Szz'
//     ]
//     expect(sol).toEqual(names)

//     names.forEach( name => {
//         //console.log(name, getSerie(df, Type.Scalar, name) )
//         expect(getSerie(df, Type.Scalar, name)).toBeDefined()
//     })
// })

