(function($) {

  // Reduces the size of text in the element to fit the parent.
  $.fn.reduceTextSize = function(options) {
    options = $.extend({
      minFontSize: 10
    }, options);

    function checkWidth(em) {
      var $em = $(em);
      var oldPosition = $em.css('position');
      $em.css('position', 'absolute');
      var width = $em.width();
      $em.css('position', oldPosition);
      return width;
    }

    return this.each(function(){
      var $this = $(this);
      var $parent = $this.parent();
      var prevFontSize;
      while (checkWidth($this) > $parent.width()) {
        var currentFontSize = parseInt($this.css('font-size').replace('px', ''));
        // Stop looping if min font size reached, or font size did not change last iteration.
        if (isNaN(currentFontSize) || currentFontSize <= options.minFontSize ||
            prevFontSize && prevFontSize == currentFontSize) {
          break;
        }
        prevFontSize = currentFontSize;
        $this.css('font-size', (currentFontSize - 1) + 'px');
      }
    });
  };
})(jQuery);
