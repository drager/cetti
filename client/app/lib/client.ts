import { PushData } from 'common/lib/entites';
import { actions } from 'common/lib/actions';
import { dispatch } from './store';

/**
 * To do at startup:
 * 1. Subscribe to errors (use code from bugsnag)
 * 	1. window.onerror
 *  2. listen on error event at window (not the same)
 *  3. Hijack whatever we need to get all exceptions
 * 2. pull window.performance.timing if avalible
 * 3. subscribe to errors from Angular (if Angular is avalible)
 *
 * Debug could be replaced with a compile time flag if webpack is used so that the control
 * statements and debug code is not event outputed in production builds
 */

export class Cetti {
  private startTime: (timerName: string) => number;
  private endTime: (timerName: string) => number;
  private allowPush: boolean = true;
  private isScheduled: boolean = false;
  private dataToPush: PushData[] = [];
  private sessionId: string;

  constructor({debug = false} = {}) {
    if (debug) {
      this.startTime = (timerName) => {
        console.time && console.time(timerName);
        return 0;
      };
      this.endTime = (timerName) => {
        console.timeEnd && console.timeEnd(timerName);
        return 0;
      };
    } else {
      // Mobile Safari does not support the performance API
      if (performance) {
        this.startTime = performance.now;
        this.endTime = performance.now;
      } else {
        this.startTime = Date.now;
        this.endTime = Date.now;
      }
    }

    /**
     * IE 9 and Android <= 4.3 does't support requestAnimationFrame and as we use it for
     * performance measurements it doesn't make much sense to fallback on setTimeout, so
     * instead we ignore attempts to measure.
     */
    if (!window.requestAnimationFrame) {
      this.measureFrame = () => { /* empty */ };
    }

    // Maybe make better by measuring frame time, or ignore it and call it instantly?
    if (!window.requestIdleCallback) {
      window.requestIdleCallback = (callback: (deadline: Deadline) => void) => {
        const start = Date.now();
        setTimeout(() => {
          callback({timeRemaining: () => Math.max(0, 50 - (Date.now() - start))});
        }, 1);
      };
    }

    const random = Math.random;
    this.sessionId = random().toString(36).substring(2, 15) +
                     random().toString(36).substring(2, 15);

    // Used as a callbacks so bind this to make sure it allways points to this instance
    this.pushIfAllowed = this.pushIfAllowed.bind(this);
    this.bindAndCollect = this.bindAndCollect.bind(this);

    window.addEventListener('load', this.bindAndCollect);
  }

  bucket(bucketName: string) {
    return new CettiBucket(this, bucketName);
  }

  event(bucketName: string) {
    this.schedulePush(bucketName);
  }

  value(bucketName: string, value) {
    this.schedulePush(bucketName, value);
  }

  error(bucketName: string, error: Error) {
    //TODO: Parse Error
  }

  /**
   * Measures how long time is used until frame is rendered.
   * Could be used when an user action occurs to see how responsive we are or to measure the
   * time used for FLI in [FLIP animations](https://aerotwist.com/blog/flip-your-animations/).
   *
   * Uses console.time in debug mode so that the timing is included in the timeline view.
   */
  measureFrame(bucketName: string) {
    this.allowPush = false;
    const start = this.startTime(bucketName);

    requestAnimationFrame(() => {
      const end = this.endTime(bucketName);
      this.allowPush = true;
      this.schedulePush(bucketName, end - start);
    });
  }

  private bindAndCollect() {
    window.removeEventListener('load', this.bindAndCollect);

    if (window.performance && performance.navigation && performance.timing) {
      const {fetchStart, responseEnd, domLoading, domComplete} = performance.timing;
      this.value('downloadTime', responseEnd - fetchStart);
      this.value('renderTime', domComplete - domLoading);

      if (performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
        // TODO: Not for reload and back/forward?
      }
    }
  }

  // Maybe add a delay for a chanse of batching data
  // What should we do in debug mode?
  private schedulePush(bucketName: string, data?) {
    this.dataToPush.push({
      bucketName,
      dataPoint: {
        id: Math.random().toString(36).substring(2, 15),
        sessionId: this.sessionId,
        timestamp: Date.now(),
        value: data,
      },
    });

    if (!this.isScheduled) {
      this.isScheduled = true;
      requestIdleCallback(this.pushIfAllowed);
    }
  }

  private pushIfAllowed() {
    if (!this.allowPush) {
      requestIdleCallback(this.pushIfAllowed);
    }

    //TODO: Push data in some way
    dispatch(actions.addData, {data: this.dataToPush});

    this.dataToPush = [];
    this.isScheduled = false;
  }
}

export class CettiBucket {
  cetti: Cetti;
  bucketName: string;

  constructor(cetti: Cetti, bucketName: string) {
    this.cetti = cetti;
    this.bucketName = bucketName;
  }

  event() {
    this.cetti.event(this.bucketName);
  }

  value(value) {
    this.cetti.value(this.bucketName, value);
  }

  error(error: Error) {
    this.cetti.error(this.bucketName, error);
  }

  /**
   * Measures how long time is used until frame is rendered.
   * Could be used when an user action occurs to see how responsive we are or to measure the
   * time used for FLI in [FLIP animations](https://aerotwist.com/blog/flip-your-animations/).
   *
   * Uses console.time in debug mode so that the timing is included in the timeline view.
   */
  measureFrame(bucketName: string) {
    this.cetti.measureFrame(this.bucketName);
  }
}
