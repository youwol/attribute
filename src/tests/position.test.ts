import { createSerie, DataFrame } from '@youwol/dataframe'
import { AttributeManager } from '../lib/manager'
import { PositionDecomposer } from '../lib/decompose'

const df = new DataFrame({
    positions: createSerie( {data: [1,2,3, 6,5,4, 9,5,7], itemSize: 3} )
})

test('test position decomposer', () => {
    const mng = new AttributeManager(df, [
        new PositionDecomposer() // default names are ['x', 'y', 'z']
    ])
    
    expect( mng.names(1) ).toEqual( ['x', 'y', 'z'] )
    expect( mng.serie(1, 'x').array ).toEqual( [1,6,9] )
    expect( mng.serie(1, 'y').array ).toEqual( [2,5,5] )
    expect( mng.serie(1, 'z').array ).toEqual( [3,4,7] )
})

test('test position decomposer with renaming', () => {
    const mng = new AttributeManager(df, [
        new PositionDecomposer(['X0', 'X1', 'X2'])
    ])
    
    expect( mng.names(1) ).toEqual( ['X0', 'X1', 'X2'] )
    expect( mng.serie(1, 'X0').array ).toEqual( [1,6,9] )
    expect( mng.serie(1, 'X1').array ).toEqual( [2,5,5] )
    expect( mng.serie(1, 'X2').array ).toEqual( [3,4,7] )
})
