// functionality of front-end TODO
import { fetchAllItems } from './api.js';

window.addEventListener("load", () => {

    console.log('loaded!'); // debug

    showItems();

});

const displayCategories = (categories) => { // takes Category object as argument
    let categoryString = "";
    Object.keys(categories).forEach( key => {
        // console.log(key, categories[key]); // debug
        categoryString = categoryString.concat(`<li>${categories[key].name}</li>`);
    });
    return categoryString;
};

let showItems = async () => {
    const data = await fetchAllItems();
    // console.log(data[0].name); // debug
    data.forEach(item => {
        // console.log(item); // debug
        let itemDisplay = document.createElement('div');
        itemDisplay.classList.add('item');
        itemDisplay.innerHTML = `<div class="name"><a href="items/${item.id}">${item.name}</a></div>
            <div class="description">${item.description}</div>
            <div class="price">${item.price}</div>
            <div class="image"><img src="${item.imageUrl}" altText = "It's a cat"></div>
            <div class="categories">Categories:<ul>${displayCategories(item.Categories)}</ul></div>`;
        document.getElementById("item-display").appendChild(itemDisplay);        
    });

}