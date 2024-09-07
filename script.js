document.addEventListener('DOMContentLoaded', () => {
    let turn = 1;
    let turnClass = 'red';

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

    function chainreaction(e){
        const currentClass = e.target.classList;
        const currentParent = e.target.parentNode.classList;

        const currentCol = currentClass.value.split('column')[1];
        const currentRowCount = currentParent.value.split('row')[1];
        const uprow = parseInt(currentRowCount) - 1;
        const downrow = parseInt(currentRowCount) + 1; 
        const leftcol = parseInt(currentCol) - 1;
        const rightcol = parseInt(currentCol) + 1;

        setTimeout(() => {
            if(document.querySelector(`.row${uprow} .column${currentCol}`)){
                document.querySelector(`.row${uprow} .column${currentCol}`).innerHTML = parseInt(document.querySelector(`.row${uprow} .column${currentCol}`).innerHTML) + 1;
                // document.querySelector(`.row${uprow} .column${currentCol}`).setAttribute('data-class', 'red');
            }if(document.querySelector(".row"+downrow+" .column"+currentCol)){
                document.querySelector(".row"+downrow+" .column"+currentCol).innerHTML = parseInt(document.querySelector(".row"+downrow+" .column"+currentCol).innerHTML) + 1;
                // document.querySelector(".row"+downrow+" .column"+currentCol).setAttribute('data-class', 'red');
            }if(document.querySelector(".row"+currentRowCount+" .column"+leftcol)){
                document.querySelector(".row"+currentRowCount+" .column"+leftcol).innerHTML = parseInt(document.querySelector(".row"+currentRowCount+" .column"+leftcol).innerHTML) + 1;
                // document.querySelector(".row"+currentRowCount+" .column"+leftcol).setAttribute('data-class', 'red');
            }if(document.querySelector(".row"+currentRowCount+" .column"+rightcol)){    
                document.querySelector(".row"+currentRowCount+" .column"+rightcol).innerHTML = parseInt(document.querySelector(".row"+currentRowCount+" .column"+rightcol).innerHTML) + 1;
                // document.querySelector(".row"+currentRowCount+" .column"+rightcol).setAttribute('data-class', 'red');
            }
        }, 500);
    }

    let p =document.querySelectorAll('p');
    p.forEach((element) => {
        element.addEventListener('click', (e)=>{
            turn = -turn;
            if(turn == 1){
                document.querySelector('.turn strong').innerHTML = "Blues Turn";
                turnClass = 'red';
            }else{
                document.querySelector('.turn strong').innerHTML = "Reds Turn";
                turnClass = 'blue';
            }
            // let val = e.target.getAttribute('data-value');
            let val = parseInt(e.target.innerHTML);
            if(!e.target.getAttribute('data-class') || e.target.getAttribute('data-class') == turnClass){
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
            }else{
                turn = -turn;
                console.log('Mistake');
                console.log(turnClass);
            }
        });

        observer = new MutationObserver((mutationsList, observer) => {
            const parent = mutationsList[0].target.parentNode;
            const currentNodeValue = mutationsList[0].target.innerHTML;
            // console.log(parent);
            if(currentNodeValue >= 4){
                setTimeout(() => {
                    mutationsList[0].target.innerHTML = 0;
                }, 500);
                chainreaction(mutationsList[0]);
            }
        });

        observer.observe(element, {characterData: false, childList: true, attributes: false});
    })
});