import React from 'react';
import './admin.css';
import placeholder from '../placeholder.png'; // Import your local placeholder image

const AdminStockCard = ({
  serialNumber,
  title,
  creator,
  price,
  description,
  tags,
  stock,
  year,
  discount,
  image
}) => {
  const imageSrc = image
    ? (typeof image === "string" ? image : URL.createObjectURL(image))
    : placeholder; // Use the imported placeholder

  return (
    <div className="admin-stock-card">
      <img
        src={imageSrc}
        alt={title || "No Image"}
        className="admin-stock-card-img"
      />
      <div className="admin-stock-card-content">
        <h3>{title}</h3>
        <p><strong>Serial Number:</strong> {serialNumber}</p>
        <p><strong>Creator:</strong> {creator}</p>
        <p><strong>Price:</strong> R{price}</p>
        {discount && <p><strong>Discount:</strong> {discount}%</p>}
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Tags:</strong> {tags && tags.join(', ')}</p>
        <p><strong>Stock:</strong> {stock}</p>
        <p><strong>Year:</strong> {year}</p>
      </div>
    </div>
  );
};

export default AdminStockCard;