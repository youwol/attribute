import { ASerie, DataFrame } from "@youwol/dataframe";
import { Decomposer } from "../decomposer";
/**
 * Eigen values for series with itemSize = 6
 */
export declare class EigenValuesDecomposer implements Decomposer {
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[];
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
/**
 * Eigen vectors for series with itemSize = 6
 */
export declare class EigenVectorsDecomposer implements Decomposer {
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[];
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
