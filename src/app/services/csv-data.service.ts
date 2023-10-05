import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class CSVDataService {
  constructor(private http: HttpClient) {}
  //fetches CSV file using Angular 'HttpClient', returns promise

  // Fetches CSV file using Angular 'HttpClient', returns an Observable
  getCSVData(): Observable<any> {
    //fetch CSV file from project directory
    const csvFilePath = 'assets/test22.csv'; //update the path to your CSV file

    //use RxJS pipe and map to process data
    return this.http.get(csvFilePath, { responseType: 'text' }).pipe(
      map((csvData: string) => {
        if (typeof csvData === 'string') {
          //if fetched data is of type 'string', parse and process
          return this.parseCSVData(csvData);
        } else {
          //error message if data is not type 'string'
          throw new Error('CSV data is not a string');
        }
      })
    );
  }

  private parseCSVData(csvText: string): any {
    const lines = csvText.split('\n'); //split CSV text into lines
    const data = [];

    //loop through each line, split into two columns
    for (const line of lines) {
      const columns = line.split(',');
      if (columns.length === 2) {
        //assuming CSV has two columns --> needs to be modified for more columns
        const [column1, column2] = columns;
        //parse/process the column values as needed
        const parsedRow = {
          //assigning keys to data
          Country: column1.trim(),
          Value: parseInt(column2.trim()), //assuming second column contains integers --> needs to be modified for other data
        };
        data.push(parsedRow); //add parsed data to data array
      }
    }

    return data; //return parsed data as array of objects
  }
}
