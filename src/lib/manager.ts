import { DataFrame, ASerie } from '@youwol/dataframe'
import { Decompositor } from './decompositor'

export class AttributeManager {
    private ds_: Decompositor[] = []

    constructor(private readonly df: DataFrame, options: Decompositor[] = undefined) {
        //this.ds_.push( new ComponentDecompositor )
        if (options) this.ds_ = options
    }

    /**
     * Add a new decompositor in this [[AttributeManager]]
     */
    add(d: Decompositor) {
        this.ds_.push(d)
    }

    /**
     * Remove all registered decompositors from this manager
     */
    clear() {
        this.ds_ = []
    }

    /**
     * Get all possible decomposed names for a given itemSize
     * @param itemSize 
     * @returns 
     */
    names(itemSize: number): string[] {
        let names = new Set<string>()

        // add series with same itemSize
        this.df.series.forEach( (info, name) => {
            if (info.serie.itemSize === itemSize) names.add(name)
            this.ds_.forEach( d => {
                d.names(this.df, itemSize, info.serie, name).forEach( n => names.add(n) )
            })
        })
        return Array.from(names)
    }

    /**
     * For a given itemSize and a decomposed's name, get the corresponding serie
     */
    serie(itemSize: number, name: string): ASerie {
        for (let [mname, info] of this.df.series) {
            if (info.serie.itemSize===itemSize && name===mname) {
                return info.serie.clone(false).setName(name)
            }
        }
        for (let d of this.ds_) {
            const serie = d.serie(this.df, itemSize, name)
            if (serie) return serie
        }
        return undefined
    }
}