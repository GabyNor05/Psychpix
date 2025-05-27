import React, { useState } from 'react';
import './admin.css';
import placeholder from '../placeholder.png';

const AdminStockCard = ({
  _id,
  serialNumber,
  title,
  creator,
  price,
  description,
  tags,
  stock,
  year,
  discount,
  image,
  onDelete,
  onSave // <-- Add this prop for saving edits
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    _id,
    serialNumber,
    title,
    creator,
    price,
    description,
    tags: tags || [],
    stock,
    year,
    discount,
    image
  });

  const imageSrc = image
    ? (typeof image === "string" ? image : URL.createObjectURL(image))
    : placeholder;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tag) => {
    setEditData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSave = () => {
    if (onSave) onSave(editData);
    setEditMode(false);
  };

  return (
    <div className="admin-stock-card">
      <img
        src={imageSrc}
        alt={title || "No Image"}
        className="admin-stock-card-img"
      />
      <div className="admin-stock-card-content">
        {editMode ? (
          <>
            <input name="title" value={editData.title} onChange={handleChange} />
            <p><strong>Serial Number:</strong> <input name="serialNumber" value={editData.serialNumber} onChange={handleChange} /></p>
            <p><strong>Creator:</strong> <input name="creator" value={editData.creator} onChange={handleChange} /></p>
            <p><strong>Price:</strong> <input name="price" value={editData.price} onChange={handleChange} /></p>
            <p><strong>Discount:</strong> <input name="discount" value={editData.discount} onChange={handleChange} /></p>
            <p><strong>Description:</strong> <input name="description" value={editData.description} onChange={handleChange} /></p>
            <p>
              <strong>Tags:</strong>
              {['Digital Artworks', 'Scultures', 'Paintings'].map(tag => (
                <label key={tag} style={{ marginLeft: 8 }}>
                  <input
                    type="checkbox"
                    checked={editData.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  {tag}
                </label>
              ))}
            </p>
            <p><strong>Stock:</strong> <input name="stock" value={editData.stock} onChange={handleChange} /></p>
            <p><strong>Year:</strong> <input name="year" value={editData.year} onChange={handleChange} /></p>
            <button className="admin-edit-btn" onClick={handleSave}>Save</button>
            <button className="admin-delete-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h3>{title}</h3>
            <p><strong>Serial Number:</strong> {serialNumber}</p>
            <p><strong>Creator:</strong> {creator}</p>
            <p><strong>Price:</strong> R{price}</p>
            {discount && <p><strong>Discount:</strong> {discount}%</p>}
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Tags:</strong> {tags && tags.join(', ')}</p>
            <p><strong>Stock:</strong> {stock}</p>
            <p><strong>Year:</strong> {year}</p>
            <button className="admin-edit-btn" onClick={() => setEditMode(true)}>Edit</button>
            <button className="admin-delete-btn" onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminStockCard;