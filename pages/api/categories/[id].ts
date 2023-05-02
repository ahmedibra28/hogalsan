import nc from 'next-connect'
import Category from '../../../models/Category'
import { isAuth } from '../../../utils/auth'
import Package from '../../../models/Package'
import db from '../../../config/db'

const handler = nc()

handler.use(isAuth)
handler.put(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    try {
      await db()
      const { id } = req.query
      const { name, status } = req.body

      const object = await Category.findById(id)
      if (!object) return res.status(400).json({ error: `Category not found` })

      const exist = await Category.findOne({
        name: { $regex: `^${name?.trim()}$`, $options: 'i' },
        _id: { $ne: id },
      })

      if (exist)
        return res.status(400).json({ error: 'Duplicate category detected' })

      object.name = name
      object.status = status
      object.updatedBy = req.user._id
      await object.save()
      res.status(200).json({ message: `Category updated` })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

handler.delete(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    try {
      await db()
      const { id } = req.query
      const object = await Category.findById(id)
      if (!object) return res.status(400).json({ error: `Category not found` })

      // delete all packages that belong to this category
      const packages = await Package.find({ category: id })
      if (packages.length > 0) {
        for (const pkg of packages) {
          await pkg.remove()
        }
      }

      await object.remove()
      res.status(200).json({ message: `Category removed` })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

export default handler
