import { Schema, model, models } from 'mongoose'
import Package, { IPackage } from './Package'

export interface ITransaction {
  _id: Schema.Types.ObjectId
  paymentMethod: 'manual' | 'automatic'
  sender: number
  receiver: number
  package: IPackage
  createdAt: Date
}

const transactionSchema = new Schema<ITransaction>(
  {
    paymentMethod: {
      type: String,
      enum: ['manual', 'automatic'],
      default: 'automatic',
    },
    sender: { type: Number, required: true },
    receiver: { type: Number, required: true },
    package: { type: Schema.Types.ObjectId, ref: Package, required: true },
  },
  { timestamps: true }
)

const Transaction =
  models.Transaction || model('Transaction', transactionSchema)

export default Transaction
