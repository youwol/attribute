import { ASerie, DataFrame } from "@youwol/dataframe"

/**
 * Interface for serie decomposition
 */
 export interface Decompositor {
     
    /**
     * Get the potential names decomposition
     * @param df The dataframe supporting the series
     * @param itemSize The expected itemSize
     * @param serie The current serie involved
     * @param name The name of the serie
     */
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[]

    /**
     * Get the potential serie decomposed
     * @param df The dataframe
     * @param itemSize The itemSize of the serie that we want
     * @param name The querying name
     */
    serie(df: DataFrame, itemSize: number, name: string): ASerie
}
