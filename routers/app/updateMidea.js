import express, { Router } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import uploadFile from '../../services/ai/uploadFile.js';
import fileToUrl from '../../services/fileToUrl.js';
dotenv.config();
const upload = multer();

const uploadMidea = Router();

uploadMidea.post('/upload-midea', upload.single('midea'), async (req, res) => {
    console.log('/upload-midea', req.file);
    try {
        const { originalname, mimetype, buffer } = req.file

        let result1, result2;

        if (mimetype.startsWith('image/')) {
            [result1, result2] = await Promise.all([
                uploadFile(buffer.toString('base64'), mimetype),
                fileToUrl(originalname, mimetype, buffer)
            ]);
        } else result1 = await uploadFile(buffer.toString('base64'), mimetype);

        console.log('result1', result1);
        console.log('result2', result2);

        res.json({
            message: 'upload file successfully',
            fileData: {
                fileUri: result1.uri,
                mimeType: result1.mimeType,
                more: {
                    name: originalname,
                    type: mimetype.split('/')[0],
                    url: result2 || null
                }
            },
            type: 'UFS'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
    }
});


export default uploadMidea;