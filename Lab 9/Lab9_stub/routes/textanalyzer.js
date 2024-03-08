
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/homepage.html');
});


export default router;
