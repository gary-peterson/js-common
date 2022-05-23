// js-extensions.js

/*
NOTE WELL --
We should use traditional functions (not arrow functions)
when extending js base code. The reason is arrow function
to not support "this" (the object being extended) -- thus
do not work unless we do some (undesired) tricks.
*/

//============================================================
//Base system extensions

//We want to minimize extensions (could collide with other libraries)
//However in obvious cases (capitalize is capitalize) we deem it okay

class JsExtensionLoader {

    static load() {

        String.prototype.capitalized = function() {
            //Note -- charAt is "soft" i.e. will return empty string for bad index
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

    }
}

//--------------------------------
// Exporting

exports.JsExtensionLoader = JsExtensionLoader;