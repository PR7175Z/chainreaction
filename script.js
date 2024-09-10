document.addEventListener('DOMContentLoaded', () => {
    let turn = 1;
    let turnClass = 'red';
    let preventOtherClick = false;
    let clickCount = 0;
    let numberOfPlayer = 2;
    let clickable = true;
    const errorMessage = document.querySelector('.error');

    const root = document.getElementById('root');
    for(let i = 0; i<8; i++){
        let div = document.createElement('div');
        div.classList.add('row'+i);
        root.appendChild(div);
        for(let j = 0; j<8; j++){
            let p = document.createElement('p');
            p.classList.add('column'+j)
            p.innerHTML = 0;
            div.appendChild(p);
        }
    }

    function chainreaction(e, turn){        
        const currentClass = e.target.classList;
        const currentParent = e.target.parentNode.classList;

        const currentCol = currentClass.value.split('column')[1];
        const currentRowCount = currentParent.value.split('row')[1];
        const uprow = parseInt(currentRowCount) - 1;
        const downrow = parseInt(currentRowCount) + 1; 
        const leftcol = parseInt(currentCol) - 1;
        const rightcol = parseInt(currentCol) + 1;

        setTimeout(() => {
            if(e.target.innerHTML == 0){
                e.target.setAttribute('data-class', '');
            }
            const upperCell = document.querySelector(`.row${uprow} .column${currentCol}`);
            const lowerCell = document.querySelector(`.row${downrow} .column${currentCol}`);
            const leftCell = document.querySelector(`.row${currentRowCount} .column${leftcol}`);
            const rightCell = document.querySelector(`.row${currentRowCount} .column${rightcol}`);
            const wintext = document.querySelector('.wintext')
            if(upperCell){
                upperCell.innerHTML = parseInt(upperCell.innerHTML) + 1;
                upperCell.setAttribute('data-class', turn);
            }if(lowerCell){
                lowerCell.innerHTML = parseInt(lowerCell.innerHTML) + 1;
                lowerCell.setAttribute('data-class', turn);
            }if(leftCell){
                leftCell.innerHTML = parseInt(leftCell.innerHTML) + 1;
                leftCell.setAttribute('data-class', turn);
            }if(rightCell){    
                rightCell.innerHTML = parseInt(rightCell.innerHTML) + 1;
                rightCell.setAttribute('data-class', turn);
            }
            if(preventOtherClick){
                let c = 0;
                document.querySelectorAll('p').forEach((element)=>{
                    if(element.getAttribute('data-class')){
                        if(element.getAttribute('data-class') != turn){
                            c++;
                        }
                    }
                });
                if(c == 0){
                    wintext.innerHTML = `<strong style="text-transform: Capitalize;">${turn} wins</strong>`;
                    clickable = false;
                    document.querySelector('.gameoverwrap').classList.remove('d-none');
                }
            }
        }, 500);
    }

    const turnClassdict = {
        1 : "red",
        2 : "blue",
    }

    const p =document.querySelectorAll('p');
    const turnText = document.querySelector('.turn strong');
    p.forEach((element) => {
        element.addEventListener('click', (e)=>{
            if(clickable){
                turn = -turn;
                // console.log(turnClassdict[turn]);
                if(turn == 1){
                    turnText.innerHTML = "Blues Turn";
                    turnClass = 'red';
                }else{
                    turnText.innerHTML = "Reds Turn";
                    turnClass = 'blue';
                }
                let val = parseInt(e.target.innerHTML);
                preventOtherClick = numberOfPlayer <= clickCount;

                if((!e.target.getAttribute('data-class') && !preventOtherClick) || e.target.getAttribute('data-class') == turnClass){
                    val = (val == null)? 0: val;
                    val++;

                    if(val < 4){
                        e.target.innerHTML = val;
                        e.target.setAttribute('data-value', val);
                        e.target.setAttribute('data-class', turnClass);
                    }else{
                        e.target.innerHTML = val;
                        setTimeout(() => {
                            e.target.innerHTML = 0;
                            e.target.setAttribute('data-value', 0);
                        }, 500);
                    }
                    if(parseInt(e.target.innerHTML) == 0){
                        e.target.setAttribute('data-class', '');
                    }
                    clickCount++;
                    errorMessage.innerHTML = '';
                }else{
                    turn = -turn;
                    errorMessage.innerHTML = 'Error: <strong>Invalid Move</strong>';
                }
            }
        });

        observer = new MutationObserver((mutationsList, observer) => {
            const parent = mutationsList[0].target.parentNode;
            const currentNodeValue = mutationsList[0].target.innerHTML;
            if(currentNodeValue >= 4){
                setTimeout(() => {
                    mutationsList[0].target.innerHTML = 0;
                }, 500);
                chainreaction(mutationsList[0], turnClass);
            }
        });

        observer.observe(element, {characterData: false, childList: true, attributes: false});
    })
});