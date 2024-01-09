import fs from "node:fs";
import generator from "generate-password";

export default class ConfirmationEmailPrivateKey {
    constructor() {
        // Use the default file path
        this.filePath = this.defaultFilePath();
    }
    
    /**
     * Email confirmation private key
     */
    emailConfirmationPrivateKey() {
        return process.env["KEY_EMAIL_CONFIRMATION"];
    }
    
    /**
     * Set or change confirmation email private key
     * 
     * For greater protection change this every time it's used hehe
     */
    setConfirmationEmailPrivateKey() {
        process.env["KEY_EMAIL_CONFIRMATION"] = generator.generate({
            length: 64,
            numbers: true,
        });
    }
    
    // --- Save and retrieve ---
    /**
     * Default file path
     */
    defaultFilePath() {
        return "./.cache/routes/auth/confirmationEmailPrivateKey.json";
    }
    
    /**
     * Set file path and name
     */
    setFilePath(filePath) {
        this.filePath = filePath;
    }
    
    /**
     * Store locally as json
     */
    saveLocally() {
        console.log(`Writing file to: `, this.filePath);
        const data = {
            key: this.emailConfirmationPrivateKey()
        };
        
        console.log(`Storing data: `, data);
        fs.writeFileSync(this.filePath, JSON.stringify(data));
    }
    
    /**
     * Load locally
     * 
     * @returns {string} The private key
     */
    loadLocally() {
        const data = fs.readFileSync(this.filePath);
        return JSON.parse(data).key;
    }
    
    /**
     * Check if a file exists
     * 
     * @returns {bool} Whether the file exists or not
     */
    fileExists() {
        // try {
        //     fs.existsSync(this.filePath);
        //     console.log(`File '${this.filePath}' exists!`);
        //     return true;
        // } catch(err) {
        //     return false;
        // }
        return fs.existsSync(this.filePath);
    }
}
