import { calculateWaitTimeInMinutes, getQueueStatus } from './queueCalculator';

describe('Queue Calculator', () => {
  it('should calculate wait times correctly', () => {
    // 10 people, 30 seconds each -> 300 seconds -> 5 minutes
    const waitTime = calculateWaitTimeInMinutes({
      peopleInLine: 10,
      averageServiceTimeMs: 30000 
    });
    expect(waitTime).toBe(5);
  });

  it('should return 0 for empty queues', () => {
    const waitTime = calculateWaitTimeInMinutes({
      peopleInLine: 0,
      averageServiceTimeMs: 50000 
    });
    expect(waitTime).toBe(0);
  });

  it('should evaluate queue status thresholds', () => {
    expect(getQueueStatus(3)).toBe('Clear');
    expect(getQueueStatus(10)).toBe('Busy');
    expect(getQueueStatus(20)).toBe('Severe');
  });
});
