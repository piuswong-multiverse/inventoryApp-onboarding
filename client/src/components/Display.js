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
            const response = await fetch('/api/items');
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

    const getAllItemNames = async () => {
        try{
            const response = await fetch('/api/items/names');
            const data = await response.json(); 
            let items = data.allItemNames;
            // console.log(items); // debug
            setItems(items);
        } catch (err) {
            setItems({});
            console.log(err)
        }
    }

    const getOneItem = async (num) => {
        try{
            if(num){
                const response = await fetch(`/api/items/${num}`);
                const data = await response.json(); 
                setItems(data.item);    
            }
        } catch (err) {
            setItems({});
            console.log(err)
        }
    }

    const displayItem = (item) => {
        // console.log(item); // debug
        return(   
            item ? 
            <div className="item" key={item.id}>
                <div className="item-id">
                    {item.id}
                </div>
                <div className="item-content">
                    <div className="name">
                    { view==="summary" || view==="all" ? 
                        <button href="#" onClick={(e) => {
                            e.preventDefault(); // step client from loading new page
                            setView("one"); 
                            setItemId(item.id);
                        }}>{item.name}</button>
                        : item.name
                    }
                    </div>
                    { view==="all" || view==="one" ?
                        <>
                        <div className="description">{item.description}</div>
                        <div className="price">${item.price}</div> 
                        <div className="image"><img src={`${item.imageUrl}`} alt = "It's a cat" /></div>
                        </>
                        : null
                    }
                    <div className="categories">
                        <div className="categories-heading">Categories:</div>
                        <ul>{displayCategories(item.Categories)}</ul>
                    </div>
                </div>
            </div>
            : null
        )
    }

    const displayItems = (items) => {
        // console.log(Object.keys(items).length); // debug
        if(items.map){ // make sure you only do this if items has multiple objects
            return items.map( (item) => {
                return displayItem(item);
            });     
        }
    }

    useEffect(() => { // this runs after first mounting of components
        if(view==="summary"){
            getAllItemNames();
            // console.log("Getting all items, summary..."); // debug
        } else if(view==="all"){
            getAllItems();
            // console.log("Getting all items, detailed..."); // debug
        } else if(view==="one"){
            getOneItem(itemId);
            // console.log("Getting one item..."); // debug
        }
    }, [view, itemId])

    // console.log(view, items); // debug
    // console.log(Object.keys(items).length); // debug
    // console.log(items); // debug

    return(
        <div id="item-display" className={`item-display view-${view}`}>
            { Object.keys(items).length===0 ? "Items still loading..." : 
                view==="summary" ? displayItems(items) :
                view==="all" ? displayItems(items) :
                view==="one" ? displayItem(items) :
                "TODO"
            }
        </div>
    );
}

export default Display