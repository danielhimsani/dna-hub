import {Controls, MiniMap, ReactFlow, useEdgesState, useNodesState} from "reactflow";
import {useEffect} from "react";
import 'reactflow/dist/style.css';
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import dagre from '@dagrejs/dagre';
import DNANode from "./DNANode";


const DnaPageStyle = styled('div')`
  width: 100%;
  height: 97%;
  background-color: white;
`;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({rankdir: direction});

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {width: nodeWidth, height: nodeHeight});
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return {nodes, edges};
};

const nodeStyle = {
    backgroundColor: '#F5E8C7',
}

const nodeTypes = {textUpdater: DNANode};


export function DnaPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    const ParseNodes = function (nodes) {
        let tmpNodes = [];
        const parsedNodes = nodes.kissers;
        parsedNodes.map(node => {
            tmpNodes.push({
                id: node._id["$oid"],
                data: node.data,
                position: {x: 0, y: 0}
            })
        })

        const parsedEdges = nodes.kisses;
        let tmpEdges = [];
        parsedEdges.map(edge => {
            console.log(edge);
            tmpEdges.push({
                id: `${edge.kissers[0]["$oid"]}-${edge.kissers[1]["$oid"]}`,
                source: edge.kissers[0]["$oid"],
                target: edge.kissers[1]["$oid"]
            })
        })
        getLayoutedElements(tmpNodes, tmpEdges);
        setEdges(tmpEdges);
        setNodes(tmpNodes);
    }

    useEffect(() => {
        fetch("http://3.91.244.167/api/get_all_kisses", {mode: 'no-cors'})
            .then((value) => value.json())
            .then(data => ParseNodes(data));
    }, [])


    return (
        <DnaPageStyle>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                style={nodeStyle}
            >
                <Controls/>
                <MiniMap/>
            </ReactFlow>
        </DnaPageStyle>
    )
}