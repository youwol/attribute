import { ASerie, DataFrame } from "@youwol/dataframe";
import { Decomposer } from "../decomposer";
/**
 * Allows to get components of serie for which itemSize > 1.
 *
 * For instance, for a serie named `U` with `itemSize=3`, components names will be
 * `Ux`, `Uy` and `Uz` (3 components).
 *
 * For a serie named `S` with `itemSize=6` (symmetric rank 2 tensor of dim 3), components names will be
 * `Sxx`, `Sxy`, `Sxz`, `Syy`, `Syz` and `Szz` (6 components).
 *
 * For a serie named `S` with `itemSize=9` (general rank 2 tensor of dim 3), components names
 * will be `Sxx`, `Sxy`, `Sxz`, `Syx`, `Syy`, `Syz`, `Szx`, `Szy` and `Szz` (9 components).
 *
 * For all other series, index number are appended to the serie's name, starting at zero.
 * For example, for a serie named `E` with `itemSize=4`, components names will be
 * `E0`, `E1`, `E2` and `E3`.
 */
export declare class ComponentDecomposer implements Decomposer {
    /**
     * @hidden
     */
    names(df: DataFrame, itemSize: number, serie: ASerie, name: string): any[];
    /**
     * @hidden
     */
    serie(df: DataFrame, itemSize: number, name: string): ASerie;
}
