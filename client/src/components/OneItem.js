import React, {useState, useEffect} from 'react';

const OneItem = ( { item, view, setView, setItemId, setItemToEdit } ) => {

    const [deletePressed, setDeletePressed] = useState(false);

    const displayCategories = (categories) => { // takes Category object as argument
        // to prevent errors, check that categories exists first
        return categories ? categories.map( (category) => {
            return <li key={category.id}>{category.name}</li>
        }) : null ;
    };

    const handleDeleteButton = () => {
        setDeletePressed(true);
    };

    const handleUpdateButton = () => {
        const getCategoryArray = () => {
            let categoryArray = [];
            item.Categories.map( (category) => {
                categoryArray.push(category.name);
            });
            return categoryArray;
        };
        let categoryArray = getCategoryArray();
        setItemToEdit({
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            categories: categoryArray
        });
        setView("update");
    };

    useEffect(() => {
        // TODO: Warnings before deletion
        const deleteItem = async () => {
            try{
                const res = await fetch('/api/delete',{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: item.id
                    })
                });
                const resJson = await res.json();
                console.log("Message from server:", resJson.message);
            } catch (err) {
                console.log("Deletion problem:", err);
            }
        }
        if(deletePressed){
            deleteItem().then(() => {
                setView("summary")
            });    
        }
    },[deletePressed])

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
                { view==="one" ? 
                    <>
                        <div className="update-container">
                            <button onClick={handleUpdateButton}>
                                Edit Item &#9997;
                            </button>
                        </div>
                        <div className="delete-container">
                            <button onClick={handleDeleteButton}>
                                Delete Item &#x26a0; &#xfe0f;
                            </button>
                        </div>
                    </>
                    : null
                }
            </div>
        </div>
        : null
    )
}

export default OneItem