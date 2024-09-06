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
            e.target.setAttribute('data-value', val);
        });
    })
});