/// client/petController.js
export const getPetToDogPage = async (req, res) => {
    try{
        
    } catch(error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ msg: "Error retrieving data from DB" });
    }
}