
const radar = {
  labels: ['R1','R2','R3','R4'],
      datasets: [
        {
          label: 'Physical',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: []
        },
        {
            label: 'Organizational',
            backgroundColor: 'rgba(28,21,231,0.2)',
            borderColor: 'rgba(28,21,231,1)',
            pointBackgroundColor: 'rgba(28,21,231,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(28,21,231,1)',
            data: []
          },
          {
            label: 'Technical',
            backgroundColor: 'rgba(227,229,7,0.2)',
            borderColor: 'rgba(227,229,7,1)',
            pointBackgroundColor: 'rgba(227,229,7,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(227,229,7,1)',
            data: []
          }
      ]
}

export default radar;