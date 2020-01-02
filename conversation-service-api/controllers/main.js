const getCategoryList = (req, res, db) => {
  db.select('*').from('conversation_categories')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json(items)
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const saveCategory = (req, res, db) => {
  const { category, is_disabled } = req.body
  db('conversation_categories').insert({category, is_disabled})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const updateCategory = (req, res, db) => {
  const { id, category, is_disabled } = req.body
  db('conversation_categories').where({id}).update({id , category, is_disabled})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteCategory = (req, res, db) => {
  const { id } = req.body
  db('conversation_categories').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getTopicList = (req, res, db) => {
  db.select('*').from('conversation_categories').join('conversation_topics', {'conversation_topics.category_id': 'conversation_categories.id'})
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json(items)
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const saveTopic = (req, res, db) => {
  const { category_id, topic, is_disabled } = req.body
  const added = new Date()
  db('conversation_topics').insert({category_id, topic, is_disabled})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const updateTopic = (req, res, db) => {
  const { id, category_id, topic, is_disabled } = req.body
  db('conversation_topics').where({id}).update({id, category_id, topic, is_disabled})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTopic = (req, res, db) => {
  const { id } = req.body
  db('conversation_topics').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getQuestionList = (req, res, db) => {
    //db.select('*').from('conversation_questions')
    db.select('*').from('conversation_categories')
    .join('conversation_questions', {'conversation_questions.category_id': 'conversation_categories.id'})
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json(items)
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const saveQuestion = (req, res, db) => {
  const { category_id, topic_id, question, is_disabled } = req.body
  db('conversation_questions').insert({category_id, topic_id, question, is_disabled})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const updateQuestion = (req, res, db) => {
  const { id, category_id, topic_id, question, is_disabled } = req.body
  db('conversation_questions').where({id}).update({id, category_id, topic_id, question, is_disabled})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteQuestion = (req, res, db) => {
  const { id } = req.body
  db('conversation_questions').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getCategoryList,
  saveCategory,
  updateCategory,
  deleteCategory,
  getTopicList,
  saveTopic,
  updateTopic,
  deleteTopic,
  getQuestionList,
  saveQuestion,
  updateQuestion,
  deleteQuestion
}