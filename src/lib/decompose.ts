import { apply, DataFrame, ASerie } from '@youwol/dataframe'
import { norm } from '@youwol/math'

/*
    REAFCTORING:
    --> Todo

    WHAT IS MISSING:
    --> Count of the serie for the decomposition
*/

export enum Type {
    Scalar,
    Vector3,
    SMatrix3,
    Matrix3
}

/**
 * Get all decomposed names from a DataFrame of a given type
 */
export function getNames(df: DataFrame, type: Type) {
    return new Decompose(df).getNames(type)
}

/**
 * Get a named serie of a given type using existing method of decomposition
 */
export function getSerie(df: DataFrame, type: Type, name: string) {
    return new Decompose(df).getSerie(type, name)
}

// ---------------------------------------------------------------------

/**
 * @brief BEURK for the moment !!!
 */
class Decompose {
    constructor(private readonly df: DataFrame) {
    }

    getNames(type: Type): string[] {
        let names: string[] = []
        this.df.series.forEach( info => {
            names = [...names, ...this.getNamesFromSerie(info.serie, type)]
        })
        return names
    }

    getSerie(type: Type, name: string): ASerie {
        for (let [key, info] of this.df.series) {
            const s = this.getSerieFromSerie(info.serie, type, name)
            if (s) return s
        }
        return undefined
    }

    private getSerieFromSerie(serie: ASerie, type: Type, name: string): ASerie {
        if (type===Type.Vector3  && serie.itemSize === 3) return serie.clone(false).setName(name)
        if (type===Type.SMatrix3 && serie.itemSize === 6) return serie.clone(false).setName(name)
        if (type===Type.Matrix3  && serie.itemSize === 9) return serie.clone(false).setName(name)

        if (type===Type.Scalar && serie.name==='positions') {
            switch(name) {
                case 'x' : return apply(serie, item => item[0] ).setName('x')
                case 'y' : return apply(serie, item => item[1] ).setName('y')
                case 'z' : return apply(serie, item => item[2] ).setName('z')
                case 'id': return apply(serie,  (_, id) => id ).setName(name)
            }
            return undefined
        }
    
        if (type===Type.Scalar) {
            if (serie.itemSize===1) {
                return serie.clone(false).setName(name)
            }
            if (serie.itemSize === 3) {
                for (let i=0; i<vector3Names.length; ++i) {
                    if (name===serie.name+vector3Names[i]) {
                        return apply(serie, item => item[i] ).setName(serie.name+vector3Names[i])
                    }
                }
                if (name===serie.name) return norm(serie).setName(serie.name)
            }
            if (serie.itemSize === 6) {
                for (let i=0; i<smatrix3Names.length; ++i) {
                    if (name===serie.name+smatrix3Names[i]) {
                        return apply(serie, item => item[i] ).setName(serie.name+smatrix3Names[i])
                    }
                }
            }
            if (serie.itemSize === 9) {
                for (let i=0; i<matrix3Names.length; ++i) {
                    if (name===serie.name+matrix3Names[i]) {
                        return apply(serie, item => item[i] ).setName(serie.name+matrix3Names[i])
                    }
                }
            }
            return undefined
        }
    }

    private getNamesFromSerie(serie: ASerie, type: Type): string[] {
        if (type===Type.Scalar   && serie.name==='positions') return vector3Names
        if (type===Type.Vector3  && serie.itemSize === 3) return [serie.name]
        if (type===Type.SMatrix3 && serie.itemSize === 6) return [serie.name]
        if (type===Type.Matrix3  && serie.itemSize === 9) return [serie.name]
        if (type===Type.Scalar) {
            if (serie.itemSize === 1) return [serie.name, 'id']
            if (serie.itemSize === 3) return [serie.name, ...vector3Names.map( n => serie.name+n )]
            if (serie.itemSize === 6) return smatrix3Names.map( n => serie.name+n )
            if (serie.itemSize === 9) return matrix3Names.map( n => serie.name+n )
        }
        return []
    }
}

const vector3Names  = ['x', 'y', 'z']
const smatrix3Names = ['xx', 'xy', 'xz', 'yy', 'yz', 'zz']
const matrix3Names  = ['xx', 'xy', 'xz', 'yx', 'yy', 'yz', 'zx', 'zy', 'zz']