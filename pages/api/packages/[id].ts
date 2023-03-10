import nc from 'next-connect'
import Package from '../../../models/Package'
import { isAuth } from '../../../utils/auth'

const handler = nc()

handler.use(isAuth)
handler.put(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    try {
      const { id } = req.query
      const { category, company, duration, feature, label, status, price } =
        req.body

      const object = await Package.findById(id)
      if (!object) return res.status(400).json({ error: `Package not found` })

      const exist = await Package.findOne({
        duration: { $regex: `^${duration?.trim()}$`, $options: 'i' },
        company: { $regex: `^${company?.trim()}$`, $options: 'i' },
        _id: { $ne: id },
      })

      if (exist)
        return res.status(400).json({ error: 'Duplicate package detected' })

      object.duration = duration
      object.status = status
      object.category = category
      object.company = company
      object.feature = feature
      object.label = label
      object.price = price
      object.updatedBy = req.user._id
      await object.save()
      res.status(200).json({ message: `Package updated` })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

handler.delete(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    try {
      const { id } = req.query
      const object = await Package.findById(id)
      if (!object) return res.status(400).json({ error: `Package not found` })

      await object.remove()
      res.status(200).json({ message: `Package removed` })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

export default handler
