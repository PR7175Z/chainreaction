document.addEventListener('DOMContentLoaded', () => {
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

    let p =document.querySelectorAll('p');
    p.forEach((element) => {
        element.addEventListener('click', (e)=>{
            let val = e.target.getAttribute('data-value');
            val = (val == null)? 0: val;
            val++;
            if(val < 4){
                e.target.innerHTML = val;
                e.target.setAttribute('data-value', val);
                let currentClass = e.target.classList;
                let currentParent = e.target.parentNode.classList;

                let columnCount = currentClass.value.split('column');
                // console.log(columnCount[1]);

                // console.log(currentClass);
                // console.log(currentParent);
            }else{
                e.target.innerHTML = 0;
                e.target.setAttribute('data-value', 0);
                let currentClass = e.target.classList;
                let currentParent = e.target.parentNode.classList;

                const columnCount = currentClass.value.split('column');
                const rowCount = currentParent.value.split('row');
                const currentCol = columnCount[1];
                const currentRowCount = rowCount[1];
                const uprow = parseInt(currentRowCount) - 1;
                const downrow = parseInt(currentRowCount) + 1; 
                const leftcol = parseInt(currentCol) - 1;
                const rightcol = parseInt(currentCol) + 1;

                document.querySelector(".row"+uprow+" .column"+currentCol).innerHTML = parseInt(document.querySelector(".row"+uprow+" .column"+currentCol).innerHTML) + 1;
                document.querySelector(".row"+downrow+" .column"+currentCol).innerHTML = parseInt(document.querySelector(".row"+downrow+" .column"+currentCol).innerHTML) + 1;
                document.querySelector(".row"+currentRowCount+" .column"+leftcol).innerHTML = parseInt(document.querySelector(".row"+currentRowCount+" .column"+leftcol).innerHTML) + 1;
                document.querySelector(".row"+currentRowCount+" .column"+rightcol).innerHTML = parseInt(document.querySelector(".row"+currentRowCount+" .column"+rightcol).innerHTML) + 1;

                // console.log(leftcol);
                // console.log(rightcol);
                // console.log(uprow);
                // console.log(rightrow);

                // console.log(currentClass);
                // console.log(currentParent);
                
            }
        });

        element.addEventListener('change', (e) => {
            console.log('check')
        })
    })
});