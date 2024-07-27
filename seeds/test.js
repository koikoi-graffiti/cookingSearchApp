const request = require('sync-request');
const fs = require('fs');
const { get } = require('mongoose');

//read category JSON
const json = fs.readFileSync('./seeds/categories.json')
const categoriesData = JSON.parse(json)


const fridgeMaterials = ['ご飯', 'スイカ', 'きのこ','ひき肉', 'お米', 'メロン', '鳥', '鶏肉', '肉'];

//categoryName into array
const transValueIntoArray = (size) => {
    const categoriesNames = []
    if(size=='l'){
        Object.entries(categoriesData.large).forEach(([key, value]) => { // ★
            categoriesNames.push(value.categoryName)
        });
    } else if(size=='m'){
        Object.entries(categoriesData.medium).forEach(([key, value]) => { // ★
            categoriesNames.push(value.categoryName)
        });
    } else if(size='s'){
        Object.entries(categoriesData.small).forEach(([key, value]) => { // ★
            categoriesNames.push(value.categoryName)
        });
    }
    return categoriesNames
}

const getMaterialInCategory = (myIngredient, allCategory) => {
    const isInCategory = []

    for ( let material of myIngredient){
        if(allCategory.includes(material)){
            isInCategory.push(material)
        }
    }
    return isInCategory
}

const judgeInCategory = () => {
    const includesIds = []
    let index;
    for (let include of includes){
        if(larges.includes(include)){
            index = categoriesData.large.findIndex(({categoryName}) => categoryName === include)
            includesIds.push(categoriesData.large[index]);
        } else if (mediums.includes(include)){
            index = categoriesData.medium.findIndex(({categoryName}) => categoryName === include)
            includesIds.push(categoriesData.medium[index]);
        } else if (smalls.includes(include)){
            index = categoriesData.small.findIndex(({categoryName}) => categoryName === include)
            includesIds.push(categoriesData.small[index]);
        }
    }
    return includesIds;
}

const searchRankingURL = (obj) => {
    const getWantRankingURL = [];
    const cutId = obj.split('/');
    const nameId = cutId[4]
    const searchURL = `${apiUrl}&categoryId=${nameId}`;
    getWantRankingURL.push(searchURL);
    return getWantRankingURL
}

//conmbine all categoryName
const larges = transValueIntoArray('l');
const mediums = transValueIntoArray('m');
const smalls = transValueIntoArray('s');
const allCategories = [...larges, ...mediums, ...smalls];

const apiUrl = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1056685797032393180';


const includes = getMaterialInCategory(fridgeMaterials, allCategories);
const judgedIncludes = judgeInCategory();

const resultUrl = [];
for(let i of judgedIncludes){
    let url = i.categoryUrl;
    const result = searchRankingURL(url);
    resultUrl.push(result)
}

console.log(resultUrl)


for (let contents of resultUrl) {
    const response = request('GET', contents);
}
const response = request('GET', searchURL);
result = JSON.parse(response.getBody()).result
// console.log(result);