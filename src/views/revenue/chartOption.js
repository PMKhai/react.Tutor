import palette from '../../theme/palette';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 2,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary,
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 30,
        maxBarThickness: 30,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider,
        },
      },
    ],
  },
};

export const labels = [
  '1 Aug',
  '2 Aug',
  '3 Aug',
  '4 Aug',
  '5 Aug',
  '6 Aug',
  '7 Aug',
  '8 Aug',
  '9 Aug',
  '10 Aug',
  '11 Aug',
  '12 Aug',
];
