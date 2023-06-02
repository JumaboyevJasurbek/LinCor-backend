import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { TakenSertifikat } from 'src/entities/taken.sertifikat';
import { CourseEntity } from 'src/entities/course.entity';
import * as PDFKit from 'pdfkit'
import { TakeEntity } from 'src/entities/take.entity';
import { Response } from 'express';
import { ISertificate } from 'src/types';

@Injectable()
export class SertificateService {
    private readonly imageURL = 'src/images'

    async createS1(dataCb: any, endCb: any, data: ISertificate): Promise<any> {
        const doc = new PDFKit({
            size: [700, 400]
        });

        doc.on('data', dataCb);
        doc.on('end', endCb);

        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
        doc.font('Helvetica-Bold')

        const distanceMargin = 18;
        doc
            .fillAndStroke('#0e8cc3')
            .lineWidth(20)
            .lineJoin('round')
            .rect(
                distanceMargin,
                distanceMargin,
                doc.page.width - distanceMargin * 2,
                doc.page.height - distanceMargin * 2,
            )
            .stroke();

        const maxWidth = 140;
        const maxHeight = 70;
        doc.image(
            `${this.imageURL}/logo.jpg`,
            doc.page.width / 2 - maxWidth / 2,
            60,
            {
                fit: [120, 45],
                align: 'center',
            }
        );

        doc.moveDown(3)
        doc
            .fontSize(12)
            .fill('#021c27')
            .text('LinCor for Awesomes', {
                align: 'center',
            });


        doc.moveDown(2)
        doc
            .fontSize(22)
            .font('Courier-Bold')
            .fillColor('#9370DB')
            .text('Successfully Graduated with Sertificate', {
                align: 'center'
            })

        doc.moveDown(1)

        doc
            .fontSize(16)
            .fillColor('#9370DB')
            .text('Fullname: ', {
                continued: true
            })
            .fillColor('#696969')
            .text(data.fullname)


        doc.moveDown(0.3)

        doc
            .fillColor('#9370DB')
            .text(`Description: `, {
                width: 600,
                continued: true
            })
            .fillColor('#696969')
            .text(data.description)

        doc.image(
            this.imageURL + '/screen.jpg',
            60,
            290,
            {
                valign: "bottom",
                width: 50,
                height: 50
            }
        )

        doc.end();
    }

    async createS2(dataCb: any, endCb: any, data: ISertificate): Promise<any> {
        const doc = new PDFKit({ size: [600, 360] })

        doc.on('data', dataCb);
        doc.on('end', endCb);

        doc.font('Helvetica-Bold').fontSize(24);

        doc.fillColor('red');

        doc.fontSize(27)
        doc.text('Certificate of Completion', { align: 'center' });

        // ### content section

        doc.moveDown(1)
        doc.fontSize(18)
        doc.fillColor('blue')
        doc.font('Courier-Bold')
            .text('Congratulations for graduating our course and taking your sertificate.', {
                align: "center",
            })

        doc.moveDown(1)
        doc.fontSize(14)
        doc.fillColor('browns')
        doc.text('Description: ', { continued: true })
        doc.fillColor('#333335')

        doc.font('Courier-Oblique')
        doc.text(`${data.description}`)

        doc.moveDown(0.3)
        doc
            .fillColor('#09597c')
            .fontSize(16)
            .text(`For: ${data.fullname}`)

        doc.fontSize(18);

        doc.fillColor('#333333');


        doc.image(
            this.imageURL + '/screen.jpg',
            60,
            290,
            {
                width: 50,
                height: 50
            }
        )

        doc.image(
            this.imageURL + '/logo.jpg',
            30,
            20,
            {
                width: 40,
                height: 45,
            }
        )
        doc.image(
            this.imageURL + '/signature.png',
            500,
            270,
            {
                width: 100,
                height: 40
            }
        )

        doc.image(
            this.imageURL + '/gold.png',
            350,
            250,
            {
                width: 100,
                height: 100
            }
        )

        doc
            .moveDown(0.3)
            .fillColor('purple')
            .fontSize(13)
            .text('Lincor', 25, 70);

        doc.fillColor('blue');

        doc.roundedRect(500, -120, 300, 240, 200,).fill();

        doc.roundedRect(-250, 250, 300, 240, 160).fill();

        doc.end();
    }

    async createS3(dataCb: any, endCb: any, data: ISertificate): Promise<void> {
        const doc = new PDFKit({ size: [700, 400] });

        doc.on('data', dataCb);
        doc.on('end', endCb);

        doc.moveDown(2);

        doc
            .font('Helvetica-BoldOblique')
            .text('Attendance Certificate')

        doc.fillColor('yellow')
        doc
            .rotate(15)
            .rect(-20, -30, 140, 420)
            .fill();

        doc
            .rotate(5)
            .rect(650, -270, 200, 420)
            .fill();

        doc.end();
    }

    async getSertificate(
        courseId: string,
        userId: string,
        res: Response
    ): Promise<void> {
        const getCourse: CourseEntity = await CourseEntity.findOneBy({ id: courseId })
        const getUser: UsersEntity = await UsersEntity.findOneBy({ id: userId })

        if (!getCourse) {
            throw new HttpException("Course Not Found", HttpStatus.NOT_FOUND)
        }


        const getTake = await TakeEntity.findOneBy({
            user_id: {
                id: userId
            },
            course_id: {
                id: courseId
            }
        })

        if (!getTake) {
            throw new HttpException("You haven't bought this course", HttpStatus.BAD_REQUEST)
        }

        const getSertificate: TakenSertifikat = await TakenSertifikat.findOneBy({
            user_id: {
                id: userId
            },
            course: {
                id: courseId
            }
        })

        if (getSertificate) {
            throw new HttpException('You can download certificate only once', HttpStatus.FORBIDDEN)
        }

        // const newTakenSert: unknown = await TakenSertifikat.createQueryBuilder()
        //     .insert()
        //     .into(TakenSertifikat)
        //     .values({ user_id: userId as any, course: courseId as any })
        //     .execute()

        const stream = res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment;filename=sertificate.pdf",
        })

        const SertificateData: ISertificate = {
            fullname: `${getUser.username} ${getUser.surname}`,
            description: getCourse.description
        }

        switch (getCourse.sequence) {
            case 1:
                await this.createS3(
                    (chunk: unknown) => stream.write(chunk),
                    () => stream.end(),
                    SertificateData
                )
                break;

            case 2:
                await this.createS2(
                    (chunk: unknown) => stream.write(chunk),
                    () => stream.end(),
                    SertificateData
                )
            default:
                break;
        }
        
    }
}
