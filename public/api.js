const fetchAllItems = async () => {
    const response = await fetch('http://localhost:3001/api/items/');
    const data = await response.json();
    // console.log(data); // debug
    return data.allItems;
};

const fetchOneItem = async (num) => {
    const response = await fetch(`http://localhost:3001/api/items/${num}`);
    const data = await response.json();
    // console.log(data); // debug
    return data.item;
};

export { fetchAllItems, fetchOneItem };