import { Categories } from '../Interfaces/categories';
import {Schema, model} from 'mongoose';


const categoriesSchema:Schema = new Schema<Categories>({
    name: {type: String, required: true, trim: true, unique: true}
},{timestamps: true});

export default model<Categories>('categories', categoriesSchema)