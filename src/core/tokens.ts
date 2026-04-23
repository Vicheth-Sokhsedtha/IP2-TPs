export interface EventPublisher {
  publish(event: string, payload: any): void;
}

export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER');
