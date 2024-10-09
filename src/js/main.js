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
    let scaleCode, transCode, skewCode, rotX, rotY, rotZ
    scaleCode = scaleX.value > 1 ? `${scaleX.value} ` : '', scaleCode += scaleY.value > 1 ? `${scaleY.value}` : ''
    transformPreview.style.scale = scaleCode

    transCode = tranX.value != 0 || tranY.value != 0 || tranZ.value != 0 ? `${tranX.value}px ${tranY.value}px ${tranZ.value}px` : ''
    transformPreview.style.translate = transCode

    rotX = rotateX.value > 0 ? `rotateX(${rotateX.value}deg) ` : '', rotY = rotateY.value > 0 ? `rotateY(${rotateY.value}deg) ` : '', rotZ = rotateZ.value > 0 ? `rotateZ(${rotateZ.value}deg)` : ''

    skewCode = skewX.value > 0 ? `${skewX.value}deg` : '', skewCode += skewY.value > 0 ? skewX.value > 0 && skewY.value > 0 ?
        `, ${skewY.value}deg` : `${skewY.value}deg` : ''

    let code = `${rotX.length > 0 ? rotX : ''} ${rotY.length > 0 ? rotY : ''} ${rotZ.length > 0 ? rotZ : ''} ${skewCode != '' ? `skew(${skewCode})` : ''}` 
    cssCodeText.value = `${code.length > 3 ? `transform: ${code};` : ''} ${transCode != '' ? `\ntranslate: ${transCode};` : ''} ${scaleCode != '' ? `\nscale: ${scaleCode};` : ''}\n\n/* Pegar en el elemento padre */ \nperspective: 200px;`
    
    !code.includes('rotate') ? transformPreview.style.transform = `rotate(0deg) ${code}` : transformPreview.style.transform = code
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