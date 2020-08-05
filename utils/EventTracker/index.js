import EventTracker from './EventTracker';

export const eventTracker = new EventTracker();

export const changeTrackingStatus = (isTracking) => {
  eventTracker.changeTrackingStatus(isTracking);
};
