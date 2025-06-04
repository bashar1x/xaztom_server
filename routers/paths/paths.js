import express, { Router } from "express";
import path from 'path';

const paths = Router();

const __dirname = path.dirname(process.argv[1]);

paths.get('/log', (req, res) => { res.sendFile(__dirname + '/views/log.html') });
// paths.get('/top/users-a', (req, res) => { res.sendFile(__dirname + '/views/admins/topAdmin/usersA.html') });

export default paths;