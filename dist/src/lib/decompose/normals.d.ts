import { ASerie, DataFrame } from "@youwol/dataframe";
import { Decomposer } from "../decomposer";
/**
 * Get normals to the triangles of a mesh
 */
export declare class NormalsDecomposer implements Decomposer {
    private readonly name;
    constructor(name?: string);
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): string[];
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
