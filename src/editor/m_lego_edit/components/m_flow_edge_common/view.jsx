import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Popover from '@mui/material/Popover';
import cn from 'classnames';
import { useHover } from 'ahooks';

export default function EdegeView(props) {
  const { model } = props;

  const ref = React.useRef(null);
  const isHovering = useHover(ref, {
    onEnter: (e) => {
      e.stopPropagation();
    },
  });

  const insertNode = () => {
    const { clientX, clientY, offsetX, offsetY } = this.iconEvent;
    const point = this.graphModel.getPointByClient({
      x: clientX - offsetX + 16,
      y: clientY - offsetY + 6,
    });
    const canvasPoint = point.canvasOverlayPosition;
    const nodeData = this.model.getData();
    this.popoverItemKey = this.graphModel.popover.show({
      type: 'tip1',
      delay: 100,
      key: this.model.id,
      placement: 'right',
      trigger: 'click',
      width: 16,
      height: 16,
      x: canvasPoint.x - 6,
      y: canvasPoint.y,
      props: {
        showConnectBlock: false,
      },
    });
    this.popVisible = false;
  };

  // 父级没有hover 和 select 不限时添加
  if (!model.isHovered && !model.isSelected && !isHovering) {
    return null;
  }

  console.log('isHovering: ', isHovering);

  return (
    <div>
      <div
        ref={ref}
        className={cn({
          'line-content': true,
          selected: !!props.isSelected,
        })}
      >
        <AddCircleOutlineIcon className="line-icon" />
      </div>
      <Popover
        open={isHovering}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        The content of the Popover.
      </Popover>
    </div>
  );
}
