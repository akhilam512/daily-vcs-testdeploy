import * as React from 'react';
import { Box, Video, Label } from '#vcs-react/components';
import { useActiveVideo } from '#vcs-react/hooks';
import * as layoutFuncs from '../layouts';

export default function VideoGrid({
  showLabels,
  scaleMode,
  videoStyle,
  videoLabelStyle,
  labelsOffset_px,
}) {
  const { activeIds, dominantId, displayNamesById } = useActiveVideo();

  const items = activeIds.map((videoId, i) => {
    const key = 'videogrid_item' + i;

    const itemLayout = [
      layoutFuncs.grid,
      { index: i, total: activeIds.length },
    ];

    let participantLabel;
    if (showLabels && activeIds.length > 1) {
      participantLabel = (
        <Label
          style={videoLabelStyle}
          layout={[
            layoutFuncs.gridLabel,
            { textH: videoLabelStyle.fontSize_px, offsets: labelsOffset_px },
          ]}
          clip
        >
          {displayNamesById[videoId] || ''}
        </Label>
      );
    }

    let highlight;
    if (videoId === dominantId) {
      const highlightStyle = {
        strokeColor: '#fff',
        strokeWidth_px: 4,
        cornerRadius_px: videoStyle.cornerRadius_px,
      };

      highlight = (
        <Box
          style={highlightStyle}
          layout={itemLayout}
          key={key + '_highlight'}
        />
      );
    }

    const item = (
      <Box key={key} id={key} layout={itemLayout}>
        <Video src={videoId} style={videoStyle} scaleMode={scaleMode} />
        {participantLabel}
      </Box>
    );

    // the highlight needs to be separate from the video box
    // to prevent the stroke from getting clipped.
    // always return an array so the item component keeps in place
    // in React's diffing.
    return highlight ? [item, highlight] : [item];
  });

  return <Box id="videogrid">{items}</Box>;
}
