# Backend

On upload an image pass the configuration tests

- [ ] Endpoints should be at '/property/images'

Use an array for each.

    - [ ] '/images/add_image' to add image/s
        - [ ] On name collision, warn the user, and don't insert the image
        
        This is really ambiguos, maybe it's better to replace maybe not I don't know
        
    - [ ] '/images/get_image' to get image/s
    - [ ] '/images/delete_image' to delete an image or multiple images
    - [ ] '/images/set_image' to set the images(replace previous and delete previous that are no more)

- [ ] Frontend API to communicate with this tiny images app
    - [ ] Reads configuration and works fine
    - [ ] Perform the rest of operations
