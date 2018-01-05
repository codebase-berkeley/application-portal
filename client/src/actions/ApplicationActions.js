import * as types from '../constants/ActionTypes';

/*
setReadStatus action
Set the read status of an application to TRUE or FALSE.
:param: applicationId - (Number) the ID of the application.
:param: read - (bool) whether or not it has been read.
*/
export function setReadStatus(applicationId, read) {
  return (dispatch, getState) => {
    // request server to set read status...
    // (TODO)

    // optimistically set the read status of the local application obj.
    const { applications } = getState().entities;
    dispatch(setReadStatusLocal(applications, applicationId, read));
  };
}

/*
setReadStatus action
Set the read status of an application (local storage only) to TRUE or FALSE.
:param: applications - (Obj) set of all applications.
:param: applicationId - (Number) the ID of the application.
:param: read - (bool) whether or not it has been read.
*/
export function setReadStatusLocal(applications, applicationId, read) {
  const newApp = {
    ...applications[applicationId],
    read,
  };
  return {
    type: types.SET_READ_STATUS,
    entities: {
      applications: {
        [applicationId]: newApp
      },
    },
  };
}
