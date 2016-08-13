function ButtonController(view, model) {
  this.super(view, model);

  this.onAttributeChanged = function () {
    this.updateView();
  };

  this.updateView = function () {
    if (view.hasAttribute('data-action')) {
      bindViewRequestEvent(this);
    }
  };

  function bindViewRequestEvent(controller) {
    view.addEventListener('click', function () {
      controller.dispatch(view.dataset);
    });
  }
}

module.exports = ButtonController;
