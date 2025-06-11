import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiEye} from 'react-icons/fi';
import './admin.css';
import placeholder from '../placeholder.png';
import { Heart } from '@phosphor-icons/react';

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
  onSave
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
  const [expanded, setExpanded] = useState(false);

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
    <>
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
                {['Digital Artworks', 'Sculptures', 'Paintings', 'African', 'Psychedelic', 'Artificial Intelligence', 'Photography', 'Galaxy', 'Trending'].map(tag => (
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
              <p><strong>Price:</strong> R {price}</p>
              {discount && <p><strong>Discount:</strong> {discount}%</p>}
              <p
                className={`description${expanded ? ' expanded' : ''}`}
                onClick={() => setExpanded(!expanded)}
                style={{ cursor: 'pointer', position: 'relative' }}
                title={expanded ? "Click to collapse" : "Click to expand"}
              >
                <strong>Description:</strong>{" "}
                {expanded
                  ? description
                  : description && description.length > 100
                    ? description.slice(0, 100) + "..."
                    : description}
                {!expanded && description && description.length > 100 && (
                  <span className="ellipsis-overlay"> more</span>
                )}
              </p>
              <p><strong>Tags:</strong> {tags && tags.join(', ')}</p>
              <p><strong>Stock:</strong> {stock}</p>
              <p><strong>Year:</strong> {year}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px'}}>
                  <span
                    className="admin-edit-text-btn"
                    onClick={() => setEditMode(true)}
                  >
                    <FiEdit2 style={{ marginRight: 5, verticalAlign: 'middle' }} />
                    Edit
                  </span>
                  <span
                    className="admin-delete-text-btn" style={{color:'#a83236', fontWeight: 'bold', marginLeft: 10}} onClick={onDelete}>
                    <FiTrash2 style={{ marginRight: 5, verticalAlign: 'middle' }} />
                    Delete
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminStockCard;