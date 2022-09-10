import React, { useState, useEffect } from 'react';

const Display = ( { view, setView }) => {

    const [items, setItems] = useState({});
    const [itemId, setItemId] = useState(null);

    const displayCategories = (categories) => { // takes Category object as argument
        // to prevent errors, check that categories exists first
        return categories ? categories.map( (category) => {
            return <li key={category.id}>{category.name}</li>
        }) : null ;
    };

    const getAllItems = async () => {
        try{
            const response = await fetch('/api/items/');
            // const response = await fetch('http://localhost:3001/api/items/'); // this version would bring up CORS errors on dev
            const data = await response.json(); 
            let items = data.allItems;
            // console.log(items[0].name); // debug
            setItems(items);
        } catch (err) {
            setItems({});
            console.log(err)
        }
    }

    const getOneItem = async (num) => {
        try{
            const response = await fetch(`/api/items/${num}`);
            const data = await response.json(); 
            setItems(data.item);
        } catch (err) {
            setItems({});
            console.log(err)
        }
    }

    const displayItem = (item) => {
        // console.log(item); // debug
        return(   
            <div className="item" key={item.id}>
                <div className="name"><a href="#" onClick={() => {
                    setView("one"); 
                    setItemId(item.id);
                }}>{item.name}</a></div>
                <div className="description">{item.description}</div>
                <div className="price">${item.price}</div> 
                <div className="image"><img src={`${item.imageUrl}`} alttext = "It's a cat" /></div>
                <div className="categories">Categories:<ul>{displayCategories(item.Categories)}</ul></div>
            </div>     
        );
    }

    const displayItems = (items) => {
        return items.map( (item) => {
            return displayItem(item);
        }); 
    }

    useEffect(() => {
        if(view==="summary"){
            getAllItems();
        } else if(view==="one"){
            getOneItem(itemId);
        }
    }, [view])

    // console.log(Object.keys(items).length); // debug
    console.log(items); // debug

    return(
        <div id="item-display" className={`item-display view-${view}`}>
            { Object.keys(items).length===0 ? "Items still loading..." : 
                view==="summary" ? displayItems(items) :
                view==="one" ? displayItem(items) :
                "TODO"
            }
        </div>
    );
}

export default Display