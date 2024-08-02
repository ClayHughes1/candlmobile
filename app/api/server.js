const express = require('express');
const app = express();
const port = 4000;
const dbOps = require('./dbOps');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(path.join(__dirname,'/')));
app.use(bodyParser.json()); // Use body-parser to parse JSON bodies
app.use(cors()); // Enable CORS
const me = require('./messaging');
app.use(express.json());
app.use(express.static(path.join(__dirname,'/')));
app.use(express.static(path.join(__dirname,'/')));

/**
 * Handles api call to submit qoute request
 * @param email
 * @param firstName 
 * @param lastName 
 * @param compName 
 * @param compPhone 
 * @param servType
 * @param phExt
 * @param conPref
 */
app.post('/api/submitquoterequest',async(req,response) => {
   try {
    const {email, firstName,lastName,compName, compPhone, servType, servDesc, phExt,conPref}= req.body;

    let results;
    const pref =  (req.body.conPref === '1')?'phone': 'email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let Id;
    let logId;

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
        const res = await dbOps.insertObjectToSql('CQ', qouteObj);

        if (!isNaN(res) && res > 0) {
          const Id = res;
    
          await me.sendQouteMail(email);
          await me.sendEmailToCompAccount(qouteObj, 'quote', Id);
    
          await dbOps.logLogData(requestData);
    
          response.status(200).json({ success: true, message: msg });
        } else {
          msg = res > 0
            ? 'There is already a record for this item.'
            : 'Something has gone wrong. Please try to submit your request again.';
          response.status(500).json({ success: false, message: msg });
        }
    }else {
        response.status(400).json({ success: false, message: 'Invalid email format.' });
    }

   } catch (error) {
        dbOps.logSiteError(err);
        console.error('Error   ',err);
   }
});

/**
 * Handles api call for assistance request
 * @param email
 * @param firstName
 * @param lastName
 * @param compName
 * @param compPhone
 * @param servDesc
 * @param phExt
 */
app.post('/api/requsthelp',async(req,response) =>{
       
   try {
        const {email, firstName,lastName,compName, compPhone, servDesc, phExt}= req.body;
        const msg = 'Your request for assistance has been sent. You shold recieve an email from us soon..  ';
    
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
    
        const res = await dbOps.insertObjectToSql('CA', helpObj);

        if (!isNaN(res)) {
            try {
                await me.sendConHelpMail(email, recip);
                await me.sendEmailToCompAccount(helpObj, 'Help', compName.toString());
                await dbOps.logLogData(requestData);
                response.status(200).send({ success: true, message: msg });
            } catch (err) {
                dbOps.logSiteError(err);
                response.status(500).send({ success: false, message: 'Internal Server Error.' });
            }
        } else {
            try {
                await dbOps.logLogData(requestData);
                const msg = 'There is already a record for this item.';
                response.status(200).send({ success: false, message: msg });
            } catch (err) {
                dbOps.logSiteError(err);
                response.status(500).send({ success: false, message: 'Internal Server Error.' });
            }
        }

   } catch (error) {
        dbOps.logSiteError(err);
        console.error(error);
        response.status(500).send({success: true, message:error});
   }
});

/**
 * Create site logging object
 * @param {*} req 
 * @returns 
 */
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

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
    console.log(`${port}`);
});
