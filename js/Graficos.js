
function Grafico(valorFiltro, valormarca) {

  //debugger;

  var endpoint;

  const hoje = 'http://apisinfte.pagekite.me/api/Log/minutosquinze?marca='

  const semanapassada = 'http://apisinfte.pagekite.me/api/Log/log-semanaPassada?marca='

  const essasemana = 'http://apisinfte.pagekite.me/api/Log/EssaSemana?marca='

  const essemes = 'http://apisinfte.pagekite.me/api/Log/log-mes?marca='

  const mespassado = 'http://apisinfte.pagekite.me/api/Log/log-mesPassado?marca='


  if (valorFiltro == 'hoje') {
    endpoint = hoje;

  } else if (valorFiltro == 'estaSemana') {
    endpoint = essasemana;
  } else if (valorFiltro == 'semanaPassada') {
    endpoint = semanapassada;
  } else if (valorFiltro == 'estemes') {
    endpoint = essemes;
  } else if (valorFiltro == 'mesPassado') {
    endpoint = mespassado;

  }

  fetch(endpoint + valormarca)

    .then(response => response.json())
    .then(data => {


      const label = data.map(item => item.hora)
      const offline = data.map(item => parseInt(item.qte_off))
      const online = data.map(item => parseInt(item.qte_on))


      // Destrua o gráfico anterior antes de criar um novo
      var myChart = Chart.getChart("myChart");
      console.log(myChart)

      if (myChart != null) {
        myChart.destroy();

      }




      const canvas = document.getElementById('myChart');
      const ctx = canvas.getContext('2d');

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: label, label,
          datasets: [{
            label: 'ativos',
            data: online,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }, {
            label: 'desligado',
            data: offline,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1
          }]
        },
        options: {

        }
      })

    })



};