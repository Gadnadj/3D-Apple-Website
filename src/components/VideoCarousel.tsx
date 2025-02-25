import { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const VideoCarousel = () => {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    });

    const [loadedData, setloadedData] = useState<any[]>([]);

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useGSAP(() => {

        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        });

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }))
        });
    }, [isEnd, videoId]);


    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId]?.pause();
            }
            else {
                startPlay && videoRef.current[videoId]?.play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleLoadedMetadata = (index: number, e: any) => {
        setloadedData(prev => [...prev, e]);
    };


    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress !== currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                                ? '10vw'
                                : window.innerWidth < 1200
                                    ? '10vw'
                                    : '4vw'
                        });

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        });
                    }
                }
            });
            if (videoId === 0) {
                anim.restart();
            }

            const animUpdate = () => {
                const currentVideo = videoRef.current[videoId];
                if (currentVideo) {
                    anim.progress(currentVideo.currentTime / hightlightsSlides[videoId].videoDuration);
                }
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            }
            else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay, isPlaying]);

    const handleProcess = (type: any, index: number) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: index + 1 }));
                break;

            case 'video-last':
                setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
                break;

            case 'video-reset':
                setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: false, videoId: 0 }));
                break;

            case 'play':
                setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
                break;

            case 'pause':
                setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
                break;

            default:
                return video;
        }
    };
    return (
        <>
            <div className="flex items-center">
                {
                    hightlightsSlides.map((item, i) => (
                        <div key={item.id} id='slider' className='sm:pr-20 pr-10'>
                            <div className='video-carousel_container'>
                                <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                    <video
                                        id='video'
                                        playsInline={true}
                                        preload='auto'
                                        muted
                                        ref={(el) => { videoRef.current[i] = el; }}
                                        onEnded={() => { i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last', i); }}
                                        onPlay={() => setVideo(prevVideo => ({ ...prevVideo, isPlaying: true }))}
                                        onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                                        className={`${item.id === 2 && 'translate-x-44'} pointer-events-none`}
                                    >
                                        <source src={item.video} type='video/mp4' />
                                    </video>
                                </div>

                                <div className='absolute top-12 left-[5%] z-10'>
                                    {item.textLists.map((text) => (
                                        <p key={text} className='md:text-2xl text-xl font-medium'>
                                            {text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >

            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop:blur rounded-full'>
                    {
                        videoRef.current.map((_, index) => (
                            <span
                                key={index}
                                ref={(el) => { videoDivRef.current[index] = el; }}
                                className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>

                                <span
                                    className='absolute h-full w-full rounded-full'
                                    ref={(el) => { videoSpanRef.current[index] = el; }}
                                />
                            </span>
                        ))
                    }
                </div>

                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={isLastVideo ? () => handleProcess('video-reset', videoId) : !isPlaying ? () => handleProcess('play', videoId) : () => handleProcess('pause', videoId)}
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;