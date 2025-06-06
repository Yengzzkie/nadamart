import React, { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import ItemDetails from "./ItemDetails";
import CloseIcon from '@mui/icons-material/Close';

export const DragCloseDrawerExample = ({ selectedPost, open, setOpen }) => {

  return (
    <div>
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <ItemDetails itemData={selectedPost} />
      </DragCloseDrawer>
    </div>
  );
};

export const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[100vh] w-full overflow-hidden bg-white"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex bg-white p-2 border-b-[1px] border-gray-200">
              <button
                title="Drag to close"
                onClick={() => handleClose()}
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-auto w-auto p-1 lg:p-2 ml-auto mr-2 lg:mr-10 touch-none hover:shadow-lg shadow-md rounded-full bg-[var(--color-primary)] cursor-pointer"
              ><CloseIcon /></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p- pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};