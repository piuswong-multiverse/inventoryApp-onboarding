// functionality of front-end TODO
import { fetchAllItems } from './api.js';

window.addEventListener("load", () => {

    console.log('loaded!'); // debug

    showItems();

});

let showItems = async () => {
    const data = await fetchAllItems();
    // console.log(data[0].name); // debug
    data.forEach(item => {
        console.log(item);
        let itemDisplay = document.createElement('div');
        itemDisplay.classList.add('item');
        itemDisplay.innerHTML = `<div class="name"><a href="items/${item.id}">${item.name}</a></div>
            <div class="description">${item.description}</div>
            <div class="price">${item.price}</div>
            <div class="image"><img src="${item.imageUrl}" altText = "It's a cat"></div>`;
        document.getElementById("item-display").appendChild(itemDisplay);        
    });

}