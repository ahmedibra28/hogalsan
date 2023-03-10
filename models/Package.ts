import { Schema, model, models } from 'mongoose'
import Category, { ICategory } from './Category'

export interface IPackage {
  _id: Schema.Types.ObjectId
  category: ICategory
  company: string
  price: number
  feature: string
  label: string
  duration: string
  status: 'active' | 'disabled'

  createdAt: Date
}

const packageSchema = new Schema<IPackage>(
  {
    category: { type: Schema.Types.ObjectId, ref: Category, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    label: { type: String, required: true },
    feature: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['active', 'disabled'], default: 'active' },
  },
  { timestamps: true }
)

const Package = models.Package || model('Package', packageSchema)

export default Package
