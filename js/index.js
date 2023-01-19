let carrinhoVazio1 = [];
let count = 0;
let soma = 0;

function criarCards(array) {
    for (let i = 0; i < array.length; i++) {
        let ulList = document.querySelector('ul')

        let li = document.createElement('li')
        li.className = 'card1'

        let img = document.createElement('img')
        img.className = 'img_cards'
        img.src = array[i].img
        img.alt = array[i].nameItem

        li.appendChild(img)

        let p1 = document.createElement('p')
        p1.className = 'tipo'
        p1.innerText = array[i].tag

        li.appendChild(p1)

        let h4 = document.createElement('h4')
        h4.innerText = array[i].nameItem

        li.appendChild(h4)

        let p2 = document.createElement('p')
        p2.className = 'descricao'
        p2.innerText = array[i].description

        li.appendChild(p2)

        let p3 = document.createElement('p')
        p3.className = 'preco'
        p3.innerText = `R$ ${array[i].value.toFixed(2)}`

        li.appendChild(p3)

        let button = document.createElement('button')
        button.dataset.id = array[i].id
        button.className = 'adicione'
        button.innerText = 'Adicionar ao carrinho'

        button.addEventListener('click', function () {

            carrinhoVazio1.push(array[i]);

            let card = adicionarCarrinho(array[i]);

            let ul = document.querySelector('.espaco_carrinho')
            ul.appendChild(card)
            soma += array[i].value

            document.querySelector('.total_preco').innerText = `R$${soma.toFixed(2)}`

            let h2 = document.querySelector('.carrinho_h2')

            let p = document.querySelector('.carrinho_p')

            h2.style.display = 'none'
            p.style.display = 'none'

            count++;
            document.querySelector('.total_quantidade').innerHTML = `${count}`

        })

        li.appendChild(button)

        ulList.appendChild(li)

    }

}
criarCards(data)

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
            let carrinho = carrinhoVazio1.findIndex((elemento) => {

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
        if (soma < 0) {
            soma = 0
        }

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

function separarItens() {

    for (let i = 0; i < data.length; i++) {
        if (data[i].tag[0] == 'Camisetas') {
            camisetas.push(data[i])
        } else if (data[i].tag[0] == 'Acessórios') {
            acessorios.push(data[i])
        } else {
            calcados.push(data[i])
        }
    }

}
separarItens()

function categorias() {
    let camisetasid = document.querySelector('#camisetas');
    camisetasid.addEventListener('click', function () {
        let ul = document.querySelector('.container_1');
        ul.innerHTML = '';
        criarCards(camisetas)
    });
    let calcadosid = document.querySelector('#calcados');
    calcadosid.addEventListener('click', function () {
        let ul = document.querySelector('.container_1');
        ul.innerHTML = '';
        criarCards(calcados)
    });
    let acessoriosid = document.querySelector('#acessorios');
    acessoriosid.addEventListener('click', function () {
        let ul = document.querySelector('.container_1');
        ul.innerHTML = '';
        criarCards(acessorios)
    });
    let todosid = document.querySelector('#todos');
    todosid.addEventListener('click', function () {
        let ul = document.querySelector('.container_1');
        ul.innerHTML = '';
        criarCards(data)
    });
}
categorias()

function pesquisar() {
    let botao = document.querySelector('.btn_pesquisar')
    botao.addEventListener('click', function () {
        let ul = document.querySelector('.container_1');
        ul.innerHTML = '';
        let texto = document.querySelector('.pesquisa')
        let textoValue = texto.value;
        let vazio = data.filter((element) => {
            return element.tag[0].toLowerCase().includes(textoValue.toLowerCase())
        })
        for (let i = 0; i < data.length; i++) {
            let element = data[i];
            // console.log(element)
            // console.log(element.tag)
            // console.log(element.nameItem)
                vazio.push(element.tag)
                criarCards(vazio)
        }
    })
}
pesquisar()

function home() {
    let home = document.querySelector('#home')
    home.addEventListener('click', function () {
        let ul = document.querySelector('.container_1');
        ul.innerHTML = '';
        criarCards(data)
    })
}
home()