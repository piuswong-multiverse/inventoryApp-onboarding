import React, { useState, useEffect } from 'react';

const Display = ( { view }) => {

    const [items, setItems] = useState([]);

    // const displayCategories = (categories) => { // takes Category object as argument
    //     let categoryString = "";
    //     Object.keys(categories).forEach( key => {
    //         // console.log(key, categories[key]); // debug
    //         categoryString = categoryString.concat(`<li>${categories[key].name}</li>`);
    //     });
    //     return categoryString;
    // };

    const getAllItems = async () => {
        const response = await fetch('/api/items/');
        // // const response = await fetch('http://localhost:3001/api/items/'); // this version would bring up CORS errors on dev
        const data = await response.json(); 
        if(response.status !== 200){ // Show error if backend isn't working
            setItems('Waiting for server');
            throw Error(data.message)
        }
        let items = data.allItems;
        // console.log(items[0].name); // debug
        setItems(items);
    }

    const displayItems = (items) => {
        return items.map((item) => {
            // console.log(item); // debug
            return(   
                <div className="item" key={item.id}>
                    <div className="name"><a href={`items/${item.id}`}>{item.name}</a></div>
                    <div className="description">{item.description}</div>
                    <div className="price">${item.price}</div> 
                    <div className="image"><img src={`${item.imageUrl}`} alttext = "It's a cat" /></div>
                    {/* <div class="categories">Categories:<ul>${displayCategories(item.Categories)}</ul></div> */}
                </div>     
            );
        }) 
    }

    useEffect(() => {
        if(view==="summary"){
            getAllItems();
        }
    }, [])


    return(
        <div id="item-display" className={`item-display view-${view}`}>
            {!items[0] ? "Items still loading..." : displayItems(items) }
        </div>
    );
}

export default Display