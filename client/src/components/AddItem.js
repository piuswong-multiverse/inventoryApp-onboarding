import React from 'react';

const AddItem = ({ setView }) => {
    return(
        <div className = "create-item">
            <form> 
                <label>
                    <div className="form-heading">Name:</div>
                    <input type="text" id="name" />
                </label>
                <label>
                    <div className="form-heading">Description:</div>
                    <textarea defaultValue={""} id="description" />
                </label>
                <label>
                    <div className="form-heading">Price ($):</div>
                    <input type="number" id="price" min="0.01" step="0.01" />
                </label>
                <label>
                    <div className="form-heading">Image URL:</div>
                    <input type="url" id="imageUrl" />
                </label>
                {/* TODO: can make categories dynamic later */}
                <div className="form-categories">Categories</div>
                <label>
                    <div className="form-heading">floof</div>
                    <input type="checkbox" name="categories" value="floof"/>
                </label>
                <label>
                    <div className="form-heading">chonk</div>
                    <input type="checkbox" name="categories" value="chonk"/>
                </label>
                <label> 
                    <div className="form-heading">smol</div>
                    <input type="checkbox" name="categories" value="smol"/>
                </label>
                <label>
                    <div className="form-heading">long</div>
                    <input type="checkbox" name="categories" value="long"/>
                </label>
                <label>
                    <div className="form-heading">hungry</div>
                    <input type="checkbox" name="categories" value="hungry"/>
                </label>
                <div>
                    <button type="submit" value="Submit">
                        Submit New Item!
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddItem