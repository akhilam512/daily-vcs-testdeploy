import * as React from 'react';
import { Box } from '#vcs-react/components';
import * as layoutFuncs from '../layouts.js';
import VideoSingle from './VideoSingle.js';

export default function VideoSplit(props) {
  const { participantDescs = [], margin_gu = 0, splitDirection } = props;
  // Make sure we have exactly one or two boxes
  const totalItems = Math.max(1, Math.min(participantDescs.length, 2));

  let layoutFn;
  switch (splitDirection) {
    default:
      layoutFn = layoutFuncs.splitAcrossLongerDimension;
      break;
    case 'horizontal':
      layoutFn = layoutFuncs.splitHorizontal;
      break;
    case 'vertical':
      layoutFn = layoutFuncs.splitVertical;
      break;
  }

  function makeItem(itemIdx) {
    const key = 'videosplit_item' + itemIdx;
    return (
      <Box
        key={key}
        id={key}
        layout={[layoutFn, { index: itemIdx, margin_gu, pos: 1 / totalItems }]}
      >
        <VideoSingle
          enableParticipantOverride={true}
          overrideParticipant={participantDescs[itemIdx]}
          {...props}
        />
      </Box>
    );
  }

  if (totalItems === 1) {
    return <Box id="videosplit">{[makeItem(0)]}</Box>;
  } else {
    return <Box id="videosplit">{[makeItem(0), makeItem(1)]}</Box>;
  }
}
