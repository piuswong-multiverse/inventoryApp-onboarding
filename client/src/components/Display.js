import React, { useState, useEffect } from 'react';
import OneItem from './OneItem';

const Display = ( { view, setView }) => {

    const [items, setItems] = useState({});
    const [itemId, setItemId] = useState(null);

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

    const displayItems = (items) => {
        // console.log(Object.keys(items).length); // debug
        if(items.map){ // make sure you only do this if items has multiple objects
            return items.map( (item) => {
                return <OneItem 
                    item = {item} 
                    view = {view}
                    setView = {setView}
                    setItemId = {setItemId}
                    key = {item.id}
                />;
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
                view==="one" ? <OneItem 
                    item = {items} 
                    view = {view}
                    setView = {setView}
                    setItemId = {setItemId}
                /> :
                null
            }
        </div>
    );
}

export default Display