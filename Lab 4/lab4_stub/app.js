/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/
import { dbConnection, closeConnection } from './config/mongoConnection.js';
import * as bands from './data/bands.js';



async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    // Task 1: Create a band of your choice
    const band1 = await bands.create(
        "xxxtentacion",
        ["Hip Hop", "Alternative R&B", "Emo Rap"],
        "http://www.xxxtentacion.com",
        "Bad Vibes Forever",
        ["xxxtentacion"],
        2014,
    );

    // Task 2: Log the newly created band
    console.log("Newly Created Band:", band1);

    // Task 3: Create another band of your choice
    const band2 = await bands.create(
        "Linkin Park",
        ["Alternative Rock", "Pop Rock", "Alternative Metal"],
        "http://www.linkinpark.com",
        "Warner Records",
        [
            "Chester Bennington",
            "Rob Bourdon",
            "Brad Delson",
            "Mike Shinoda",
            "Dave Farrell",
            "Joe Hahn",
        ],
        1996,
    );

    // Task 4: Query all bands, and log them all
    const allBandsList = await bands.getAll();
    console.log("All Bands:", allBandsList);

    // Task 5: Create the 3rd band of your choice
    const band3 = await bands.create(
        "Ben Bohmer",
        ["Progressive House", "Deep House", "Melodic House"],
        "http://www.benbohmer.com",
        "Anjunadeep",
        ["Ben Bohmer"],
        2015,
    );

    // Task 6: Log the newly created 3rd band
    console.log("Newly Created Band:", band3);
    // Task 7: Rename the first band
    const band1id = band1._id;
    const renamed1 = await bands.rename(
        band1id,
        "Rap God"
    );

    // Task 8: Log the first band with the updated name
    console.log("Renamed:", renamed1);


    // Task 9: Remove the second band you created
    const band2id = band2._id;
    const band2updated = await bands.remove(band2id);

    // Task 10: Query all bands, and log them all
    const allBandsList2 = await bands.getAll();
    console.log("All bands after removing second band:", allBandsList2);

    // Task 11: Try to create a band with bad input parameters to make sure it throws errors
    try {
        await bands.create("",
        ["Pop"],
        "http://www.invalid.com",
        "Invalid Records",
        ["Invalid Name"],
         2024); // This should throw an error
    }
    catch (error) {
        console.log(error);
    }
    // Task 12: Try to remove a band that does not exist to make sure it throws errors
    try {
        await bands.remove("007f1f77bcf86cd700439000"); // This should throw an error
    }
    catch (error) {
        console.log(error);
    }
    // Task 13: Try to rename a band that does not exist to make sure it throws errors
    try {
        await bands.rename("507f1f77bcf86cd700439000", "New Name"); // This should throw an error since id should be invalid
    }
    catch (error) {
        console.log(error);
    }
    // Task 14: Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors
    try {
        await bands.rename(band2id, 8989); // This should throw an error
    }
    catch (error) {
        console.log(error);
    }
    // Task 15: Try getting a band by ID that does not exist to make sure it throws errors
    try {
        await bands.get("507f1f77bcf86cd700439000"); // This should throw an error
    } catch (error) {
        console.log(error);
    }
    await closeConnection();

}
await main();
