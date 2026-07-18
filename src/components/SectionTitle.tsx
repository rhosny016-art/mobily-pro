type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionTitle({ eyebrow, title, description, centered = true }: SectionTitleProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-right"}>
      <p className="mb-3 text-sm font-black text-[#bd7b1e]">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-[-0.035em] text-[#123553] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base font-medium leading-8 text-[#587185]">{description}</p> : null}
    </div>
  );
}
