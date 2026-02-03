export interface CaseStudyProps {
    id: string;
    title: string;
    category: string;
    image?: string;
}

export default function CaseStudyCard({ id, title, category, image }: CaseStudyProps) {
    return (
        <div className="flex-shrink-0 w-[92vw] sm:w-[500px] md:w-[600px] p-2 md:p-4 group case-study-card relative overflow-hidden rounded-[1.5rem] md:rounded-[3rem]">
            {/* Background Image Layer */}
            {image && (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image})` }}
                />
            )}

            {/* Glassmorphism Content Area */}
            <div className={`relative z-10 w-full h-full p-6 md:p-14 border border-white/10 transition-all duration-500 
                ${image ? 'bg-black/10 backdrop-blur-[2px] group-hover:bg-black/5' : 'bg-zinc-900/40 group-hover:bg-zinc-900/60'}
                group-hover:border-emerald-500/30 flex flex-col justify-between`}
            >
                <div>
                    <p className="text-white/70 md:text-zinc-400 text-[9px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-6 drop-shadow-md">{id} Case Study</p>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase mb-6 md:mb-10 leading-tight group-hover:text-emerald-500 transition-colors duration-500 [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
                        {title}
                    </h2>
                </div>
                <div>
                    <p className="text-white/60 md:text-zinc-500 text-[10px] md:text-xs mb-6 md:mb-8 tracking-widest uppercase drop-shadow-md">{category}</p>
                    <button className="text-emerald-400 md:text-emerald-500 border-b border-emerald-500/30 hover:border-emerald-500 pb-1 text-[10px] md:text-sm font-black tracking-widest transition-all drop-shadow-md">
                        VIEW CASE STUDY
                    </button>
                </div>
            </div>
        </div>
    );
}
