import Category from "../../../models/Category.js";
import Price from "../../../models/Price.js";
import Property from "../../../models/Property.js";

const saveChanges = async(req, res) => {
    
    // Validation
    let result = validationResult(req);
    
    const { id } = req.params;
    
    if(!result.isEmpty()) {
        // Get price and category
        const [
            categories,
            prices,
        ] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ]);
        
        return res.render(
            `user/property/edit:${id}`, {
            page: `Edit property`,
            categories,
            prices,
            errors: result.array(),
            property: req.body,
        });
    }
    
    const property = await Property.findByPk(id);
    
    // Check that property exists
    if(!property) {
        return res.redirect("/admin");
    }
    
    // Check that the property owner is the user that made the request
    if(property.userId.toString() !== req.user.id.toString()) {
        return res.redirect("/admin")
    }
}

export default saveChanges;
