import { ASerie, DataFrame } from "@youwol/dataframe";
import { Decomposer } from "../decomposer";
/**
 * Make x, y and z coordinates accessible as serie if `position' is
 * present in the dataframe.
 */
export declare class PositionDecomposer implements Decomposer {
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[];
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
