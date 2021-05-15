import { ASerie, DataFrame } from "@youwol/dataframe"
import { norm } from '@youwol/math'
import { Decompositor } from "../decompositor"

/**
 * Get the norm of any serie with itemSize > 1 (i.e., norm of any vector)
 */
 export class VectorNormDecompositor implements Decompositor {
    names(df:DataFrame, itemSize: number, serie: ASerie, name: string) {
        if (serie.itemSize<=1 || itemSize!==1) return []
        return [name] // same name as the vector but willbe a scalar (itemSize=1)
    }

    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize!==1) return undefined

        let serie = df.get(name) // since same name
        if (serie === undefined)  return undefined

        if (serie.itemSize <=1 ) return undefined

        return norm(serie).setName(name)
    }
}