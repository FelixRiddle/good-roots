/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(() => {\n    // Previous values\n    let prev_lat = document.querySelector(\"#latitude\").value;\n    let prev_longitude = document.querySelector(\"#longitude\").value;\n    \n    // Position\n    const lat = prev_lat || -33.81672067629844;\n    const lng = prev_longitude || -59.510741750004534;\n    \n    // Set map position/view\n    const map = L.map('map').setView([lat, lng ], 16);\n    \n    // Provider and geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n    \n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(map);\n    \n    // Add a marker/pin\n    // So that the user can pin where the house for renting/selling is.\n    let pin = new L.marker([\n        lat,\n        lng\n    ], {\n        draggable: true,\n        autoPan: true,\n    }).addTo(map);\n    \n    // Detect when the pin has finished being moved\n    pin.on(\"moveend\", (e) => {\n        pin = e.target;\n        \n        // Get latitude and longitude\n        const position = pin.getLatLng();\n        \n        // Center map to the new position\n        map.panTo(new L.LatLng(position.lat, position.lng));\n        \n        // Obtain street information when releasing the pin\n        geocodeService\n            .reverse()\n            .latlng(position, 13)\n            .run((err, result) => {\n                pin.bindPopup(result.address.LongLabel);\n                \n                // Fill fields\n                document.querySelector(\".street\").textContent = result?.address?.Address ?? \"\";\n                document.querySelector(\"#street\").value = result?.address?.Address ?? \"\";\n                document.querySelector(\"#latitude\").value = result?.latlng?.lat ?? \"\";\n                document.querySelector(\"#longitude\").value = result?.latlng?.lng ?? \"\";\n            });\n    });\n    \n})();\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;