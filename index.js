// utils
function debounce(func, wait, immediate) {
    var timeout
    return function () {
      var context = this
      var args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  };
  
  function throttle(func, wait, mustRun) {
    var timeout
    var startTime = new Date()
  
    return function () {
      var context = this
      var args = arguments
      var curTime = new Date()
  
      clearTimeout(timeout)
      if (curTime - startTime >= mustRun) {
        func.apply(context, args)
        startTime = curTime
      } else {
        timeout = setTimeout(func, wait)
      }
    }
  };
  
  function isMobile() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera)
    return check
  };
  
  window.debounce = debounce
  
  window.throttle = throttle
  
  window.isMobile = isMobile
  
// fancybox
$(function () {
    var imgList = $('.recent-post-item img').not('.no-fancybox')
    if (imgList.length === 0) {
      imgList = $('#post-content img').not('.no-fancybox')
    }
    for (var i = 0; i < imgList.length; i++) {
      var $a = $(
        '<a href="' +
          imgList[i].src +
          '" data-fancybox="group" data-caption="' +
          imgList[i].alt +
          '" class="fancybox"></a>'
      )
      var alt = imgList[i].alt
      var $wrap = $(imgList[i]).wrap($a)
      if (alt) {
        $wrap.after('<div class="img-alt">' + alt + '</div>')
      }
    }
  
    $().fancybox({
      selector: '[data-fancybox]',
      loop: true,
      transitionEffect: 'slide',
      buttons: ['share', 'slideShow', 'fullScreen', 'download', 'thumbs', 'close']
    })
  
    var galleryItem = $('.gallery-item')
    var galleryList = []
    galleryItem.each(function (idx, elem) {
      galleryList.push({
        src: $(elem).data('url'),
        opts: {
          caption: $(elem).data('title')
        }
      })
    })
    galleryItem.on('click', function () {
      $.fancybox.open(
        galleryList,
        {
          loop: true,
          transitionEffect: 'slide'
        },
        galleryItem.index(this)
      )
      return false
    })
  })

// sidebar
$(function () {
    $('.toggle-sidebar-info > span').on('click', function () {
      var toggleText = $(this).attr('data-toggle')
      $(this).attr('data-toggle', $(this).text())
      $(this).text(toggleText)
      changeSideBarInfo()
    })
    $('#toggle-sidebar').on('click', function () {
      if (!isMobile() && $('#sidebar').is(':visible')) {
        var isOpen = $(this).hasClass('on')
        isOpen ? $(this).removeClass('on') : $(this).addClass('on')
        if (isOpen) {
          $('#page-header').removeClass('open-sidebar')
          $('body').velocity('stop').velocity({
            paddingLeft: '0px'
          }, {
            duration: 200
          })
          $('#sidebar').velocity('stop').velocity({
            translateX: '0px'
          }, {
            duration: 200
          })
          $('#toggle-sidebar').velocity('stop').velocity({
            rotateZ: '0deg',
            color: '#1F2D3D'
          }, {
            duration: 200
          })
        } else {
          $('#page-header').addClass('open-sidebar')
          $('body').velocity('stop').velocity({
            paddingLeft: '300px'
          }, {
            duration: 200
          })
          $('#sidebar').velocity('stop').velocity({
            translateX: '300px'
          }, {
            duration: 200
          })
          $('#toggle-sidebar').velocity('stop').velocity({
            rotateZ: '180deg',
            color: '#99a9bf'
          }, {
            duration: 200
          })
        }
      }
    })
    function changeSideBarInfo () {
      if ($('.author-info').is(':visible')) {
        $('.author-info').velocity('stop')
          .velocity('transition.slideLeftOut', {
            duration: 300,
            complete: function () {
              $('.sidebar-toc').velocity('stop')
                .velocity('transition.slideRightIn', { duration: 500 })
            }
          })
      } else {
        $('.sidebar-toc').velocity('stop')
          .velocity('transition.slideRightOut', {
            duration: 300,
            complete: function () {
              $('.author-info').velocity('stop')
                .velocity('transition.slideLeftIn', { duration: 500 })
            }
          })
      }
    }
  })

// copy
$(function () {
    // Add copy icon
    $('figure.highlight').wrap('<div class="code-area-wrap"></div>')
    var $copyIcon = $('<i class="fa fa-clipboard" aria-hidden="true"></i>')
    var $notice = $('<div class="copy-notice"></div>')
    var $codeLanguage = $('<span class="codeblock-language"></span>')
    $('.code-area-wrap').prepend($copyIcon)
    $('.code-area-wrap').prepend($notice)
    $('.code-area-wrap').prepend($codeLanguage)
    $('.code-area-wrap').each(function (index, element) {
      var codeLanguage = $(element)
        .find('figure.highlight')
        .attr('class')
        .replace('highlight', '')
        .trim()
      $(element)
        .find('.codeblock-language')
        .text(codeLanguage)
    })
    // copy function
    function copy (text, ctx) {
      if (
        document.queryCommandSupported &&
        document.queryCommandSupported('copy')
      ) {
        try {
          document.execCommand('copy') // Security exception may be thrown by some browsers.
          $(ctx)
            .prev('.copy-notice')
            .text(GLOBAL_CONFIG.copy.success)
            .velocity(
              {
                translateX: -30,
                opacity: 1
              },
              {
                loop: 1,
                duration: 750,
                easing: 'easeOutQuint'
              }
            )
        } catch (ex) {
          $(ctx)
            .prev('.copy-notice')
            .text(GLOBAL_CONFIG.copy.error)
            .velocity(
              {
                translateX: -30,
                opacity: 1
              },
              {
                loop: 1,
                duration: 750,
                easing: 'easeOutQuint'
              }
            )
          return false
        }
      } else {
        $(ctx)
          .prev('.copy-notice')
          .text(GLOBAL_CONFIG.copy.noSupport)
      }
    }
    // click events
    $('.code-area-wrap .fa-clipboard').on('click', function () {
      var selection = window.getSelection()
      var range = document.createRange()
      range.selectNodeContents(
        $(this)
          .siblings('figure')
          .find('.code pre')[0]
      )
      selection.removeAllRanges()
      selection.addRange(range)
      var text = selection.toString()
      copy(text, this)
      selection.removeAllRanges()
    })
  })

// fireworks
var canvasEl = document.querySelector('.fireworks')
if (canvasEl) {
  var ctx = canvasEl.getContext('2d')
  var numberOfParticules = 30
  var pointerX = 0
  var pointerY = 0
  // var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown'
  // Fixed the mobile scroll
  var tap = 'mousedown'
  var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']

  var setCanvasSize = debounce(function () {
    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight
    canvasEl.style.width = window.innerWidth + 'px'
    canvasEl.style.height = window.innerHeight + 'px'
    canvasEl.getContext('2d').scale(1, 1)
  }, 500)

  var render = anime({
    duration: Infinity,
    update: function () {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
  })

  document.addEventListener(tap, function (e) {
    if (e.target.id !== 'sidebar' && e.target.id !== 'toggle-sidebar' && e.target.nodeName !== 'A' && e.target.nodeName !== 'IMG') {
      render.play()
      updateCoords(e)
      animateParticules(pointerX, pointerY)
    }
  }, false)

  setCanvasSize()
  window.addEventListener('resize', setCanvasSize, false)
}

function updateCoords (e) {
  pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left
  pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

function setParticuleDirection (p) {
  var angle = anime.random(0, 360) * Math.PI / 180
  var value = anime.random(50, 180)
  var radius = [-1, 1][anime.random(0, 1)] * value
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule (x, y) {
  var p = {}
  p.x = x
  p.y = y
  p.color = colors[anime.random(0, colors.length - 1)]
  p.radius = anime.random(16, 32)
  p.endPos = setParticuleDirection(p)
  p.draw = function () {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
    ctx.fillStyle = p.color
    ctx.fill()
  }
  return p
}

function createCircle (x, y) {
  var p = {}
  p.x = x
  p.y = y
  p.color = '#F00'
  p.radius = 0.1
  p.alpha = 0.5
  p.lineWidth = 6
  p.draw = function () {
    ctx.globalAlpha = p.alpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
    ctx.lineWidth = p.lineWidth
    ctx.strokeStyle = p.color
    ctx.stroke()
    ctx.globalAlpha = 1
  }
  return p
}

function renderParticule (anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw()
  }
}

function animateParticules (x, y) {
  var circle = createCircle(x, y)
  var particules = []
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y))
  }
  anime.timeline().add({
    targets: particules,
    x: function (p) {
      return p.endPos.x
    },
    y: function (p) {
      return p.endPos.y
    },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
      targets: circle,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800)
      },
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    })
}

// transition
$(function () {
    // page
    $('.layout')
      .velocity('stop')
      .velocity('transition.slideUpIn', {
        delay: 500,
        duration: 1000,
        easing: 'easeInOutQuart',
        complete: function () {
          if ($('#sidebar').data('display')) {
            setTimeout(function () {
              $('#toggle-sidebar').click()
            }, 200)
          }
        }
      })
    $('#top-container')
      .velocity('stop')
      .velocity('transition.fadeIn', {
        delay: 500,
        duration: 1000,
        easing: 'easeInOutQuart'
      })
  })