import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [TeamModule, PlayerModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
