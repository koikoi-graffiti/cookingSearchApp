const fs = require('fs');
const categoriesNames = [];

const json = fs.readFileSync('./seeds/category.json')
const categoriesData = JSON.parse(json)

Object.entries(categoriesData.large).forEach(([key, value]) => { // ★
    categoriesNames.push(value.categoryName)
});
Object.entries(categoriesData.medium).forEach(([key, value]) => { // ★
    categoriesNames.push(value.categoryName)
});
Object.entries(categoriesData.small).forEach(([key, value]) => { // ★
    categoriesNames.push(value.categoryName)
});

fs.writeFile('./categoryNameAll.js', JSON.stringify(categoriesNames), (err) => {
    if (err) rej(err);
    if (!err) {
      console.log('JSONファイルを生成しました');
    }
});