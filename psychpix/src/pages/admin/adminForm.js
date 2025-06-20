import React, { useState, useEffect, useRef } from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';


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
    });

     const [imageFile, setFile] = useState(null); 
     const fileInputRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    // Check admin role on mount
    // useEffect(() => {
    //     const userRole = localStorage.getItem("userRole");
    //     if (userRole !== "admin") {
    //         // Redirect non-admins to home or login
    //         navigate("/");
    //     }
    // }, [navigate]);

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
            setPreview(URL.createObjectURL(files[0]));
            setFile(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const tags = ['Digital Artworks', 'Sculptures', 'Paintings', 'African', 'Psychedelic', 'Artificial Intelligence', 'Photography', 'Galaxy', 'Trending'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        //uploading image to cloudinary
        const cloudName = 'dgf9sqcdy';
        const baseURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        let imageData = new FormData();
        console.log(imageFile);
        imageData.append("file", imageFile);
        imageData.append("upload_preset", "Psychpix");
        imageData.append("cloud_name", cloudName);
        
        const res = await fetch(baseURL, {
            method: "POST",
            body: imageData
        });

        const imageResult = await res.json();

        const payload = {
            ...formData,
            imageUrl: imageResult.url,
        };

        // Example POST request to your backend
        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                toast.success('Item saved!');
                setFormData({
                    serialNumber: '',
                    title: '',
                    creator: '',
                    price: '',
                    description: '',
                    tags: [],
                    stock: '',
                    year: '',
                    discount: '',
                });
                setFile(null);
                setPreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Clear the file input in the DOM
                }
            } else {
                toast.error('Error saving item');
            }
        } catch (err) {
            toast.error('Network error');
        }
    };

    return (
        <div>
            <h1 className='domine-Label adminPageTitle' style={{ marginTop: '64px'}}>Admin Form</h1>
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
                <div className='Tags'>
                    {tags.map(tag => (
                        <div key={tag}>
                            <label>{tag}</label>
                            <input
                                type="checkbox"
                                name="tags"
                                value={tag}
                                checked={formData.tags.includes(tag)}
                                onChange={handleChange}
                            />
                        </div>
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
                <div className='image-upload'>
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        ref={fileInputRef}
                    />
                </div>
                <div className='admin-button-container'>
                    <div></div>
                    <div><button type="submit">Submit</button></div>
                    <div><span className='admin-eye-btn'
                    type="button"
                    style={{ marginBottom: '20px' }}
                    onClick={() => navigate('/stocklist')}>
                    View Stocklist <FiEye style={{ marginLeft: 6, verticalAlign: 'middle' }} />
                    </span></div>
                    
                </div>
                
            </form>
        </div>
    );
};

export default AdminForm;