import { Typography } from '@mui/material';
import { useState } from 'react';

export default function Base64Page() {
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setBase64Image(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSaveImage = () => {
        // You can now use the base64Image state as needed (e.g., send it to the server).
        console.log('Base64 Image:', base64Image);
    };

    const handleLoadImage = () => {
        // Assuming you have a base64Image string stored, you can set it to the image state.
        setImage(base64Image);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && (
                <div>
                    <img src={image} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    <button type="button" onClick={handleSaveImage}>
                        Save Image
                    </button>
                </div>
            )}
            {base64Image && (
                <div>
                    <img src={base64Image} alt="Loaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    <button type="button" onClick={handleLoadImage}>
                        Load Image
                    </button>
                </div>
            )}

            <br />

            <Typography variant="subtitle2" sx={{ width: 500, height: 1000 }} noWrap>
                {base64Image}
            </Typography>
        </div>
    );
}
