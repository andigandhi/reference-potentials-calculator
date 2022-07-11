var textinput = [
    document.getElementById("phTxt"),
    document.getElementById("rhe"),
    document.getElementById("she"),
    document.getElementById("ssc"),
    document.getElementById("li"),
    document.getElementById("na")]

// E_RHE = E_in + convertValues[in][0] + convertValues[in][1]*pH
var convertValues = [
    null,
    [0,0],
    [0,0.059],
    [0.223,0.059],
    [-3.040,0.059],
    [-2.714,0.059]
]

var lastModified = 1

function calculate(i) {
    // Makes recalculation possible for changes pH
    if (i==0) {
        i=lastModified
    } else {
        lastModified = i
    }

    // vars for output values and pH
    var out = [null,0,0,0,0,0]
    var pH = parseFloat(textinput[0].value)

    // calculate RHE potential
    out[1] = parseFloat(textinput[i].value) + convertValues[i][0] + convertValues[i][1]*pH

    // calculate ll other potentials based on RHE pot
    for(var j=2;j<6;j++) {
        out[j] = out[1] - convertValues[j][0] - convertValues[j][1]*pH
    }

    // write the values
    if (!isNaN(out[1])) {
        writeValues(out)
    } else {
        textinput[i].value = textinput[i].value
    }
}

function writeValues(out) {
    for(var i=1;i<6;i++) {
        textinput[i].value = Number((out[i]).toFixed(3))
    }
}