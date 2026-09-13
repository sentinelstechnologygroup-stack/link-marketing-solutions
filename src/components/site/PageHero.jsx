import { Container, Reveal } from './ui';

export const LINK_MEDIA = {
  representative: 'https://media.base44.com/images/public/6aa5d302d571973897221ea3/a4bdc954e_generated_image.png',
  team: 'https://media.base44.com/images/public/6aa5d302d571973897221ea3/8a35b55aa_generated_image.png',
  bridge: 'https://media.base44.com/images/public/6aa5d302d571973897221ea3/9afc11fa5_generated_a0480c32.jpg',
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image = LINK_MEDIA.team,
  imageAlt = '',
  imagePosition = 'center',
  children,
}) {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-[#071b1e] pt-24 text-white">
      <div className="absolute inset-y-0 right-0 w-full opacity-35 md:w-[58%] md:opacity-100">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#071b1e_0%,rgba(7,27,30,.98)_36%,rgba(7,27,30,.72)_62%,rgba(7,27,30,.24)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
      <Container className="relative z-10 grid min-h-[425px] items-center gap-10 py-16 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal>
          <div className="max-w-3xl">
            <p className="editorial-kicker">{eyebrow}</p>
            <h1 className="mt-5 text-5xl leading-[1.02] tracking-[-.025em] sm:text-6xl lg:text-[66px]">{title}</h1>
            {subtitle && <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{subtitle}</p>}
          </div>
        </Reveal>
        {children && (
          <Reveal delay={0.12} className="self-end pb-2 lg:justify-self-end">
            <div className="max-w-sm border-l border-[#d4af37]/55 bg-[#071b1e]/58 p-6 backdrop-blur-sm">
              {children}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
