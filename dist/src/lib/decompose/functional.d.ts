import { ASerie, DataFrame } from "@youwol/dataframe";
import { Decomposer } from "../decomposer";
export declare type Functional = {
    (df: DataFrame): ASerie;
};
/**
 * User define attribute based on a DataFrame
 * @example
 * ```ts
 * const mng = new AttributeManager(df, [
 *     new FunctionalDecomposer(1, 'MyAttr', (df: DataFrame) => {
 *         const fct = p => p[0]**2 - p[1]***3 + Math.abs(p[2])
 *         df.get('positions').map( p => fct(p) )
 *     })
 * ])
 * ```
 * @example
 * ```ts
 * const mng = new AttributeManager(df, [
 *     new FunctionalDecomposer(3, 'zscaled', (df: DataFrame) => {
 *         const scale = 10
 *         df.get('positions').map( (p,i) => [p[0], p[1], p[2]*scale] )
 *     })
 * ])
 * ```
 */
export declare class FunctionalDecomposer implements Decomposer {
    readonly itemSize: number;
    readonly name: string;
    readonly fct: Functional;
    /**
     *
     * @param itemSize The item size of the attribute
     * @param name The name of the atribute
     * @param fct The fonctional
     * @see [[Functional]]
     */
    constructor(itemSize: number, name: string, fct: Functional);
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[];
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
