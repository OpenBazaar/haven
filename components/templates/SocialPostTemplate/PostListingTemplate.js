import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import decode from 'unescape';
import { postFeed } from '../../../reducers/feed';

import { eventTracker } from '../../../utils/EventTracker';
import SocialPostBase from './SocialPostBase';
import ListingPreview from '../../molecules/ListingPreview';
import { createListingUrlFromPeerIDAndSlug } from '../../../utils/navigation';

class PostListingTemplate extends React.Component {
  state = {
    comment: '',
    showPreview: true,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal) {
      this.setState({ showPreview: true });
    }
  }

  setActionSheet = (ref) => { this.actionSheet = ref; }

  handleChangeComment = (comment) => { this.setState({ comment }); }

  handleSetInputRef = (ref) => { this.inputBox = ref; }
  handlePostSuccess =() => {
    this.props.onHideModal();
  }

  handlePostListing = () => {
    const { postFeed, listing } = this.props;
    const { comment, showPreview } = this.state;
    eventTracker.trackEvent('Social-PostedListing');

    const { slug } = listing;
    const peerID = _.get(listing, 'vendorID.peerID');
    postFeed({
      status: showPreview ? (
        `${comment} ${createListingUrlFromPeerIDAndSlug(peerID, slug)}`
      ) : (
        comment
      ),
      success: this.handlePostSuccess,
    });
  }

  handleRemove = () => {
    this.setState({ showPreview: false });
  }

  render() {
    const { showModal, onHideModal, listing } = this.props;
    const { comment, showPreview } = this.state;

    if (!listing) {
      return null;
    }

    const images = _.get(listing, 'item.images');
    return (
      <SocialPostBase
        showModal={showModal}
        comment={comment}
        onHideModal={onHideModal}
        onChangeComment={this.handleChangeComment}
        setInputRef={this.handleSetInputRef}
        onPost={this.handlePostListing}
      >
        {showPreview && (
          <ListingPreview
            title={decode(_.get(listing, 'item.title'))}
            thumbnail={images && images[0].small}
            currencyCode={_.get(listing, 'metadata.pricingCurrency')}
            amount={_.get(listing, 'item.price')}
            onRemove={this.handleRemove}
          />
        )}
      </SocialPostBase>
    );
  }
}

const mapStateToProps = state => ({ profile: state.profile.data || {} });
const mapDispatchToProps = { postFeed };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(PostListingTemplate);
