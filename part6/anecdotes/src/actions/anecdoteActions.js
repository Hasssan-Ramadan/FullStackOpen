export const vote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    payload: { id },
  }
}

export const create = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    payload: { content },
  }
}
