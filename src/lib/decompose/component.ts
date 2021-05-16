import { apply, ASerie, DataFrame } from "@youwol/dataframe"
import { Decomposer } from "../decomposer"

/**
 * Allows to get components of serie for which itemSize > 1. For instance,
 * for a serie named 'U' with itemSize=3, components names will be
 * `Ux`, `Uy` and `Uz`. The sam applies for smatrix3 and matrix3 (appended `xx`...).
 * For all other series, index number are appended to the serie's name, srating at zero.
 */
export class ComponentDecomposer implements Decomposer {
    /**
     * @hidden 
     */
    names(df:DataFrame, itemSize: number, serie: ASerie, name: string) {
        // Passed name is, e.g., 'U' and itemSize=3
        if (name===serie.name && serie.itemSize===1) return []
        if (itemSize>1) return []
        if (name==='positions' || name==='indices') return []

        switch(serie.itemSize) {
            case 3: return vector3Names .map( n => name+n )
            case 6: return smatrix3Names.map( n => name+n )
            case 9: return matrix3Names .map( n => name+n )
        }

        let names = []
        for (let i=0; i<itemSize; ++i) names.push(name+i)
        return names
    }
    /**
     * @hidden 
     */
    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        // vector3
        let newName = name.substring(0, name.length - 1)
        let serie   = df.get(newName)
        if (serie) {
            for (let i=0; i<vector3Names.length; ++i) {
                if (name===newName+vector3Names[i]) {
                    return apply(serie, item => item[i] ).setName(newName+vector3Names[i])
                }
            }
        }

        // smatrix3 and matrix3
        newName = name.substring(0, name.length - 2)
        serie   = df.get(newName)
        if (serie) {
            for (let i=0; i<smatrix3Names.length; ++i) {
                if (name===newName+smatrix3Names[i]) {
                    return apply(serie, item => item[i] ).setName(newName+smatrix3Names[i])
                }
            }
            for (let i=0; i<matrix3Names.length; ++i) {
                if (name===newName+matrix3Names[i]) {
                    return apply(serie, item => item[i] ).setName(newName+matrix3Names[i])
                }
            }
        }

        // others
        newName = name.substring(0, name.length - 1)
        serie   = df.get(newName)
        if (serie) {
            for (let i=0; i<itemSize; ++i) {
                if (name===newName+i) {
                    return apply(serie, item => item[i] ).setName(newName+i)
                }
            }
        }
    }
}

const vector3Names  = ['x', 'y', 'z']
const smatrix3Names = ['xx', 'xy', 'xz', 'yy', 'yz', 'zz']
const matrix3Names  = ['xx', 'xy', 'xz', 'yx', 'yy', 'yz', 'zx', 'zy', 'zz']