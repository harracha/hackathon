import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'; 
const jwt = require('jsonwebtoken');
import nodemailer from 'nodemailer';

dotenv.config();

interface User {
  name: string;
  password: string;
}

const router = express.Router();
router.use(express.json());

const users: User[] = [];

router.get('/', authenticateToken, (req: Request, res: Response) => {
  console.log(users);
  res.json(users);
});



router.post('/signin', async (req: Request, res: Response) => {
  try {
    const data = req.body
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user: User = { name: data.name, password: hashedPassword };
    users.push(user);
    const html = `<h1>HŽV</h1>
      <p>za verifikaciju stisni na link</p>
      <a href="https://www.youtube.com/watch?v=cLGMWX-DSzY">dobar dan na hackathon</a>
    `

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'brainet_user_link@outlook.com',
        pass: 'Brainetlozinka'
      }
    });

    const mailOptions = {
      from: 'brainet_user_link@outlook.com',
      to: user.name,
      subject: 'test mail',
      html: html,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const userHashed = users.find((user) => user.name === req.body.name);
  if (!userHashed) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, userHashed.password)) {
      const user = { username : req.body.name, password : req.body.password};
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '30m'});
      res.json({ accessToken : accessToken});
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

function authenticateToken(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err: any, user:any ){
    if(err) return res.sendStatus(403);
    req.body.user = user;
    console.log(user)
    next();
  })
}

export { router as auth };
