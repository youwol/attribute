import { apply, ASerie, DataFrame } from "@youwol/dataframe"
import { Decompositor } from "../decompositor"

/**
 * Make x, y and z coordinates accessible as serie if `position' is
 * present in the dataframe.
 */
 export class PositionDecompositor implements Decompositor {
    names(df:DataFrame, itemSize: number, serie: ASerie, name: string) {
        if (itemSize!==1 || name!=='positions') return []
        return ['x', 'y', 'z']
    }
    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize===1) {
            const serie = df.get('positions')
            switch(name) {
                case 'x' : return apply(serie, item => item[0] ).setName('x')
                case 'y' : return apply(serie, item => item[1] ).setName('y')
                case 'z' : return apply(serie, item => item[2] ).setName('z')
            }
        }
    }
}