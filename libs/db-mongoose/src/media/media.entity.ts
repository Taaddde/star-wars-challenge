import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, now } from 'mongoose';

@Schema({ timestamps: true })
export class Media {
  @Prop({ default: null })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    set: function (dateString: string) {
      if (!isNaN(Date.parse(dateString))) {
        return new Date(dateString);
      } else {
        const [day, month, year] = dateString.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        return parsedDate;
      }
    },
  })
  releaseDate: Date;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  producer: string;

  @Prop({ required: true })
  characters: Array<string>;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export type MediaDocument = Media & Document;

export const MediaSchema = SchemaFactory.createForClass(Media);
