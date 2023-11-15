import { ArgumentParser } from "argparse";
import packageJson from "../package.json" assert { type: 'json' };
import { insertCategoriesData } from "./seeder.js";

const version = packageJson.version;

const parser = new ArgumentParser({
    description: "Argparse example"
});

// Create arguments
parser.add_argument("--seedCategories", {
    help: "Insert categories data into the database",
    action: "store_true"
});

// Parse arguments
let args = parser.parse_args();
console.log(args);

// Execute everything asynchronously
(async () => {
    if(args.seedCategories) {
        // Insert category data
        await insertCategoriesData();
    }
})();

process.exit(0);
