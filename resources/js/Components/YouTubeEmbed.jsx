import ReactPlayer from 'react-player';

export default function YouTubeEmbed({ url, title }) {
    return (
        <div className="overflow-hidden rounded-[28px] border border-[#1d4ed8]/10 bg-[#0f172a] shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="aspect-video w-full">
                <ReactPlayer
                    url={url}
                    width="100%"
                    height="100%"
                    controls
                    light={false}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                            },
                        },
                    }}
                />
            </div>

            {title ? (
                <div className="border-t border-white/10 px-5 py-4 text-sm text-white/75">
                    {title}
                </div>
            ) : null}
        </div>
    );
}