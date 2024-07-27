//Homepages --Search Event js
const form = document.querySelector('#searchForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //const categoriesData = JSON.parse(categoryAllData);
    //console.log(categoryAllData);

    //get requested words
    const searchMaterials =[];
    for (let i = 0; i < form.elements.length; i++){
        searchMaterials.push(form.elements[i].value)
    }

    //category名とsearchWordに共通するワードを取得
    const isInCategory = [];

    for ( let searchMaterial of searchMaterials){
        if(categoryAllData.includes(searchMaterial)){
            isInCategory.push(searchMaterial)
        }
    }
    console.log(isInCategory);

    let result = [];
    const d = fetch('../js/category.json')
        .then(response => response.json())
        .then(data => {
            for (let word of isInCategory) {
                let index; 
                index = data.large.findIndex(({categoryName}) => categoryName === word);
                if(index != -1){
                    result.push(data.large[index]);
                    index = null;
                    continue;
                }

                index = data.medium.findIndex(({categoryName}) => categoryName === word);
                if(index != -1){
                    result.push(data.medium[index]);
                    index = null;
                    continue;
                }

                index = data.small.findIndex(({categoryName}) => categoryName === word);
                if(index != -1){
                    result.push(data.small[index]);
                    index = null;
                    continue;
                }
            }

            //generate ID from categoryURL
            const apiURL = ''
            let rankingURLs = [];
            for( let each of result) {
                const rawURL = each.categoryUrl
                const cuttedMaterials = rawURL.split('/');
                const nameId = cuttedMaterials[4];
                const generatedURL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1056685797032393180&categoryId=${nameId}`;
                rankingURLs.push(generatedURL)
            }
            
            
            //search rankings by axios
            let resResult = [];  
            let count = 0;
            let i = 0;
            const interval = setInterval( async () => {
                //X時間ごとに実行される処理
                const res = await axios.get(rankingURLs[i])
                console.log(res.data.result[0])

                //検索結果HTML反映
                createCard4(res);
                
                //インターバル解除処理
                i++;
                count++;
                if(count === rankingURLs.length){
                    clearInterval(interval);
                }
            }, 2000)
        })
        .catch(err => {
            console.error('エラー:', err);
        });
})

const createCard4 = (resData) => {
    for ( let recipe of resData.data.result) {

    //card cell __div
    const cardCellDiv = document.createElement('DIV');
    cardCellDiv.className = 'card cell';

    //card-image __div
    const cardImageDiv = document.createElement('DIV');
    cardImageDiv.className = 'card-image';

    //card-image __figure
    const cardImageFig = document.createElement('FIGURE');
    cardImageFig.className = 'image is-4by3';

    //card-image __<img>
    const cardImage = document.createElement('IMG')
    cardImage.src = recipe.foodImageUrl;
    cardImage.alt = 'Placeholder image'
    cardImage.className = 'cardImg'

    cardImageFig.appendChild(cardImage);
    cardImageDiv.appendChild(cardImageFig);

    //card-content __div
    const cardContentDiv = document.createElement('DIV');
    cardContentDiv.className = 'card-content';

    //mediaDiv __div
    const mediaDiv = document.createElement('DIV');
    mediaDiv.className = 'media';

    //media-left __div
    const mediaLeftDiv = document.createElement('DIV');
    mediaLeftDiv.className = 'media-left';

    //image is-48x48 __figure
    const imageMediaFig = document.createElement('FIGURE');
    imageMediaFig.className = 'image is-48x48';

    //mediaImage
    const mediaImage = document.createElement('IMG')
    mediaImage.src = 'https://bulma.io/assets/images/placeholders/96x96.png';
    mediaImage.alt = 'Placeholder image'

    //media-left append
    imageMediaFig.appendChild(mediaImage);
    mediaLeftDiv.appendChild(imageMediaFig);

    //mediaContentDiv __div
    const mediaContentDiv = document.createElement('DIV');
    mediaContentDiv.className = 'media-content';

    //title-p __p
    const titleP = document.createElement('P');
    titleP.className = 'title is-4';
    titleP.innerText = recipe.recipeTitle;

    //subTitle-p __p
    const subtitleP = document.createElement('P');
    subtitleP.className = 'subtitle is-6';

    //mediaContent combine
    mediaContentDiv.appendChild(titleP);
    mediaContentDiv.appendChild(subtitleP);

    //media combine & 
    mediaDiv.appendChild(mediaLeftDiv);
    mediaDiv.appendChild(mediaContentDiv);

    //contentDiv __div
    const contentDiv = document.createElement('DIV');
    contentDiv.className = 'content';
    contentDiv.innerText = recipe.recipeDescription;


    //card-content combine 
    cardContentDiv.appendChild(mediaDiv);
    cardContentDiv.appendChild(contentDiv);

    //all combine
    cardCellDiv.appendChild(cardImageDiv);
    cardCellDiv.appendChild(cardContentDiv);

    //finalAppend to body
    const recipeGrid = document.querySelector('#recipeGrid');
    recipeGrid.appendChild(cardCellDiv);
    }
}

//Homepages --Add & remove Item Into / from Search Box Event js
const selectItems = document.getElementsByName('fridgeItem');
const searchTags = document.querySelector('#searchTags');
selectItems.forEach( (selectItem) => {
    selectItem.addEventListener('click', () => {
        if (selectItem.checked) {
            // チェックボックスがONのときの処理
            selectItem.closest('label').classList.replace('is-info', 'is-primary');

            console.log(selectItem.value);

            const searchItemLabel = document.createElement('LABEL');
            searchItemLabel.className = 'tag';
            searchItemLabel.innerText = selectItem.value;

            const searchItemInput = document.createElement('INPUT');
            searchItemInput.type = "checkbox";
            searchItemInput.name = selectItem.value;
            searchItemInput.value = selectItem.value;
            searchItemInput.checked = true;

            searchItemLabel.appendChild(searchItemInput);
            searchTags.appendChild(searchItemLabel);
          } else if(!selectItem.checked){
            // チェックボックスがOFFのときの処理
            const deleteSearchItem = document.querySelector(`input[name=${selectItem.value}]`);
            deleteSearchItem.parentNode.remove();
            selectItem.closest('label').classList.replace('is-primary', 'is-info');
          }
        
    })
});
"input:checked[name=name属性名]]"