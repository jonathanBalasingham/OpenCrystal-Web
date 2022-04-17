

export const toCartesian = (unitCell, point) => {
    if (unitCell === null)
        return point

    console.log("unit cell is")
    console.log(unitCell)
    //let res = multiplyMatrices(unitCell, [[point[0]], [point[1]], [point[2]]])
    let res = multiplyMatrices([point], unitCell)
    console.log(res)
    return res[0]//[res[0], res[1], res[0]]
}

function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

export function addVecs(a,b){
    return a.map((e,i) => e + b[i]);
}

export function cellParamsToMatrix(a,b,c,alpha,beta,gamma) {
    alpha = Math.PI * alpha / 180
    beta = Math.PI * beta / 180
    gamma = Math.PI * gamma / 180
    let volume = cellVolume(a,b,c,alpha,beta,gamma)
    console.log("volume is")
    console.log(volume)
    //let row1 = [a, b*Math.cos(gamma), c*Math.cos(beta)]
    //let row2 = [0, b*Math.sin(gamma), c*(Math.cos(alpha)-Math.cos(beta)*Math.cos(gamma))/(Math.sin(gamma))]
    //let row3 = [0, 0, volume/(a*b*Math.sin(gamma))]
    let row1 = [a, 0, 0]
    let row2 = [b*Math.cos(gamma), b*Math.sin(gamma), 0]
    let row3 = [c*Math.cos(beta), c*(Math.cos(alpha)-Math.cos(beta)*Math.cos(gamma))/(Math.sin(gamma)), volume/(a*b*Math.sin(gamma))]
    return [row1, row2, row3]
}

function cellVolume(a,b,c,alpha,beta,gamma) {
    return a * b * c * Math.sqrt(1 - Math.cos(alpha) ** 2 - Math.cos(beta) ** 2 - Math.cos(gamma) ** 2 + 2 * Math.cos(alpha) * Math.cos(beta) * Math.cos(gamma))
}