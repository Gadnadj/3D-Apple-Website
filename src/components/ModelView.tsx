import { RefObject, Dispatch, SetStateAction } from 'react';
import { Group } from 'three';
import { Object3DEventMap } from 'three';

interface ModelViewProps {
    index: number;
    groupRef: RefObject<Group<Object3DEventMap>>;
    gsapType: string;
    controlRef: RefObject<unknown>;
    setRotationState: Dispatch<SetStateAction<number>>;
    item: {
        title: string;
        color: string[];
        img: string;
    };
    size: string;
}

const ModelView: React.FC<ModelViewProps> = ({ index, groupRef, gsapType, controlRef, setRotationState, item, size }) => {
    return (
        <div>ModelView</div>
    );
};

export default ModelView;