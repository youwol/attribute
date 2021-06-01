import { DataFrame, Serie } from '@youwol/dataframe'
import { AttributeManager } from '../lib/manager'
import { VectorNormDecomposer } from '../lib/decompose'

const df = DataFrame.create({
    series: {
        U: Serie.create( {array: [1,2,3, 6,5,4, 9,5,7], itemSize: 3} )
    }
})

const norm = ( p => Math.sqrt(p[0]**2+p[1]**2+p[2]**2) )

test('test norm decomposer', () => {
    const mng = new AttributeManager(df, [
        new VectorNormDecomposer()
    ])
    
    expect( mng.names(1) ).toEqual( ['U'] )
    expect( mng.serie(1, 'U').array ).toEqual( [norm([1,2,3]), norm([6,5,4]), norm([9,5,7])] )

})
