const axios = require('axios');

module.exports = (req, res) => {
  const { name, email, message, tel, article } = req.body;

  let errors = {}

  //check if name is valid
  if (!name) {
    errors.name = 'You must tell me your name'
  }

  //check email is a real looking email address, if one is passed
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Your email address must be valid';
    }
  }

  //check is message is valid
  if (!message) {
    errors.message = 'You must write a message'
  }

  if (Object.keys(errors).length === 0)  {
    if(!tel) {
      axios.post(`${process.env.CONTACT_FORM_URL}`, {
        name: name,
        message: message,
        ...(email ? { email } : {}),
        ...(article ? {article} : {}),
        _email: {
          from: "Jon’s website robot",
          subject: `A message from ${name}`,
          template: {
            title: false,
            footer: false,
          },
        },
      })
    }
    res.redirect('/contact?success=true')
  }

  else {
    const errorsJson = encodeURIComponent(JSON.stringify(errors));
    res.redirect(`/contact?errors=${errorsJson}${name ? `&name=${name}` : ''}${email ? `&email=${email}` : ''}${message ? `&message=${message}` : ''}${article ? `&article=${article}` : ''}`);
  }


}