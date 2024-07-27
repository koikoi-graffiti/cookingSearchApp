const request = require('sync-request');
const fs = require('fs');

const requestCategories = () => {
    const categoryData = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=1056685797032393180';
    const response = request('GET', categoryData);
    const categories = JSON.parse(response.getBody()).result
    return categories
};

const writeJsonFile = (pathName, source) => {
    const toJSON = JSON.stringify(source);
    fs.writeFile(pathName, toJSON, (err) => {
      if (err) rej(err);
      if (!err) {
        console.log('JSONファイルを生成しました');
      }
    });
};

// Update Rakuten Recipe API categories
// const data = requestCategories();
// writeJsonFile('./seeds/categories.json', data);

//Categories
/*
const json = fs.readFileSync( './seeds/categories.json' );
const data = JSON.parse(json);
console.log(data)
*/




/*
const fs = new ActiveXObject("Scripting.FileSystemObject");

// text.txtという新規のファイルを作成
var file = fs.CreateTextFile("./seeds/text.txt");

// texxt.txtファイルへ書き込み
file.Write("Complete, written!");

// text.txtファイルを閉じる
file.Close();
*/

/*
s = "新規にファイルを作成するテスト";
try {
    fs.writeFileSync('./seeds/RukutenCategories.txt', s, 'utf-8');
} catch (err) {
    console.log(err);
}
*/