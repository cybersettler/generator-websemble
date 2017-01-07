/**
 * Controller of the button widget
 * @constructor
 * @param {object} view - HTML element
 * @param {object} model - Model to keep state data
 */
function ButtonController(view, model) {
  this.super(view, model);

  this.onAttributeChanged = function() {
    this.updateView();
  };

  this.updateView = function() {
    if (view.hasAttribute('data-action')) {
      bindViewRequestEvent(this);
    }
  };

  /**
   * Binds the request event
   * @private
   * @param {object} controller - The controller
   */
  function bindViewRequestEvent(controller) {
    view.addEventListener('click', function() {
      controller.dispatch(view.dataset);
    });
  }
}

module.exports = ButtonController;
