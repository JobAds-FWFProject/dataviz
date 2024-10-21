import { useRef } from 'react'

import { Cosmograph, CosmographTimeline, CosmographSearch, CosmographProvider } from '@cosmograph/react'
import './App.css'
import './Legend.css'
import './Cosmograph.css'
import { nodes, links } from '../data/nodes_links.ts'
import Legend from './Legend';  // Adjust the path if necessary

type N = any;  // WHERE IS N declared?

const parseDateString = (dateString: string): string => {
  // Extract year, month, day (YYYYMMDD format)
  const year = dateString.substring(0, 4);
  return year;
};

function JobAdsViz() {
  const searchRef = useRef(null)
  const cosmograph = useRef(null)

  const deselectNodes = () => {
    (cosmograph.current as any)?.unselectNodes()
  }
  const clearSearch = () => {
    (searchRef.current as any)?.clearInput();
    deselectNodes();
  };

  const playPause = () => {
    if ((cosmograph.current as any)?.isSimulationRunning){
      (cosmograph.current as any)?.pause();
    }else{
      (cosmograph.current as any)?.start();
    }
  }
  const fitView = () => {
    (cosmograph.current as any)?.fitView();
  }
  const customOnSearch = (nodes?: N[]) =>{
    // reset searchview if nodes are empty
    if (!nodes) {
      clearSearch();
    }
    let selectedNodes = nodes;
    nodes?.forEach((node) => {
      // expand the node
      let adjacentNodes = (cosmograph.current as any)?.getAdjacentNodes(node.id);
      selectedNodes = selectedNodes?.concat(adjacentNodes);
    });
    (cosmograph.current as any)?.selectNodes(selectedNodes);
  }
  const customSelectResult= (node?: N) =>{
    let selectedNodes = [node];
    let adjacentNodes = (cosmograph.current as any)?.getAdjacentNodes(node.id);
    selectedNodes = selectedNodes?.concat(adjacentNodes);
    (cosmograph.current as any)?.selectNodes(selectedNodes);
  }
  return (<>
    <div className="graph-panel">
      <CosmographProvider nodes={nodes} links={links} >
        <div className="control-panel">
          <button onClick={clearSearch}>Clear search</button>
    <button onClick={deselectNodes}>Reset Selection</button>
    <button onClick={playPause}>Pause/Play</button>
    <button onClick={fitView}>Fit</button>
    </div>
    <Legend />
    <CosmographSearch ref={searchRef} onSearch={customOnSearch} onSelectResult={customSelectResult}/>
    <Cosmograph ref={cosmograph}  nodeColor={d => (d as any).color}
                nodeSize={d => (d as any).size} nodeLabelAccessor={d => (d as any).label}
                linkArrows={false}
                showTopLabels={false}
                simulationRepulsion={1} simulationGravity={0.25} simulationRepulsionTheta={1.15} simulationLinkDistance={10} />
    <CosmographTimeline
      accessor={d => (d as any).time}
      animationSpeed={20}
      showAnimationControls
      formatter={d => parseDateString(d.toString())}
      barCount={100}
      onAnimationPlay={() => console.log('Animation started')}
    />
    </CosmographProvider>
    </div>
    <div>
    </div>
    </>
  )
}

export default JobAdsViz
