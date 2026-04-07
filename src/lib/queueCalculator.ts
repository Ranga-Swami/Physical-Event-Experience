export interface QueueData {
  peopleInLine: number;
  averageServiceTimeMs: number;
}

/**
 * Calculates the estimated wait time in minutes for a given queue.
 * @param data Queue metrics
 * @returns Estimated wait time in minutes (rounded up)
 */
export const calculateWaitTimeInMinutes = (data: QueueData): number => {
  if (data.peopleInLine <= 0) return 0;
  if (data.averageServiceTimeMs < 0) throw new Error("Service time cannot be negative");

  const totalWaitTimeMs = data.peopleInLine * data.averageServiceTimeMs;
  return Math.ceil(totalWaitTimeMs / 60000); // 60000 ms in a minute
};

/**
 * Determines if a queue is considered "Busy" or "Clear"
 */
export const getQueueStatus = (waitTimeMinutes: number): 'Clear' | 'Busy' | 'Severe' => {
  if (waitTimeMinutes < 5) return 'Clear';
  if (waitTimeMinutes < 15) return 'Busy';
  return 'Severe';
};
