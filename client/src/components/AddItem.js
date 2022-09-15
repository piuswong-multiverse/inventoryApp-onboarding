import React, { useState, useEffect } from 'react';

const AddItem = ({ setView }) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(1);
    const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/300x150");
    const [categories, setCategories] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const updateName = (event) => {
        // TODO: can add some validation, debouncing, modification...
        setName(event.target.value);
    }

    const updateDescription = (event) => {
        // TODO: can add some validation, debouncing, modification...
        setDescription(event.target.value);
    }

    const updateValue = (event) => {
        let val = Math.floor(100*event.target.value)/100;
        // TODO: handle display of zero value better, show dollar sign, debouncing...
        setValue(val);
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
        console.log("Trying to add item..."); // debug
        if(submitted){
            // add data to database 
            const dataToSend = {
                name: name,
                description: description,
                value: value,
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
            postData();
            // and then load up the summary page again
            // .then{setView("summary");}
        }
    },[submitted]);

    // console.log(name, description, value, imageUrl, categories, categories.length); // debug

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
                    <input type="number" id="price" min="0.01" step="0.01" value={value} onChange={updateValue} />
                </label>
                <label>
                    <div className="form-heading">Image URL:</div>
                    <input type="url" id="imageUrl" value={imageUrl} onChange={updateImageUrl} />
                </label>

                {/* TODO: can make categories dynamic later */}
                <div className="form-categories">Categories</div>
                <label>
                    <div className="form-heading">floof</div>
                    <input type="checkbox" name="categories" value="floof" onChange={updateCategories} />
                </label>
                <label>
                    <div className="form-heading">chonk</div>
                    <input type="checkbox" name="categories" value="chonk" onChange={updateCategories} />
                </label>
                <label> 
                    <div className="form-heading">smol</div>
                    <input type="checkbox" name="categories" value="smol" onChange={updateCategories} />
                </label>
                <label>
                    <div className="form-heading">long</div>
                    <input type="checkbox" name="categories" value="long" onChange={updateCategories} />
                </label>
                <label>
                    <div className="form-heading">hungry</div>
                    <input type="checkbox" name="categories" value="hungry" onClick={updateCategories} />
                </label>

                <div>
                    <button type="submit" value="Submit" onClick={handleSubmit} >
                        Submit New Item!
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AddItem