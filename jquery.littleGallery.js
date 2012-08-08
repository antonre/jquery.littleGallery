(function($){
  jQuery.fn.littleGallery = function (options) {

    var _this = $('.littleGallery');
    var lastImageLoading = null;
    var flagResize = false;
    var hideOnClick = false;

    this.live('click', function (у) {
        if (!_this.is(':visible')) {
            _this.fadeIn(function () {
                hideOnClick = true;
            });

            $('.littleGallery-blind').show();
            resize();
            _this.find('.littleGallery-head .littleGallery-img:eq(0)').click();
        }
    });

    options = $.extend({
      data: {},
      marginWindow: {top: 50, left: 50},
      paddingImage: {top: 0, left: 0},
      circularShift: true,
      loadingImageSrc: 'loading.gif',
      closeImageSrc: 'x.png'
    }, options);

    var arrayImages = [];

    var resize = function () {
        var wH = $(window).innerHeight();
        var wW = $(window).innerWidth();
        var eH = _this.innerHeight();
        var eW = _this.innerWidth();
        var img = _this.find('.littleGallery-body .littleGallery-container .littleGallery-img');
        var heightElements = _this.find('.littleGallery-head').innerHeight();

        if (_this.innerHeight() > wH - options.marginWindow.top) {
            _this.css('max-height', wH - options.marginWindow.top);
        }

        if (_this.innerWidth() > wW - options.marginWindow.left) {
            _this.css('max-width', wW - options.marginWindow.left);
        }

        $('.littleGallery .littleGallery-body').height(_this.innerHeight() - heightElements);

        var maxHeightImg = wH - heightElements - options.marginWindow.top * 2 - options.paddingImage.top;
        var maxWidthtImg = wW - options.marginWindow.left * 2- options.paddingImage.left;

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
        },100);
    };

    var init = function () {

      $('body').append(
          '<div class="littleGallery">'
        + '<i class="littleGallery-img-close"></i>'
        + '<div class="littleGallery-head"></div>'
        + '<div class="littleGallery-body">   '
        + '    <div class="littleGallery-container"></div>'
        + '</div>'
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

      $(window).on('click', function (e) {
          if (_this.is(':visible')) {
              if (hideOnClick && $(e.target).closest(_this.get(0)).length == 0) {
                  _this.find('.littleGallery-img-close').click();
              }
          }
      });

      $(window).on('keyup', function (e) {
          if (!$('.littleGallery').is(':visible')) return;

          var el = _this.find('.littleGallery-head .littleGallery-img');

          if (e.keyCode == 27) {
              _this.find('.littleGallery-img-close').click();
          } else if (e.keyCode == 39) {

              if (el.length == 1) {
                  return false;
              }

              el.each(function () {
                  if ($(this).hasClass('littleGallery-img-activ')) {
                      if ($(this).next().length == 0) {
                          if (options.circularShift) {
                              _this.find('.littleGallery-head .littleGallery-img:eq(0)').click();
                          }
                      } else {
                          $(this).next().click();
                      }

                      return false;
                  }
              });
          }  else if (e.keyCode == 37) {

              if (el.length == 1) {
                  return false;
              }

              el.each(function () {
                  if ($(this).hasClass('littleGallery-img-activ')) {
                      if ($(this).prev().length == 0) {
                          if (options.circularShift) {
                              _this.find('.littleGallery-head .littleGallery-img:last').click();
                          }
                      } else {
                          $(this).prev().click();
                      }

                      return false;
                  }
              });
          }
      });

      _this.find('.littleGallery-img-close').on('click', function () {
          _this.fadeOut();
          $('.littleGallery-blind').fadeOut();
          hideOnClick = false;
      });

      _this.find('.littleGallery-head .littleGallery-img').live('click', function () {
          var urlImg = $(this).attr('data');
          if (!urlImg) return;

          _this.find('.littleGallery-head .littleGallery-img').removeClass('littleGallery-img-activ');
          $(this).addClass('littleGallery-img-activ');

          if (arrayImages[urlImg] && _this.find('.littleGallery-head .littleGallery-img').length != 1) {
              _this.find('.littleGallery-body .littleGallery-container').html('');
          } else if (arrayImages[urlImg]){
              return;
          }

          if (arrayImages[urlImg]) {
              _this.find('.littleGallery-body .littleGallery-container').html('<img class="littleGallery-img" src="'+urlImg+'">').hide().fadeIn();
              flagResize = true;
              resize();
          } else {
              _this.find('.littleGallery-body .littleGallery-container').show().html('<i class="littleGallery-imgloading"></i>');
              flagResize = true;
              resize();

              var tmp = new Image();
              lastImageLoading = urlImg;
              tmp.src = urlImg;

              $(tmp).on('load', function () {
                  arrayImages[urlImg] = true;

                  if (lastImageLoading == urlImg) {
                      _this.find('.littleGallery-body .littleGallery-container').html('<img class="littleGallery-img" src="'+urlImg+'">').hide().fadeIn();
                      flagResize = true;
                      resize();
                  }
              });

               $(tmp).on('error', function () {
                   _this.find('.littleGallery-body .littleGallery-container').html('<i class="littleGallery-notFound">Image not found</i>').hide().fadeIn();
                   flagResize = true;
                   resize();
               });
          }
      });
    };

    return this.each(init);
  };
})(jQuery);