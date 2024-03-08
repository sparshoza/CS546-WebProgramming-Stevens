import { Router } from 'express';
const router = Router();
import { createUser, checkUser } from '../data/users.js';

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: 'YOU SHOULD NOT BE HERE!' });
});

router
  .route('/register')
  .get(async (req, res) => {
    return res.status(200).render('register', { title: 'Register' });
  })
  .post(async (req, res) => {
    const { firstNameInput, lastNameInput, emailAddressInput, passwordInput, confirmPasswordInput, roleInput } = req.body;
    console.log(req.body);
    if (!firstNameInput) {
      return res.status(400).render('error', { title: 'Register', error: 'Please fill out all fields (FIRST NAME )' });
    }
    if (!firstNameInput || !lastNameInput || !emailAddressInput || !passwordInput || !confirmPasswordInput || !roleInput) {
      return res.status(400).render('error', { title: 'Register', error: 'Please fill out all fields' });
    }

    const firstNameRegex = /^[a-zA-Z]+$/;
    if (!firstNameRegex.test(firstNameInput) || firstNameInput.length < 2 || firstNameInput.length > 25) {
      return res.status(400).render('error', { title: 'Register', error: 'Invalid first name' });
    }

    const lastNameRegex = /^[a-zA-Z]+$/;
    if (!lastNameRegex.test(lastNameInput) || lastNameInput.length < 2 || lastNameInput.length > 25) {
      return res.status(400).render('error', { title: 'Register', error: 'Invalid last name' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(emailAddressInput)) {
      return res.status(400).render('error', { title: 'Register', error: 'Invalid email address' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(passwordInput)) {
      return res.status(400).render('error', { title: 'Register', error: 'Invalid password' });
    }

    if (confirmPasswordInput !== passwordInput) {
      return res.status(400).render('error', { title: 'Register', error: 'Passwords do not match' });
    }

    if (roleInput !== 'admin' && roleInput !== 'user') {
      return res.status(400).render('error', { title: 'Register', error: 'Invalid role' });
    }

    try {
      const result = await createUser(firstNameInput, lastNameInput, emailAddressInput, passwordInput, roleInput);
      if (result.insertedUser) {
        console.log("inside this now xd")
        return res.redirect('/login');
      } else {
        return res.status(500).render('error', { title: 'Register', error: 'Internal Server Error' });
      }
    } catch (error) {
      return res.status(500).render('error', { title: 'Register', error: error.message });
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    return res.status(200).render('login', { title: 'Login' });
  })
  .post(async (req, res) => {
    const { emailAddressInput, passwordInput } = req.body;
    if (!emailAddressInput || !passwordInput) {
      res.status(400).render('error', { error: 'Please provide both email and password.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddressInput)) {
      res.status(400).render('error', { error: 'Please provide a valid email address.' });
      return;
    }

    const email = emailAddressInput.toLowerCase();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!passwordRegex.test(passwordInput)) {
      res.status(400).render('error', { error: 'Please provide a valid password.' });
      return;
    }

    try {
      const user = await checkUser(email, passwordInput);
      if (!user) {
        res.status(400).render('error', { error: 'Invalid email or password.' });
        return;
      }
      res.cookie('AuthCookie', 'cookie-value');

      req.session.user = user;
      // console.log(req.session.user)
      // Redirect based on user role
      if (user.role === 'admin') {
        res.redirect('/admin');
      } else {
        res.redirect('/protected');
      }
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { error: 'An error occurred. Please try again later.' });
    }
  });
const now = new Date();

router.route('/protected').get(async (req, res) => {
  //console.log(req)
  return res.status(200).render('protected', { title: 'Protected', currentTime: now, firstName: req.session.user.firstName, role: req.session.user.role })
});

router.route('/admin').get(async (req, res) => {
  // console.log(req);
  return res.status(200).render('admin', { title: 'Admin', currentTime: now, firstName: req.session.user.firstName })
});

router.route('/error').get(async (req, res) => {
  return res.status(200).render('error', { title: 'Error' })
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  return res.render('logout', { title: 'Logout' })
});

export default router;
