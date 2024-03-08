//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import axios from 'axios';
import { Router } from 'express';
const router = Router();

router.route('/').get(async (req, res) => {
  res.render('homepage', {title: "Venue Finder"});
});

router.route('/searchvenues').post(async (req, res) => {
  const formInput = req.body.searchVenueTerm;
  if (!formInput || formInput.trim().length === 0) {
    res.status(400).render('error', {class: "error", message: "You must provide a valid input field."});
    return;
  }
  try {
    const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?keyword=${formInput}&apikey=3a0Wi6uUs1jxbJX7o88biJa2XVXHyN0a&countryCode=US`);
    const resultList = data._embedded.venues;
    let results = resultList.slice(0, 10);
    res.render('venueSearchResults', {title: "Venues Found", searchVenueTerm: formInput, results}) 
  } catch (e) {
    res.status(503).render('error', {class: "error"}); //https://stackoverflow.com/questions/9595151/http-status-code-for-no-data-available-from-an-external-datasource
  }
});

router.route('/venuedetails/:id').get(async (req, res) => {
  const id = req.params.id;
  try {
    if (!id || id.trim().length === 0) {
      res.status(400).render({class: "error", message: "Please enter a valid ID"});
    }
  } catch (e) {
    res.status(503).render('error', {class: "error", message: "No results / Error getting results please try again later"}) //https://stackoverflow.com/questions/9595151/http-status-code-for-no-data-available-from-an-external-datasource
  }
  try {
    const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${id}?&apikey=3a0Wi6uUs1jxbJX7o88biJa2XVXHyN0a&countryCode=US`);
    res.status(200).render('venueByID', {title: "Venue Details", name: data.name, data: data});
  } catch (e) {
    res.status(404).render('error',{class: "error", message: "A venue with that id does not exist."});
  }
});

export default router;
//https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_09/Lecture_Code/routes/calculator.js