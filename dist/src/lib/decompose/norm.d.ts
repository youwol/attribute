import { ASerie, DataFrame } from "@youwol/dataframe";
import { Decomposer } from "../decomposer";
/**
 * Get the norm of any serie with itemSize > 1 (i.e., norm of any vector)
 */
export declare class VectorNormDecomposer implements Decomposer {
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[];
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
