import * as _ from 'lodash';

export const parseFeedData = feedArray => feedArray.reduce((prev, feed) => {
  const { id: activityId } = feed;
  const result = { ...prev };
  if (feed.verb === 'REPOST') {
    result.repost = [...result.repost, _.get(feed, 'postData.activityId')];
  }
  result.feed = { ...result.feed, [activityId]: feed };
  result.feedList = [...result.feedList, activityId];
  return result;
}, { feed: {}, feedList: [], repost: [] });

export const parseReactions = reactions => reactions.reduce((prev, reaction) => {
  switch (reaction.kind) {
    case 'like':
      return { ...prev, likes: [...prev.likes, reaction.user_id] };
    case 'repost':
      return { ...prev, reposts: [...prev.reposts, reaction.user_id] };
    case 'comment':
    default:
      return { ...prev, comments: [reaction, ...prev.comments] };
  }
}, { likes: [], reposts: [], comments: [] });
