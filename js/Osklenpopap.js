const buttonosklen = document.querySelector("#buttonOsklen");
const buttonIntimissimi = document.querySelector("#buttonIntimissimi");
const buttonAramis = document.querySelector("#buttonAramis");
const buttonCotton = document.querySelector("#buttonCotton");
const closex = document.querySelector("#closex");
const parede = document.querySelector("#Parede");
const blocoparede = document.querySelector("#BlocoParede");
const paginacao = document.querySelector("#paginacao");

const MOSTRA = (event) => {
    if (event.target !== blocoparede && event.target !== parede) {
        blocoparede.classList.toggle("hide");
        parede.classList.toggle("hide");



    }

};

[buttonCotton, buttonAramis, buttonIntimissimi, buttonosklen, closex, blocoparede].forEach((el) => {
    el.addEventListener("click", (event) => MOSTRA(event));


});

parede.addEventListener("click", (event) => {
    blocoparede.classList.toggle("hide");
    parede.classList.toggle("hide");
});



//<tr id="row1" class="row">
//<td>1</td>
//<td>John Doe</td>
//<td>john.doe@example.com</td>
//<td>jane.smith@example.com</td>
//<td>jane.smith@example.com</td>
//<td>jane.smith@example.com</td>
//</tr>



var currentPage = 1;
var rowsPerPage = 15;



function showRows(pageNumber) {

    var rows = document.getElementsByClassName("row");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.display = "none";

    }

    var startIndex = (pageNumber - 1) * rowsPerPage; //0
    var endIndex = startIndex + rowsPerPage; //15
    console.log(startIndex);
    console.log(endIndex);



    dadosLogButton("Aramis", startIndex, endIndex);
    for (var j = startIndex; j < endIndex; j++) {

        var selectedRow = document.getElementById("row" + (j + 1));

        if (selectedRow) {
            selectedRow.style.display = "table-row";

        }
    }
}


function nextPage() {
    fetch('http://apisinfte.pagekite.me/api/Log/Empresa-marca?marca=' + 'Aramis')

        .then(response => response.json())
        .then(data => {
            const retornoLinhas = data.map(item => item.marcas)
            const qtnLinhas = retornoLinhas.length;

            var totalPages = Math.ceil(qtnLinhas / rowsPerPage);

            console.log("totalPages", totalPages)
            if (currentPage < totalPages) {
                currentPage++;
                console.log("caiu")
                showRows(currentPage);
            }
        })
}

function previousPage() {


    if (currentPage > 1) {


        currentPage--;
        showRows(currentPage);
    }
}



// Exibindo a primeira página inicialmente
showRows(currentPage);




function dadosLogButton(empresa, qntInicial, qntFinal) {
    fetch('http://apisinfte.pagekite.me/api/Log/Empresa-marca?marca=' + empresa)

        .then(response => response.json())
        .then(data => {
            const marcas = data.map(item => item.marcas)
            const loja = data.map(item => item.loja)
            const mensagem = data.map(item => item.mensagem)
            const qte_off = data.map(item => parseInt(item.qte_off))
            const qte_caixas = data.map(item => parseInt(item.qte_caixas))
            const data_criacao = data.map(item => (item.data_criacao))

            let tabela = document.getElementById("corpoDaTabelaDeLog");
            tabela.innerHTML = "";
            tabela.textContent = "";



            for (let i = qntInicial; i < qntFinal; i++) {

                let posicao = parseInt(i)

                let tr = document.createElement("tr");
                tr.classList.add('row');
                tr.id = "row" + (posicao + 1)

                let td1 = document.createElement("td");
                td1.innerHTML = marcas[i];

                let td2 = document.createElement("td");
                td2.innerHTML = loja[i];

                let td3 = document.createElement("td");
                td3.innerHTML = mensagem[i];

                let td4 = document.createElement("td");
                td4.innerHTML = qte_off[i];

                let td5 = document.createElement("td");
                td5.innerHTML = qte_caixas[i];

                let td6 = document.createElement("td");
                td6.innerHTML = data_criacao[i];

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);

                tabela.appendChild(tr);

            }
        }
        )

}




fetch('http://apisinfte.pagekite.me/api/Log/log-marcas-off-on')

    .then(response => response.json())
    .then(data => {
        const marcas = data.map(item => item.marcas)
        const qte_off = data.map(item => parseInt(item.qte_off))
        const qte_on = data.map(item => parseInt(item.qte_on))
        let selectmarca = document.getElementById("selectmarca");
        selectmarca.innerHTML = "";
        selectmarca.textContent = "";

        for (let i in marcas) {


            let card = document.getElementById("card");

            let div = document.createElement("div");
            div.classList.add('box');

            let h1 = document.createElement("h1");
            h1.classList.add('cardMarca');
            h1.innerHTML = marcas[i]

            let p1 = document.createElement("p");
            p1.classList.add('cardParagrafo')
            p1.innerHTML = 'Terminais online'

            let h2 = document.createElement("h2");
            h2.classList.add('cardOnline')
            h2.innerHTML = qte_on[i]

            let p2 = document.createElement("p");
            p2.classList.add('cardParagrafo');
            p2.innerHTML = 'Terminais offline';

            let h3 = document.createElement("h3");
            h3.classList.add('cardOff');
            h3.innerHTML = qte_off[i]


            div.appendChild(h1);
            div.appendChild(p1);
            div.appendChild(h2);
            div.appendChild(p2);
            div.appendChild(h3);
            card.appendChild(div);


            let option = document.createElement("option");

            option.id = marcas[i]
            option.innerHTML = marcas[i]

            selectmarca = document.getElementById("selectmarca");

            selectmarca.appendChild(option)

        }

    })