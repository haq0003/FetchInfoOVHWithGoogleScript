function HTTPResponse( uri )
{
  
  var response_code ;
  var html_content ;
  
  var options =
      {
        "followRedirects" : true
      };  
  try {
    response_code = UrlFetchApp .fetch( uri, options ) .getResponseCode() .toString() ;
    html_content = UrlFetchApp .fetch( uri ).getContentText().toString();
  
    var re = /XXXXXX/i;
    var match = re.exec(html_content);
  
    if(match) response_code = '888';
  }
 catch( error ) {
   response_code = error .toString() .match( / returned code (\d\d\d)\./ )[1] ;
 }
 
 finally {
   return response_code ;
 }
}
