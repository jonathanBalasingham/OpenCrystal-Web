
export function gcd(a, b) {
    if (a === 0)
        return b;
    return gcd(b % a, a);
}

export function findGCD(arr, n) {
    let result = arr[0];
    for (let i = 1; i < n; i++) {
        result = gcd(arr[i], result);

        if (result === 1) {
            return 1;
        }
    }
    return result;
}

export const prime_comp = (composition) => {
    if (composition) {
        if (composition.includes("."))
            return composition
        else {
            let re = /[a-zA-Z]+\d+[.]?/g
            let matches = [...composition.matchAll(re)]
            let counts = matches.map((x) => x[0])

            let elems = counts.map((x) => {
                const re = /[a-zA-Z]+/g
                return [...x.matchAll(re)]
            }).map((x) => x[0][0])

            let elem_counts = counts.map((x) => {
                const re = /[\d]+/g
                return [...x.matchAll(re)]
            }).map((x) => parseInt(x[0]))
            const gcd_counts = findGCD(elem_counts, elem_counts.length)
            const prime_counts = elem_counts.map((x) => x / gcd_counts)
            let prime_comp = ""
            for (let i = 0; i < elems.length; i++){
                prime_comp += elems[i] + prime_counts[i] + " "
            }
            return prime_comp.slice(0, -1)
        }
    } else {
        return ""
    }
}

export const extractCrystalMetaData = (cifAsJson) => {
    return {
        "MnemonicId": 0,
        "Composition": cifAsJson["_chemical_formula_sum"] || "",
        "PrimeComposition": prime_comp(cifAsJson["_chemical_formula_sum"]) || "",
        "ChemicalName": cifAsJson["_chemical_name_common"] || "",
        "Has3dStructure": !(cifAsJson["_atom_site"] === undefined || cifAsJson["_atom_site"] === []),
        "IsDisordered": cifAsJson["_atom_site"]["_atom_site_disorder_group"] || false,
    }
}

const removeTrailing = (str) => {
    if (str)
        return safeParse(str.split("(")[0])
    else
        return undefined
}

// OK
export const extractAtoms = (cifAsJson) => {
    if (cifAsJson["_atom_site"]) {
        return cifAsJson["_atom_site"].map((atom) => {
            return {
                "X": removeTrailing(atom["_atom_site_fract_x"]),
                "X_cart": removeTrailing(atom["_atom_site_cartn_x"]),
                "Y": removeTrailing(atom["_atom_site_fract_y"]),
                "Y_cart": removeTrailing(atom["_atom_site_cartn_y"]),
                "Z": removeTrailing(atom["_atom_site_fract_z"]),
                "Z_cart": removeTrailing(atom["_atom_site_cartn_z"]),
                "Label": atom["_atom_site_label"],
                "Symbol": atom["_atom_site_type_symbol"]
            }
        })
    } else {
        return []
    }
}

// OK
export const extractBonds = (cifAsJson) => {
    if (cifAsJson["_geom_bond"]) {
        return cifAsJson["_geom_bond"].map((bond) => {
            return {
                "Label1": bond["_geom_bond_atom_site_label_1"],
                "Label2": bond["_geom_bond_atom_site_label_2"],
                "Distance": removeTrailing(bond["_geom_bond_distance"]),
            }
        })
    } else {
        return []
    }
}

const safeParse = (val) => {
    if (val)
        return parseFloat(val)
    else return undefined
}

export const extractUnitCell = (cifAsJson) => {
    let symm = "("
    if (cifAsJson._space_group_symop_operation_xyz) {
        symm += cifAsJson._space_group_symop_operation_xyz.reduce((total, n) => "'" + n._space_group_symop_operation_xyz + "'," + total, "")
    } else if (cifAsJson._symmetry_equiv_pos) {
        symm += cifAsJson._symmetry_equiv_pos.reduce((total, n) => "'" + n._symmetry_equiv_pos_as_xyz + "'," + total, "")
    }

    let final_symm = symm.slice(0, -1) + ")"

    return {
        "A": safeParse(cifAsJson["_cell_length_a"]),
        "B": safeParse(cifAsJson["_cell_length_b"]),
        "C": safeParse(cifAsJson["_cell_length_c"]),
        "Alpha": safeParse(cifAsJson["_cell_angle_alpha"]),
        "Beta": safeParse(cifAsJson["_cell_angle_beta"]),
        "Gamma": safeParse(cifAsJson["_cell_angle_gamma"]),
        "CellVolume": safeParse(cifAsJson["_cell_volume"]),
        "SymmetryOperators": final_symm
    }
}