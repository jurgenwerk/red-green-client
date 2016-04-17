import Ember from 'ember';

export default Ember.Component.extend({
  padWithZero(value) {
    if (String(value).length === 1)
      return `0${value}`;
    else
      return value;
  },
  getSeriesData() {
    const dateParts = this.get('period').split("-");
    const balanceChanges = this.get('balanceChanges').toArray();
    const year = dateParts[0];
    const month = dateParts[1];
    const daysInMonth = new Date(year, month, 0).getDate();
    let labels = [], expenseSums = [], incomeSums = [];

    for(let day=1; day<=daysInMonth; day++){
      const dateString = `${year}-${this.padWithZero(month)}-${this.padWithZero(day)}`;
      const balanceChangesForDay = balanceChanges.filterBy('entryDate', dateString);
      const incomeSumForDay = balanceChangesForDay.filterBy('isIncome').mapBy('value').reduce(((prev, curr) => prev + curr), 0);
      const expenseSumForDay = balanceChangesForDay.filterBy('isExpense').mapBy('value').reduce(((prev, curr) => prev + curr), 0);
      labels.push(day);
      expenseSums.push(expenseSumForDay/100);
      incomeSums.push(incomeSumForDay/100);
    }

    return { labels: labels, series: [incomeSums, expenseSums] };
  },
  didRender() {
    this.renderChart();
  },
  renderChart() {
    const { labels, series } = this.getSeriesData();

    new Chartist.Bar('.monthly-overview-chart', {
      labels: labels,
      series: series,
      }, {
      seriesBarDistance: 7,
      axisX: {
        offset: 60
      },
      axisY: {
        offset: 50,
        labelInterpolationFnc: (value) => {
          return `${value} ${this.get('currencySymbol')}`;
        },
        scaleMinSpace: 45
      }
    });
  }
});
