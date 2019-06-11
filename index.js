function Modal(settings) {
  this.modalLink = $(settings.theLink) || $('.modal-link');
  this.overlay = $(settings.theOverlay) || $('.modal-overlay');
  this.modalClass = '.' + $(settings.theModal).attr('class') || '.modal-window';
  this.modalCloseClass = '.' + $(settings.theCloseButton).attr('class') || '.modal-close';
  this.numItems = this.overlay.length;
}

Modal.prototype = {
  init: function() {
    var self = this;
    this.bindHandlers(self);
  },

  showModal: function(self, link) {
    var n = self.modalLink.index(link),
      overlay = self.overlay.eq(n),
      modal = overlay.find($(self.modalClass));

    overlay.fadeIn();
    modal.fadeIn();
  },

  hideModal: function(self, overlay) {
    var overlayClose = overlay.find(self.modalCloseClass);

    $(document).keyup(function(objEvent) {
      if (objEvent.keyCode == 27) {
        overlayClose.click();
      }
    });

    overlayClose.on('click', function(e) {
      overlay.fadeOut();
      overlay.find($(self.modalClass)).fadeOut();
    });
  },

  bindHandlers: function(self) {
    $('.modal-link').each(function() {
      $(this).on('click', function() {
        self.showModal(self, $(this));
      });
    });

    this.overlay.each(function() {
      var overlay = $(this);
      
      self.hideModal(self, overlay);
    });
  }
}

$(document).ready(function() {
  var modalSettings = {
    theOverlay: $('.overlay'),
    theModal: $('.overlay__modal'),
    theLink: $('.modal-link'),
    theCloseButton: $('.overlay__close')
  };

  var modal = new Modal(modalSettings);
  modal.init();
});