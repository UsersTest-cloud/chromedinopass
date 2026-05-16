(function() {
  Runner.prototype.gameOver = function() {};
  
  if (Runner._instance) {
    Runner._instance.gameover = function() { return 0; };
  }
  var originalInit = Runner.prototype.init;
  Runner.prototype.init = function() {
    originalInit.apply(this, arguments);
    this.gameover = function() { return 0; };
  };
  
  var originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'visibilitychange' || type === 'blur' || type === 'focus') {
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  if (Runner.prototype.onVisibilityChange) {
    Runner.prototype.onVisibilityChange = function() {
      this.playing = true;
      this.paused = false;
    };
  }
  
  if (Runner._instance) {
    Runner._instance.playing = true;
    Runner._instance.paused = false;
    
    if (Runner._instance.stop) {
      Runner._instance.stop = function() {
        this.playing = true;
        this.paused = false;
        return false;
      };
    }
  }
  
  Object.defineProperty(document, 'hidden', {
    get: function() { return false; },
    configurable: true
  });
  
  Object.defineProperty(document, 'visibilityState', {
    get: function() { return 'visible'; },
    configurable: true
  });
})();