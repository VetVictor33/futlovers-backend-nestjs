import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerService } from './player.service';

@Module({
  providers: [PlayerService, PlayerRepository],
  controllers: [PlayerController]
})
export class PlayerModule {}
