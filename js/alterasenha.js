function alterar() {
    //event preventdefault, ele faz coom que a pagina nao carregue.
    event.preventDefault()
    // url para colocar o endpoint;.
    // gerar um endpoint novo toda vez que for fazer a conexão.
    let url = "http://apisinfte.pagekite.me/api/Auth/Alterar-senha"

    console.log(url)
    // pegando o elemento do html e o .value pega o valor do que o usuario digitou.    
    let email = document.getElementById("email").value
    let atualPassword = document.getElementById("atualPassword").value
    let newPassword = document.getElementById("newPassword").value
    // transformando o dado do html para levar para o servidor

    // o  que estiver dentro de "", deve ser definido igual ao parametro que esta no servidor.
    body = {
        "email": email,
        "atualPassword": atualPassword,
        "newPassword": newPassword
    }

    fazPostaltera(url, body)

}

function fazPostaltera(url, body) {

    //criando o request 
    let request = new XMLHttpRequest()

    //setando o request o tipo dele.
    request.open("POST", url, true)

    //definimos que aqui é o arquivo json que irá ir para o servidor
    request.setRequestHeader("Content-type", "application/json")

    //enviando o json
    request.send(JSON.stringify(body))

    //funcao para entender a volta dos dados
    request.onload = function () {
        var retornoStatus = request.status
        console.log(request.status, 'Retorno do Staus',)
        //setando o retorno da api    
        if (retornoStatus == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Erro!',
                text: 'Ao alterar senha'
            })
            location.href = '../html/dash.html'    //verificar se o caminho para a tela do dash está ok 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ao alterar senha'
            })
        }
        request.onreadystatechange = function () {

        }

        //comando que faz a chamada da informaçao para ver o que retornou para o usuario caso retorne.

        return request.responseText
    }
}