//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import axios from 'axios';
import {Router} from 'express';
const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET
    res.render('homepage', {title: "Venue Finder"});
});

router.route('/searchvenues').post(async (req, res) => {
  //code here for POST
  const search = req.body.searchVenueTerm;

  if (!search || search == '' | search.trim().length === 0) {
    res.status(400).render('error', { class: "error", message: "You must provide a search field." });
    return;
  }

  try {
    const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?keyword=${search}&apikey=3a0Wi6uUs1jxbJX7o88biJa2XVXHyN0a&countryCode=US`);
    // console.log(data)

    const venues = data._embedded.venues;
    // console.log(venues.slice(0,10))
    let results = venues.slice(0, 10);
    
  // }
    res.render('venueSearchResults', { title: "Venues Found", searchVenueTerm: search, results})
  } catch (e) {
    res.status(500).render('error', { class: "error"});
  }
});

router.route('/venuedetails/:id').get(async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  try {
    if (!id) {
      res.status(400).render({ class: "error", message: "No valid id is given." });
    }
  } catch (e) {
    res.status(500).render('error', {ckass: "error", message: "500 error"})
  }
    try {
      const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${id}?&apikey=3a0Wi6uUs1jxbJX7o88biJa2XVXHyN0a&countryCode=US`);
      // console.log(data.name)
        res.status(200).render('venueByID', { title: "Venue Details", name: data.name, data: data });
    } catch (e) {
        res.status(404).render('error', { class: "error", message: "A venue with that id does not exist." });
    }
});

export default router;