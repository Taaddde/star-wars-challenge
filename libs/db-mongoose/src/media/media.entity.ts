import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema({timestamps: true})
export class Media {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    releaseDate: string;

    @Prop({ required: true })
    director: string;

    @Prop({ required: true })
    producer: string;

    @Prop({ required: true })
    characters: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export type MediaDocument = Media & Document;

export const MediaSchema = SchemaFactory.createForClass(Media);
