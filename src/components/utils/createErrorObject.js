import _ from 'lodash'

const getErrorMessage = (err) => {
  const statusCode = _.get(err, 'response.status', null)
  var errors = ''

  switch (statusCode) {
    case 422:
    case 401:
      errors = _.get(err, 'response.data.errors', 'Unauthorized, please re-login')
      localStorage.clear()

      return errors
    case 404:
      errors = _.get(err, 'response.data.message', 'Service Not Found')
      return errors
    case 500:
      errors = _.get(err, 'response.data.message')
      return errors
    default:
      return 'Unexpected error, please see console for details'
  }
}

export const createErrorObject = (err) => {
  let errorCode = ''
  if (_.get(err, 'response.status') !== undefined) {
    errorCode = '(' + _.get(err, 'response.status') + ') '
  }
  const error = errorCode + getErrorMessage(err)
  
  try {
    throw new Error(error);
  } catch (e) {
    console.error(e);
  }
}
