import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [ScoresModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
