import { Schema, model, models } from 'mongoose'

export interface ICategory {
  _id: Schema.Types.ObjectId
  name: string
  status: 'active' | 'disabled'
  createdAt: Date
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'disabled'], default: 'active' },
  },
  { timestamps: true }
)

const Category = models.Category || model('Category', categorySchema)

export default Category
