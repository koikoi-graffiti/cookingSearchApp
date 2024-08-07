const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'xnkdr@2426',
  database: 'cookingSearchDB'
});


// \

/* テーブルの作成 users */
// const sql = 'CREATE TABLE users (\
//                 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,\
//                 username VARCHAR(32) NOT NULL,\
//                 password VARCHAR(128) NOT NULL,\
//                 email VARCHAR(32) NOT NULL,\
//                 userItems JSON )';

// conn.query( sql, (err, results, fields) => {
//     if (err) throw err;
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//     console.log('table created')
//   }
// );

/* テーブルの作成 categories */
// conn.connect((err) => {
//   if (err) throw err;
//   console.log('Connected');

//   const sql = 'CREATE TABLE categories (categoryId INT NOT NULL, categoryName VARCHAR(32) NOT NULL, categoryUrl VARCHAR(128) NOT NULL, categoryType VARCHAR(32) NOT NULL)';

//   conn.query(sql, (err, res) => {
//     if (err) throw err;
//     console.log('table created')
//   })
// });

/* データの挿入 categories DB */
// conn.connect((err) => {
//   if (err) throw err;
//   console.log('Connected');

//   //const sql = "INSERT INTO users(name, email) VALUES('knak', 'knak@gmail.com')";
//   const sql = "INSERT INTO categories SET ?"; // ? を使って書くことも可能

//   conn.query(sql, { 
//     categoryId: 123,
//     categoryName: 'testName',
//     categoryUrl: 'https://recipe.rakuten.co.jp/category/30/?rafcid=wsc_r_cl_1056685797032393180',
//     categoryType: 'large'
//   }, (err, res, fields) => {
//       if (err) throw err;
//       console.log(res);
//   })
// });

/* データの挿入 users */
// const sql = "INSERT INTO users(name, email) VALUES('knak', 'knak@gmail.com')";
// const sql = "INSERT INTO users SET ?"; // ? を使って書くことも可能

// conn.query(sql, {
//   username:'koikoi',
//   password:'testName',
//   email:'test@gmail.com',
//   userItems: '["test1", "test2", "test3" ]'
// }, (err, res, fields) => {
//     if (err) throw err;
//     console.log(res);
// })

/* データの取得 */
const sql = 'select * from users';
conn.query(sql, (err, res) => {
  if (err) throw err;
  console.log(res);
})

/* データの削除　*/
// conn.connect((err) => {
//   if (err) throw err;
//   console.log('Connected');

//   const sql = "DELETE FROM users WHERE id = 1";
//   conn.query(sql, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   })
// });

/* データの更新 */
// conn.connect((err) => {
//   if (err) throw err;
//   console.log('Connected');

//   const sql = "UPDATE users SET email='kiyo-arigatou39@gmail.com' WHERE id = 2";
//   conn.query(sql, (err, res, fields) => {
//     if (err) throw err;
//     console.log(res);
//   })
// });