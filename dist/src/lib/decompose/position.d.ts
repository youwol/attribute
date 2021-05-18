import { Decomposer } from "../decomposer";
import { ASerie, DataFrame } from "@youwol/dataframe";
/**
 * Make x, y and z coordinates accessible as serie if `position' is
 * present in the dataframe.
 */
export declare class PositionDecomposer implements Decomposer {
    private readonly names_;
    /**
     *
     * @param names_ The names for the position coordinates
     * @default names = `['x', 'y', 'z']`
     */
    constructor(names_?: string[]);
    /**
     * @hidden
     */
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[];
    /**
     * @hidden
     */
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
