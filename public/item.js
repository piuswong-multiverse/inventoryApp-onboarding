// functionality of front-end TODO
import { fetchOneItem } from './api.js';

window.addEventListener("load", () => {

    console.log('loaded!'); // debug

    showItem(getItemId());

});

const getItemId = () => {
    let url = window.location.href;
    let n = url.lastIndexOf('/'); 
    return url.substring(n + 1);
};

const showItem = async (itemId) => {
    const item = await fetchOneItem(itemId);
    console.log(item); // debug
    let itemDisplay = document.createElement('div');
    itemDisplay.classList.add('item');
    itemDisplay.innerHTML = `<div class="name">${item.name}</div>
        <div class="description">${item.description}</div>
        <div class="price">${item.price}</div>
        <div class="image"><img src="${item.imageUrl}" altText = "It's a cat"></div>`;
    document.getElementById("item-display").appendChild(itemDisplay);        
};