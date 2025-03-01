import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import { RefObject, Dispatch, SetStateAction, Suspense } from 'react';
import { Group } from 'three';
import { Object3DEventMap } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Lights from './Lights';
import Iphone from './Iphone';
import * as THREE from 'three';
import Loader from './Loader';
interface ModelViewProps {
    index: number;
    groupRef: RefObject<Group<Object3DEventMap>>;
    gsapType: string;
    controlRef: RefObject<OrbitControlsImpl>;
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
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''} `}
        >
            {/* Ambiant Light */}
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            <Lights />

            <OrbitControls
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
            />

            <group ref={groupRef} name={`${index === 1} ? 'small' : 'large'`} position={[0, 0, 0]}>
                <Suspense fallback={<Loader />}>
                    <Iphone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>



        </View >
    );
};

export default ModelView;