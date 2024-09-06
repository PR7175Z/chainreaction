document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    for(let i = 0; i<8; i++){
        let div = document.createElement('div');
        div.classList.add('row'+i);
        root.appendChild(div);
        for(let j = 0; j<8; j++){
            let p = document.createElement('p');
            p.classList.add('column'+j)
            div.appendChild(p);
        }
    }

    let p =document.querySelectorAll('p');
    p.forEach((e) => {
        e.addEventListener('click', (e)=>{
            let val = e.target.getAttribute('data-value');
            val = (val == null)? 0: val;
            val++;
            if(val < 4){
                e.target.innerHTML = val;
                e.target.setAttribute('data-value', val);
                let currentClass = e.target.classList;
                let currentParent = e.target.parentNode.classList;

                let columnCount = currentClass.value.split('column');
                console.log(columnCount[1]);

                console.log(currentClass);
                console.log(currentParent);
            }else{
                e.target.innerHTML = 0;
                e.target.setAttribute('data-value', 0);
                let currentClass = e.target.classList;
                let currentParent = e.target.parentNode.classList;

                let columnCount = currentClass.value.split('column');
                let rowCount = currentParent.value.split('row');
                leftrow = parseInt(rowCount[1]) - 1;
                rightrow = parseInt(rowCount[1]) + 1; 
                leftcol = parseInt(columnCount[1]) - 1;
                rightcol = parseInt(columnCount[1]) + 1;

                document.querySelector(".row"+leftrow+" .column"+leftcol).innerHTML = 1;

                console.log(leftcol);
                console.log(rightcol);
                console.log(leftrow);
                console.log(rightrow);

                console.log(currentClass);
                console.log(currentParent);
                
            }
        });
    })
});