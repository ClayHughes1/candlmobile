const express = require('express');
const app = express();
const port = 4000;
const dbOps    = require('./dbOps');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(path.join(__dirname,'/')));
app.use(bodyParser.json()); // Use body-parser to parse JSON bodies
app.use(cors()); // Enable CORS




// const express = require('express');
// const app = express();
// const port = 4000;
// const path = require('path');
// const session = require('express-session');
// const qs = require('querystring');
const me = require('./messaging');
// // const client = require('./components/client');
// // const fm = require('./components/filemaintenance');
// const { Console, error } = require('console');
// // const soc = require('./src/services/social');
// const passport = require('passport');
// const fb = require('passport-facebook');
// const LocalStrategy    = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// // const cookieParser = require('cookie-parser');
// const { truncate } = require('fs');
// // const ch = require('./src/services/charting.js');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const dbOps    = require('./dbOps');
// // const log = require('./src/services/logging');
// const { connect } = require('http2');
// const { promisify } = require('util');
// const { SlowBuffer } = require('buffer');
// // const paypal = require('paypal-rest-sdk');
// const https = require('https');

app.use(express.json());
app.use(express.static(path.join(__dirname,'/')));
app.use(express.static(path.join(__dirname,'/')));

// const currentDate = new Date();
// const formattedDate = currentDate.toISOString().split('T')[0];

// // Initialize passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// //Error handling
// app.use((err, req, res, next) => {
//     // Handle errors here
//     res.status(500).send('Internal Server Error');
// });

// // Configure Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.EMAIL_CLIENT_ID,
//     clientSecret: process.env.EMAIL_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
// }, (accessToken, refreshToken, profile, done) => {
//     // You can perform user creation or login here using profile data
//     return done(null, profile);
// }));

// // Serialize and deserialize user
// passport.serializeUser((user, done) => {done(null, user);});
// passport.deserializeUser((user, done) => {done(null, user);});

// //GET REQUESTS
// // Route to start Google OAuth authentication
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// //CHAT
// // app.get('/auth/google/callback',
// //     passport.authenticate('google', { failureRedirect: '/login' }),
// //     (req, res) => {
// //         res.redirect('/admin/dashboard.html');
// //     }
// // );

// // Callback route after Google OAuth authentication
// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         // console.log('successfully logged in...........');
//         // Successful authentication, redirect to home page or any other page
//         res.redirect('/admin/dashboard.html');
//     }
// );

// // Configure PayPal with your client ID and secret
// //moved to palfunc.js
// // paypal.configure({
// //     mode: 'sandbox', // Change to 'live' for production
// //     client_id: 'YOUR_CLIENT_ID',
// //     client_secret: 'YOUR_CLIENT_SECRET'
// // });

// // Route to logout
// app.get('/api/admin/logout', (req, res) => {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/admin.html');
//     });
// });

// app.get('/api/client/logout', (req, res) => {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/clientportal.html');
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// app.get('/',function(req,res){
//     try {
//         const  requestData = createLogObj(req);
//         dbOps.logLogData(requestData);
//         res.render('admin.html');
//     } catch (error) {
//         // console.log('ERROR   \n'+error);
//         dbOps.logSiteError(err);
//         res.status(500).json({error: 'An error occurred while retireveing this page. Please try again later. '})
//     }
// });

// app.get('/admin/',function(req,res){
//     // console.log('here....................');
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);
//     res.redirect('dashboard.html');
// });

// app.get('/', (req, res) => {
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);
//     res.redirect('admin/dashboard.html');
// });

// // create browser cookie to store # of times client comes to site
// app.get('/api/cookie',function(req, res){
//     let minute = 3600 * 1000 * 24 * 365;
//     let hits = 1;
//     if(typeof(req.cookies['__visits']) === 'undefined' || req.cookies['__visits'] === 'undefined')
//     {
//         res.cookie('__visits', hits.toString(), { maxAge: minute,HttpOnly: true });
//     }    else{
//         hits = parseInt(req.cookies['__visits'])+1;
//         res.clearCookie('__visits');
//         res.cookie('__visits', hits.toString(), { maxAge: minute,HttpOnly: true });
//     }
//     fm.readVisits();
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);
//     return res.send('cookie has been set!');
// });

// app.get('/api/getchartdata?',function(req,resp){
//     let chartname = req.query.chartname;
//     let visitsData = [];
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     // switch(chartname){
//     //     case 'visits':
//     //     {
//     //         ch.getVisitsData().then(res => {
//     //             return res;
//     //         }).then((res) =>{
//     //             visitsData = res;
//     //             resp.json(visitsData);
//     //         }).catch((err) => {
//                 //     dbOps.logSiteError(err);
//                 //     resp.status(500).json({ error: 'Internal Server Error' });
//                 // });
//     //     }
//     //     default: break;
//     // }
// });

// app.get('/api/getquotedata',function(req,response){
//     let qouteData = [];

//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

    
//     // ch.getQuoteData().then(res => {
//     //     return res;
//     // }).then((res) =>{
//     //     qouteData = res;
//     // }).then(() => {
//     //     dbOps.logLogData(requestData)
//     //     .then(() => {
//     //         response.json(qouteData);
//     //     });
//     // }).catch((err) => {
//     //     dbOps.logSiteError(err);
//     //     response.status(500).json({ error: 'Internal Server Error' });
//     // });
// });

// app.get('/api/freeservicedata',function(req,resp){
//     let freeserv = [];
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     // ch.getFreeServiceData().then(res => {
//     //     return res;
//     // }).then((res) =>{
//     //     freeserv = res;
//     //     resp.json(freeserv);
//     // }).catch((err) => {
//     //     dbOps.logSiteError(err);
//     //     resp.status(500).json({ error: 'Internal Server Error' });
//     // });
// });

// app.get('/api/instagram',function(req,response){
//     // console.log('sending to instagram...............    '+req);
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData).then((res) =>{
//         response.redirect(process.env.INST_URL);
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         response.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// app.get('/api/facebook',function(req,response){
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData).then((res) =>{
//         response.redirect(process.env.FACEOOK_PAGE);
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         response.status(500).json({ error: 'Internal Server Error',err });
//     });
// });

// app.get('/api/linkedin',function(req,response){
//     // console.log('sending to linkedin...............    '+req);
//     // console.log('LINKEDIN URL..................'+process.env.LINKEDIN_URL);
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData).then((res) =>{
//         response.redirect(process.env.LINKEDIN_URL);
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         response.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// // Define API endpoint
// app.get('/api/check-date', async(req, response) => {
//     const startDate = new Date('2024-04-01');
//     const endDate = new Date('2024-08-01'); // August 1, 2024
//     let currentUTCDate = new Date(startDate.toISOString());
//     let isBeforeCutoff;
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);
//     // console.log('CHECKGIN DATE...............    ');
//     dbOps.getDataByType('SODR',{StartDate:startDate,EndDate:endDate})
//     .then((res) => {
//        return JSON.parse(res[0].SpecOfferByDate).map(item => item.OfferEndDate);
//     }).then((res) => { 
//         try {
//             if(res)
//             {
//                 let convDate = new Date(res);
//                 let expireDate = new Date(convDate.toISOString());
//                 isBeforeCutoff = currentUTCDate < expireDate;
//                 response.json(isBeforeCutoff);
//             }
//         } catch (error) {
//             dbOps.logSiteError(err);
//             response.status(500).json({ error: 'Internal Server Error' });
//         }
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         response.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// app.post('/api/postVisit', (req,response) => {
//     const ipAddress = req.ip; // Assuming the IP address is stored in req.ip property
//     const pageVisited = req.url;
//     // Call the dbOps.insertVisit function with the calling IP address
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     dbOps.insertVisit(ipAddress,pageVisited).then((res)=>{
//         response.status(200).json({ success: true, message: 'Visit recorded successfully.' });
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         response.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// //clientportal 
// app.get('/api/getdatarequest?',function(req,results){
//     const id = req.query.id;
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     // console.log('id passed in header..........  '+id);

// });

// app.get('/clientportal',function(req,resp){
//     const referrer = req.get('Referrer');
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     if (referrer && referrer.includes('passreset')) {
//         const parsedUrl = new URL(referrer);
//         const email = parsedUrl.searchParams.get('email');
//         // console.log('Email:', email);
//         dbOps.getDataByType('CBE',{email:email}).then((res) => {
//             // console.log('RESPONSE \n'+res[0].ClientId);
//             resp.redirect('clientportal.html?clientid='+res[0].ClientId);

//         }).catch((err) => {
//             dbOps.logSiteError(err);
//             resp.status(500).json({ error: 'Internal Server Error' });
//         });
//     } else {
//         resp.redirect('clientportal.html?clientid=0');

//         // console.log('No referrer provided or referrer does not contain code');
//         // Handle case where no referrer is provided or referrer does not contain 'code'
//     }

//     // resp.redirect('clientportal.html');
// });

// app.get('/api/passreset?',function(req,resp){
//     const email = req.query.email;
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     dbOps.getDataByType('CBE',email).then((res) => {
//         if(res){
//             me.sendPassReset(email)
//             // .then((res) =>{
//             //     // console.log('SENT PASSWORD RESET EMAIL   \n'+res);
//             // })
//             .catch((err) => {
//                 dbOps.logSiteError(err);
//                 resp.status(500).json({ error: 'Internal Server Error' });
//             });
//         }
//         else {
//             resp.json({message:'failed'})
//         }
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).json({ error: 'Internal Server Error' });
//     });

//     let redUrl = '/clientportal/passreset.html?email='+email;
//     resp.redirect(redUrl);
//     //'/clientportal/passreset.html?email=${email}'
// });

// // Define your API endpoint
// app.get('/api/getcountrydata', async (req, resp) => {
//     let nameArr = [];
//     // Call dbOps.getCountryData to fetch country data
//     await dbOps.getDataByType('COU').then((res) => {
//         return res;
//     }).then((res) => {
//         for (const key in res[0]) {
//             let a = JSON.parse(res[0][key]);
//             for (var b in a)
//             {
//                 let ccode = a[b].CountryCode;
//                 let cname = a[b].CountryName
//                 nameArr.push(cname);
//             }
//         }      
//         resp.json(nameArr);
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// app.get('/error',(req,res) => res.send('Eror logging in to Facebook'));

// //POST REQUESTS
// app.post('/api/validatelogin',function(req,res){
//     const { userid, password} = req.body;
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);
//     res.redirect('/admin/dashboard.html');
// });

// app.post('/api/clientlogin',function(req,resp){
//     const { userid, userpassword} = req.body;
//     const  requestData = createLogObj(req);

//     dbOps.logLogData(requestData);

//     dbOps.authenticateUser(userid,userpassword).then((res) => {
//         if (res){
//             resp.json({loggedIn: true,clientId: res});
//         } else {resp.json({loggedIn: false,clientId: 0})};
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

// app.post('/api/createlogin',function(req,response){
//     const { cuserid,cnfemail, cpass,cnfpass } = req.body;

//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData).then(() => {
//         return;
//     });

//     dbOps.insertClientLogin(cuserid,cpass)
//     .then((res) => {
//         response.status = 200;
//         response.json({message: 'success',Id:res});
//     })
//     .catch((err) => {
//         dbOps.logSiteError(err);
//         response.status(500).send('Internal Server Error');
//     });
// });

// app.post('/api/passreset',function(req,resp){
//     const email = req.body;
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     dbOps.getDataByType('CBE',{email:email.email}).then((res) => {
//         if( typeof res[0] === 'undefined'){
//             resp.json({message: 'failed'});
//         }
//         else {
//             me.sendPassReset(email.email).then((req) =>{
//                 resp.json({message: 'An email has been sent to the provided email. Please check your email for password reset instructions.'});
//             });
//         }
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

app.post('/api/submitquoterequest',async(req,response) => {
   try {
    const {email, firstName,lastName,compName, compPhone, servType, servDesc, phExt,conPref}= req.body;
    console.log( email, firstName,lastName,compName, compPhone, servType, servDesc, phExt,conPref);

    let results;
    const pref =  (req.body.conPref === '1')?'phone': 'email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let Id;
    let logId;
console.log(pref);

    const  requestData = createLogObj(req);

    const qouteObj = {
        "ServiceTypeId": servType,
        "ProjectDescription":servDesc,
        "EstimatedCost": 0.00,
        "EstimatedTimeline": "",
        "AdditionalNotes": "",
        "DateCreated": new Date(),
        "CompanyName": compName,
        "FirstName": firstName,
        "LastName": lastName,
        "EmailAddress": email,
        "BusinessPhone": compPhone,
        "ContactPreference": pref,
        "Extension":phExt
    };

    let msg = 'Service qoute request has been sent successfully..  ';

    if(emailRegex.test(email))
    {
        console.log(JSON.stringify(qouteObj));
        dbOps.insertObjectToSql('CQ',qouteObj)
        .then((res) =>{
            //  console.log('RESULTS FROM INSERTING THE DATA INTO THE TABLE \n'+res);
            if(!isNaN(res)){
                console.log('RESULTS FROM INSERTING THE DATA INTO THE TABLE \n'+res);

                Id = res;
                if(Id > 0)
                {
                    console.log('ID \n');
                    me.sendQouteMail(email).then((req) =>{
                        dbOps.logLogData(requestData).catch((err) => {
                            response.status(600).send({success: false, message:'Internal Server Error Has Occurred'});
                        });
                    }).then(() => {
                        me.sendEmailToCompAccount(qouteObj,'qoute',res).catch((err) => {
                            response.status(700).send({success: false, message:'Internal Server Error Has Occurred'});
                        });
                    })
                    .catch((err) => {
                        dbOps.logSiteError(err);
                        console.error('Error   ',err);
                        response.status(100).send({success: false, message:'Internal Server Error Has Occurred'});
                    });
                }
                else {
                    console.log(' NO ID \n');

                    // console.log('sending email stuff');
                    msg = 'There is already a record for this item..  ';
                    response.status(200).json({success: true, message:msg});
                }
            }else {
                console.log('NOT A # \n');

                // console.log('sending email stuff');
                msg = 'Something has gone wrong. Please try to submit your request again.';
                response.status(500).json({success: false, message:msg});
            }
        })
        .then(() => {
            dbOps.logLogData(requestData)
            .then((res) => {
                logId = res.LogId;
            })
            .then(() => {
                response.status(200).json({success: true, message:msg});
            }).catch((err) => {
                dbOps.logSiteError(err);
                console.error('Error   ',err);
                response.status(200).send('Internal Server Error Once Again\n'+err+'  \n'+JSON.stringify(requestData));
            })
        })
        .catch((err) => {
            dbOps.logSiteError(err);
            console.error('Error   ',err);
            response.status(300).send({success: false, message:'Internal Server Error.'});
        });
    }

   } catch (error) {
    console.log('ERROR \n',error);
    console.error('Error   ',err);
   }
});

app.post('/api/requsthelp',function(req,response){
       
   try {
    const {email, firstName,lastName,compName, compPhone,  servDesc, phExt}= req.body;
    console.log('SENDING ');
        let msg = 'Your request for assistance has been sent. You shold recieve an email from us soon..  ';
    
        const  requestData = createLogObj(req);
    
        const helpObj = {
            "CompanyName": compName,
            "FirstName": firstName,
            "LastName": lastName,
            "EmailAddress": email,
            "BusinessPhone": compName,
            "Extension":phExt,
            "Description":servDesc,
        };
    
        let recip = {
            recipientName: firstName +' '+ lastName
        };
    
        dbOps.insertObjectToSql('CA',helpObj).then((res) => {
            if(!isNaN(res)){
                 me.sendConHelpEmail(email,recip).then((req) =>{
                     me.sendEmailToCompAccount(helpObj,'Help',compName.toString());
                 }).then(() => {
                     dbOps.logLogData(requestData)
                     .then(() => {
                        response.status(200).send({success: true,message:msg});
                     }).catch((err) => {
                        dbOps.logSiteError(err);
                        response.status(500).send({success: false,message:'Internal Server Error again;'});
                    });
                 }).catch((err) => {
                    dbOps.logSiteError(err);
                    response.status(500).send({success: false,message:'Internal Server Error one more time.'});
                });
            }else {
                 dbOps.logLogData(requestData)
                 .then(() => {
                    msg = 'There is already a record for this item..  ';
                    response.status(200).send({success: false,message:msg});
                 }).catch((err) => {
                    dbOps.logSiteError(err);
                    response.status(500).send({success: false,message:'Internal Server Error last time.'});
                });
            }
        });

   } catch (error) {
    console.error(error);
    console.log('ERROR \n',error);
    response.status(500).send({success: true, message:error});

   }
});

// app.post('/api/registerfree',function(req,resp) {
//     let aClient;
//     let subject = 'Free service applicant';
//     let option = 'free';
//     const  requestData = createLogObj(req);

//     const email = req.body.conemail
//     const phone = req.body.conphone;
//     const firstname  = req.body.confirstname;
//     const lastname = req.body.conlastname;
//     const compname = req.body.compname;
//     aClient = new client(firstname,lastname,compname,email,phone);
//     me.createBody(aClient).then(res =>{
//         let htmlBody = res;
//         me.mailOptions(htmlBody,subject);
//     }).then((err) => {
//         if(!err){
//             fm.createData(aClient).then((res,err) =>{
//             fm.writeToRegister(res);
//             });
//         }
//     }).then(() => {
//         dbOps.logLogData(requestData);
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

// app.post('/api/updatepass',function(req,resp){
//     const { resemail,cnfresetpass, cnfpass } = req.body;
    
//     const  requestData = createLogObj(req);
//     dbOps.logLogData(requestData);

//     dbOps.resetPass(resemail,cnfresetpass).then((res) => {
//         if(typeof res !== undefined){
//             resp.json({message: 'success'});
//         }
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

// // POST route to handle the AJAX request
// app.post('/api/getclientprofile', (req, resp) => {
//     const clientId = req.body.clientId; // Assuming the client ID is sent in the request body
//     dbOps.getDataByType('CPBCID',{ClientId:clientId}).then((res) => {
//         return res;
//     }).then((res) =>{
//         resp.json(res);
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

// //getclientbillinginfo
// app.post('/api/getclientbillinginfo', (req, resp) => {
//     const clientId = req.body.clientId; // Assuming the client ID is sent in the request body
//     dbOps.getDataByType('BINF',{clientid:clientId}).then((res) => {
//         let parsObj = JSON.parse(res[0].BillingInfo);
//         return parsObj[0];
//     }).then((res) =>{
//         resp.json(res);
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

// //api/getclientinvoicedetailbyid
// app.post('/api/getclientinvoicedetailbyid', (req, resp) => {
//     const clientId = req.body.clientId; // Assuming the client ID is sent in the request body
//     let invObj = [];
//     let parObj = [];

//     dbOps.getDataByType('CBID',{clientid:clientId}).then((res) => {
//         let parseData = JSON.parse(res[0].ClientById);
//         let jsonObj = {CompanyName: parseData[0].CompanyName };

//         invObj.push(jsonObj);
//     }).then(() => {
//         dbOps.getDataByType('BICI',{clientid:clientId}).then((res) => {
//             // let parsObj = JSON.parse(res[0].BillInvClientId);
//             JSON.parse(res[0].BillInvClientId).forEach(obj => {
//                 parObj.push(obj);  ;
//             });

//             invObj.push(parObj);
//             return invObj;
//         }).then((res) =>{
//             resp.json(res);
//         }).catch((err) => {
//             dbOps.logSiteError(err);
//             resp.status(500).send('Internal Server Error');
//         });
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

// app.post('/api/createacctdetail',(req,resp) => {
//     dbOps.insertAccountDetail(req.body).then((res) => {
//         if(res > 0){resp.json({message: 'success'})};
//     }).catch((err) => {
//         dbOps.logSiteError(err);
//         resp.status(500).send('Internal Server Error');
//     });
// });

// app.post('/api/submitpayment', (req,resp) => {
//     // console.log('FORM DATA \n'+JSON.stringify(req.body));
// });

function createLogObj(req){
    const  requestData =
    {
        Timestamp: new Date(),
        IPAddress: req.ip, // Get IP address of the client
        RequestURL: req.url,
        HttpMethod: req.method,
        StatusCode: req.statusCode,
        ResponseSize: req.ResponseSize,
        UserAgent: req.get('user-agent'), // Get user-agent header
        Referer: req.get('referer'), // Get referer header
        ErrorMsg: "",
        QueryString: req.body
    };
    return requestData;
}

// function parseFormData(formData) {
//     // Object to store parsed form data
//     const parsedData = {};

//     // Iterate over each key-value pair in the form data
//     Object.entries(formData).forEach(([key, value]) => {
//         // Add the key-value pair to the parsed data object
//         parsedData[key] = value;
//     });
//     // Return the parsed form data
//     return parsedData;
// }



app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
    console.log(`${port}`);

});
