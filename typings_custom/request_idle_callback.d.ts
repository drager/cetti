declare interface Deadline {
  timeRemaining: () => number;
}

declare interface Window {
  requestIdleCallback(callback: (deadline: Deadline) => void): void;
}
declare function requestIdleCallback(callback: (deadline: Deadline) => void): void;
