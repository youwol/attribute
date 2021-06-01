Create a decomposer in order to have the norm of any vector3 series
```ts
import { DataFrame, ASerie } from '@youwol/dataframe'
import { norm }              from '@youwol/math'
import { Decomposer }        from '@youwol/attribute'

class VectorNormDecomposer implements Decomposer {
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string) {
        if (serie.itemSize !== 3 || itemSize !== 1) return []
        return [name] // same name as the vector3 but will be a scalar (itemSize=1)
    }

    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize !== 1) return undefined

        let serie = df.get(name) // since same name
        if (serie === undefined)  return undefined
        if (serie.itemSize !== 3) return undefined

        return norm(serie).setName(name)
    }
}
```
