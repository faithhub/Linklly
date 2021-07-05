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
                        Android: 0,
                        iOS: 0,
                        Windows: 0,
                        Linux: 0,
                        macOS: 0,
                        Chrome: 0,
                        Edge: 0,
                        EdgeChromium: 0,
                        Opera: 0,
                        Firefox: 0
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
                        db.query(`SELECT * FROM ${SCHEMA}.${COUNTRY} WHERE shortedLink = "${result.data[0].shortedLink}" AND name = "${req.body.country}"`)
                            .then(data => {
                                if (data && data.data != '') {
                                    db.update({
                                            table: COUNTRY,
                                            records: [{
                                                id: data.data[0].id,
                                                count: data.data[0].count + 1
                                            }, ],
                                        })
                                        .then(data => {
                                            //console.log(data)
                                        })
                                        .catch(err => {
                                            //console.log(err)
                                        })
                                } else {
                                    db.insert({
                                            table: COUNTRY,
                                            records: [{
                                                name: req.body.country,
                                                count: 1,
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
                                }
                            })
                            .catch(error => {

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
                case "Windows":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            desktop: result.data[0].desktop + 1,
                                            Windows: result.data[0].Windows + 1,
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

                case "Android":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            mobile: result.data[0].mobile + 1,
                                            Android: result.data[0].Android + 1,
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

                case "iOS":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            mobile: result.data[0].mobile + 1,
                                            iOS: result.data[0].iOS + 1,
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

                case "macOS":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            desktop: result.data[0].desktop + 1,
                                            macOS: result.data[0].macOS + 1,
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
                case "Chrome":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            Chrome: result.data[0].Chrome + 1,
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

                case "Edge":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            Edge: result.data[0].Edge + 1,
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

                case "EdgeChromium":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            EdgeChromium: result.data[0].EdgeChromium + 1,
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

                case "Firefox":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            Firefox: result.data[0].Firefox + 1,
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

                case "Opera":
                    try {
                        countData(req.body.id)
                            .then(result => {
                                db.update({
                                        table: TABLE,
                                        records: [{
                                            id: result.data[0].id,
                                            Opera: result.data[0].Opera + 1,
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
        var QUERYCOUNTRY = `SELECT * FROM ${SCHEMA}.${COUNTRY} WHERE shortedLink="${req.params.id}"`;
        db.query(QUERYSTATS)
            .then(result1 => {
                var data = {
                    System: [{
                            Name: 'Windows',
                            Value: result1.data[0].Windows
                        },
                        {
                            Name: 'masOS',
                            Value: result1.data[0].masOS
                        },
                        {
                            Name: 'Linux',
                            Value: result1.data[0].Linux
                        },
                        {
                            Name: 'Android',
                            Value: result1.data[0].Android
                        },
                        {
                            Name: 'iOS',
                            Value: result1.data[0].iOS
                        }
                    ],
                    Device: [{
                        Name: 'Mobile',
                        Value: result1.data[0].mobile
                    }, {
                        Name: 'Desktop',
                        Value: result1.data[0].desktop
                    }],
                    Browser: [{
                            Name: 'Chrome',
                            Value: result1.data[0].Chrome
                        },
                        {
                            Name: 'Firefox',
                            Value: result1.data[0].Firefox
                        },
                        {
                            Name: 'Edge',
                            Value: result1.data[0].Edge
                        },
                        {
                            Name: 'EdgeChromium',
                            Value: result1.data[0].EdgeChromium
                        },
                        {
                            Name: 'Opera',
                            Value: result1.data[0].Opera
                        }
                    ],
                }
                db.query(QUERYCOUNTRY)
                    .then(result2 => {
                        var element = result2.data.map(person => ([person.name, person.count]));
                        // console.log(element)
                        res.status(200).json({
                            message: "Fetched Successful",
                            Statistic: data,
                            Countries: element
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