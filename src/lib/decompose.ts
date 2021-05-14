import { apply, DataFrame, ASerie } from '@youwol/dataframe'
import { norm, eigenValue, eigenVector } from '@youwol/math'

/**
 * Interface for serie decomposition
 */
export interface Decompositor {
    /**
     * Get the potential names decomposition
     * @param itemSize The expected itemSize
     * @param serie The current serie involved
     * @param name The name of the serie
     */
    names(itemSize: number, serie: ASerie, name: string): string[]
    /**
     * Get the potential serie decomposed
     * @param df The dataframe
     * @param itemSize The itemSize of the serie that we want
     * @param name The querying name
     */
    serie(df: DataFrame, itemSize: number, name: string): ASerie
}

export class AttributeManager {
    private ds_: Decompositor[] = []

    constructor(private readonly df: DataFrame) {
        //this.ds_.push( new ComponentDecompositor )
    }

    add(d: Decompositor) {
        this.ds_.push(d)
    }

    names(itemSize: number): string[] {
        let names: string[] = []

        // add series with same itemSize
        this.df.series.forEach( (info, name) => {
            if (info.serie.itemSize === itemSize) names.push(name)
            this.ds_.forEach( d => {
                names = [...names, ...d.names(itemSize, info.serie, name)]
            })
        })
        return names
    }

    serie(itemSize: number, name: string): ASerie {
        for (let [mname, info] of this.df.series) {
            if (info.serie.itemSize===itemSize && name===mname) {
                return info.serie.clone(false)
            }
        }
        for (let d of this.ds_) {
            const serie = d.serie(this.df, itemSize, name)
            if (serie) return serie
        }
        return undefined
    }
}

/**
 * Allows to get components of serie for which itemSize > 1. For instance,
 * for a serie named 'U' with itemSize=3, components names will be
 * `Ux`, `Uy` and `Uz`. The sam applies for smatrix3 and matrix3 (appended `xx`...).
 * For all other series, index number are appended to the serie's name, srating at zero.
 */
export class ComponentDecompositor implements Decompositor {
    names(itemSize: number, serie: ASerie, name: string) {
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

/**
 * Make x, y and z coordinates accessible as serie if `position' is
 * present in the dataframe.
 */
export class PositionDecompositor implements Decompositor {
    names(itemSize: number, serie: ASerie, name: string) {
        if (itemSize!==1 || name!=='positions') return []
        return ['x', 'y', 'z']
    }
    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize===1) {
            const serie = df.get('positions')
            switch(name) {
                case 'x' : return apply(serie, item => item[0] ).setName('x')
                case 'y' : return apply(serie, item => item[1] ).setName('y')
                case 'z' : return apply(serie, item => item[2] ).setName('z')
            }
        }
    }
}

/**
 * Eigen values for series with itemSize = 6
 */
export class EigenValuesDecompositor implements Decompositor {
    names(itemSize: number, serie: ASerie, name: string) {
        if (serie.itemSize!==6 || itemSize!==1) return []
        return [name+'1', name+'2', name+'3']
    }
    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize!==1) return undefined
        let newName = name.substring(0, name.length - 1)
        let serie   = df.get(newName)
        let id = parseInt( name.charAt(name.length-1) )

        if (serie === undefined)  return undefined
        if (serie.itemSize !== 6) return undefined
        if (id<1 || id>3)         return undefined

        return apply( eigenValue(serie), item => item[id-1] ).setName(name)
    }
}

/**
 * Eigen vectors for series with itemSize = 6
 */
export class EigenVectorsDecompositor implements Decompositor {
    names(itemSize: number, serie: ASerie, name: string) {
        if (serie.itemSize!==6 || itemSize!==3) return []
        return [name+'1', name+'2', name+'3']
    }
    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize!==3) return undefined
        let newName = name.substring(0, name.length - 1)
        let serie   = df.get(newName)
        let id = parseInt( name.charAt(name.length-1) )

        if (serie === undefined)  return undefined
        if (serie.itemSize !== 6) return undefined
        if (id<1 || id>3)         return undefined

        id -= 1 // now in between 0 and 2
        return apply( eigenVector(serie), item => [item[3*id], item[3*id+1], item[3*id+2]] ).setName(name)
    }
}

/**
 * Get the norm of any serie with itemSize > 1 (i.e., norm of any vector)
 */
export class VectorNormDecompositor implements Decompositor {
    names(itemSize: number, serie: ASerie, name: string) {
        if (serie.itemSize<=1 || itemSize!==1) return []
        return [name] // same name as the vector but willbe a scalar (itemSize=1)
    }

    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        if (itemSize!==1) return undefined

        let serie = df.get(name) // since same name
        if (serie === undefined)  return undefined

        if (serie.itemSize <=1 ) return undefined

        return norm(serie).setName(name)
    }
}

// ---------------------------------------------------------------------

const vector3Names  = ['x', 'y', 'z']
const smatrix3Names = ['xx', 'xy', 'xz', 'yy', 'yz', 'zz']
const matrix3Names  = ['xx', 'xy', 'xz', 'yx', 'yy', 'yz', 'zx', 'zy', 'zz']

// /**
//  * @brief BEURK for the moment !!!
//  */
// class Decompose {
//     constructor(private readonly df: DataFrame) {
//     }

//     getNames(type: Type): string[] {
//         let names: string[] = []
//         this.df.series.forEach( info => {
//             names = [...names, ...this.getNamesFromSerie(info.serie, type)]
//         })
//         return names
//     }

//     getSerie(type: Type, name: string): ASerie {
//         for (let [key, info] of this.df.series) {
//             const s = this.getSerieFromSerie(info.serie, type, name)
//             if (s) return s
//         }
//         return undefined
//     }

//     private getSerieFromSerie(serie: ASerie, type: Type, name: string): ASerie {
//         if (type===Type.Vector3  && serie.itemSize === 3) return serie.clone(false).setName(name)
//         if (type===Type.SMatrix3 && serie.itemSize === 6) return serie.clone(false).setName(name)
//         if (type===Type.Matrix3  && serie.itemSize === 9) return serie.clone(false).setName(name)

//         if (type===Type.Scalar && serie.name==='positions') {
//             switch(name) {
//                 case 'x' : return apply(serie, item => item[0] ).setName('x')
//                 case 'y' : return apply(serie, item => item[1] ).setName('y')
//                 case 'z' : return apply(serie, item => item[2] ).setName('z')
//                 //case 'id': return apply(serie,  (_, id) => id ).setName(name)
//             }
//             return undefined
//         }
    
//         if (type===Type.Scalar) {
//             if (serie.itemSize===1) {
//                 return serie.clone(false).setName(name)
//             }
//             if (serie.itemSize === 3) {
//                 for (let i=0; i<vector3Names.length; ++i) {
//                     if (name===serie.name+vector3Names[i]) {
//                         return apply(serie, item => item[i] ).setName(serie.name+vector3Names[i])
//                     }
//                 }
//                 if (name===serie.name) return norm(serie).setName(serie.name)
//             }
//             if (serie.itemSize === 6) {
//                 for (let i=0; i<smatrix3Names.length; ++i) {
//                     if (name===serie.name+smatrix3Names[i]) {
//                         return apply(serie, item => item[i] ).setName(serie.name+smatrix3Names[i])
//                     }
//                 }
//             }
//             if (serie.itemSize === 9) {
//                 for (let i=0; i<matrix3Names.length; ++i) {
//                     if (name===serie.name+matrix3Names[i]) {
//                         return apply(serie, item => item[i] ).setName(serie.name+matrix3Names[i])
//                     }
//                 }
//             }
//             return undefined
//         }
//     }

//     private getNamesFromSerie(serie: ASerie, type: Type): string[] {
//         if (type===Type.Scalar   && serie.name==='positions') return vector3Names
//         if (type===Type.Vector3  && serie.itemSize === 3) return [serie.name]
//         if (type===Type.SMatrix3 && serie.itemSize === 6) return [serie.name]
//         if (type===Type.Matrix3  && serie.itemSize === 9) return [serie.name]
//         if (type===Type.Scalar) {
//             //if (serie.itemSize === 1) return [serie.name, 'id']
//             if (serie.itemSize === 1) return [serie.name]
//             if (serie.itemSize === 3) return [serie.name, ...vector3Names.map( n => serie.name+n )]
//             if (serie.itemSize === 6) return smatrix3Names.map( n => serie.name+n )
//             if (serie.itemSize === 9) return matrix3Names.map( n => serie.name+n )
//         }
//         return []
//     }
// }
