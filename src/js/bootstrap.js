
/* ===== BOOTSTRAP ===== */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

//=include _partials/bootstrap/transition.js

//=include _partials/bootstrap/alert.js

//=include _partials/bootstrap/button.js

//=include _partials/bootstrap/carousel.js

//=include _partials/bootstrap/collapse.js

//=include _partials/bootstrap/dropdown.js

//=include _partials/bootstrap/modal.js

//=include _partials/bootstrap/tooltip.js

//=include _partials/bootstrap/popover.js

//=include _partials/bootstrap/scrollspy.js

//=include _partials/bootstrap/tab.js

//=include _partials/bootstrap/affix.js
