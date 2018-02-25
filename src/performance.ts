import PerformImpl from "./performance-impl";
declare const PerformanceObserver: any;
declare interface PerformanceObserverEntryList {
  getEntries: any;
}

export default class Performance implements PerformImpl {
  config: any;

  /**
   * True if the browser supports the Navigation Timing API,
   * User Timing API and the PerformanceObserver Interface.
   * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/mark
   * Support: developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
   *
   * @type {boolean}
   */
  static supported(): boolean {
    return window.performance
           && performance.now ? true : false
           && performance.mark ? true : false
           && "PerformanceLongTaskTiming" in window;
  }

  /**
   * When performance API available
   * returns a DOMHighResTimeStamp, measured in milliseconds, accurate to five
   * thousandths of a millisecond (5 microseconds).
   * @type {number}
   */
  public now(): number {
    return window.performance.now();
  }

  /**
   * @param {string} metricName
   * @param {string} type
   */
  public mark(metricName: string, type: string) {
    const mark = `mark_${metricName}_${type}`;
    window.performance.mark(mark);
  }

  /**
   * @param {string} metricName
   * @param {object} metrics
   * @param {string} endMark
   */
  public measure(metricName: string, metrics: object): number {
    const startMark = `mark_${metricName}_start`;
    const endMark = `mark_${metricName}_end`;
    window.performance.measure(metricName, startMark, endMark);
    return this.getDurationByMetric(metricName, metrics);
  }

  /**
   * First Paint is essentially the paint after which
   * the biggest above-the-fold layout change has happened.
   * PerformanceObserver subscribes to performance events as they happen
   * and respond to them asynchronously.
   * entry.name will be either 'first-paint' or 'first-contentful-paint'
   */
  public firstContentfulPaint() {
    const cb = this.observeFirstContentfulPaint(this);
    const observer = new PerformanceObserver(this.performanceObserverCb.bind(this, cb));
    observer.observe({entryTypes: ["paint"]});
  }

  /**
   * Get the duration of the timing metric or -1 if there a measurement has
   * not been made by the User Timing API
   *
   * @param {string} metricName
   * @param {any} metrics
   */
  private getDurationByMetric(metricName: string, metrics: any) {
    const entry = this.getMeasurementForGivenName(metricName);
    if (entry && entry.entryType !== "measure") {
      return entry.duration;
    }
    return -1;
  }

  /**
   * This assumes the user has made only one measurement for the given
   * name. Return the first PerformanceEntry objects for the given name.
   *
   * @param {string} metricName
   */
  private getMeasurementForGivenName(metricName: string) {
    return window.performance.getEntriesByName(metricName)[0];
  }

  /**
   * @param {any} cb
   * @param {PerformanceObserverEntryList} entryList
   */
  private performanceObserverCb(cb: any, entryList: PerformanceObserverEntryList) {
    for (const entry of entryList.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        cb(entry);
      }
    }
  }

  /**
   * @param {object} entry
   */
  private observeFirstContentfulPaint(entry: any) {
    if (this.config.firstContentfulPaint) {
      this.logFCP(entry.startTime);
    }
    if (this.config.timeToInteractive) {
      this.timeToInteractive(entry.startTime);
    }
  }

  /**
   * The polyfill exposes a getFirstConsistentlyInteractive() method,
   * which returns a promise that resolves with the TTI value.
   *
   * The getFirstConsistentlyInteractive() method accepts an optional
   * startTime configuration option, allowing you to specify a lower bound
   * for which you know your app cannot be interactive before.
   * By default the polyfill uses DOMContentLoaded as the start time,
   * but it's often more accurate to use something like the moment your hero elements
   * are visible or the point when you know all your event listeners have been added.
   */
  private timeToInteractive(minValue: number) {
    this.ttiPolyfill.getFirstConsistentlyInteractive({ minValue })
    .then(this.timeToInteractiveResolve.bind(this));
  }

  /**
   * @param {number} timeToInteractive
   */
  private timeToInteractiveResolve(timeToInteractive: number) {
    this.timeToInteractiveDuration = timeToInteractive;
    if (this.timeToInteractiveDuration) {
      this.log("Time to interactive", this.timeToInteractiveDuration);
    }
    if (this.config.timeToInteractiveCb) {
      this.config.timeToInteractiveCb(timeToInteractive);
    }
    this.sendTiming("timeToInteractive", this.timeToInteractiveDuration);
  }
}
