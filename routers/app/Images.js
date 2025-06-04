
import express, {Router} from 'express';
import Image from '../../models/Image.js';

const images = Router();

images.get('/images/:id', async (req, res) => {
    console.log('images');
    try {
        const img = await Image.findById(req.params.id);
        if (!img) return res.status(404).send('Image not found');
    
        res.set('Content-Type', img.mimeType);
        res.send(img.data);
    } catch (error) {
        console.error('Image not found', error);
        res.status(404).send('Image not found');
    }
});

export default images;
