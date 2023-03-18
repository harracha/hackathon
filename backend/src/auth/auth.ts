import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

interface User {
  name: string;
  password: string;
}

const router = express.Router();
router.use(express.json());

const users: User[] = [];

router.get('/', (req: Request, res: Response) => {
  console.log(users);
  res.json(users);
});



router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user: User = { name: data.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const user = users.find((user) => user.name === req.body.name);
  if (!user) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json({
        uspjeh: true
      })
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

export { router as auth };
