import axios from 'axios';

export const GetItemsData = async () => {
    const itemId = '6834983793492582714b934d';
    try {
        const response = await axios.get(`http://localhost:5000/api/items/`);
        console.log('Item data:', response.data);
        return response.data;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}


