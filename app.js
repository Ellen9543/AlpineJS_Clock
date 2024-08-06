import Alpine from "alpinejs";

Alpine.data("app", () => ({
  initTime: 25,
  timeScale: 5,
  currTime: 25,
  timeArea: "",
  running: false,
  paused: true,
  timerID: "",
  totalSeconds: 0,

  init() {
    this.timeArea = `${this.currTime}:00`;
  },

  reset() {
    this.currTime = this.initTime;
  },

  addTime() {
    this.currTime += this.timeScale;
  },

  reduceTime() {
    this.currTime =
      this.currTime - this.timeScale > 0 ? this.currTime - this.timeScale : 1;
  },

  run() {
    if (!this.running) {
      this.init();
      this.paused = false;
      this.start();
    } else {
      if (!this.paused) {
        this.pauseTimer();
      } else {
        this.resumeTimer();
      }
    }
  },

  start() {
    let barScale;
    if (!this.running) {
      this.running = true;
      this.totalSeconds = this.currTime * 60;
      barScale = 100 / this.totalSeconds;
    }

    this.timerID = setInterval(() => {
      if (this.totalSeconds > 1) {
        this.totalSeconds--;
        this.updataTimer(this.totalSeconds);

        const percentage =
          100 - barScale * (this.currTime * 60 - this.totalSeconds);
        this.updataProgressBar(percentage);
      } else {
        this.stopTimer();
        this.updataProgressBar(0);
      }
    }, 1000);
  },

  updataTimer(Second) {
    console.log("Second", Second);
    const min = String(Math.floor(Second / 60)).padStart(2, "0");
    const sec = String(Math.floor(Second % 60)).padStart(2, "0");

    this.timeArea = `${min}:${sec}`;
  },

  updataProgressBar(percentage) {
    console.log(percentage, this.$refs.progressBar);
    this.$refs.progressBar.style.width = percentage + "%";
  },

  resumeTimer() {
    this.start();
    this.paused = false;
  },

  pauseTimer() {
    clearInterval(this.timerID);
    this.paused = true;
  },

  stopTimer() {
    clearInterval(this.timerID);
    this.updataTimer(0);
    this.running = false;
  },
}));

Alpine.start();
