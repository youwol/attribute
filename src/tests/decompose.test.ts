import { createSerie, DataFrame } from '@youwol/dataframe'
import { getNames, getSerie, Type } from '../lib/decompose'

test('"decompose" on dataframe', () => {
    const df = new DataFrame({
        positions: createSerie( {data: new Array(30).fill(0).map( (v,i) => i+1 ), itemSize: 3} ),
        a        : createSerie( {data: new Array(10).fill(0).map( (v,i) => i**2 ), itemSize: 1}),
        U        : createSerie( {data: new Array(30).fill(0).map( (v,i) => i+2 ), itemSize: 3} ),
        S        : createSerie( {data: new Array(60).fill(0).map( (v,i) => i+3 ), itemSize: 6} )
    })

    
    const names =  getNames(df, Type.Scalar)
    console.log(names)

    const sol = [
        'x',   'y',   'z',
        'a',
        'id', 
        'U',   'Ux',  'Uy',  'Uz',
        'Sxx', 'Sxy', 'Sxz', 'Syy', 'Syz', 'Szz'
    ]
    expect(sol).toEqual(names)

    names.forEach( name => {
        //console.log(name, getSerie(df, Type.Scalar, name) )
        expect(getSerie(df, Type.Scalar, name)).toBeDefined()
    })
})

