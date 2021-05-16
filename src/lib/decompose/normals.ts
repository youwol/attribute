import { ASerie, DataFrame } from "@youwol/dataframe"
import { vec } from "@youwol/math"
import { Decomposer } from "../decomposer"

/**
 * Get normals to the triangles of a mesh
 */
export class NormalsDecomposer implements Decomposer {
    constructor(private readonly name: string = 'normals') {
    }
    names(df:DataFrame, itemSize: number, serie: ASerie, name: string) {
        if (itemSize !== 3) return []
        if (!df.constains('positions') && !df.constains('indices')) return []
        return [this.name]
    }
    serie(df: DataFrame, itemSize: number, name: string): ASerie {
        const positions = df.get('positions')
        const indices   = df.get('indices')
        if (!positions || !indices) return undefined
        
        return indices.map( t => {
            const v1 = positions.itemAt(t[0]) as vec.Vector3
            const v2 = positions.itemAt(t[1]) as vec.Vector3
            const v3 = positions.itemAt(t[2]) as vec.Vector3
            return vec.cross(vec.create(v1, v2) as vec.Vector3, vec.create(v1, v3) as vec.Vector3)
        }).setName(this.name)
    }
}