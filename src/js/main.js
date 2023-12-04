
/* Rotate */
const rotateX = document.getElementById('rotx'), rotateY = document.getElementById('roty'), 
    rotateZ = document.getElementById('rotz')
/* Scale */
const scaleX = document.getElementById('scax'), scaXValue = document.getElementById('scaxRange'),
    scaleY = document.getElementById('scay'), scaYValue = document.getElementById('scayRange')
/* Skew */
const skewX = document.getElementById('skx'), skewY = document.getElementById('sky')
/* Translate */
const tranX = document.getElementById('tranx'), tranY = document.getElementById('trany'), 
    tranZ = document.getElementById('tranz')
const transformPreview = document.querySelector('.preview'), cssCodeText = document.getElementById('CSS-code'),
    resetBtn = document.getElementById('reset-btn'), copyCode = document.querySelector('.copy-btn')

window.onload = () => {
    resetElements()
    generateTransformStyles()
    cssCodeText.value = ''
}

const propertiesColumns = document.querySelectorAll('.column input')
propertiesColumns.forEach(element => {
    element.addEventListener('input', () => {
        generateTransformStyles()
        transformPreview.style.opacity = '0.75'
    })
});

const generateTransformStyles = () => {   
    let scaleCode, translateCode, skewCode, rotX, rotY, rotZ
    /* Scale */
    scaleCode = scaleX.value > 1 ? `${scaleX.value} ` : '', scaleCode += scaleY.value > 1 ? `${scaleY.value}` : ''
    transformPreview.style.scale = scaleCode
    /* Translate */
    translateCode = tranX.value != 0 || tranY.value != 0 || tranZ.value != 0 ? `${tranX.value}px ${tranY.value}px ${tranZ.value}px` : ''
    transformPreview.style.translate = translateCode
    /* Rotate */
    rotX = rotateX.value != 0 ? `rotateX(${rotateX.value}deg) ` : '', rotY = rotateY.value != 0 ? `rotateY(${rotateY.value}deg) ` : '', 
        rotZ = rotateZ.value != 0 ? `rotateZ(${rotateZ.value}deg)` : ''
    /* Skew */
    skewCode = skewX.value != 0 ? `${skewX.value}deg` : '', skewCode += skewY.value != 0 ? skewX.value != 0 && skewY.value != 0 ?
        `, ${skewY.value}deg` : `${skewY.value}deg` : ''
    let code = `${rotX + rotY + rotZ} ${skewCode != '' ? `skew(${skewCode})` : ''}` 
    transformPreview.style.transform = code

    cssCodeText.value = `transform: ${code};${translateCode != '' ? `\ntranslate: ${translateCode};` : ''}${scaleCode != '' ? `\nscale: ${scaleCode};` : ''}\n\n//Pegar en el elemento padre, en caso de ser necesario:\nperspective: 200px;`
}       

const resetElements = () => {   
    propertiesColumns.forEach(element => { element.value = 0 });
    scaleX.value = scaXValue.value = scaleY.value = scaYValue.value = 1
    cssCodeText.value = ''
    transformPreview.style.transform = '', transformPreview.style.opacity = '1'
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