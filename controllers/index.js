const db = require('../util/database');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Schema and Table
 */
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'links';
const COUNTRY = 'countries';

/**
 * Six Unique Alphanumeric ID
 */
function randomString() {
    var length = 8;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * Count Record Function
 */
async function countData(id) {
    return await db.query(`SELECT * FROM ${SCHEMA}.${TABLE} WHERE shortedLink = "${id}"`);
}

/**
 * 
 * Create One
 */
exports.create = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: "validation error",
            error: errors.mapped()
        })
    } else {
        try {
            var shortedLink = randomString();
            db.insert({
                    table: TABLE,
                    records: [{
                        originalLink: req.body.link,
                        shortedLink: shortedLink,
                        mobile: 0,
                        desktop: 0,
                        android: 0,
                        ios: 0,
                        windows: 0,
                        linux: 0,
                        macos: 0,
                        chrome: 0,
                        edge: 0,
                        edgeChromium: 0,
                        opera: 0,
                        firefox: 0
                    }, ],
                })
                .then(result => {
                    res.status(200).json({
                        message: "Link Created successfully",
                        response: {
                            originalLink: req.body.link,
                            shortedLink: shortedLink
                        }
                    });
                })
                .catch(error => {
                    console.log(error)
                    res.status(422).json({
                        message: "An error occur",
                        response: error
                    });
                })
        } catch (error) {
            res.status(422).json({
                message: "An error occur",
                response: error
            });
        }
    }
};

/**
 * 
 * Get One
 */
exports.get = async(req, res) => {
    try {
        const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE shortedLink="${req.params.id}"`;
        db.query(QUERY)
            .then(result => {
                console.log(result.data);
                if (result.data != '') {
                    res.status(200).json({
                        message: "Fetched Successful",
                        response: result
                    });
                } else {
                    res.status(200).json({
                        message: "No record found for the id given",
                        response: result
                    });
                }
            })
            .catch(error => {
                res.status(422).json({
                    message: "An error occur",
                    response: error
                });
            })
    } catch (error) {
        res.status(422).json({
            message: "An error occur",
            response: error
        });
    }
};


/**
 * 
 * Create Analysis
 */
exports.createAnalysis = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: "validation error",
            error: errors.mapped()
        })
    } else {
        if (req.body.country) {
            try {
                countData(req.body.id)
                    .then(result => {
                        db.insert({
                                table: COUNTRY,
                                records: [{
                                    countryName: req.body.country,
                                    shortedLink: result.data[0].shortedLink,
                                    shortedLinkId: result.data[0].id
                                }, ],
                            })
                            .then(result => {
                                //console.log(result)
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    })
                    .catch(error => {
                        //console.log(error)
                    })
            } catch (error) {
                //console.log(error)
            }
        }
        if (req.body.system) {
            switch (req.body.system) {
                case "windows":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            desktop: result.data[0].desktop + 1,
                                            windows: result.data[0].windows + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "android":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            mobile: result.data[0].mobile + 1,
                                            android: result.data[0].android + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "ios":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            mobile: result.data[0].mobile + 1,
                                            ios: result.data[0].ios + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "linux":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            desktop: result.data[0].desktop + 1,
                                            linux: result.data[0].linux + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "macos":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            desktop: result.data[0].desktop + 1,
                                            macos: result.data[0].macos + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                default:
                    break;
            }

        }
        if (req.body.browser) {
            switch (req.body.browser) {
                case "chrome":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            chrome: result.data[0].chrome + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "edge":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            edge: result.data[0].edge + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "edgeChromium":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            edgeChromium: result.data[0].edgeChromium + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "firefox":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            firefox: result.data[0].firefox + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;

                case "opera":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            opera: result.data[0].opera + 1,
                                        }, ],
                                    })
                                    .then(data => {
                                        //console.log(data)
                                    })
                                    .catch(err => {
                                        //console.log(err)
                                    })
                            })
                            .catch(error => {
                                //console.log(error)
                            })
                    } catch (error) {
                        //console.log(error)
                    }
                    break;


                default:
                    break;
            }
        }

        res.status(200).json({
            message: "Record Updated Successfully",
        });
    }
};


/**
 * 
 * Get Analysis
 */
exports.getAnalysis = async(req, res) => {
    try {
        var QUERYSTATS = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE shortedLink="${req.params.id}"`;
        var QUERYCOUNTRY = `SELECT countryName FROM ${SCHEMA}.${COUNTRY} WHERE shortedLink="${req.params.id}"`;
        db.query(QUERYSTATS)
            .then(result1 => {
                var data = {
                    mobile: result1.data[0].mobile,
                    desktop: result1.data[0].desktop,
                    windows: result1.data[0].windows,
                    macos: result1.data[0].macos,
                    linux: result1.data[0].linux,
                    android: result1.data[0].android,
                    ios: result1.data[0].ios,
                    chrome: result1.data[0].chrome,
                    edge: result1.data[0].edge,
                    firefox: result1.data[0].firefox,
                    opera: result1.data[0].opera,
                    edgeChromium: result1.data[0].edgeChromium
                }
                db.query(QUERYCOUNTRY)
                    .then(result2 => {
                        res.status(200).json({
                            message: "Fetched Successful",
                            stats: data,
                            countries: result2.data
                        });
                    })
                    .catch(error => {
                        res.status(422).json({
                            message: "An error occur",
                            response: error
                        });
                    })
            })
            .catch(error => {
                res.status(422).json({
                    message: "An error occur",
                    response: error
                });
            })
    } catch (error) {
        res.status(422).json({
            message: "An error occur",
            response: error
        });
    }
};