/**
  * # Instantiate. Visit https://api.ovh.com/createToken/index.cgi?GET=/me
  * to get your credentials
  */
  
  var APP            = '*****';
  var APP_KEY        = '*****';
  var APP_SECRET     = '*****';
  var CONSUMER_KEY   = '*****';
  
  function getHostExpInfo(url){
  
  var response = UrlFetchApp.fetch('https://eu.api.ovh.com/1.0/auth/time');
  var TSTAMP = response.getContentText();
  
  var METHOD = "GET";
  var QUERY = "https://eu.api.ovh.com/1.0/hosting/web/"+url+"/serviceInfos";
  var BODY = "";
  var REQUESTS = APP_SECRET+"+"+CONSUMER_KEY+"+"+METHOD+"+"+QUERY+"+"+BODY+"+"+TSTAMP;
  var SIGN = "$1$" + SHA1(REQUESTS);
  
  var options = {
      'muteHttpExceptions' : true,
      'method' : METHOD,
      'headers': { 
        'X-Ovh-Application': APP_KEY, 
        'X-Ovh-Timestamp'  : TSTAMP,
        'X-Ovh-Signature'  : SIGN,
        'X-Ovh-Consumer'   : CONSUMER_KEY
      }
    
  };
  
  var response = UrlFetchApp.fetch(QUERY, options);
  var result = JSON.parse(response.getContentText());
  
  Logger.log(response);
  Logger.log(JSON.stringify(result, null, 2));
  
  if(result.expiration == undefined){
   return "-" 
  }
  else{
    var dateAr = result.expiration.split('-');
    Logger.log(result.expiration.split('-'));
  
    return dateAr[2]+"/"+dateAr[1]+"/"+dateAr[0];
  }
  
}

function SHA1(s) {
  var hexstr = '';
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, s)
  for (i = 0; i < digest.length; i++) {
    var val = (digest[i]+256) % 256;
    hexstr += ('0'+val.toString(16)).slice(-2);
  }
  return hexstr;
}

