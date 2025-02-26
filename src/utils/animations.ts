import * as THREE from 'three';

interface animatee {
    timeline: gsap.core.Timeline,
    modelRef: React.RefObject<THREE.Group>,
    rotation: number,
    firstView: string,
    secondView: string,
    style: { transform: string; duration: number }
}

export const animateWithGsapTimeline = ({ timeline, modelRef, rotation, firstView, secondView, style }: animatee) => {
    timeline.to(modelRef.current.rotation, {
        y: rotation,
        duration: 1,
        ease: 'power2.inOut'
    });

    timeline.to(firstView, {
        ...style,
        ease: 'power2.inOut'
    },
        '<'
    );

    timeline.to(secondView, {
        ...style,
        ease: 'power2.inOut'
    },
        '<'
    );
};