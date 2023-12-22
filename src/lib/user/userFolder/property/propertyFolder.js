/**
 * Property folder
 * 
 * Things related to a single and existent property folder.
 */
import { constants } from "node:buffer";
import path from "node:path";
import fs from "node:fs";

import userPropertyFolder, { relativeUserPropertyFolder } from "./index.js";

/**
 * Get user property folder
 * 
 * @param {string} userEmail User email
 * @param {int} id Property ID
 * @returns {string} Given property folder
 */
export default function propertyFolder(userEmail, id) {
    const parentFolder = userPropertyFolder(userEmail);
    
    // Create user property folder
    const propFolder = path.resolve(parentFolder, `${id}`);
    try {
        fs.accessSync(propFolder, constants.F_OK);
    } catch(err) {
        // The folder doesn't exists
        // Create folder
        fs.mkdirSync(propFolder);
    }
    
    return propFolder;
}

/**
 * Takes a user email and an id, and get the relative property folder from public folder
 * 
 * @param {string} userEmail 
 * @param {number} id 
 * @returns {string} Property folder relative path
 */
export function relativePropertyFolder(userEmail, id) {
    return `${relativeUserPropertyFolder(userEmail)}/${id}`;
}

/**
 * Get every image relative path from the public folder of a given property
 * 
 * Encodes spaces and weird digits.
 * 
 * Maybe it's a little complex to explain the things should this be a class?
 * 
 * @param {string} userEmail 
 * @param {number} id 
 * @returns {array} Array of property images relative path from public directory
 */
export function relativePropertyImages(userEmail, id) {
    let images = fs.readdirSync(relativePropertyFolder(userEmail, id), { withFileTypes: true });
    
    let imagesURI = [];
    for(let image of images) {
        let encodedImageName = encodeURIComponent(image.name);
        
        // Because express doesn't add the 'public' part to it, we have to remove it
        let imagePath = image.path.substring(7, image.path.length);
        
        let imageURI = `${imagePath}/${encodedImageName}`;
        
        imagesURI.push(imageURI);
    }
    
    return imagesURI;
}