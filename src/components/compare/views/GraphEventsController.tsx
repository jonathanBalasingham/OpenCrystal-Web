import { useRegisterEvents, useSigma } from "react-sigma-v2";
import { FC, useEffect } from "react";
import {useDispatch} from "react-redux";
import {changeObject, openView} from "../../../features/view/viewSlice";
import {setBox, setCamera} from "../../../features/compare/compareSlice";

function getMouseLayer() {
  return document.querySelector(".sigma-mouse");
}

const GraphEventsController: FC<{ setHoveredNode: (node: string | null) => void }> = ({ setHoveredNode, children }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const registerEvents = useRegisterEvents();
  let dispatch = useDispatch();

  /**
   * Initialize here settings that require to know the graph and/or the sigma
   * instance:
   */
  useEffect(() => {
    registerEvents({
      clickNode({ node }) {
        if (!graph.getNodeAttribute(node, "hidden")) {
          console.log(graph.getNodeAttribute(node, "key"))
          dispatch(changeObject(graph.getNodeAttribute(node, "key")))
          dispatch(openView(true))
        }
      },
      enterNode({ node }) {
        setHoveredNode(node);
        // TODO: Find a better way to get the DOM mouse layer:
        const mouseLayer = getMouseLayer();
        if (mouseLayer) mouseLayer.classList.add("mouse-pointer");
      },
      leaveNode() {
        setHoveredNode(null);
        // TODO: Find a better way to get the DOM mouse layer:
        const mouseLayer = getMouseLayer();
        if (mouseLayer) mouseLayer.classList.remove("mouse-pointer");
      },
      cameraUpdated(e) {
        let point01 = sigma.viewportToGraph({x: 0, y: 0})
        let dims = sigma.getDimensions()
        let point00 = sigma.viewportToGraph({x: 0, y: dims.height})
        let point11 = sigma.viewportToGraph({x: dims.width, y: dims.height})

        let box = {"x0": point01.x,
                   "y1": point01.y,
                   "y0": point00.y,
                   "x1": point11.x}
        dispatch(setBox(box))
        dispatch(setCamera(e))
      }
    });
  }, []);

  return <>{children}</>;
};

export default GraphEventsController;
