function criarCards() {
    for (let i = 0; i < data.length; i++) {
        let ulList = document.querySelector('ul')

        let li = document.createElement('li')
        li.className = 'card1'

        let img = document.createElement('img')
        img.className = 'img_cards'
        img.src = data[i].img
        img.alt = data[i].nameItem

        li.appendChild(img)

        let p1 = document.createElement('p')
        p1.className = 'tipo'
        p1.innerText = data[i].tag

        li.appendChild(p1)

        let h4 = document.createElement('h4')
        h4.innerText = data[i].nameItem

        li.appendChild(h4)

        let p2 = document.createElement('p')
        p2.className = 'descricao'
        p2.innerText = data[i].description

        li.appendChild(p2)

        let p3 = document.createElement('p')
        p3.className = 'preco'
        p3.innerText = `R$ ${data[i].value.toFixed(2)}`

        li.appendChild(p3)

        let button = document.createElement('button')
        button.dataset.id = data[i].id
        button.className = 'adicione'
        button.innerText = 'Adicionar ao carrinho'

        li.appendChild(button)

        ulList.appendChild(li)

    }

}
criarCards()

let botoes = document.querySelectorAll('.adicione')
let count = 0;
let soma = 0;
let carrinhoVazio1 = [];


for (let i = 0; i < botoes.length; i++) {
    let botao = botoes[i];

    botao.addEventListener('click', function (e) {
        let idElemento = e.target.dataset.id;
        
        for (let i = 0; i < data.length; i++) {
            if(idElemento == data[i].id){
                carrinhoVazio1.push(data[i]);

                let card = adicionarCarrinho(data[i]);
        
                let ul = document.querySelector('.espaco_carrinho')
                ul.appendChild(card) 
                soma += data[i].value
            
                document.querySelector('.total_preco').innerText = `R$${soma.toFixed(2)}`

            }
        
        }
        let h2 = document.querySelector('.carrinho_h2')

        let p = document.querySelector('.carrinho_p')

        h2.style.display = 'none'
        p.style.display = 'none'

        count++;
        document.querySelector('.total_quantidade').innerHTML = `${count}`
        
    })
    
}

function procuraId(id) {
    for (let i = 0; i < data.length; i++) {
        let elemento = data[i];
        if (id == elemento.id)
            return elemento;

    }
    return 'Erro'
}

function adicionarCarrinho(elemento) {

    let ul = document.querySelector('ul')

    let li = document.createElement('li')
    li.dataset.id = elemento.id

    let img = document.createElement('img')
    img.className = 'img_li'
    img.src = elemento.img;

    let div = document.createElement('div')
    div.className = 'info_carrinho'

    let h5 = document.createElement('h5')
    h5.innerText = elemento.nameItem

    let p = document.createElement('p')
    p.className = 'preco1'
    p.innerText = `R$ ${elemento.value.toFixed(2)}`

    let button = document.createElement('button')
    button.dataset.id = elemento.id
    button.className = 'button2'
    button.innerText = 'Remover produto'

    button.addEventListener('click', function (e) {
        let idElemento = e.target.dataset.id;


    for (let i = 0; i < carrinhoVazio1.length; i++) {
        let carrinho = carrinhoVazio1.findIndex((elemento)=>{
            
            return elemento.id == idElemento
        })
        carrinhoVazio1.splice(carrinho, 1)
        break
    }


        //e.path[2].remove();
        // let li = document.querySelector(elemento.id);
        // li.remove();

        li.remove();

        count--;
        document.querySelector('.total_quantidade').innerHTML = `${count}`


        soma = soma - elemento.value
           
        document.querySelector('.total_preco').innerText = `R$${soma.toFixed(2)}`

        carrinhoVazio()

    });


    ul.appendChild(li)
    li.appendChild(img)
    li.appendChild(div)
    div.append(h5, p, button)

    return li
}

function carrinhoVazio() {
    
    if (carrinhoVazio1.length == 0) {
        
        let h2 = document.querySelector('.carrinho_h2')

        let p = document.querySelector('.carrinho_p')


        h2.style.display = 'block'
        p.style.display = 'block'
    }

}

let camisetas = [];
let acessorios = [];
let calcados = [];

function separateItens() {
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag == 'Camisetas'.toLowerCase()) {
            camisetas.push(data[i])
        } else if(data[i].tag == 'Acessórios'.toLowerCase()){
            acessorios.push(data[i])
        } else{
            calcados.push(data[i])
        }
    }
}
separateItens()

    