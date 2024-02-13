import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [TeamModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
