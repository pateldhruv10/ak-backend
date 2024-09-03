
/**
 * get sort order
 * @param {*} sortField 
 * @returns 
 */
function getSortOrder(sortField: any) {
    const startsWithHyphen = /^-/;
    let sortOrder = 'desc';
    if (startsWithHyphen.test(sortField)) {
        sortOrder = 'desc';
    } else {
        sortOrder = 'asc';
    }
    return sortOrder;
}

/**
 * get sort field
 * @param {*} sortField 
 * @returns 
 */
function getSortField(sortField: any) {
    const startsWithHyphen = /^-/;
    if (startsWithHyphen.test(sortField)) {
        sortField = sortField.substring(1);
    } 
    return sortField;
}

/**
 * Generate OTP
 * @returns 
 */
function generateOTP() {
    // Generate a random number between 1000 and 9000
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

/**
 * generate a slug
 * @param {*} name 
 * @returns 
 */
function generateSlug(name: any) {
    // Convert to lowercase and replace spaces with hyphens
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    // Remove special characters
    const cleanSlug = slug.replace(/[^\w\-]+/g, '');
    return cleanSlug;
}

const moment = require('moment');
// Function to add minutes to a given time
function addMinutesToTime(time: any, minutesToAdd: any) {
    // Parse the input time string using moment
    const parsedTime = moment(time, 'HH:mm');
    
    // Add the specified number of minutes
    const endTime = parsedTime.add(minutesToAdd, 'minutes');
    
    // Format the result as HH:mm
    return endTime.format('HH:mm');
}


module.exports = {
    getSortOrder,
    getSortField,
    generateOTP,
    generateSlug,
    addMinutesToTime,
};