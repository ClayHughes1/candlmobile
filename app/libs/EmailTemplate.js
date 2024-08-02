
// Email body templates
const emailTemplates = {
    quoteEmailBody: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Request Received</title>
      </head>
      <body>
        <h1 style="font-size: 24px; font-weight: bold;">C&amp;L Enterprises</h1>
        <p>Dear Valued Client,</p>
        <p>We have received your quote request. Our team at C&amp;L Enterprises is currently working diligently on it and will contact you as soon as the estimates have been created based on your specific service needs.</p>
        <p>For any urgent inquiries, please feel free to contact us at: <strong>220-215-0612</strong>.</p>
      </body>
      </html>
    `,
    conEmailBody: (rqstor) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Request For Assistance Confirmation</title>
      </head>
      <body>
        <h4>Request For Assistance Received</h4>
        <p>Dear ${rqstor.recipientName},</p>
        <p>We have received your request for assistance. Our team will review your request and get back to you shortly.</p>
        <p>Thank you for choosing our services.</p>
        <p>Best regards,</p>
        <p>C&L Enterprises</p>
      </body>
      </html>
    `,
    crspEmailBody: (mssgParams, qouteId, type) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Inquiry Information ${type}: #${qouteId}</title>
      </head>
      <body>
        <h2>Project Inquiry Details</h2>
        <p><strong>Quote Id:</strong> ${qouteId}</p>
        <p><strong>Service Type:</strong> ${mssgParams.ServiceTypeId}</p>
        <p><strong>Project Description:</strong> ${mssgParams.ProjectDescription}</p>
        <p><strong>Estimated Cost:</strong> ${mssgParams.EstimatedCost}</p>
        <p><strong>Additional Notes:</strong> ${mssgParams.AdditionalNotes}</p>
        <hr>
        <h3>Contact Information</h3>
        <p><strong>Company Name:</strong> ${mssgParams.CompanyName}</p>
        <p><strong>First Name:</strong> ${mssgParams.FirstName}</p>
        <p><strong>Last Name:</strong> ${mssgParams.LastName}</p>
        <p><strong>Email Address:</strong> ${mssgParams.EmailAddress}</p>
        <p><strong>Business Phone:</strong> ${mssgParams.BusinessPhone}</p>
        <p><strong>Contact Preference:</strong> ${mssgParams.ContactPreference}</p>
        <p><strong>Extension:</strong> ${mssgParams.Extension}</p>
      </body>
      </html>
    `,
    crspEmailAssistBody: (mssgParams, senderName) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Assistance request - ${senderName}</title>
      </head>
      <body>
        <h3>Contact Information</h3>
        <p><strong>Company Name:</strong> ${mssgParams.CompanyName}</p>
        <p><strong>First Name:</strong> ${mssgParams.FirstName}</p>
        <p><strong>Last Name:</strong> ${mssgParams.LastName}</p>
        <p><strong>Email Address:</strong> ${mssgParams.EmailAddress}</p>
        <p><strong>Business Phone:</strong> ${mssgParams.BusinessPhone}</p>
        <p><strong>Extension:</strong> ${mssgParams.Extension}</p>
        <p><strong>Description:</strong> ${mssgParams.Description}</p>
      </body>
      </html>
    `
  };