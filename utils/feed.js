import _ from 'lodash';
import moment from 'moment';

export const mergeList = (localList, commingList, peerID, slug, userPeerID) => {
  const idx = localList.findIndex(item => item.slug === slug && item.peerID);
  let result = [];
  if (idx >= 0) {
    const tmpList = [...commingList];
    if (tmpList.findIndex(item => item === userPeerID) >= 0) {
      result = [...tmpList];
    } else {
      result = [...tmpList, userPeerID];
    }
  } else {
    result = [...commingList];
  }
  return result;
};

export const mergeComments = (localComments, comments, reference) => {
  const lastTimestamp = _.get(comments, `${comments.length - 1}.timestamp`);
  const localFeedComments = localComments
    .filter((comment) => {
      if (comments.length > 0) {
        return (comment.reference === reference) && (moment(comment.timestamp).isAfter(moment(lastTimestamp)));
      }
      return (comment.reference === reference);
    })
    .map(comment => ({ ...comment, type: 'local' }));
  if (localFeedComments.length > 0) {
    return [...comments, ...localFeedComments];
  }
  return comments;
};

export const mergeWithOriginal = (originalFeed, newFeeds, hideNewOne = false) => {
  const firstPart = [...originalFeed.filter(feed => !_.isEmpty(feed))];
  firstPart.forEach((feed) => {
    const peerID = _.get(feed, 'data.vendorID.peerID');
    const slug = _.get(feed, 'data.slug');
    const updateItem = newFeeds.find(feed =>
      _.get(feed, 'data.vendorID.peerID') === peerID &&
      _.get(feed, 'data.slug') === slug);
    if (!_.isEmpty(updateItem)) {
      feed = { ...updateItem };
    }
  });
  // hideNewOne determines the newly added ones will be showing on the Global Feed List
  // This is necessary because in the infinite listing newly added ones causes jumping issue
  // when they are not showing on the correct position.
  const secondPart = newFeeds.filter((feed) => {
    const peerID = _.get(feed, 'data.vendorID.peerID');
    const slug = _.get(feed, 'data.slug');
    return _.isEmpty(firstPart.find(feed =>
      _.get(feed, 'data.vendorID.peerID') === peerID
      && _.get(feed, 'data.slug') === slug),
    );
  }).map(({ data, ...restData }) => ({ data: { ...data, display: !hideNewOne }, ...restData }));
  return [
    ...firstPart,
    ...secondPart,
  ];
};

export const appendToOriginal = (originalFeed, newFeeds) => {
  const firstPart = [...originalFeed.filter(feed => !_.isEmpty(feed))];
  firstPart.forEach((feed) => {
    const peerID = _.get(feed, 'data.vendorID.peerID');
    const slug = _.get(feed, 'data.slug');
    const updateItem = newFeeds.find(feed => _.get(feed, 'data.vendorID.peerID') === peerID && _.get(feed, 'data.slug') === slug);
    if (!_.isEmpty(updateItem)) {
      feed = { ...updateItem };
    }
  });
  return [
    ...(_.filter(newFeeds, (feed) => {
      const peerID = _.get(feed, 'data.vendorID.peerID');
      const slug = _.get(feed, 'data.slug');
      return _.isEmpty(firstPart.find(feed => _.get(feed, 'data.vendorID.peerID') === peerID && _.get(feed, 'data.slug') === slug));
    })),
    ...firstPart,
  ];
};

export const convertFromReference = (reference) => {
  const referenceParts = reference.split('/');
  const peerID = referenceParts[0];
  const slug = referenceParts[1];
  return { peerID, slug };
};

export const parseToFeedList = feeds => feeds.map((feed) => {
  const peerID = _.get(feed, 'data.vendorID.peerID');
  const slug = _.get(feed, 'data.slug');
  const timestamp = moment(_.get(feed, 'data.timestamp')).valueOf();
  return { peerID, slug, timestamp };
});

export const parseToGlobalFormat = (feeds, peerID) => feeds.map(feed => ({
  type: 'post',
  data: {
    ...feed,
    vendorID: { peerID },
  },
}));

export const mergeFeeds = (localFeeds, globalFeeds, peerID) => {
  const localResult = localFeeds.map((localFeed) => {
    const { slug } = localFeed;
    const globalFeed = globalFeeds.find(feed =>
      _.get(feed, 'data.slug') === slug &&
      _.get(feed, 'data.vendorID.peerID') === peerID) || {};
    const globalData = globalFeed.data;
    return _.isEmpty(globalFeed) ? {
      type: 'post',
      data: {
        ...localFeed,
        updateTimestamp: moment().valueOf(),
        vendorID: { peerID },
      },
    } : {
      type: 'post',
      data: {
        ...localFeed,
        ...globalData,
      },
    };
  });
  const globalResult = globalFeeds.filter(feed => !localResult.find(localFeed => (
    _.get(localFeed, 'data.vendorID.peerID') === _.get(feed, 'data.vendorID.peerID') &&
    _.get(localFeed, 'data.slug') === _.get(feed, 'data.slug')
  )));
  const mergedArray = [...localResult, ...globalResult];
  const sortedArray = _.orderBy(
    mergedArray,
    [feed => moment(_.get(feed, 'data.timestamp')).valueOf()],
    ['desc'],
  );
  return sortedArray;
};

export const getFeedReference = (feed) => {
  const peerID = _.get(feed, 'data.vendorID.peerID');
  const slug = _.get(feed, 'data.slug');
  return `${peerID}/${slug}`;
};

export const getReferenceList = feeds => feeds.map((feed) => {
  const reference = getFeedReference(feed);
  const timestamp = moment(_.get(feed, 'data.timestamp')).valueOf();
  return { reference, timestamp };
});

export const appendList = (originList, appendingList) => {
  const result = [...originList];
  const appendingResult = appendingList.filter(item => !result.find(orgItem => orgItem.reference === item.reference));
  return [...result, ...appendingResult];
};

export const prependList = (originList, prependingList) => {
  const result = prependingList.filter(item => !originList.find(orgItem => orgItem.reference === item.reference));
  return [...result, ...originList];
};

export const mergeWithCache = (feeds, mergingFeeds) => {
  const results = { ...feeds };
  mergingFeeds.forEach((feed) => {
    const reference = getFeedReference(feed);
    if (!results[reference]) {
      results[reference] = feed;
    }
  });
  return results;
};

export const mergeToGlobalList = (globalList, localList) => {
  const results = [...globalList];
  const appendingList = localList.filter(item => !results.find(glbItem => glbItem.reference === item.reference));
  return _.orderBy([...results, ...appendingList], [item => moment(item.timestamp).valueOf()], ['desc']);
};


export const getFeedCount = (feed, likes, reposts, comments, peerID, slug, userPeerID) => {
  let like_count = 0;
  let comment_count = 0;
  let repost_count = 0;
  const reference = `${peerID}/${slug}`;
  const fetched = _.get(feed, 'data.fetched', false);
  const likes_ary = _.get(feed, 'data.likes', []).filter(peerID => peerID !== userPeerID);
  like_count = fetched ? likes_ary.length : _.get(feed, 'data.like_count', 0);
  const likesOcur = likes.filter(({ peerID: likePeerID, slug: likeSlug }) => likePeerID === peerID && likeSlug === slug);
  like_count += likesOcur.length;

  const comment_ary = _.get(feed, 'data.comments', []).filter(comment => _.get(comment, 'vendorID.peerID') !== userPeerID);
  comment_count = fetched ? comment_ary.length : _.get(feed, 'data.comment_count', 0);
  const commentOcur = comments.filter(({ reference: commentReference }) => reference === commentReference);
  comment_count += commentOcur.length;

  const repost_ary = _.get(feed, 'data.reposts', []).filter(repost => repost !== userPeerID);
  repost_count = fetched ? repost_ary.length : _.get(feed, 'data.repost_count', 0);
  const repostOcur = reposts.find(({ peerID, slug }) => reference === `${peerID}/${slug}`);
  if (repostOcur) {
    repost_count += 1;
  }
  return { like_count, comment_count, repost_count };
};
