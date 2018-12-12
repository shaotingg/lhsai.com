import db from './../db'

export default {
  all: async(req,res)=> {
    const pageSize = 12
    const css = await db.select('*').from('css').limit(pageSize).offset(pageSize*(req.params.pagenum-1)).orderBy('date', 'desc')
    const count = await db('css').count('* as pageCount')
    const {pageCount} = count[0]
    res.json({css, pageCount: Math.ceil(pageCount/pageSize)})
  }
}
