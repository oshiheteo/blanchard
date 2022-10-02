;(() => {
  new Accordion('.js-accordion-container', {
    openOnInit: [0],
  })
})()
new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
})

const eventSwiper = new Swiper('.events__slider', {
  slidesPerView: 1,
  spaceBetween: 25,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  a11y: {
    prevSlideMessage: 'предыдущий слайд',
    nextSlideMessage: 'следующий слайд',
  },

  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },

    962: {
      slidesPerView: 3,
      spaceBetween: 27,
      slidesPerGroup: 3,
    },

    1400: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    },
  },
})

const element = document.querySelector('select')
const choices = new Choices(element, {
  seacrchEnabled: false,
})
document.addEventListener('DOMContentLoaded', () => {
  let gallerySlider = new Swiper('.slides-container', {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: 'row',
    },
    spaceBetween: 20,
    pagination: {
      el: '.test-section .test-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.test-next',
      prevEl: '.test-prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: 'slide-visible',

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1'
          } else {
            slide.tabIndex = ''
          }
        })
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1'
          } else {
            slide.tabIndex = ''
          }
        })
      },
    },

    on: {
      /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
      beforeResize: function () {
        this.slides.forEach((el) => {
          el.style.marginTop = ''
        })
      },
    },
  })
})
// var viewport = document.querySelector('.viewport')
// var right = document.querySelector('.right')
// right.addEventListener('click', function () {
//   viewport.scrollBy({
//     left: 560,
//     behavior: 'smooth',
//   })
// })

tippy('.project__tooltip', {
  theme: 'popup',
})

var left = document.querySelector('.left-btn')
var right = document.querySelector('.right-btn')
var viewport = document.querySelector('.slider-container')
left.addEventListener('click', function () {
  if (window.matchMedia('(min-width: 320px)').matches) {
    viewport.scrollBy({
      left: -260,
      behavior: 'smooth',
    })
  } else {
    viewport.scrollBy({
      left: -600,
      behavior: 'smooth',
    })
  }
})
right.addEventListener('click', function () {
  if (window.matchMedia('(min-width: 320px)').matches) {
    viewport.scrollBy({
      left: 260,
      behavior: 'smooth',
    })
  } else {
    viewport.scrollBy({
      left: 500,
      behavior: 'smooth',
    })
  }
})
ymaps.ready(init)
function init() {
  // Создание карты.
  var myMap = new ymaps.Map(
    'map',
    {
      center: [55.76033534577601, 37.61479241699063],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl'],
    },
    {
      geolocationControlFloat: 'none',
      geolocationControlPosition: {
        bottom: '310px',
        right: '18px',
      },
      zoomControlSize: 'medium',
      zoomControlPosition: {
        bottom: '370px',
        right: '18px',
      },
    }
  )

  var myPlacemark = new ymaps.Placemark(
    [55.75896732335444, 37.614334655064994],
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-point.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-5, -37],
    }
  )

  myMap.geoObjects.add(myPlacemark)
  myMap.behaviors.disable('scrollZoom')
  myMap.controls.remove('searchControl')
  myMap.controls.remove('trafficControl')
  myMap.controls.remove('typeSelector')
  myMap.controls.remove('fullscreenControl')
  myMap.controls.remove('rulerControl')
}
const params = {
  btnClassName: 'js-header-dropdown-btn',
  dropClassName: 'js-header-drop',
  activeClassName: 'is-active',
  disabledClassName: 'is-disabled',
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    )
    evt.target.removeEventListener('animationend', onDisable)
  }
}

function setMenuListener() {
  document.body.addEventListener('click', (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    )

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName)
        } else {
          current.classList.add(params.disabledClassName)
        }
      })
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`)
      const path = btn.dataset.path
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      )

      btn.classList.toggle(params.activeClassName)

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName)
        drop.addEventListener('animationend', onDisable)
      } else {
        drop.classList.add(params.disabledClassName)
      }
    }
  })
}
setMenuListener()
const form = document.querySelector('.contacts__form')
const telSelector = form.querySelector('input[type="tel"]')
const inputMask = new Inputmask('+7 (999) 999-99-99')
inputMask.mask(telSelector)

function setBurger(params) {
  const btn = document.querySelector(`.${params.btnClass}`)
  const menu = document.querySelector(`.${params.menuClass}`)

  btn.setAttribute('aria-expanded', false)

  menu.addEventListener('animationend', function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass)
      this.classList.remove(params.hiddenClass)
    }
  })

  btn.addEventListener('click', function () {
    this.classList.toggle(params.activeClass)

    if (
      !menu.classList.contains(params.activeClass) &&
      !menu.classList.contains(params.hiddenClass)
    ) {
      menu.classList.add(params.activeClass)
      document.body.style.overflow = 'hidden'
      btn.setAttribute('aria-expanded', true)
    } else {
      menu.classList.add(params.hiddenClass)
      document.body.removeAttribute('style')
      btn.setAttribute('aria-expanded', false)
    }
  })
}
setBurger({
  btnClass: 'burger', // класс бургера
  menuClass: 'menu-wrap', // класс меню
  activeClass: 'is-opened', // класс открытого состояния
  hiddenClass: 'is-closed', // класс закрывающегося состояния (удаляется сразу после закрытия)
})
function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`)
  const search = document.querySelector(`.${params.searchClass}`)
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`)

  search.addEventListener('animationend', function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass)
      this.classList.remove(params.hiddenClass)
      this._isOpened = false
    } else {
      this._isOpened = true
    }
  })

  search.addEventListener('click', function (evt) {
    evt._isSearch = true
  })

  openBtn.addEventListener('click', function (evt) {
    this.disabled = true

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass)
    }
  })

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false
    search.classList.add(params.hiddenClass)
  })

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false
      search.classList.add(params.hiddenClass)
    }
  })
}

setSearch({
  openBtnClass: 'js-open-search', // класс кнопки открытия
  closeBtnClass: 'js-close', // класс кнопки закрытия
  searchClass: 'js-form', // класс формы поиска
  activeClass: 'is-opened', // класс открытого состояния
  hiddenClass: 'is-closed', // класс закрывающегося состояния (удаляется сразу после закрытия)
})
