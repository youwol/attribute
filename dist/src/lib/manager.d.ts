import { DataFrame, ASerie } from '@youwol/dataframe';
import { Decomposer } from './decomposer';
/**
 * Manager of (virtual or not) attributes from series
 */
export declare class AttributeManager {
    private readonly df;
    private ds_;
    constructor(df: DataFrame, options?: Decomposer[]);
    /**
     * Add a new Decomposer in this [[AttributeManager]]
     */
    add(d: Decomposer): void;
    /**
     * Remove all registered decomposers from this manager
     */
    clear(): void;
    /**
     * Get all possible decomposed names for a given itemSize
     * @param itemSize
     * @returns
     */
    names(itemSize: number): string[];
    /**
     * For a given itemSize and a decomposed's name, get the corresponding serie
     */
    serie(itemSize: number, name: string): ASerie;
}
