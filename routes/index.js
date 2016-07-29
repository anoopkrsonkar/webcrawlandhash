var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

 //GET home page. 




// API for firstquery which contains only keyword
router.post('/firstQueryResult', function(req, res){
    //console.log(req.body.keyword);
    var keyword=req.body.keyword;

url = 'http://www.shopping.com/products?KW=' + keyword;
//console.log(url);

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        //console.log($.text());

   
    var json = { totalResult:""};
    
    if ($('.numTotalResults').length > 0){
        //console.log(" from if ");


        // filtering a specific class where total Number of results are present

    $('.numTotalResults').filter(function(){
        var data = $(this);
        //var totalResults=new Array();
        var t=0;
        totalResult = data.text();
        //console.log(totalResult+" "+totalResult.length);
        for (var i = totalResult.length - 1; i >= 0; i--) {
            if(totalResult[i]=='f'){
                //console.log(totalResult);
                json.totalResult = totalResult.substring(totalResult.length-1,i+2);

                break;
            }}

    

        
    })}
    else if($('.nomatch').length > 0){
        console.log(" from else ");
        $("h1").filter(function(){
        var data = $(this);
        //var totalResults=new Array();
        
        totalResult = data.text();
        //console.log(totalResult+" "+totalResult.length);
        
                console.log(totalResult);
                json.totalResult = totalResult;

               
            

    

        
    })

    }
    else{
        json.totalResult ="Please check inputs and try again";
    }
}


res.render('index', {
            title: json.totalResult,
            data1: keyword    
        })


    }) ;
})


// API for secondquery which contains only keyword
router.post('/secondQueryResult', function(req, res){

var pageNo= req.body.page;
var keyword=req.body.keywordpage;
url = 'http://www.shopping.com/products~PG-'+pageNo+'?KW='+keyword;

////console.log(url);

// using request and cheerio for loading html
request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        //console.log($.text());

    var totalResult=new Array();
    var count=0;
    var errormsg="";
    
    
    if ($('.quickLookGridItemFullName').length > 0){
        //console.log(" from if ");

    $('.quickLookGridItemFullName').filter(function(){
        var data = $(this)
         //console.log(data);

        //var totalResults=new Array();
        var t=0;
        
        
        totalResult[count]= data.text();
        count++;        
    })}
    else if($('.nomatch').length > 0){
        console.log(" from else ");
        $("h1").filter(function(){
        var data = $(this);
        //var totalResults=new Array();
        
        errormsg= data.text();
        //console.log(totalResult+" "+totalResult.length);
        
                

               
            

    

        
    })

    }
    else{
        totalResult ="Please check inputs and try again";
    }
}




res.render('result', {

            title: totalResult,
            data1: keyword,
            totalcount: count ,
            pagen:pageNo,
            err:errormsg   
        })


    }) ;
})

module.exports = router;
