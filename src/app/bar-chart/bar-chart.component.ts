import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CSVDataService } from '../services/csv-data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  constructor(private csvDataService: CSVDataService) {}
  //rendering bar chart from CSV data

  ngOnInit(): void {
    this.loadDataAndCreateChart();
    //initializing by calling 'loadDataAndCreateChart'
  }

  public chart: any;
  public chartData: any = {};

  loadDataAndCreateChart() {
    //fetch CSV data using the CSVDataService
    this.csvDataService.getCSVData().subscribe({
      next: (data: any) => {
        //extract labels and dataset values from the CSV data
        const labels = data.map((row: { [x: string]: any }) => row['Country']);
        const datasetValues = data.map((row: { [x: string]: any }) => row['Value']);

        //store the extracted data in chartData
        this.chartData = {
          labels: labels,
          datasetValues: datasetValues,
        };

        //create and render the bar chart
        this.createChart();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  createChart() {
    //creating new instance of Chart.js and configure chart
    this.chart = new Chart('BarChart', {
      type: 'bar', //setting chart type
      data: {
        labels: this.chartData.labels, //labels on X-axis
        datasets: [
          {
            data: this.chartData.datasetValues, //set dataset values
            backgroundColor: '#B5DAE6', //set background color
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        indexAxis: 'y', //index axis set to 'Y' --> horizontal chart
        plugins: {
          legend: {
            display: false, //hide legend
          },
        },
      },
    });
  }
}
