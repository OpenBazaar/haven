import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { starRatingColor } from '../components/commonColors';

const starStyle = {
  marginRight: 3,
};

const ratingText = {
  marginLeft: 6,
};

export const ratingOptions = [0, 5, 4, 3].map((value) => {
  if (value === 0) {
    return { value, label: 'Any', exclusive: true };
  } else {
    const stars = [1, 2, 3, 4, 5].map((i) => {
      if (i <= value) {
        return <Ionicons key={`star_${i}`} style={starStyle} name="md-star" size={18} color={starRatingColor} />;
      } else {
        return <Ionicons key={`star_${i}`} style={starStyle} name="md-star" size={18} color="#C8C7CC" />;
      }
    });
    stars.push(<Text style={ratingText} key="star_rating">{value.toFixed(1)}</Text>);
    return { value, label: stars };
  }
});
