import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) { }

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  findAll(@Query('search') search: string) {
    if (search) {
      return this.scoresService.search(search);
    }
    else {
      return this.scoresService.findAll();
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.scoresService.findOne(+id);
  }

  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoresService.update(+id, updateScoreDto);
  }

  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.scoresService.remove(+id);
  }

  @Get('/topten')
  topTen() {
    return this.scoresService.topTen();
  }

  @Get('/toptendaily')
  topTenDaily() {
    return this.scoresService.topTenDaily();
  }
}
