import { createSerie, DataFrame } from '@youwol/dataframe'
import { AttributeManager } from '../lib/manager'
import { FunctionalDecomposer } from '../lib/decompose'

test('test functional on AttributeManager', () => {
    const df = new DataFrame({
        positions: createSerie( {data: [1,2,3, 1,4,3, 7,2,5], itemSize: 3} ),
    })

    const mng = new AttributeManager(df, [
        new FunctionalDecomposer(1, 'f', (df: DataFrame) => {
            const fct = (x,y,z) => x**2-y**3+Math.abs(z)
            const positions = df.get('positions')
            return positions.map( p => fct(p[0], p[1], p[2]) )
        })
    ])

    expect(mng.names(1)).toEqual(['f'])

    const fct = (x,y,z) => x**2-y**3+Math.abs(z)
    expect(mng.serie(1, 'f').array).toEqual( [fct(1,2,3), fct(1,4,3), fct(7,2,5)] )
    expect(mng.serie(1, 'f').name).toEqual('f')
})
