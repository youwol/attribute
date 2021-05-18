import { createSerie, DataFrame } from '@youwol/dataframe'
import { AttributeManager } from '../lib/manager'
import { NormalsDecomposer } from '../lib/decompose'

test('test normals on AttributeManager', () => {
    const df = new DataFrame({
        positions: createSerie( {data: [0,0,0, 1,0,0, 1,1,0], itemSize: 3} ),
        indices  : createSerie( {data: [0,1,2], itemSize: 3} )
    })

    const mng = new AttributeManager(df, [
        new NormalsDecomposer('n')
    ])
    
    expect(mng.names(3)).toEqual(['positions', 'n', 'indices'])
    expect(mng.serie(3, 'n').array).toEqual([0,0,1])
})
