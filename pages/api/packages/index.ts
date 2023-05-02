import nc from 'next-connect'
import { isAuth } from '../../../utils/auth'
import Package from '../../../models/Package'
import db from '../../../config/db'

const handler = nc()
handler.get(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    try {
      await db()
      const q = req.query && req.query.q

      let query = Package.find(
        q ? { duration: { $regex: q, $options: 'i' } } : {}
      )

      const page = parseInt(req.query.page) || 1
      const pageSize = parseInt(req.query.limit) || 25
      const skip = (page - 1) * pageSize

      const total = await Package.countDocuments(
        q ? { duration: { $regex: q, $options: 'i' } } : {}
      )

      const pages = Math.ceil(total / pageSize)

      query = query
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean()
        .populate('category', ['name'])

      const result = await query

      res.status(200).json({
        startIndex: skip + 1,
        endIndex: skip + result.length,
        count: result.length,
        page,
        pages,
        total,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

handler.use(isAuth)

handler.post(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    try {
      await db()
      const { category, company, duration, feature, label, status, price } =
        req.body

      const exist = await Package.findOne({
        duration: { $regex: `^${duration?.trim()}$`, $options: 'i' },
        company: { $regex: `^${company?.trim()}$`, $options: 'i' },
      })
      if (exist)
        return res.status(400).json({ error: 'Duplicate package detected' })

      const object = await Package.create({
        duration,
        status,
        category,
        feature,
        label,
        price,
        company,
        createdBy: req.user._id,
      })
      res.status(200).send(object)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

export default handler
