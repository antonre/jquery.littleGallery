jquery.littleGallery
====================

<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link type="text/css" rel="stylesheet" href="index.css">
        <script src="http://yandex.st/jquery/1.7.2/jquery.min.js"></script>        
        <script src="jquery.littleGallery.js"></script>
    </head>
 <body>
     
 
 <style>

 </style>
 
 <span id="box">
     Кликни меня
 </span>

 
 <script type="text/javascript">


 // data object
 var data = 
     {
        front:{url:'http://brandshunter.ru/wp-content/uploads/2010/07/1254315769_img_0248.jpg', name:'name 1'},
        back:{url:'http://www.walland.ru/fotos/1289194616_1.jpg', name:'name 2'},
        uv_front:{url:'http://darkwallpapers.ru/_ph/8/707579893.jpg', name:'name 3'},
        uv_back:{url:'http://dygz78ls5cy51.cloudfront.net/9b1f40b29c89422999a7a4ecd1007ccd', name:'name 4'}
     }

     
$('#box').littleGallery(data); // initialization

 </script>