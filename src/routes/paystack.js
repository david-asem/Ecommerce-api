const paystackRoute = require("express").Router();
const paystack = require('paystack-api')(process.env.PAYSTACK_KEY);



const paystack = (axios) => {
  const MySecretKey = 'Bearer sk_test_xxxx';


  const initializePayment = (form, mycallback) => {

    const options = {
      url: 'https://api.paystack.co/transaction/initialize', headers: {
        authorization: MySecretKey,
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      }, form
      
    },
    const callback = (error, res, body) => {
      return mycallback(error, body);
    }
    axios.post(options, callback);

  }  

  const verifyPayment = (ref, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref    ),
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
       }
    }
    const callback = (error, res, body)=>{
        return mycallback(error, body);
    }
    axios(options,callback);
}

return { initializePayment, verifyPayment };

}


module.exports = paystack;