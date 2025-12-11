const rotateX = document.getElementById('rotx'), rotateY = document.getElementById('roty'), rotateZ = document.getElementById('rotz')
const scaleX = document.getElementById('scax'), scaXValue = document.getElementById('scaxRange'), scaleY = document.getElementById('scay'), scaYValue = document.getElementById('scayRange')
const skewX = document.getElementById('skx'), skewY = document.getElementById('sky')
const tranX = document.getElementById('tranx'), tranY = document.getElementById('trany'), tranZ = document.getElementById('tranz')
const transformPreview = document.querySelector('.preview'), cssCodeText = document.getElementById('CSS-code'), resetBtn = document.getElementById('reset-btn'), copyCode = document.querySelector('.copy-btn')

window.onload = () => {
    resetElements()
}

const propertiesColumns = document.querySelectorAll('.column input')
propertiesColumns.forEach(element => {
    element.addEventListener('input', () => {
        generateTransformStyles()
        transformPreview.style.opacity = '0.75'          
    })
});

const generateTransformStyles = () => {
    const scaleCode = [ scaleX.value > 1 ? scaleX.value : '', scaleY.value > 1 ? scaleY.value : '' ]
        .filter(Boolean)
        .join(' ')
    transformPreview.style.scale = scaleCode

    const transCode = tranX.value != 0 || tranY.value != 0 || tranZ.value != 0 ? `${tranX.value}px ${tranY.value}px ${tranZ.value}px` : ''
    transformPreview.style.translate = transCode

    const rotX = rotateX.value > 0 ? `rotateX(${rotateX.value}deg)` : ''
    const rotY = rotateY.value > 0 ? `rotateY(${rotateY.value}deg)` : ''
    const rotZ = rotateZ.value > 0 ? `rotateZ(${rotateZ.value}deg)` : ''
    const rotateCode = [rotX, rotY, rotZ].filter(Boolean).join(' ')

    const skewCode = [ skewX.value > 0 ? `${skewX.value}deg` : '', skewY.value > 0 ? `${skewY.value}deg` : '' ]
        .filter(Boolean) //* Elimina valores vacíos
        .join(", ") //* Convierte el array a string y agrega el caracter que se desee entre los elementos

    const code = [ rotateCode, skewCode ? `skew(${skewCode})` : '' ]
        .filter(Boolean)
        .join(" ")

    cssCodeText.value =
        `${code ? `transform: ${code};` : ""}` +
        `${transCode ? `\ntranslate: ${transCode};` : ""}` +
        `${scaleCode ? `\nscale: ${scaleCode};` : ""}` +
        `\n\n/* Agregar al elemento padre */\nperspective: 200px;`

    transformPreview.style.transform = !code.includes("rotate") ? `rotate(0deg) ${code}` : code
}

const resetElements = () => {   
    propertiesColumns.forEach(element => { element.value = 0 });
    scaleX.value = scaXValue.value = scaleY.value = scaYValue.value = 1
    cssCodeText.value = '', transformPreview.style.transform = '', transformPreview.style.opacity = '1', transformPreview.style.scale = '1', transformPreview.style.translate = '0'
}

resetBtn.addEventListener('click', () => {
    generateTransformStyles()
    resetElements()
})

copyCode.addEventListener('click', () => {
    cssCodeText.select()
    cssCodeText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cssCodeText.value)
})