import { Employee } from './../Model/Employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: 'developers.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http
      .get('assets/seed-db.sql', { responseType: 'text' })
      .subscribe((sql) => {
        this.sqlitePorter
          .importSqlToDb(this.database, sql)
          .then((_) => {
            this.dbReady.next(true);
          })
          .catch((e) => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getEmployees() {
    return this.database
      .executeSql(
        'SELECT Employee.emp_id,Employee.emp_name,Employee.emp_salary,Employee.dept_id,Department.dept_name from Employee inner join Department using(dept_id) group by dept_name,emp_salary order by emp_salary DESC',
        []
      )
      .then((data) => {
        let employeeData: Employee[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            employeeData.push({
              id: data.rows.item(i).emp_id,
              name: data.rows.item(i).emp_name,
              salary: data.rows.item(i).emp_salary,
              d_id: data.rows.item(i).d_id,
              dept_name: data.rows.item(i).dept_name,
            });
          }
        }
        return employeeData;
      });
  }
}
