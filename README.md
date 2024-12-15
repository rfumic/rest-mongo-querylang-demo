1. Setup backend & mongodb
```sh
npm install
```
By default uses mongo connection `mongodb://localhost:27017`

Insert some demo data in `test` database with mongosh:
```sh
db.students.insertMany([
...   {
        firstName: 'Ivan',
        lastName: 'Ivanovic',
        age: 20
      },
      {
        firstName: 'Ivan',
        lastName: 'Loremipsum',
        age: 28
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 22
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        age: 19
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        age: 21
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        age: 23
      }
    ])

```
2. Run demo server:
```sh
npm run dev
```

3. Fetch from `http://localhost:3000/students`

```javascript
fetch("http://localhost:3000/students?ql=age >= 20 AND firstName != Ivan");
```

Returns: 
```json
[
    {"_id":"6759c81b37083fd88a86bad2","firstName":"John","lastName":"Doe","age":22},
    {"_id":"6759c81b37083fd88a86bad4","firstName":"Alice","lastName":"Johnson","age":21},
    {"_id":"6759c81b37083fd88a86bad5","firstName":"Bob","lastName":"Brown","age":23}
]
```

Currently supported operators:
    - `=`
    - `!=`
    - `<`
    - `<=`
    - `>`
    - `>=`
    - `OR`
    - `AND`


