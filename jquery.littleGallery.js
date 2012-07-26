(function($){
  jQuery.fn.littleGallery = function (options) {

    var _this = $('.littleGallery');
    var lastImageLoading = null;
    var flagResize = false;
    
    this.live('click', function () {
        if (!_this.is(':visible')) {
            $('.littleGallery-blind').show();
            _this.fadeIn();
            resize();   
            _this.find('.littleGallery-head .littleGallery-img:eq(0)').click();
        }
    });
    
    options = $.extend({
      data: {},
      buttons: ['cancel','preview', 'next'],
      marginWindow: 50,
      loadingImagesSrc: 'loading.gif'
    }, options);
    
    var arrayImages = [];
    
    var resize = function () {
        var wH = $(window).innerHeight();
        var wW = $(window).innerWidth();
        var eH = _this.innerHeight();
        var eW = _this.innerWidth();
        var img = _this.find('.littleGallery-body .littleGallery-container .littleGallery-img');
        var heightElements = _this.find('.littleGallery-head').innerHeight() + _this.find('.littleGallery-footer').innerHeight();
        
        if (_this.innerHeight() > wH - options.marginWindow) {
            _this.css('max-height', wH - options.marginWindow);
        }
        
        if (_this.innerWidth() > wW - options.marginWindow) {
            _this.css('max-width', wW - options.marginWindow);           
        }
        
        $('.littleGallery .littleGallery-body').height(_this.innerHeight() - heightElements);
        
        var maxHeightImg = wH - heightElements - options.marginWindow * 2;
        var maxWidthtImg = wW - options.marginWindow * 2;
            
        img.css('max-height', maxHeightImg);
        img.css('max-width', maxWidthtImg);

        eH = _this.innerHeight();
        eW = _this.innerWidth();
        
        var top = parseInt(wH / 2 - eH / 2);
        var left = parseInt(wW / 2 - eW / 2);
        _this.offset({left: left, top: top}); 
        
        setTimeout(function () {
           if (flagResize) {
               resize();
               flagResize = false;
           }
        },50);
    };
 
    var init = function () {
        
      $('body').append(
          '<div class="littleGallery">'
        + '<div class="littleGallery-head"></div>'
        + '<div class="littleGallery-body">   '
        + '    <div class="littleGallery-container"></div>'
        + '</div>'
        + '<div class="littleGallery-footer"> '  
        + '    <i class="littleGallery-button littleGallery-button-close">'+options.buttons[0]+'</i>'            
        + '    <i class="littleGallery-button littleGallery-button-prev">'+options.buttons[1]+'</i>'           
        + '    <i class="littleGallery-button littleGallery-button-next">'+options.buttons[2]+'</i>'
        + '</div>   '     
        +'</div> <div class="littleGallery-blind></div>' );
 
      $('body').append('<div class="littleGallery-blind"></div>');
      _this = $('.littleGallery');    
      
      var headHtml = '<span class="littleGallery-img" data="'+data.front.url+'">'+data.front.name+'</span>';
      if (data.back) {
          headHtml += '<span class="littleGallery-img" data="'+data.back.url+'">'+data.back.name+'</span>';
      }
      if (data.uv_front) {
          headHtml += '<span class="littleGallery-img" data="'+data.uv_front.url+'">'+data.uv_front.name+'</span>';
      } 
      if (data.uv_back) {
          headHtml += '<span class="littleGallery-img" data="'+data.uv_back.url+'">'+data.uv_back.name+'</span>';
      }        
      _this.find('.littleGallery-head').html(headHtml);         

      $(window).on('resize', function () {
          resize();    
      });
      
      $(window).on('keyup', function (e) {
          if (!$('.littleGallery').is(':visible')) return;
          
          if (e.keyCode == 27) {
              _this.find('.littleGallery-footer .littleGallery-button-close').click();
          } else if (e.keyCode == 39) {
              _this.find('.littleGallery-footer .littleGallery-button-next').click();
          }  else if (e.keyCode == 37) {
              _this.find('.littleGallery-footer .littleGallery-button-prev').click();
          }
      });   

      _this.find('.littleGallery-footer .littleGallery-button-close').on('click', function () {
          _this.fadeOut();
          $('.littleGallery-blind').fadeOut();
      });
      
      _this.find('.littleGallery-footer .littleGallery-button-next').on('click', function () {
          _this.find('.littleGallery-head .littleGallery-img').each(function () {
              if ($(this).hasClass('littleGallery-img-activ')) {
                  if ($(this).next().length == 0) {
                      _this.find('.littleGallery-head .littleGallery-img:eq(0)').click();
                  } else {
                      $(this).next().click();
                  }
                  
                  return false;
              }
          });
      });
      
      _this.find('.littleGallery-footer .littleGallery-button-prev').on('click', function () {
          _this.find('.littleGallery-head .littleGallery-img').each(function () {
              if ($(this).hasClass('littleGallery-img-activ')) {
                  if ($(this).prev().length == 0) {
                      _this.find('.littleGallery-head .littleGallery-img:last').click();
                  } else {
                      $(this).prev().click();
                  }
                  
                  return false;
              }
          });
      });        
      
      var loadingImage = new Image();
      loadingImage.src = options.loadingImagesSrc;
      
      _this.find('.littleGallery-head .littleGallery-img').live('click', function () { 
          var urlImg = $(this).attr('data');
          if (!urlImg) return;

          _this.find('.littleGallery-head .littleGallery-img').removeClass('littleGallery-img-activ');
          $(this).addClass('littleGallery-img-activ');
          
          _this.find('.littleGallery-body .littleGallery-container').html('');
          
          if (arrayImages[urlImg]) {
              _this.find('.littleGallery-body .littleGallery-container').html('<img class="littleGallery-img" src="'+urlImg+'">').hide().fadeIn();              
              flagResize = true;
              resize();
          } else {
              _this.find('.littleGallery-body .littleGallery-container').show().html('<img class="littleGallery-loading" src="'+loadingImage.src+'">');
              flagResize = true;
              resize();
              
              var tmp = new Image();
              lastImageLoading = urlImg;
              tmp.src = urlImg;
              
              $(tmp).on('load', function () {
                  arrayImages[urlImg] = true;

                  if (lastImageLoading == urlImg) {
                      _this.find('.littleGallery-body .littleGallery-container').html('<img class="littleGallery-img" src="'+urlImg+'">').hide().fadeIn(); ;
                      flagResize = true;
                      resize();                      
                  }
              });                
          }   
      });
      
    };

    return this.each(init); 
  };
})(jQuery);