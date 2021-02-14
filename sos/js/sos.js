class SOS {
  constructor() {
    this.count = -1;
    this.timer = null;
    this.timespan = 200;
    this.wl = null;
  }
  dispose() {
    console.log("dispose called");
  }
  async doToggle(
    on = () => {},
    off = () => {},
    start = () => {},
    stop = () => {}
  ) {
    let counter = this.count;
    let wl = this.wl;
    if (counter >= 0 && counter < 99) {
      counter = -1;
      off();
      stop();
      console.log("SOS stop");
      if ("wakeLock" in navigator) {
        try {
          wl.release();
          console.log("wakeLock release");
        } catch (e) {
          console.log("wakeLock release error");
        }
      }
      clearInterval(this.timer);
      this.count = counter;
      return 0;
    } else {
      counter = 0;
    }
    start();
    console.log("SOS start");
    if ("wakeLock" in navigator) {
      wl = await navigator.wakeLock.request("screen");
      console.log("wakeLock request");
    }
    this.timer = setInterval(function () {
      switch (counter) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 12:
        case 17:
        case 22:
        case 24:
        case 26:
          on();
          break;
        case 2:
        case 4:
        case 6:
        case 11:
        case 16:
        case 21:
        case 23:
        case 25:
        case 27:
          off();
          break;
        case 30:
          counter = 0;
          break;
        case -1:
          break;
        default:
      }
      counter += 1;
    }, this.timespan);
    this.count = counter;
    this.wl = wl;
    return 1;
  }
}
module.exports = SOS;
