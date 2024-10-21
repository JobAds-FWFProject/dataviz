
import { Cosmograph, CosmographTimeline, CosmographProvider } from '@cosmograph/react'
import './App.css'
import './Cosmograph.css'
import { nodes, links } from '../data/nodes_links.ts'

const parseDateString = (dateString: string): string => {
  // Extract year, month, day (YYYYMMDD format)
  const year = dateString.substring(0, 4);
  return year;
};

function JobAdsViz() {
    return (<>
        <div className="graph-panel">
            <CosmographProvider nodes={nodes} links={links} >
              <Cosmograph nodeColor={d => (d as any).color}
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
