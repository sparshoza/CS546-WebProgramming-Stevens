import { Router } from 'express';
const router = Router();

router.get("/aboutme", (req, res) => { 
  let data = { 
  "firstName": "Sparsh",
  "lastName": "Oza",      
  "biography": "A scrawny middle class brown boy from India making his dream come true by studying in USA! \n After graduating from Stevens with a 4.0 GPA he started his own automobile firm rivaling the likes of Tesla.",
  "favoriteMovies": ["Dragon Ball Super ( BROLY )", "Kimi no Na wa", "Naruto Shippuden the second movie"],
  "hobbies": ["Overwatch","Valorant","Dota 2", "Anime"],
  "fondestMemory": "Being in patrick hill's class hopefully this leads to some extra bonus points pleaseXD"}
  res.status(200).send(data); });

router.get("/mystory", (req, res) => { 
  let data = { 
    
      "storyTitle": "Day Z 2.0",
      "storyGenre": "Horror, Fiction, Thriller",
      "story": "Amidst the chaos of a zombie apocalypse, a small group of survivors banded together, determined to make it to safety by working together as a team and scouring the wastelands for any useful resources. The story takes a wild turn of events when the main characters partner is infected and has to be killed leading to the dramatic ending."
    }  
    res.status(200).send(data); });

router.get("/educationhistory", (req, res) => { 
  let data = [
    {
      "schoolName": "NMIMS MPSTME",
      "degreeEarned": "H.S. Diploma",
      "numberOfYearsAttended": 2,
      "favoriteClasses": ["Engineering Maths - 1", "Computer organisation and architecture"],
      "favoriteSchoolMemory": "Eating 80c dumplings ( 12 pieces ) for every lunch straight for 2 years and smoking with the boys"
    },
    {
      "schoolName": "NMIMS MPSTME",
      "degreeEarned": "Bachelors in Technology",
      "numberOfYearsAttended": 4,
      "favoriteClasses": ["Design Analysis and Algorithms", "Artificial Intelligence"],
      "favoriteSchoolMemory": "Doing my final year internship in Tokyo as a full stack dev and living in a whole new country alone for the first time is an experience and a half"
    },
    {
      "schoolName": "Stevens Institute of Technology",
      "degreeEarned": "Masters in Computer Science",
      "numberOfYearsAttended": 2,
      "favoriteClasses": ["Web Programming 1 by Patrick Hill", "Algorithms by In Suk Jang"],
      "favoriteSchoolMemory": "All the house parties and events occured during the semester!"
    }
]
      res.status(200).send(data); });
export default router;