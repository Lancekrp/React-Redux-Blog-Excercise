import _ from 'lodash'; // used for _.memoize too
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));

// below is a refactored version of the above code using the _.chain from lodash
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value()
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({type: 'FETCH_USER', payload: response.data});
};


// below is the memoize version if using lodash
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({type: 'FETCH_USER', payload: response.data});
// });
