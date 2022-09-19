import React from 'react';

const OneItem = ( { item, view, setView, setItemId } ) => {

    const displayCategories = (categories) => { // takes Category object as argument
        // to prevent errors, check that categories exists first
        return categories ? categories.map( (category) => {
            return <li key={category.id}>{category.name}</li>
        }) : null ;
    };

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

export default OneItem