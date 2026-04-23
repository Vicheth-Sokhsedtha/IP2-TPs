import { Inject, Injectable } from '@nestjs/common';
import * as tokens from 'src/core/tokens';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(tokens.EVENT_PUBLISHER) // use the Symbol directly, not the string
    private readonly publisher: tokens.EventPublisher,
  ) {}

  notify(event: string, payload: any) {
    this.publisher.publish(event, payload);
    return { ok: true };
  }
}
