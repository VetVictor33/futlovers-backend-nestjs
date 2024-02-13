import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TeamModule, PlayerModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
