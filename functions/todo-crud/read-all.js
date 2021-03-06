/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb')

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const handler = async () => {
  console.log('Function `read-all` invoked')

  try {
    const response = await client.query(
      query.Paginate(query.Match(query.Index('all_todos')))
    )
    const todoRefs = response.data
    // create new query out of item refs. http://bit.ly/2LG3MLg
    const getAllTodosDataQuery = todoRefs.map((ref) => query.Get(ref))
    // then query the refs
    const ret = await client.query(getAllTodosDataQuery)
    return {
      statusCode: 200,
      body: JSON.stringify(ret),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
