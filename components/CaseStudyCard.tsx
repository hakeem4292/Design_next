export interface CaseStudyProps {
    id: string;
    title: string;
    category: string;
    image?: string;
}

export default function CaseStudyCard({ id, title, category }: CaseStudyProps) {
    return (
        <div className="flex-shrink-0 w-[85vw] sm:w-[500px] md:w-[600px] p-2 md:p-4 group case-study-card">
            <div className="bg-zinc-900/40 border border-white/5 p-6 md:p-14 rounded-[1.5rem] md:rounded-[3rem] backdrop-blur-md transition-all duration-500 group-hover:border-emerald-500/30 group-hover:bg-zinc-900/60 h-full flex flex-col justify-between">
                <div>
                    <p className="text-zinc-500 text-[9px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-6">{id} Case Study</p>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase mb-6 md:mb-10 leading-tight group-hover:text-emerald-500 transition-colors duration-500">
                        {title}
                    </h2>
                </div>
                <div>
                    <p className="text-zinc-600 text-[10px] md:text-xs mb-6 md:mb-8 tracking-widest uppercase">{category}</p>
                    <button className="text-emerald-500 border-b border-emerald-500/30 hover:border-emerald-500 pb-1 text-[10px] md:text-sm font-black tracking-widest transition-all">
                        VIEW CASE STUDY
                    </button>
                </div>
            </div>
        </div>
    );
}
