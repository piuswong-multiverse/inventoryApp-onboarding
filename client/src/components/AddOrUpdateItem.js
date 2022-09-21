import React, { useState, useEffect } from 'react';

const AddOrUpdateItem = ({ view, setView, itemToEdit }) => {

    // Initialize starting form values depending on if you're ADD-ing a new item or UPDATE-ing an old one
    const initialValues = view==="update" ? itemToEdit : {
        name: "New Item",
        description: "This is the description!",
        price: 1.99,
        imageUrl: "http://placekitten.com/g/200/230",
        categories: []
    };

    const [name, setName] = useState(initialValues.name);
    const [description, setDescription] = useState(initialValues.description);
    const [price, setPrice] = useState(initialValues.price);
    const [imageUrl, setImageUrl] = useState(initialValues.imageUrl);
    const [categories, setCategories] = useState(initialValues.categories);
    const [submitted, setSubmitted] = useState(false);

    // TODO: Can refactor one function to handle all form events if this structure becomes too much

    const updateName = (event) => {
        // TODO: can add some validation, debouncing, modification...
        setName(event.target.value);
    }

    const updateDescription = (event) => {
        // TODO: can add some validation, debouncing, modification...
        setDescription(event.target.value);
    }

    const updatePrice = (event) => {
        let val = Math.floor(100*event.target.value)/100;
        // TODO: handle display of zero price better, show dollar sign, debouncing...
        setPrice(val);
    }

    const updateImageUrl = (event) => {
        // TODO: can add some validation, debouncing, modification...
        // try url like: https://via.placeholder.com/300x150
        setImageUrl(event.target.value);
    }

    const updateCategories = (event) => {
        // TODO: handle arbitrary categories instead of just the premade ones (going w/ making rendering dynamic)
        const {value, checked} = event.target;
        // console.log(value, checked); // debug
        if(checked){
            // add to categories
            setCategories([...categories,value]);
        } else {
            // remove from categories
            let newCategories = [...categories]; // need deep copy because splice() mutates array
            let indexToDelete = newCategories.indexOf(value);
            if(indexToDelete>-1){
                newCategories.splice(indexToDelete,1);
                setCategories(newCategories);
            } else {
                throw new Error('Category to delete not found!');
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
    }

    useEffect(() => {
        if(submitted){
            // add data to database 
            const dataToSend = {
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl,
                categories: categories
            }
            const postData = async () => {
                try{
                    const response = await fetch('/api/item', {
                        method: "POST",
                        headers: {
                            // 'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataToSend)
                    });
                    const json = await response.json();
                    console.log(json);
                } catch (error) {
                    console.log(error);
                }
            };
            if(view==="add"){
                console.log("Trying to add item..."); // debug
                postData().then(() => {
                    setView("summary");
                });    
            } else if(view==="update"){
                console.log("Trying to update item..."); // debug
                // TODO
            }
        }
    },[submitted, name, description, price, imageUrl, categories]);

    const categoryShouldBeChecked = (category) => {
        return categories.indexOf(category)>=0
    };

    console.log(name, description, price, imageUrl, categories, categories.length); // debug
    // TODO: make price show cents properly to 2 digits even when ending with 0

    return(
        <div className = "create-item">
            <form> 

                <label>
                    <div className="form-heading">Name:</div>
                    <input type="text" id="name" value={name} onChange={updateName} />
                </label>
                <label>
                    <div className="form-heading">Description:</div>
                    <textarea id="description" value={description} onChange={updateDescription} />
                </label>
                <label>
                    <div className="form-heading">Price ($):</div>
                    <input type="number" id="price" min="0.01" step="0.01" value={price} onChange={updatePrice} />
                </label>
                <label>
                    <div className="form-heading">Image URL:</div>
                    <input type="url" id="imageUrl" value={imageUrl} onChange={updateImageUrl} />
                </label>

                {/* TODO: can make categories dynamic later */}
                <div className="form-categories">Categories</div>
                <label>
                    <div className="form-heading">floof</div>
                    <input type="checkbox" name="categories" value="floof" onChange={updateCategories} 
                        checked={categoryShouldBeChecked("floof")}/>
                </label>
                <label>
                    <div className="form-heading">chonk</div>
                    <input type="checkbox" name="categories" value="chonk" onChange={updateCategories}
                        checked={categoryShouldBeChecked("chonk")}/>
                </label>
                <label> 
                    <div className="form-heading">smol</div>
                    <input type="checkbox" name="categories" value="smol" onChange={updateCategories} 
                        checked={categoryShouldBeChecked("smol")}/>
                </label>
                <label>
                    <div className="form-heading">long</div>
                    <input type="checkbox" name="categories" value="long" onChange={updateCategories}
                        checked={categoryShouldBeChecked("long")}/>
                </label>
                <label>
                    <div className="form-heading">hungry</div>
                    <input type="checkbox" name="categories" value="hungry" onChange={updateCategories}
                        checked={categoryShouldBeChecked("hungry")}/>
                </label>

                <div>
                    <button type="submit" value="Submit" onClick={handleSubmit} >
                        Submit { view==="add" ? "New" : view==="update" ? "Modified" : null } Item!
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AddOrUpdateItem