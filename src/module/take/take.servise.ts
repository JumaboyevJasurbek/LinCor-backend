import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTakeDto } from "./dto/create-take.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TakeEntity } from "src/entities/take.entity";
import { UsersEntity } from "src/entities/users.entity";
import { CourseEntity } from "src/entities/course.entity";

@Injectable()
export class TakeServise {

    constructor(
        @InjectRepository(TakeEntity)
        private readonly take : Repository<TakeEntity>, 
    ){}

    async create(createTakeDto:CreateTakeDto) {
        const findUser : UsersEntity = await UsersEntity.findOne({
          where : {
            id : createTakeDto.userId
          }  
        }).catch((e) => {
          throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        });

        if(!findUser) {
          return new HttpException('User not found' , HttpStatus.NOT_FOUND) 
        }

        const findCourse = await CourseEntity.findOne( {
          where: {
            id : createTakeDto.courseId
          }
        }).catch(e => {
          throw new HttpException('Course not found' , HttpStatus.BAD_REQUEST)
        })

        if(!findCourse) {
          throw new HttpException('Course not found' ,HttpStatus.NOT_FOUND)
        }

        const add = await TakeEntity.createQueryBuilder().insert().into(TakeEntity).values({
          user_id: findUser,
          course_id : findCourse,
        }).execute().catch((e) => {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        });

        console.log(add);
        
    }
}

// {
//   "userId": "3e39afc1-5fe6-488b-9d34-55c663510142",
//   "courseId": "32e3e48f-7de8-439e-9820-fb10a895ec0f"
// }