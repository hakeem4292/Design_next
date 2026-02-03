export default function HeroContent() {
    return (
        <div className="flex flex-col items-center justify-center text-center pt-0 pb-10 md:pb-24 px-4 w-full">
            <span className="text-emerald-500 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] font-bold mb-4 md:mb-6">
                Innovative Design
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-[9rem] font-bold text-white tracking-tighter leading-tight md:leading-none mb-6 md:mb-10 flex flex-wrap justify-center gap-x-3 md:gap-x-6">
                <span>Visual</span>
                <span className="text-emerald-500 italic font-black">Impact</span>
            </h1>
            <p className="text-zinc-500 text-sm md:text-base max-w-[280px] sm:max-w-lg mx-auto leading-relaxed">
                Scroll down to see our curated portfolio reveal in high resolution.
            </p>
        </div>
    );
}