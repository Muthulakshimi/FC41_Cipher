const generateLocation = (lat, long) => {
    return `https://maps.google.com/?q=${lat},${long}`;
};

module.exports = generateLocation;
