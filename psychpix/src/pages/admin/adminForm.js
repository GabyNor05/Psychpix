import React, { useState } from 'react';
import './admin.css';
import AdminStockCard from './AdminStockCard';

const AdminForm = () => {
    const [formData, setFormData] = useState({
        serialNumber: '',
        title: '',
        creator: '',
        price: '',
        description: '',
        tags: [],
        stock: '',
        year: '',
        discount: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => {
                const tags = checked
                    ? [...prevData.tags, value]
                    : prevData.tags.filter(tag => tag !== value);
                return { ...prevData, tags };
            });
        } else if (type === 'file') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div>
            <form className="admin-form-container" onSubmit={handleSubmit}>
            <div>
                <label>Serial Number:</label>
                <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
            </div>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Creator:</label>
                <input type="text" name="creator" value={formData.creator} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Tags:</label>
                <div className="tags-group">
                    {['Digital Artworks', 'Scultures', 'Paintings', 'Pottery'].map(tag => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                name="tags"
                                value={tag}
                                checked={formData.tags.includes(tag)}
                                onChange={handleChange}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </div>
            <div>
                <label>Year of Creation:</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
                <label>Discount:</label>
                <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
            </div>
            <div>
                <label>Upload Image:</label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>

        <AdminStockCard />
        </div>
    );
};

export default AdminForm;