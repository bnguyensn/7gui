import React, { useRef, useState } from 'react';
import useCircles from './hooks/useCircles';
import draw from './graphics/draw';
import Canvas from './components/Canvas';
import {
  deepCloneObject,
  getDistanceBtw2Points,
  getRandomIntBtw,
} from './utils';
import ContextMenu from './components/ContextMenu';
import DiameterPanel from './components/DiameterPanel';

const MAX_RADIUS = 50;
const MIN_RADIUS = 5;

const CircleDrawer = () => {
  const {
    currentStateRef,
    canUndo,
    canRedo,
    undo,
    redo,
    updateCurrentState,
    createCircle,
    logStates,
  } = useCircles();

  const [curHitCircle, setCurHitCircle] = useState(null);

  const diameterAdjustmentStateRef = useRef({});
  const [
    diameterAdjustmentSliderValue,
    setDiameterAdjustmentSliderValue,
  ] = useState(MIN_RADIUS * 2);

  const [contextMenuShow, setContextMenuShow] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const [diameterPanelShow, setDiameterPanelShow] = useState(false);

  // ---------- Event handlers ---------- //

  // ----- Control button event handlers ----- //

  const handleUndoClick = () => {
    undo();
    draw(currentStateRef.current);

    logStates();
  };

  const handleRedoClick = () => {
    redo();
    draw(currentStateRef.current);

    logStates();
  };

  // ----- Canvas event handlers ----- //

  const createCircleOnClick = ({ mouseX, mouseY }) => {
    createCircle({
      centerX: mouseX,
      centerY: mouseY,
      radius: getRandomIntBtw(MIN_RADIUS, MAX_RADIUS),
    });

    draw(currentStateRef.current);

    logStates();
  };

  const highlightCircleOnMouseMove = ({ mouseX, mouseY }) => {
    let hitId = null;

    Object.values(currentStateRef.current).some((circle) => {
      const { id, centerX, centerY, radius } = circle;

      const isHit =
        getDistanceBtw2Points(
          { x: mouseX, y: mouseY },
          { x: centerX, y: centerY }
        ) <= radius;

      if (isHit) {
        // Mark a circle to be mutated as hit.
        hitId = id;
      }

      return isHit;
    });

    if (
      (curHitCircle && curHitCircle.id !== hitId) ||
      (!curHitCircle && hitId)
    ) {
      // Mutate the current state to make the canvas reflect the newly hit
      // circle.
      Object.values(currentStateRef.current).forEach((circle) => {
        circle.isHit = circle.id === hitId;
      });

      if (hitId === null) {
        setDiameterPanelShow(false);
        setCurHitCircle(null);
      } else {
        setCurHitCircle(currentStateRef.current[hitId]);
      }

      draw(currentStateRef.current);
    }
  };

  // ----- Context menu event handlers ----- //

  const showContextMenu = ({ mouseX, mouseY }) => {
    setContextMenuShow(true);
    setContextMenuPosition({
      top: mouseY,
      left: mouseX,
    });
  };

  const handleContextMenuDiameterBtnClick = () => {
    setContextMenuShow(false);

    if (curHitCircle) {
      setDiameterPanelShow(true);
      setDiameterAdjustmentSliderValue(curHitCircle.radius * 2);

      // Clone the current state so we can freely make modifications without
      // committing to the actual history.
      diameterAdjustmentStateRef.current = deepCloneObject(
        currentStateRef.current
      );
    }
  };

  // ----- Diameter panel even handlers ----- //

  const handleDiameterPanelSliderChange = (newDiameter) => {
    if (curHitCircle) {
      setDiameterAdjustmentSliderValue(newDiameter);

      diameterAdjustmentStateRef.current[curHitCircle.id].radius = Math.round(
        newDiameter / 2
      );

      draw(diameterAdjustmentStateRef.current);
    }
  };

  const handleDiameterPanelDoneBtnClick = () => {
    setDiameterPanelShow(false);

    // Commit the current state clone into the actual history
    updateCurrentState(diameterAdjustmentStateRef.current);

    // Discard the current state clone
    diameterAdjustmentStateRef.current = {};
  };

  // ---------- Render ---------- //

  return (
    <div className="flex flex-col">
      <div>
        <button onClick={handleUndoClick}>Undo</button>
        <button onClick={handleRedoClick}>Redo</button>
      </div>

      <div className="relative border border-solid border-gray-900">
        <Canvas
          createCircleOnClick={createCircleOnClick}
          checkHitCircle={highlightCircleOnMouseMove}
          showContextMenu={showContextMenu}
        />

        <ContextMenu
          show={contextMenuShow}
          position={contextMenuPosition}
          handleDiameterBtnClick={handleContextMenuDiameterBtnClick}
        />

        {curHitCircle && (
          <DiameterPanel
            show={diameterPanelShow}
            position={contextMenuPosition}
            circle={curHitCircle}
            maxDiameter={MAX_RADIUS * 2}
            minDiameter={MIN_RADIUS * 2}
            sliderValue={diameterAdjustmentSliderValue}
            handleSliderChange={handleDiameterPanelSliderChange}
            handleDoneBtnClick={handleDiameterPanelDoneBtnClick}
          />
        )}
      </div>
    </div>
  );
};

export default CircleDrawer;
