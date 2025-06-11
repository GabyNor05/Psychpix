import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AdminStockCard from './AdminStockCard';
import { useNavigate } from 'react-router-dom'; // Add this import

const Stocklist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error('Failed to fetch items');
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setItems(items.filter(item => item._id !== id));
      } else {
        toast.error('Failed to delete item');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleSave = async (updatedItem) => {
    const formData = new FormData();
    Object.entries(updatedItem).forEach(([key, value]) => {
      if (key === 'tags') {
        value.forEach(tag => formData.append('tags[]', tag));
      } else if (value !== undefined) {
        formData.append(key, value);
      }
    });

    console.log(formData);

    const res = await fetch(`http://localhost:5000/api/items/${updatedItem._id}`, {
      method: 'PUT',
      body: formData
    });
    if (res.ok) {
      // Update the local state with the new item
      const newItem = await res.json();
      setItems(items => items.map(i => i._id === newItem._id ? newItem : i));
    } else {
      toast.error('Failed to update item');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{marginTop: '64px'}}>
      <div className = "headerContainer"> 
    <h2 className="domine-Label adminPageTitle">Stocklist</h2>
  <button
    className="goToAdminFormButton"
    onClick={() => navigate('/adminForm')}>
    Add New Product
  </button>
</div>
      {items.length === 0 && <p>No items found.</p>}
      {items.map(item => (
        <div style={{ margin: '32px 0px'}} key={item._id}>
            <AdminStockCard
            _id={item._id}
            {...item}
            image={item.imageUrl }
            onDelete={() => handleDelete(item._id)}
            onSave={handleSave}
          />
        </div>
      ))}
    </div>
  );
};

export default Stocklist;