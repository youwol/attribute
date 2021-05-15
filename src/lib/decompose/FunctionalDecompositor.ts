import { ASerie, DataFrame } from "@youwol/dataframe"
import { Decompositor } from "../decompositor"

export type Functional = {
    (df: DataFrame): ASerie
}

/**
 * User define attribute based on a DataFrame
 * @example
 * ```ts
 * const mng = new AttributeManager(df, [
 *     new FunctionalDecompositor(1, 'MyAttr', (df: DataFrame) => {
 *         const fct = p => p[0]**2 - p[1]***3 + Math.abs(p[2])
 *         df.get('positions').map( p => fct(p) )
 *     })
 * ])
 * ```
 * @example
 * ```ts
 * const mng = new AttributeManager(df, [
 *     new FunctionalDecompositor(3, 'zscaled', (df: DataFrame) => {
 *         const scale = 10
 *         df.get('positions').map( (p,i) => [p[0], p[1], p[2]*scale] )
 *     })
 * ])
 * ```
 */
export class FunctionalDecompositor implements Decompositor {
    /**
     * 
     * @param itemSize The item size of the attribute
     * @param name The name of the atribute
     * @param fct The fonctional
     * @see [[Functional]]
     */
    constructor(readonly itemSize: number, readonly name: string, readonly fct: Functional) {
    }

    names(df: DataFrame, itemSize: number, serie: ASerie, name: string) {
        if (itemSize !== this.itemSize) return []
        
        const s = this.fct(df)
        if (!s) return []

        return [this.name]
    }

    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize!==this.itemSize || this.name!==name) return undefined
        return this.fct(df).setName(this.name)
    }
}
