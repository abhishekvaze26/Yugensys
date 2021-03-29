
create table if not exists Department(dept_id integer primary key,dept_name text);
create table if not exists Employee(emp_id integer primary key,emp_name text,emp_salary number,dept_id integer, foreign key (dept_id) references Department(dept_id));

insert or replace into Department values(1,'Engineering');
insert or replace into Department values(2,'QA');
insert or replace into Department values(3,'HR');

insert or replace into Employee values(101,'Abhishek',50000,1);
insert or replace into Employee values(102,'Sam',20000,2);
insert or replace into Employee values(103,'Ravi',15000,3);
insert or replace into Employee values(104,'David',60000,1);
insert or replace into Employee values(105,'Rahul',32000,2);
