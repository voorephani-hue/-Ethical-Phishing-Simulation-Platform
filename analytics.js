const ctx = document.getElementById('analyticsChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['HR Policy Test', 'Fake Invoice'],
    datasets: [
      {
        label: 'Opened',
        data: [76, 84],
        backgroundColor: '#4CAF50'
      },
      {
        label: 'Clicked',
        data: [32, 40],
        backgroundColor: '#FFC107'
      },
      {
        label: 'Reported',
        data: [5, 3],
        backgroundColor: '#F44336'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});
