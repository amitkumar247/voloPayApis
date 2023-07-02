
# VoloApis




## API Reference

#### Api 1 
Get all items

```http
   End point : /api/total_items?start_date=2022-05-1&end_date=2023-5-10&department=Marketting
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start_date` | `Date` | **Required** |
| `end_date` | `Date` | **Required** |
| `department` | `String` | **Required** |

#### Api2

Second most total item

```http
  End point : /api/nth_most_total_item?item_by=seats&start_date=2022-05-1&end_date=2023-5-10&n=2
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `item_by` | `String` | **Required** Base for sorting |
| `start_date` | `Date` | **Required** |
| `end_date` | `Date` | **Required** |
| `n` | `number` | **Required** |


#### Api3
Percentage of department wise sold items

```http
  End point : /api/percentage_of_department_wise_sold_items?start_date=2022-05-1&end_date=2023-5-10
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start_date` | `Date` | **Required** |
| `end_date` | `Date` | **Required** |





## Deployment

To deploy this project run

Step-1 Upload the csv file to the local hosted(on port 27017) mongoDB dataBase.
Step-2 For uploading csv to mongoDB use mongoDB compass.
Step-3 Database Name must be - "voloDB" and Collections name must be - "datas".

Step-3 Clone the git repository to your local environment.

#### Requirements-

JavaScript

Nodejs

mongoDB

Step-4 Open terminal and follow these steps.

Step-5 Move to the directory named as voloPayApis.

Write following commands in the terminal-


### To  start the mongoDB server on localhost

```bash
  mongod
  (To start the mongoDB server in local environment)
```

### To start the nodeJs server
```bash
  npm init
  npm i express body-parser moongose
  node app.js

```

After start node server and mongoDB successfully you can access the Api from browser by Simply writing

http://localhost:3000/...




