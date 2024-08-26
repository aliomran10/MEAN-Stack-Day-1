import { SubCategories } from '../Interfaces/subCategories';
import {Schema, model} from 'mongoose';

const subCategoriesSchema:Schema = new Schema<SubCategories>({
    name: {type: String, required: true, trim: true, unique: true},
    category: {type: Schema.Types.ObjectId, required:true}
},{timestamps: true});

export default model<SubCategories>('subCategories', subCategoriesSchema)