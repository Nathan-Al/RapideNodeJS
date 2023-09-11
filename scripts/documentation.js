let buttonHiddenTree = document.getElementById('button-tree')
let hideTree = document.getElementById('hide-tree')
let treeBox = document.querySelector('div.arborescence > div.box')
let treeFilesText = document.querySelectorAll('div #div-aborescence li')
let treeDirText = document.querySelectorAll('div #div-aborescence h6')
let treeDirComment = document.querySelectorAll('div #div-aborescence h6 t')

window.onload = async () => {
    treeFilesText.forEach(element => {
        element.classList.add('is-size-5-mobile')
    });

    treeDirText.forEach(element => {
        element.classList.add('is-size-5-mobile')
    });

    treeDirComment.forEach(element => {
        element.classList.add('is-size-6-desktop')
        element.classList.add('is-size-6-mobile')
    });
}

buttonHiddenTree.addEventListener('click', function(e) {
    if(treeBox.style.maxHeight == '' || treeBox.style.maxHeight == '35vh') {
        treeBox.style.maxHeight = '100%'
        hideTree.style.background = '#ffffff00'
        hideTree.style.pointerEvents = 'none'
        buttonHiddenTree.textContent = 'Reduire'
    } else {
        treeBox.style.maxHeight = '35vh'
        hideTree.style.removeProperty('background')
        buttonHiddenTree.textContent = 'Etendre'
    }
})
