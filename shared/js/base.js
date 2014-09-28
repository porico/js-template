(function (window, document, undefined) {
  window.PROJ = window.PROJ || {};

  PROJ.device = function() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var deviceType = {
      iphone:       false,
      android:      false,
      windowsphone: false,
      ipad:         false,
      androidtab:   false,
      windows8:     false,
      pc:           false
    };

    if ((userAgent.indexOf('iphone') > -1 && userAgent.indexOf('ipad') == -1) || userAgent.indexOf('ipod') > -1) {
      deviceType.iphone = true; //iPhone&iPod
    } else if (userAgent.indexOf('android') > -1 && userAgent.indexOf('mobile') > -1) {
      deviceType.android = true; //AndroidMobile(一部のタブレット型アンドロイドを含む)
    } else if (userAgent.indexOf('windows phone') > -1) {
      deviceType.windowsphone = true; //WindowsPhone
    } else if (userAgent.indexOf('ipad') > -1) {
      deviceType.ipad = true; //iPad
    } else if (userAgent.indexOf('android') > -1) {
      deviceType.androidtab = true; //AndroidTablet
    } else if (/win(dows )?nt 6\.2/.test(userAgent)) {
      deviceType.windows8 = true; //windows8
    } else {
      deviceType.pc = true; //PC
    }
    return deviceType;
  }();

  PROJ.browser = function() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var ieVersion = +userAgent.replace(/^.*msie\s?(\d+?)\.?\d*?;.*$/, '$1');
    var browserType = {
      lteIe6:  false,
      lteIe7:  false,
      lteIe8:  false,
      lteIe9:  false,
      ie:      false,
      ie6:     false,
      ie7:     false,
      ie8:     false,
      ie9:     false,
      ie10:    false,
      gtIe10:  false,
      firefox: false,
      opera:   false,
      chrome:  false,
      safari:  false,
      other:   false
    };
    
    if (ieVersion < 7) {
      browserType.lteIe6 = true;
      browserType.lteIe7 = true;
      browserType.lteIe8 = true;
      browserType.lteIe9 = true;
    } else if (ieVersion < 8) {
      browserType.lteIe7 = true;
      browserType.lteIe8 = true;
      browserType.lteIe9 = true;
    } else if (ieVersion < 9) {
      browserType.lteIe8 = true;
      browserType.lteIe9 = true;
    } else if (ieVersion < 10) {
      browserType.lteIe9 = true;
    }

    if (userAgent.indexOf('msie') > -1) {
      browserType.ie = true;
      if (ieVersion == 6) {
        browserType.ie6 = true;
      } else if (ieVersion == 7) {
        browserType.ie7 = true;
      } else if (ieVersion == 8) {
        browserType.ie8 = true;
      } else if (ieVersion == 9) {
        browserType.ie9 = true;
      } else if (ieVersion == 10) {
        browserType.ie10 = true;
      } else if (ieVersion > 10) {
        browserType.gtIe10 = true;
      }
    } else if (userAgent.indexOf('firefox') > -1) {
      browserType.firefox = true;
    } else if (userAgent.indexOf('opera') > -1) {
      browserType.opera = true;
    } else if (userAgent.indexOf('chrome') > -1 || userAgent.indexOf('crios') > -1) {
      browserType.chrome = true;
    } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') == -1) {
      browserType.safari = true;
    } else {
      browserType.other = true;
    }
    return browserType;
  }();

})(window, document);



/* jQuery extend */
(function (window, document, $, undefined) {
  window.PROJ = window.PROJ || {};

  /* example */
  var extend = {
    logPrint: function (string) {
      return console.log(string);
    },

    //trim
    trim: function (string) {
      return string.replace(/^[\s\u00A0\u3000]+|[\s\u00A0\u3000]+$/g, '');
    }
  };
  $.extend($.fn, extend); //$のprototypeにextend

  $.fn.logPrint('logPrint test');
  $.fn.logPrint($.fn.trim(' 　trim test 値をtrimする　 '));

})(window, document, jQuery);




/* utility */
(function (window, document, $, undefined) {
  window.PROJ = window.PROJ || {};

  PROJ.util = {
    toHankaku: function (string) {
      var result = string.replace(/[Ａ-Ｚａ-ｚ０-９]|\－|\＋/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });
      return result;
    },

    toZenkaku: function (string) {
      var result = string.replace(/[A-Za-z0-9]|\-|\+/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
      });
      return result;
    },

    //Unicodeを含むすべての文字（文字コード128（16進数0x80）以上）にマッチする
    unicodeMatch: function (string) {
      return (string).match(/[\w\u0080-\uFFFF_-]+/g);
    },
    //\u0000とすれば、あらゆる句読点や特殊文字も含む
    unicodeAllMatch: function (string) {
      return (string).match(/[\w\u0000-\uFFFF_-]+/g);
    }

  };

//test 「全角英数－＋」を「半角英数-+」に変換
$.fn.logPrint(PROJ.util.toHankaku('ＡＢ－＋１２３４５６７８９０'));
//test 「半角英数-+」を「全角英数－＋」に変換
$.fn.logPrint(PROJ.util.toZenkaku('AB-+1234567890'));

//test 指定した範囲に含まれる文字（16進数0x80）
$.fn.logPrint(PROJ.util.unicodeMatch('!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~¥‾'));
//test 指定した範囲に含まれる文字（16進数0000）
$.fn.logPrint(PROJ.util.unicodeAllMatch('!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~¥‾'));

})(window, document, jQuery);