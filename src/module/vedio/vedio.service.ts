import { Injectable } from '@nestjs/common';
import { CreateVedioDto } from './dto/create-vedio.dto';
import { UpdateVedioDto } from './dto/update-vedio.dto';

@Injectable()
export class VedioService {
  create(createVedioDto: CreateVedioDto) {
    return 'This action adds a new vedio';
  }

  findAll() {
    return `This action returns all vedio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vedio`;
  }

  update(id: number, updateVedioDto: UpdateVedioDto) {
    return `This action updates a #${id} vedio`;
  }

  remove(id: number) {
    return `This action removes a #${id} vedio`;
  }
}
