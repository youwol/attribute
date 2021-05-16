import { ASerie, DataFrame } from "@youwol/dataframe";
import { Decomposer } from "../decomposer";
/**
 * Allows to get components of serie for which itemSize > 1. For instance,
 * for a serie named 'U' with itemSize=3, components names will be
 * `Ux`, `Uy` and `Uz`. The sam applies for smatrix3 and matrix3 (appended `xx`...).
 * For all other series, index number are appended to the serie's name, srating at zero.
 */
export declare class ComponentDecomposer implements Decomposer {
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): any[];
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
