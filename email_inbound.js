var express = require('express');
var app    = express();
var formidable = require('formidable')
var exec = require('child_process').exec;
var child;
var port = process.env.PORT || 8080;
var fs = require("fs");

app.post('/', function(req, res){
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    console.log(fields.Attachments);
    console.log(fields.Attachments.length);
     if (fields.Attachments.length > 0) {
        fields.Attachments.forEach(function (attachment) {
          filename = attachment.Name.split('.');
          console.log("filename "+ filename);
      	  if(filename[1] == "csv"){
      		    console.log("csv file " + attachment.Name)
            	fs.writeFile("/home/Transition_Data/" + attachment.Name, attachment.Content, 'base64', function(err) {
                	   if (err!=null){
                        	console.log("Error: " + err);
                      }    
                      else{
                        console.log("csv files successfully download to uploads folder");
                      } 
                	});
      		}
      	  else if (filename[1] == "xlsx"){
      		    console.log("excel file " + attachment.Name);  
              fs.writeFile("/home/Transition_Data/" + attachment.Name, attachment.Content, 'base64', function(err) {
                     if (err!=null){
                          console.log("Error: " + err);

                      } 
                      else{
                          console.log("xlsx files successfully download to uploads folder");
                        
                      }   
                  });
      		} 
          else if (filename[1] == "xls"){
              console.log("excel file " + attachment.Name);  
              fs.writeFile("/home/Transition_Data/" + attachment.Name, attachment.Content, 'base64', function(err) {
                     if (err!=null){
                          console.log("Error : " + err);

                      } 
                      else{
                          console.log("xls files successfully download to uploads folder");
                        
                      }   
                  });
          } 
        });
    }
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end('Message Received. Thanks!\r\n')
  })
})

app.listen(port);
console.log('Listening  to  port ' + port);
