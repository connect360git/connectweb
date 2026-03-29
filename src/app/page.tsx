"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Noise } from "@/lib/perlin-noise";
import emailjs from "@emailjs/browser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import {
  Menu,
  Target,
  TrendingUp,
  Eye,
  BarChart3,
  Users,
  Globe,
  Zap,
  ArrowRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Rocket,
  Lightbulb,
  Heart,
  Quote,
  Shield,
} from "lucide-react";

// ============================================
// CONSTANTS
// ============================================

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Serviços", href: "#servicos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Contato", href: "#contato" },
];

const STATS_LABELS = [
  "Clientes atendidos",
  "Países com clientes ativos",
  "Investimento gerenciado em tráfego",
];

const PAINS = [
  "Já tentaram agência que só fazia post sem resultado",
  "Gastaram em anúncios sem saber se estava funcionando",
  "Não tinham método para atrair novos clientes",
  "Ainda não encontrou uma agência completa que transmita confiança de verdade?",
];

const FOOTER_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Contato", href: "#contato" },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Diagnóstico Estratégico",
    description:
      "Entendemos seu negócio, seu mercado e seus objetivos antes de investir um real. Nada de solução genérica.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Plano Personalizado",
    description:
      "Montamos uma estratégia sob medida para o seu momento, seu orçamento e seu público — seja no Brasil ou no exterior.",
    icon: Target,
  },
  {
    number: "03",
    title: "Execução com Acompanhamento",
    description:
      "Nossa equipe executa e você acompanha tudo em tempo real. Sem sumir, sem enrolação.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Resultados e Escala",
    description:
      "Medimos, ajustamos e escalamos o que funciona. ROI claro, decisões baseadas em dados.",
    icon: TrendingUp,
  },
];

const SERVICES = [
  {
    icon: Target,
    title: "Tráfego Pago",
    description:
      "Campanhas no Google e Meta que geram clientes reais, não apenas cliques. Cada real investido é monitorado e otimizado para o maior retorno possível.",
    image: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774550382/2_iqrzbs.png",
    imageDesktop: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774740947/desktop_trafego_ziokdt.png",
  },
  {
    icon: Users,
    title: "Social Media",
    description:
      "Gestão estratégica das suas redes sociais com foco em posicionamento, engajamento e conversão — não só em \"curtidas\".",
    image: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774550383/1_vwezcc.png",
    imageDesktop: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774740953/desktop_social_qe7lar.png",
  },
  {
    icon: Globe,
    title: "Criação de Sites e Landing Pages",
    description:
      "Sites e páginas que vendem enquanto você dorme. Desenvolvidos para converter, não apenas para parecer bonitos.",
    image: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774550384/3_ju2ezu.png",
    imageDesktop: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774740953/descktop_site_uxrenh.png",
  },
  {
    icon: Lightbulb,
    title: "Branding e Design Gráfico",
    description:
      "Identidade visual que comunica quem você é antes mesmo de você falar. Do logo ao material completo da marca.",
    image: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774550383/5_ulxkyu.png",
    imageDesktop: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774740945/descktop_brandi_yor7mc.png",
  },
  {
    icon: Rocket,
    title: "Consultoria Estratégica",
    description:
      "Para quem quer clareza antes de agir. Analisamos seu negócio, seu funil e seu posicionamento e entregamos um plano de ação prático.",
    image: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774550383/8_t9ttvq.png",
    imageDesktop: "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774740954/descktop_consultoria_ecckg2.png",
  },
];

const DIFFERENTIALS = [
  {
    icon: BarChart3,
    title: "Resultado mensurável, sempre",
    description:
      "Você sabe exatamente o que está funcionando. Relatórios claros, métricas reais e ROI visível — sem enrolação e sem achismo.",
  },
  {
    icon: Target,
    title: "Estratégia feita para você",
    description:
      "Nada de pacote pronto. Cada estratégia é construída do zero para o seu negócio, seu público e seu momento.",
  },
  {
    icon: Heart,
    title: "Atendimento próximo e humanizado",
    description:
      "Você tem acesso direto à equipe. Respondemos rápido, falamos a sua língua e tratamos o seu negócio como se fosse o nosso.",
  },
  {
    icon: Globe,
    title: "Entendemos o empreendedor brasileiro em qualquer lugar",
    description:
      "Brasil, EUA, Irlanda, Portugal, Austrália — atendemos onde você estiver, com estratégias adaptadas ao seu contexto e ao seu mercado.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Silva",
    role: "CEO",
    company: "Boutique Fashion",
    location: "Dublin, Irlanda",
    text: "A Connect entendeu exatamente o que meu negócio precisava. Em 3 meses, triplicamos as vendas vindas do digital. Melhor investimento que fiz!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Carlos Santos",
    role: "Fundador",
    company: "TechStartup",
    location: "São Paulo, Brasil",
    text: "Profissionalismo e resultados reais. A equipe é extremamente dedicada e os relatórios são claros. Finalmente entendo onde meu dinheiro está indo.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Ana Oliveira",
    role: "Diretora",
    company: "Clínica Estética AO",
    location: "Lisboa, Portugal",
    text: "Até encontrar a Connect, já tinha perdido dinheiro com outras agências. Aqui é diferente: estratégia de verdade e resultados que aparecem no faturamento.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Pedro Mendes",
    role: "Marketing Director",
    company: "E-commerce Plus",
    location: "Miami, EUA",
    text: "O ROAS que alcançamos em 2 meses superou todas as expectativas. A equipe da Connect entende na profundidade certa o que o mercado internacional exige.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Juliana Costa",
    role: "CEO",
    company: "StartupX",
    location: "Sydney, Austrália",
    text: "Da estratégia à execução, tudo foi muito bem conduzido. Em 6 meses, nossa presença digital cresceu 400%. Recomendo de olhos fechados!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Ricardo Almeida",
    role: "Sócio-fundador",
    company: "Agência Digital RA",
    location: "Porto, Portugal",
    text: "A consultoria da Connect nos ajudou a reestruturar todo o funil de vendas. Resultado: aumento de 180% na taxa de conversão.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Fernanda Lima",
    role: "Head of Growth",
    company: "SaaS Solutions",
    location: "São Paulo, Brasil",
    text: "Trabalhamos com várias agências antes, mas nenhuma entregou com tanta clareza e comprometimento. A Connect é parceira de verdade.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Lucas Ferreira",
    role: "Proprietário",
    company: "Restaurante Sabor",
    location: "Dublin, Irlanda",
    text: "Mesmo sendo um negócio local, a Connect montou uma estratégia de tráfego pago que triplicou nossos pedidos de delivery em 60 dias.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Mariana Rocha",
    role: "Diretora Comercial",
    company: "Consultoria MR",
    location: "Toronto, Canadá",
    text: "A transparência nos relatórios e a disponibilidade da equipe fizeram toda diferença. Senti que tinham compromisso real com meu sucesso.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    question: "A Connect atende empresas fora do Brasil?",
    answer:
      "Sim! Atendemos empreendedores brasileiros em qualquer lugar do mundo — EUA, Irlanda, Portugal, Austrália e onde mais você estiver. Nossa comunicação e estratégias são adaptadas para cada mercado.",
  },
  {
    question: "Qual o investimento mínimo para começar?",
    answer:
      "Depende do serviço e do momento do seu negócio. Fazemos um diagnóstico gratuito para entender sua realidade e apresentar uma proposta que faça sentido para você.",
  },
  {
    question: "Em quanto tempo vejo resultados?",
    answer:
      "Para tráfego pago, os primeiros resultados aparecem entre 7 e 30 dias. Para SEO e branding, o crescimento é consistente e de médio a longo prazo. Somos transparentes sobre isso desde o início.",
  },
  {
    question: "Como funciona o acompanhamento após o início do projeto?",
    answer:
      "Você terá acesso contínuo à nossa equipe, relatórios periódicos e reuniões de alinhamento conforme o seu plano. Nada de sumir depois de fechar o contrato.",
  },
  {
    question: "Preciso ter um site para começar a anunciar?",
    answer:
      "Não necessariamente. Avaliamos o seu caso e indicamos o caminho mais eficiente — às vezes uma landing page simples já resolve. Mas se precisar de um site, a gente também faz. 😉",
  },
];

const COUNTRIES = [
  "Brasil",
  "Estados Unidos",
  "Irlanda",
  "Portugal",
  "Austrália",
  "Canadá",
  "Reino Unido",
  "Outro",
];

// ============================================
// COMPONENTS
// ============================================

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5">
      <div className="max-w-4xl mx-auto border border-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3 bg-slate-800/90 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dp01xnzyp/image/upload/v1774485062/logo_connect_rbtylf.png"
              alt="Connect"
              width={280}
              height={95}
              className="h-10 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-1 text-sm font-medium text-white/60">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors duration-300 px-4 py-2 rounded-full hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button
                  className="hover:bg-white/5 p-2 rounded-full transition-all duration-300 border border-white/5 bg-white/[0.02]"
                  aria-label="Menu"
                >
                  <Menu className="w-4 h-4 stroke-[1.5] text-white/60" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0c1222] border-[#1a2538]">
                <nav className="flex flex-col gap-4 mt-8">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[#E5E5E5] hover:text-[#00A3FF] transition-colors text-lg font-medium py-2 font-['Roboto']"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const [showSpline, setShowSpline] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Generate particles only on client side to avoid hydration mismatch
  const [particles] = useState<{ left: number; top: number; delay: number; duration: number; opacity: number }[]>(() =>
    [...Array(25)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  );

  // Generate shooting stars (estrelas cadentes)
  const [shootingStars] = useState<{ left: number; size: number }[]>(() =>
    [...Array(4)].map(() => ({
      left: Math.random() * 100,
      size: 60 + Math.random() * 80,
    }))
  );

  useEffect(() => {
    // Use requestAnimationFrame to defer setState and avoid cascading renders warning
    requestAnimationFrame(() => {
      setMounted(true);
    });
    // Lazy load Spline after initial render
    const timer = setTimeout(() => {
      setShowSpline(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Base blue gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #0a1628 0%,
              #0c1a30 20%,
              #0e1e38 40%,
              #0c1a30 60%,
              #081420 80%,
              #0a1628 100%
            )
          `
        }}
      />

      {/* Spline 3D Background - Lazy loaded */}
      {showSpline && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://my.spline.design/worldplanet-inmHh7fVCul1jUFrNRYlotVU/"
            frameBorder="0"
            width="100%"
            height="100%"
            id="aura-spline"
            loading="lazy"
            style={{ position: 'absolute', top: 0, left: 0, border: 'none' }}
            allow="autoplay; fullscreen"
          />
        </div>
      )}

      {/* Blue tone overlay with depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, 
              rgba(0, 80, 180, 0.15) 0%, 
              rgba(0, 60, 140, 0.1) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Deep space gradient from edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, 
              transparent 0%, 
              transparent 30%, 
              rgba(8, 16, 32, 0.5) 50%, 
              rgba(6, 12, 28, 0.7) 70%, 
              rgba(4, 10, 24, 0.9) 85%,
              rgba(2, 8, 20, 0.98) 100%
            )
          `
        }}
      />

      {/* Atmospheric blue glow from bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 150% 60% at 50% 100%, 
              rgba(0, 100, 200, 0.2) 0%, 
              rgba(0, 80, 180, 0.1) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Animated particles - only render on client to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00A3FF] rounded-full animate-float-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Shooting stars (estrelas cadentes) */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {shootingStars.map((star, i) => (
            <div
              key={`shooting-${i}`}
              className={`absolute animate-shooting-star shooting-star-${i + 1}`}
              style={{
                left: `${star.left}%`,
                top: '-5%',
                width: `${star.size}px`,
                height: '2px',
                background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)',
                borderRadius: '50%',
                boxShadow: '0 0 6px 2px rgba(0, 163, 255, 0.5)',
                transform: 'rotate(45deg)',
              }}
            />
          ))}
        </div>
      )}

      {/* Glowing orbs with enhanced blue tones */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#0066FF]/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0088FF]/8 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#151d2e]/80 border border-[#2a3a50] mb-6 sm:mb-8 animate-fade-in">
            <Globe className="h-4 w-4 text-[#00A3FF]" />
            <span className="text-sm text-[#C0C0C0] font-['Roboto']">
              Brasil • EUA • Irlanda • Portugal • Austrália
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 font-['Poppins'] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Performance e posicionamento que levam sua empresa ao{" "}
            <span
              className="bg-gradient-to-r from-[#00A3FF] via-[#00D4FF] to-[#99DDFF] bg-clip-text text-transparent"
            >
              próximo nível
            </span>
            .
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-[#C0C0C0] max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16 leading-relaxed font-['Roboto'] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Estratégias digitais que atraem, convertem e geram resultados reais.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="#contato"
              className="cursor-follow-cta focus:outline-none relative overflow-hidden cursor-pointer px-8 py-4 h-auto w-fit text-lg text-black border-none rounded-full transition-all duration-500 inline-flex items-center gap-2"
              style={{
                backgroundColor: "#00A3FF",
                boxShadow: "#00A3FF 0px 0px 2px 1px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                lineHeight: 1.2,
                textDecoration: 'none',
              }}
              id="cursor-follow-button"
            >
              <span className="relative z-10 flex items-center gap-2">
                Quero um diagnóstico gratuito
                <ArrowRight className="h-5 w-5" />
              </span>
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-300"
                style={{
                  backgroundImage: "radial-gradient(circle at 0% 45%, rgba(0, 80, 140, 1) 19%, rgba(0, 163, 255, 0.26) 46%, rgba(0, 163, 255, 0) 100%)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-full h-full pointer-events-none transition-all duration-300"
                style={{
                  backgroundImage: "radial-gradient(circle at 100% 45%, rgba(0, 80, 140, 1) 19%, rgba(0, 163, 255, 0.26) 46%, rgba(0, 163, 255, 0) 100%)",
                }}
              />
              <style>{`
                #cursor-follow-button:hover {
                  box-shadow: 0px 0px 20px 0 #00A3FF !important;
                  background-color: #0066FF !important;
                }
                #cursor-follow-button:hover > div:first-of-type,
                #cursor-follow-button:hover > div:last-of-type {
                  width: 0 !important;
                  opacity: 0 !important;
                }
              `}</style>
            </a>
          </div>

          {/* Social Proof */}
          <p className="text-[#8A8A8A] text-sm font-['Roboto'] animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            Já ajudamos mais de <span className="text-[#00A3FF] font-semibold">150</span> empresas a transformar seus negócios com a Connect.
          </p>
        </div>
      </div>
    </section>
  );
}

// Client logos for carousel
const CLIENT_LOGOS = [
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493278/CLIENTES_1_tozicp.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493278/CLIENTES_2_b7skkn.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493278/CLIENTES_3_s1jk2j.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493279/CLIENTES_4_pjrv9f.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493279/CLIENTES_5_kqa6js.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493282/CLIENTES_7_lgx0m7.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493280/CLIENTES_6_tuwp35.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493283/CLIENTES_8_r7fvpg.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493282/CLIENTES_9_qonfcx.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493283/CLIENTES_10_tvqitg.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493284/CLIENTES_11_cjvqba.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493285/CLIENTES_12_lualpy.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493435/CLIENTES_13_nyi4v4.png",
  "https://res.cloudinary.com/dp01xnzyp/image/upload/v1774493436/CLIENTES_14_fxc5ib.png",
];

function ClientsLogosSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [centerIndices, setCenterIndices] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Generate particles only on client side
  const [particles] = useState<{ left: number; top: number; delay: number; duration: number; opacity: number }[]>(() =>
    [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const updateCenterIndices = () => {
      if (!carouselRef.current || !viewportRef.current) return;

      const viewport = viewportRef.current;
      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;

      const items = carouselRef.current.querySelectorAll('.logo-item');
      const distances: { index: number; distance: number }[] = [];

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(viewportCenter - itemCenter);
        distances.push({ index, distance });
      });

      // Sort by distance and get the 3 closest (PC) or 1 closest (mobile)
      distances.sort((a, b) => a.distance - b.distance);
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 1 : 3;
      const newCenterIndices = new Set(distances.slice(0, count).map(d => d.index));
      
      setCenterIndices(prev => {
        // Only update if changed to avoid unnecessary re-renders
        if (prev.size !== newCenterIndices.size || [...prev].some(i => !newCenterIndices.has(i))) {
          return newCenterIndices;
        }
        return prev;
      });
    };

    // Update positions at 60fps
    let animationId: number;
    const animate = () => {
      updateCenterIndices();
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 overflow-hidden relative">
      {/* Base blue gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #0a1628 0%,
              #0c1a30 30%,
              #0a1628 70%,
              #081420 100%
            )
          `
        }}
      />

      {/* Blue tone overlay with depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, 
              rgba(0, 80, 180, 0.12) 0%, 
              rgba(0, 60, 140, 0.08) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Deep space gradient from edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, 
              transparent 0%, 
              transparent 30%, 
              rgba(8, 16, 32, 0.4) 50%, 
              rgba(6, 12, 28, 0.6) 70%, 
              rgba(4, 10, 24, 0.8) 100%
            )
          `
        }}
      />

      {/* Animated particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00A3FF] rounded-full animate-float-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <p className="text-[#8A8A8A] text-sm font-medium tracking-wide uppercase font-['Poppins']">
            Empresas que confiam na Connect
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logos-carousel {
          animation: scrollLogos 18s linear infinite;
        }
        /* Removed hover pause - always running */
        .logo-item {
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
      `}</style>

      {/* Infinite carousel container */}
      <div ref={viewportRef} className="relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a1628] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a1628] to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <div ref={carouselRef} className="logos-carousel flex gap-8 items-center whitespace-nowrap" style={{ width: 'fit-content' }}>
          {/* Duplicate the logos array for seamless loop */}
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => {
            const isCenter = centerIndices.has(index);
            return (
              <div
                key={index}
                className="logo-item flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-[#151d2e]/50 border border-[#2a3a50]/50"
                style={{
                  filter: isCenter ? 'grayscale(0)' : 'grayscale(1)',
                  opacity: isCenter ? 1 : 0.7,
                }}
              >
                <img
                  src={logo}
                  alt={`Cliente ${index + 1}`}
                  className="h-12 w-auto object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [mounted, setMounted] = useState(false);

  // Target values for counting animation
  const targetValues = [150, 5, 999]; // 999 represents R$999k
  const suffixes = ["+", "", "k+"];

  // Generate particles only on client side
  const [particles] = useState<{ left: number; top: number; delay: number; duration: number; opacity: number }[]>(() =>
    [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("stats-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 3000; // 3 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounts(
        targetValues.map((target) => Math.floor(target * easeOutQuart))
      );

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targetValues);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatValue = (count: number, index: number) => {
    if (index === 2) {
      return `R$${count}${suffixes[index]}`;
    }
    return `${count}${suffixes[index]}`;
  };

  return (
    <section id="stats-section" className="relative overflow-hidden">
      {/* Base blue gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #081420 0%,
              #0a1628 30%,
              #0c1a30 50%,
              #0a1628 70%,
              #081420 100%
            )
          `
        }}
      />

      {/* Blue tone overlay with depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 50%, 
              rgba(0, 100, 200, 0.1) 0%, 
              rgba(0, 80, 180, 0.06) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Deep space gradient from edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, 
              transparent 0%, 
              transparent 30%, 
              rgba(8, 16, 32, 0.4) 50%, 
              rgba(6, 12, 28, 0.6) 70%, 
              rgba(4, 10, 24, 0.8) 100%
            )
          `
        }}
      />

      {/* Animated particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00A3FF] rounded-full animate-float-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
        <div className="grid grid-cols-3 gap-2 sm:gap-8 lg:gap-12">
          {STATS_LABELS.map((label, index) => (
            <div key={index} className="text-center flex flex-col items-center justify-center">
              <div className="text-xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 font-['Poppins'] whitespace-nowrap bg-gradient-to-r from-[#00A3FF] via-[#00D4FF] to-[#99DDFF] bg-clip-text text-transparent">
                {formatValue(counts[index], index)}
              </div>
              <div className="text-[#C0C0C0] text-[10px] sm:text-sm lg:text-base font-['Roboto'] leading-tight px-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Unified background wrapper for Pain and Process sections
function PainProcessWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-[#000000] overflow-hidden">
      {/* Unified diagonal gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              #000000 0%,
              #000000 15%,
              #001122 30%,
              #002244 45%,
              #003366 55%,
              #004488 65%,
              #0055aa 75%,
              #0066cc 85%,
              #0077dd 92%,
              #0088ee 100%
            )
          `
        }}
      />
      
      {/* Radial glow overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 90% 80%,
              rgba(0, 136, 238, 0.3) 0%,
              rgba(0, 102, 204, 0.15) 30%,
              transparent 60%
            )
          `
        }}
      />
      
      {/* Light streak effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              315deg,
              transparent 0%,
              transparent 40%,
              rgba(0, 136, 238, 0.12) 50%,
              transparent 60%,
              transparent 100%
            )
          `
        }}
      />
      
      {/* Vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 50%, 
              transparent 0%, 
              transparent 40%, 
              rgba(0, 0, 0, 0.3) 70%, 
              rgba(0, 0, 0, 0.6) 90%,
              rgba(0, 0, 0, 0.9) 100%
            )
          `
        }}
      />
      
      {children}
    </div>
  );
}

function PainSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-['Poppins']">
            Você trabalha duro, mas seu negócio ainda não tem o destaque que merece?
          </h2>

          <p className="text-base sm:text-lg text-[#C0C0C0] mb-8 sm:mb-10 font-['Roboto']">
            Muitos empreendedores chegam até nós com a mesma história:
          </p>

          <div className="grid gap-3 sm:gap-4 mb-8 sm:mb-10">
            {PAINS.map((pain, index) => (
              <div
                key={index}
                tabIndex={0}
                className="touch-card group flex items-center gap-3 bg-[#151d2e]/80 border border-[#2a3a50] rounded-lg px-4 sm:px-6 py-4 sm:py-5 hover:border-[#00A3FF]/50 hover:shadow-[0_0_30px_rgba(0,163,255,0.15)] transition-all"
              >
                <div className="w-8 h-8 rounded bg-[#1a2538] flex items-center justify-center flex-shrink-0 border border-[#2a3a50]">
                  <span className="text-[#00A3FF] text-sm font-bold font-['Poppins']">{index + 1}</span>
                </div>
                <span className="text-[#E5E5E5] text-left text-sm sm:text-base font-['Roboto']">{pain}</span>
              </div>
            ))}
          </div>

          <p className="text-base sm:text-lg text-white mb-4 sm:mb-6 font-medium font-['Poppins']">
            Se você se identificou com pelo menos um desses pontos, <span className="text-[#99DDFF]">você está no lugar certo</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

// Individual Process Card Component with scanner effect
function ProcessCard({ step, index }: { step: typeof PROCESS_STEPS[0]; index: number }) {
  const [isScanning, setIsScanning] = useState(false);

  const handleMouseEnter = () => {
    setIsScanning(true);
  };

  // Reset scanning state after animation completes (2s)
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  return (
    <div
      className="process-card group relative"
      onMouseEnter={handleMouseEnter}
    >
      <div 
        className="relative bg-gradient-to-b from-[#151d2e] to-[#111827] rounded-2xl p-6 lg:p-8 h-full border border-[#2a3a50]/50 group-hover:border-[#00A3FF]/30 transition-all duration-500 overflow-hidden card-3d"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Scan line effect - completes even if mouse leaves */}
        <div 
          className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent pointer-events-none z-10 ${isScanning ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            boxShadow: '0 0 10px 2px rgba(0,163,255,0.5), 0 0 20px 4px rgba(0,163,255,0.3)',
            animation: isScanning ? 'scanLine 2s linear forwards' : 'none',
          }}
        />
        
        {/* Big background number */}
        <div className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none select-none font-['Poppins']">
          {step.number}
        </div>

        {/* Icon with glow effect */}
        <div className="relative mb-6">
          <div 
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A3FF] to-[#0066FF] flex items-center justify-center icon-glow icon-float group-hover:scale-110 transition-transform duration-300"
            style={{ animationDelay: `${0.3 + index * 0.15}s, 3s ease-in-out infinite` }}
          >
            <step.icon className="h-8 w-8 text-white icon-bounce" strokeWidth={1.5} style={{ animationDelay: `${0.2 + index * 0.15}s` }} />
          </div>
          {/* Ring effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#00A3FF]/30 scale-125 group-hover:scale-150 group-hover:border-[#00A3FF]/50 transition-all duration-500" />
        </div>

        {/* Step number badge */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-[#00A3FF] bg-[#00A3FF]/10 px-3 py-1 rounded-full border border-[#00A3FF]/30 font-['Poppins']">
            PASSO {step.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 font-['Poppins'] group-hover:text-[#00A3FF] transition-colors duration-300">{step.title}</h3>

        {/* Description */}
        <p className="text-[#A0A0A0] leading-relaxed font-['Roboto'] text-sm">{step.description}</p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

function ProcessSection() {
  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto rotation - pauses when hovering or dragging
  useEffect(() => {
    if (!isHovering && !isDragging) {
      autoRotateInterval.current = setInterval(() => {
        setRotation(prev => prev - 0.6);
      }, 30);
    }
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, [isHovering, isDragging]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastX;
    setRotation(prev => prev + deltaX * 0.15);
    setLastX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, lastX]);

  return (
    <section
      id="como-funciona"
      className="py-12 sm:py-16 lg:py-24 relative"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <p className="text-[#00A3FF] text-sm font-bold tracking-widest uppercase mb-4 font-['Poppins']">Como Funciona</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 font-['Poppins']">
            Do diagnóstico ao crescimento real. <span className="text-[#99DDFF]">Sem enrolação</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#C0C0C0] max-w-2xl mx-auto font-['Roboto']">
            Com a Connect, o processo é 100% transparente, prático e focado em resultados que realmente escalam o seu negócio.
          </p>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(0,163,255,0.4), 0 0 40px rgba(0,163,255,0.2); }
            50% { box-shadow: 0 0 30px rgba(0,163,255,0.6), 0 0 60px rgba(0,163,255,0.3); }
          }
          @keyframes flowLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes borderGlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          @keyframes fillLine {
            from { height: 0%; }
            to { height: 100%; }
          }
          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 10px rgba(0,163,255,0.5), 0 0 20px rgba(0,163,255,0.3); }
            50% { box-shadow: 0 0 20px rgba(0,163,255,0.8), 0 0 40px rgba(0,163,255,0.5); }
          }
          @keyframes dotPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.8; }
          }
          @keyframes scanLine {
            0% { top: -10%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
          }
          @keyframes iconBounce {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(10deg); }
            70% { transform: scale(0.9) rotate(-5deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes iconFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes centerGlow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          .process-card {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
          .process-card:nth-child(1) { animation-delay: 0.1s; }
          .process-card:nth-child(2) { animation-delay: 0.2s; }
          .process-card:nth-child(3) { animation-delay: 0.3s; }
          .process-card:nth-child(4) { animation-delay: 0.4s; }
          .icon-glow {
            animation: pulseGlow 3s ease-in-out infinite;
          }
          .icon-bounce {
            animation: iconBounce 0.8s ease-out forwards;
            transform-origin: center;
          }
          .icon-float {
            animation: iconFloat 3s ease-in-out infinite;
          }
          .timeline-dot {
            animation: dotPulse 2s ease-in-out infinite;
          }
          .timeline-dot-glow {
            animation: glowPulse 2s ease-in-out infinite;
          }
          .carousel-card {
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
          }
          .carousel-container {
            transition: transform 0.1s linear;
          }
          .center-glow {
            animation: centerGlow 3s ease-in-out infinite;
          }
        `}</style>

        {/* Desktop 3D Carousel */}
        <div className="hidden lg:block">
          <div 
            className="relative h-[500px] w-full cursor-grab"
            style={{ perspective: '1200px' }}
            onMouseDown={handleMouseDown}
          >
            {/* Center glow effect */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full center-glow"
              style={{
                background: 'radial-gradient(circle, rgba(0,163,255,0.4) 0%, rgba(0,163,255,0.1) 40%, transparent 70%)',
                boxShadow: '0 0 60px 20px rgba(0,163,255,0.2)',
              }}
            />
            
            {/* Carousel container */}
            <div
              className="carousel-container absolute left-1/2 top-1/2"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
              }}
            >
              {PROCESS_STEPS.map((step, index) => {
                const angle = (index * 90); // 360 / 4 = 90 degrees apart
                const radius = 200; // Distance from center
                
                return (
                  <div
                    key={index}
                    className="carousel-card absolute w-72"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      left: '-144px', // Half of card width to center
                      top: '-160px', // Half of card height to center
                    }}
                  >
                    <div 
                      className="relative bg-gradient-to-b from-[#151d2e] to-[#111827] rounded-2xl p-6 h-80 border border-[#2a3a50]/50 hover:border-[#00A3FF]/50 transition-all duration-500 overflow-hidden"
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,163,255,0.1)',
                      }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {/* Big background number */}
                      <div className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none select-none font-['Poppins']">
                        {step.number}
                      </div>

                      {/* Icon with glow effect */}
                      <div className="relative mb-6">
                        <div 
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A3FF] to-[#0066FF] flex items-center justify-center icon-glow"
                        >
                          <step.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Step number badge */}
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-[#00A3FF] bg-[#00A3FF]/10 px-3 py-1 rounded-full border border-[#00A3FF]/30 font-['Poppins']">
                          PASSO {step.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 font-['Poppins'] group-hover:text-[#00A3FF] transition-colors duration-300">{step.title}</h3>

                      {/* Description */}
                      <p className="text-[#A0A0A0] leading-relaxed font-['Roboto'] text-sm">{step.description}</p>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#00A3FF]/30 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline - Hidden on desktop */}
        <div className="lg:hidden relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00A3FF]/50 via-[#00A3FF]/30 to-[#00A3FF]/10">
            {/* Animated glow line */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 rounded-full"
              style={{
                background: 'linear-gradient(to bottom, transparent, #00A3FF, transparent)',
                animation: 'fillLine 3s ease-in-out infinite alternate',
              }}
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-6">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={index}
                className="process-card relative pl-16"
              >
                {/* Timeline Node */}
                <div className="absolute left-0 top-6 flex flex-col items-center">
                  {/* Outer glow ring */}
                  <div className="absolute w-12 h-12 rounded-full bg-[#00A3FF]/20 timeline-dot-glow" />
                  {/* Node circle */}
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#00A3FF] to-[#0066FF] flex items-center justify-center timeline-dot z-10">
                    <step.icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>
                  {/* Connector to card */}
                  <div className="w-8 h-[2px] bg-gradient-to-r from-[#00A3FF] to-transparent absolute left-12 top-1/2 -translate-y-1/2" />
                </div>

                {/* Card content */}
                <div className="relative bg-gradient-to-b from-[#151d2e]/90 to-[#111827]/90 backdrop-blur-sm rounded-2xl p-5 border border-[#2a3a50]/50 hover:border-[#00A3FF]/30 transition-all duration-300">
                  {/* Big background number */}
                  <div className="absolute -top-2 -right-1 text-[80px] font-black text-white/[0.03] leading-none pointer-events-none select-none font-['Poppins']">
                    {step.number}
                  </div>

                  {/* Step number badge */}
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#00A3FF] bg-[#00A3FF]/10 px-3 py-1 rounded-full border border-[#00A3FF]/30 font-['Poppins']">
                      PASSO {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">{step.title}</h3>

                  {/* Description */}
                  <p className="text-[#A0A0A0] leading-relaxed font-['Roboto'] text-sm">{step.description}</p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-[#00A3FF]/30 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00A3FF] to-[#0066FF] text-white font-semibold font-['Poppins'] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all duration-300 hover:scale-105"
          >
            Começar meu diagnóstico
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Scroll-jacking effect - cards stack as you scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Section enters viewport
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        // Calculate progress (0 to 1)
        const scrollableHeight = rect.height - windowHeight;
        const scrolled = Math.abs(rect.top);
        const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate card positions based on scroll progress
  const totalCards = SERVICES.length;
  const progressPerCard = 1 / totalCards;

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="relative"
      style={{ height: `${totalCards * 100 + 100}vh` }}
    >
      {/* Base blue gradient background - same as Hero */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #0a1628 0%,
              #0c1a30 20%,
              #0e1e38 40%,
              #0c1a30 60%,
              #081420 80%,
              #0a1628 100%
            )
          `
        }}
      />

      {/* Blue tone overlay with depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, 
              rgba(0, 80, 180, 0.15) 0%, 
              rgba(0, 60, 140, 0.1) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Deep space gradient from edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, 
              transparent 0%, 
              transparent 30%, 
              rgba(8, 16, 32, 0.5) 50%, 
              rgba(6, 12, 28, 0.7) 70%, 
              rgba(4, 10, 24, 0.9) 85%,
              rgba(2, 8, 20, 0.98) 100%
            )
          `
        }}
      />

      {/* Atmospheric blue glow from bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 150% 60% at 50% 100%, 
              rgba(0, 100, 200, 0.2) 0%, 
              rgba(0, 80, 180, 0.1) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Glowing orbs with enhanced blue tones */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#0066FF]/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0088FF]/8 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[120px]" />

      {/* Sticky container - stays fixed while scrolling through section */}
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          {/* Header */}
          <div className="text-center pt-12 sm:pt-16 pb-6 sm:pb-8">
            <p className="text-[#00A3FF] text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 font-['Poppins']">Serviços</p>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 font-['Poppins']">
              Tudo que o seu negócio precisa para <span className="text-[#99DDFF]">atrair mais clientes</span>
            </h2>
            
          </div>

          {/* Cards Container */}
          <div className="flex-1 relative flex items-center justify-center">
            <div className="relative w-full max-w-4xl">
              {SERVICES.map((service, index) => {
                // Calculate when this card should appear
                const cardStart = index * progressPerCard;
                const cardEnd = (index + 1) * progressPerCard;
                
                // Card visibility and position
                const isVisible = scrollProgress >= cardStart;
                const isFullyVisible = scrollProgress >= cardEnd;
                
                // Calculate translateY for stacking effect
                // Cards slide up from bottom, then stack
                const stackOffset = 35; // pixels between stacked cards
                const cardProgress = Math.min(1, Math.max(0, (scrollProgress - cardStart) / progressPerCard));
                
                // Initial position: off-screen bottom
                // Final position: stacked with offset - positioned higher
                const initialY = 350; // starts below viewport
                const finalY = index * stackOffset - 280; // negative to position higher
                const translateY = isVisible 
                  ? initialY - (initialY - finalY) * easeOutCubic(cardProgress)
                  : initialY;
                
                // Opacity fade in
                const opacity = isVisible ? Math.min(1, cardProgress * 2) : 0;
                
                // Scale slightly
                const scale = isVisible ? 1 - (index * 0.02) : 0.9;

                return (
                  <div
                    key={index}
                    className="absolute w-full"
                    style={{
                      zIndex: index + 1,
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity: opacity,
                      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                    }}
                  >
                    <div
                      className="touch-card service-card-touch group relative w-full h-[280px] md:h-[320px] rounded-2xl border border-[#2a3a50] overflow-hidden transition-all duration-300"
                    >
                      <Image
                        src={isDesktop && service.imageDesktop ? service.imageDesktop : service.image}
                        alt={service.title}
                        fill
                        className="object-cover brightness-150 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-[#00A3FF]/0 transition-all duration-300 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/60 to-transparent" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-['Poppins'] drop-shadow-lg">{service.title}</h3>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed font-['Roboto']">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Easing function
function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function DifferentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const pageCenterX = window.innerWidth / 2;
    const pageCenterY = window.innerHeight / 2;

    // Calculate rotation towards page center
    const maxRotation = 15;
    const rotateY = ((cardCenterX - pageCenterX) / pageCenterX) * -maxRotation;
    const rotateX = ((cardCenterY - pageCenterY) / pageCenterY) * maxRotation;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="bg-[#0c1222] py-12 sm:py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1222] via-[#0a1830] to-[#082840]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,163,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,163,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating glow orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A3FF]/25 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0066FF]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00A3FF]/15 rounded-full blur-[150px]" />

      {/* Cursor follow glow light - hidden on touch devices */}
      <div
        className="cursor-glow-effect pointer-events-none absolute w-96 h-96 rounded-full transition-transform duration-75 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(0,163,255,0.25) 0%, rgba(0,163,255,0.1) 40%, transparent 70%)',
          transform: `translate(${mousePos.x - 192}px, ${mousePos.y - 192}px)`,
          zIndex: 1,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <p className="text-[#00A3FF] text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 font-['Poppins']">Diferenciais</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 font-['Poppins']">
            A Connect não é mais uma agência. É a sua <span className="text-[#99DDFF]">parceira de crescimento</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {DIFFERENTIALS.map((diff, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              tabIndex={0}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              className="touch-card group relative bg-gradient-to-b from-[#151d2e] to-[#0c1222] border border-[#2a3a50] rounded-xl p-5 sm:p-6 lg:p-8 hover:border-[#00A3FF]/50 hover:shadow-[0_0_40px_rgba(0,163,255,0.25)] transition-all duration-300 overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div className="relative flex items-start gap-4" style={{ transform: 'translateZ(20px)' }}>
                <div className="w-12 h-12 rounded-lg bg-[#00A3FF] flex items-center justify-center flex-shrink-0">
                  <diff.icon className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 font-['Poppins'] group-hover:text-[#00A3FF] transition-colors">{diff.title}</h3>
                  <p className="text-[#C0C0C0] leading-relaxed font-['Roboto']">{diff.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  // Split testimonials into 3 columns
  const column1 = TESTIMONIALS.slice(0, 3);
  const column2 = TESTIMONIALS.slice(3, 6);
  const column3 = TESTIMONIALS.slice(6, 9);

  return (
    <section className="py-12 sm:py-16 lg:py-24 overflow-hidden relative">
      {/* Base blue gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #0a1628 0%,
              #0c1a30 30%,
              #0e1e38 50%,
              #0c1a30 70%,
              #081420 100%
            )
          `
        }}
      />

      {/* Blue tone overlay with depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, 
              rgba(0, 80, 180, 0.12) 0%, 
              rgba(0, 60, 140, 0.08) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Deep space gradient from edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, 
              transparent 0%, 
              transparent 30%, 
              rgba(8, 16, 32, 0.4) 50%, 
              rgba(6, 12, 28, 0.6) 70%, 
              rgba(4, 10, 24, 0.8) 100%
            )
          `
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <span className="text-sm font-medium text-[#00A3FF] font-['Poppins']">Depoimentos</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-white font-['Poppins']">
            Quem trabalha com a Connect, <span className="text-[#99DDFF]">recomenda</span>.
          </h2>

          {/* Rating badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 border-white/10 bg-white/5">
            <span className="inline-flex items-center -space-x-2">
              {TESTIMONIALS.slice(0, 4).map((t, i) => (
                <img 
                  key={i}
                  className="h-6 w-6 rounded-full ring-2 object-cover ring-[#0c1222]" 
                  src={t.avatar} 
                  alt={t.name}
                />
              ))}
            </span>
            <span className="ml-2 inline-flex items-center gap-1 text-sm text-neutral-300 font-['Roboto']">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="ml-1">5.0/5 • 150+ reviews</span>
            </span>
          </div>
        </div>

        {/* Scroll animation styles */}
        <style>{`
          @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-33.33%); }
          }
          @keyframes scrollDown {
            0% { transform: translateY(-33.33%); }
            100% { transform: translateY(0); }
          }
          [data-scroll-column="1"] { animation: scrollUp 15s linear infinite; }
          [data-scroll-column="2"] { animation: scrollDown 15s linear infinite; }
          [data-scroll-column="3"] { animation: scrollUp 15s linear infinite; }
          /* Removed hover pause - always running */
        `}</style>

        {/* Testimonials grid */}
        <div
          className="grid grid-cols-1 overflow-hidden md:grid-cols-3 gap-x-6 gap-y-6"
          style={{
            maxHeight: '700px',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 5%, black 95%, transparent 100%)'
          }}
        >
          {/* Column 1 - Scroll Up */}
          <div className="overflow-hidden">
            <div data-scroll-column="1" className="space-y-6">
              {[...column1, ...column1].map((testimonial, index) => (
                <article
                  key={index}
                  tabIndex={0}
                  className="touch-card rounded-2xl border p-5 sm:p-6 border-white/10 bg-[#151d2e]/90 hover:border-[#00A3FF]/30 transition-colors"
                >
                  <blockquote className="text-sm sm:text-base text-neutral-100 font-['Roboto']">
                    <span className="inline-flex items-start gap-2">
                      <Quote className="w-4 h-4 text-[#00A3FF]/50 flex-shrink-0 mt-1" />
                      <span>{testimonial.text}</span>
                    </span>
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <img 
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10" 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                    />
                    <div>
                      <div className="text-sm font-medium text-white font-['Poppins']">{testimonial.name}</div>
                      <div className="text-xs text-neutral-400 font-['Roboto']">{testimonial.role} • {testimonial.company}</div>
                      <div className="text-xs text-[#00A3FF] font-['Roboto']">{testimonial.location}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Column 2 - Scroll Down */}
          <div className="overflow-hidden">
            <div data-scroll-column="2" className="space-y-6">
              {[...column2, ...column2].map((testimonial, index) => (
                <article
                  key={index}
                  tabIndex={0}
                  className="touch-card rounded-2xl border p-5 sm:p-6 border-white/10 bg-[#151d2e]/90 hover:border-[#00A3FF]/30 transition-colors"
                >
                  <blockquote className="text-sm sm:text-base text-neutral-100 font-['Roboto']">
                    <span className="inline-flex items-start gap-2">
                      <Quote className="w-4 h-4 text-[#00A3FF]/50 flex-shrink-0 mt-1" />
                      <span>{testimonial.text}</span>
                    </span>
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <img 
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10" 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                    />
                    <div>
                      <div className="text-sm font-medium text-white font-['Poppins']">{testimonial.name}</div>
                      <div className="text-xs text-neutral-400 font-['Roboto']">{testimonial.role} • {testimonial.company}</div>
                      <div className="text-xs text-[#00A3FF] font-['Roboto']">{testimonial.location}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Column 3 - Scroll Up */}
          <div className="overflow-hidden">
            <div data-scroll-column="3" className="space-y-6">
              {[...column3, ...column3].map((testimonial, index) => (
                <article
                  key={index}
                  tabIndex={0}
                  className="touch-card rounded-2xl border p-5 sm:p-6 border-white/10 bg-[#151d2e]/90 hover:border-[#00A3FF]/30 transition-colors"
                >
                  <blockquote className="text-sm sm:text-base text-neutral-100 font-['Roboto']">
                    <span className="inline-flex items-start gap-2">
                      <Quote className="w-4 h-4 text-[#00A3FF]/50 flex-shrink-0 mt-1" />
                      <span>{testimonial.text}</span>
                    </span>
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <img 
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10" 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                    />
                    <div>
                      <div className="text-sm font-medium text-white font-['Poppins']">{testimonial.name}</div>
                      <div className="text-xs text-neutral-400 font-['Roboto']">{testimonial.role} • {testimonial.company}</div>
                      <div className="text-xs text-[#00A3FF] font-['Roboto']">{testimonial.location}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when section enters viewport, 1 when it leaves
      const totalScrollDistance = rect.height - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate visibility for each element based on scroll progress
  const getVisibility = (threshold: number) => {
    return scrollProgress >= threshold ? 1 : 0;
  };

  const getTransform = (threshold: number) => {
    const visible = scrollProgress >= threshold;
    return visible ? 'translateY(0)' : 'translateY(60px)';
  };

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <section id="quem-somos" className="h-full flex items-center justify-center relative overflow-hidden">
          {/* Base blue gradient background */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  #0a1628 0%,
                  #0c1a30 20%,
                  #0e1e38 40%,
                  #0c1a30 60%,
                  #081420 80%,
                  #0a1628 100%
                )
              `
            }}
          />

          {/* Blue tone overlay with depth */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 120% 100% at 50% 0%, 
                  rgba(0, 80, 180, 0.15) 0%, 
                  rgba(0, 60, 140, 0.1) 30%, 
                  transparent 60%
                )
              `
            }}
          />

          {/* Deep space gradient from edges */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 70% at 50% 50%, 
                  transparent 0%, 
                  transparent 30%, 
                  rgba(8, 16, 32, 0.5) 50%, 
                  rgba(6, 12, 28, 0.7) 70%, 
                  rgba(4, 10, 24, 0.9) 85%,
                  rgba(2, 8, 20, 0.98) 100%
                )
              `
            }}
          />

          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/dp01xnzyp/image/upload/v1774483643/equipe.png"
              alt="Equipe Connect"
              className="w-full h-full object-cover opacity-30 md:object-center object-[25%_center]"
              style={{
                transform: `scale(1.1) translateY(${scrollProgress * 5}%)`,
              }}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-transparent to-[#0c1222]/50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl mx-auto text-center">
              {/* Label */}
              <p
                className="text-[#00A3FF] text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 font-['Poppins'] transition-all duration-700"
                style={{
                  opacity: getVisibility(0.05),
                  transform: getTransform(0.05),
                }}
              >
                Quem Somos
              </p>

              {/* Title */}
              <h2
                className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 font-['Poppins'] transition-all duration-700"
                style={{
                  opacity: getVisibility(0.1),
                  transform: getTransform(0.1),
                }}
              >
                Somos a Connect.
              </h2>

              {/* Paragraph 1 */}
              <p
                className="text-base sm:text-lg text-[#C0C0C0] leading-relaxed font-['Roboto'] mb-5 sm:mb-6 transition-all duration-700"
                style={{
                  opacity: getVisibility(0.25),
                  transform: getTransform(0.25),
                }}
              >
                Nascemos para resolver um problema real:
                empreendedores com grandes sonhos que trabalham com garra todos os dias…
                mas sentem que o negócio está travado e não entrega o resultado que merecem.
              </p>

              {/* Paragraph 2 */}
              <p
                className="text-base sm:text-lg text-[#C0C0C0] leading-relaxed font-['Roboto'] mb-5 sm:mb-6 transition-all duration-700"
                style={{
                  opacity: getVisibility(0.45),
                  transform: getTransform(0.45),
                }}
              >
                Unimos criatividade, análise de mercado e proximidade com o cliente para construir estratégias que realmente funcionam — seja para o pequeno negócio que está crescendo no Brasil, seja para o empreendedor brasileiro que está construindo algo novo do outro lado do mundo.
              </p>

              {/* Final phrase */}
              <p
                className="text-white font-semibold text-lg sm:text-xl font-['Poppins'] mb-8 sm:mb-10 transition-all duration-700"
                style={{
                  opacity: getVisibility(0.65),
                  transform: getTransform(0.65),
                }}
              >
                Aqui não vendemos pacotes.<br />
                <span className="text-[#99DDFF]">Construímos parcerias de verdade</span>.
              </p>

              {/* Button */}
              <div
                className="transition-all duration-700"
                style={{
                  opacity: getVisibility(0.8),
                  transform: getTransform(0.8),
                }}
              >
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-[#2a3a50] text-white hover:bg-[#00A3FF]/10 hover:border-[#00A3FF] hover:text-white font-['Poppins'] transition-all duration-300"
                >
                  Fale com a nossa equipe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>

              {/* Scroll indicator */}
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
                style={{
                  opacity: scrollProgress < 0.1 ? 1 : scrollProgress > 0.85 ? 1 - ((scrollProgress - 0.85) / 0.15) : 0,
                }}
              >
                <div className="flex flex-col items-center gap-2 text-[#00A3FF]/50">
                  <span className="text-xs uppercase tracking-widest font-['Poppins']">
                    {scrollProgress < 0.1 ? 'Role para descobrir' : 'Continue rolando'}
                  </span>
                  <div className="w-6 h-10 rounded-full border-2 border-[#00A3FF]/30 flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-[#00A3FF]/50 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="bg-[#0c1222] py-12 sm:py-16 lg:py-24 relative overflow-hidden">

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1222] via-[#0a1830] to-[#082840]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,163,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,163,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating glow orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A3FF]/25 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0066FF]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00A3FF]/15 rounded-full blur-[150px]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <p className="text-[#00A3FF] text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 font-['Poppins']">FAQ</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 font-['Poppins']">
            Ficou alguma dúvida?
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="touch-card bg-[#151d2e]/80 backdrop-blur-sm border border-[#2a3a50] rounded-lg px-4 sm:px-6 data-[state=open]:border-[#00A3FF]/50 data-[state=open]:shadow-[0_0_30px_rgba(0,163,255,0.15)] transition-all"
            >
              <AccordionTrigger className="text-left text-white font-semibold hover:text-[#00A3FF] py-4 sm:py-5 text-sm sm:text-base font-['Poppins']">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#C0C0C0] leading-relaxed pb-4 font-['Roboto']">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    company: "",
    challenge: "",
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Wave animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const noise = new Noise(Math.random() * 1000);
    
    interface Point {
      x: number;
      y: number;
      wave: { x: number; y: number };
      cursor: { x: number; y: number; vx: number; vy: number };
    }

    let lines: Point[][] = [];
    let mouse = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false };
    let frameId: number;

    const config = {
      lineColor: 'rgba(0, 163, 255, 0.3)',
      waveSpeedX: 0.008,
      waveSpeedY: 0.003,
      waveAmpX: 24,
      waveAmpY: 12,
      friction: 0.92,
      tension: 0.004,
      maxCursorMove: 80,
      xGap: 12,
      yGap: 24
    };

    function setSize() {
      const section = sectionRef.current;
      if (!section) return;
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }

    function setLines() {
      lines = [];
      const oWidth = canvas.width + 200, oHeight = canvas.height + 30;
      const totalLines = Math.ceil(oWidth / config.xGap);
      const totalPoints = Math.ceil(oHeight / config.yGap);
      const xStart = (canvas.width - config.xGap * totalLines) / 2;
      const yStart = (canvas.height - config.yGap * totalPoints) / 2;

      for (let i = 0; i <= totalLines; i++) {
        const pts: Point[] = [];
        for (let j = 0; j <= totalPoints; j++) {
          pts.push({
            x: xStart + config.xGap * i,
            y: yStart + config.yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          });
        }
        lines.push(pts);
      }
    }

    function movePoints(time: number) {
      lines.forEach((pts) => {
        pts.forEach((p) => {
          const move = noise.perlin2(
            (p.x + time * config.waveSpeedX) * 0.002,
            (p.y + time * config.waveSpeedY) * 0.0015
          ) * 12;
          p.wave.x = Math.cos(move) * config.waveAmpX;
          p.wave.y = Math.sin(move) * config.waveAmpY;

          const dx = p.x - mouse.sx, dy = p.y - mouse.sy;
          const dist = Math.hypot(dx, dy), l = Math.max(150, mouse.vs);
          if (dist < l) {
            const s = 1 - dist / l;
            const f = Math.cos(dist * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.0004;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.0004;
          }
          p.cursor.vx += (0 - p.cursor.x) * config.tension;
          p.cursor.vy += (0 - p.cursor.y) * config.tension;
          p.cursor.vx *= config.friction;
          p.cursor.vy *= config.friction;
          p.cursor.x += p.cursor.vx * 2;
          p.cursor.y += p.cursor.vy * 2;
          p.cursor.x = Math.min(config.maxCursorMove, Math.max(-config.maxCursorMove, p.cursor.x));
          p.cursor.y = Math.min(config.maxCursorMove, Math.max(-config.maxCursorMove, p.cursor.y));
        });
      });
    }

    function moved(point: Point, withCursor: boolean = true) {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    }

    function drawLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = config.lineColor;
      ctx.lineWidth = 1;

      lines.forEach((points) => {
        let p1 = moved(points[0], false);
        ctx.moveTo(p1.x, p1.y);
        points.forEach((p, idx) => {
          const isLast = idx === points.length - 1;
          p1 = moved(p, !isLast);
          const p2 = moved(points[idx + 1] || points[points.length - 1], !isLast);
          ctx.lineTo(p1.x, p1.y);
          if (isLast) ctx.moveTo(p2.x, p2.y);
        });
      });
      ctx.stroke();
    }

    function tick(t: number) {
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx, dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(80, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);
      movePoints(t);
      drawLines();
      frameId = requestAnimationFrame(tick);
    }

    function updateMouse(x: number, y: number) {
      mouse.x = x;
      mouse.y = y;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    const handleResize = () => {
      setSize();
      setLines();
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        updateMouse(touch.clientX - rect.left, touch.clientY - rect.top);
      }
    };

    window.addEventListener('resize', handleResize);
    sectionRef.current?.addEventListener('mousemove', handleMouseMove as any);
    sectionRef.current?.addEventListener('touchmove', handleTouchMove);

    setSize();
    setLines();
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      sectionRef.current?.removeEventListener('mousemove', handleMouseMove as any);
      sectionRef.current?.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar e-mail via EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        company: formData.company || "Não informado",
        challenge: formData.challenge || "Não informado",
        date: new Date().toLocaleString("pt-BR"),
      };

      await emailjs.send(
        "service_hkqjs3g",
        "template_eib7w7g",
        templateParams,
        "HqnwwpwVRV8amCW5r"
      );

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Nossa equipe entrará em contato em breve.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        company: "",
        challenge: "",
      });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contato" className="bg-[#0c1222] py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1222] via-[#0a1830] to-[#082840]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,163,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,163,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating glow orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A3FF]/25 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0066FF]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00A3FF]/15 rounded-full blur-[150px]" />

      {/* Wave background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#00A3FF] text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 font-['Poppins']">Contato</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 font-['Poppins']">
              Pronto para conectar o seu negócio ao <span className="text-[#99DDFF]">próximo nível</span>?
            </h2>
            <p className="text-base sm:text-lg text-[#C0C0C0] font-['Roboto']">
              Preencha o formulário abaixo e nossa equipe entra em contato para um diagnóstico
              gratuito e sem compromisso.
            </p>
          </div>

          <Card className="bg-gradient-to-b from-[#151d2e] to-[#0c1222] border border-[#2a3a50]">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-['Poppins']">
                      Nome completo *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#0c1222] border-[#2a3a50] text-white focus:border-[#00A3FF] focus:ring-[#00A3FF] font-['Roboto']"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-['Poppins']">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#0c1222] border-[#2a3a50] text-white focus:border-[#00A3FF] focus:ring-[#00A3FF] font-['Roboto']"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-['Poppins']">
                      WhatsApp (com DDI) *
                    </Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#0c1222] border-[#2a3a50] text-white focus:border-[#00A3FF] focus:ring-[#00A3FF] font-['Roboto']"
                      placeholder="+55 11 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white font-['Poppins']">
                      País onde está localizado *
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger className="bg-[#0c1222] border-[#2a3a50] text-white focus:border-[#00A3FF] focus:ring-[#00A3FF] font-['Roboto']">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#151d2e] border-[#2a3a50]">
                        {COUNTRIES.map((country) => (
                          <SelectItem
                            key={country}
                            value={country}
                            className="text-white focus:bg-[#2a2a2a] focus:text-white font-['Roboto']"
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white font-['Poppins']">
                    Nome da empresa/@redes sociais
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-[#0c1222] border-[#2a3a50] text-white focus:border-[#00A3FF] focus:ring-[#00A3FF] font-['Roboto']"
                    placeholder="Nome da sua empresa ou @perfil"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenge" className="text-white font-['Poppins']">
                    Qual é o seu maior desafio hoje?
                  </Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="bg-[#0c1222] border-[#2a3a50] text-white focus:border-[#00A3FF] focus:ring-[#00A3FF] min-h-[100px] font-['Roboto']"
                    placeholder="Conte-nos sobre seus desafios..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(0,163,255,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(0,163,255,0.8)] transition-all duration-300 relative overflow-hidden text-sm font-semibold text-white tracking-tight bg-gradient-to-tr from-[#00A3FF] to-[#0066FF] border-2 rounded-full py-4 px-6 font-['Poppins'] hover:scale-105 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <span className="shine-effect absolute w-[100px] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent top-0 -left-[100px] opacity-60 pointer-events-none group-hover:animate-shine" />
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      Diagnóstico gratuito
                    </>
                  )}
                </button>

                <style>{`
                  @keyframes shine {
                    0% { left: -100px; }
                    60% { left: 100%; }
                    100% { left: 100%; }
                  }
                  .animate-shine {
                    animation: shine 1.5s ease-out infinite;
                  }
                `}</style>

                <div className="flex items-center justify-center gap-2 text-sm text-[#8A8A8A] font-['Roboto']">
                  <Shield className="h-4 w-4" />
                  <span>Seus dados estão seguros. Não enviamos spam.</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-[#1a2538]/50 overflow-hidden">
      {/* Base blue gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #081420 0%,
              #0a1628 30%,
              #0c1a30 50%,
              #0a1628 70%,
              #061018 100%
            )
          `
        }}
      />

      {/* Blue tone overlay with depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 100%, 
              rgba(0, 80, 180, 0.1) 0%, 
              rgba(0, 60, 140, 0.06) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Deep space gradient from edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, 
              transparent 0%, 
              transparent 30%, 
              rgba(8, 16, 32, 0.4) 50%, 
              rgba(6, 12, 28, 0.6) 70%, 
              rgba(4, 10, 24, 0.8) 100%
            )
          `
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1 - Identity */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <Image
                src="https://res.cloudinary.com/dp01xnzyp/image/upload/v1774485062/logo_connect_rbtylf.png"
                alt="Connect"
                width={320}
                height={109}
                className="h-16 sm:h-20 lg:h-24 w-auto"
                priority
              />
            </div>
            <p className="text-[#00A3FF] font-medium mb-2 text-sm sm:text-base font-['Poppins']">
              Transformamos conexões em resultados.
            </p>
            <p className="text-[#8A8A8A] text-xs sm:text-sm font-['Roboto']">
              Agência de marketing digital para empreendedores brasileiros no Brasil e no mundo.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base font-['Poppins']">Navegação rápida</h4>
            <nav className="space-y-1.5 sm:space-y-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#C0C0C0] hover:text-[#00A3FF] transition-colors font-['Roboto']"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 - Social */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base font-['Poppins']">Redes Sociais</h4>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/connect.agenciabr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#151d2e] flex items-center justify-center hover:bg-[#00A3FF] transition-colors group border border-[#2a3a50]"
              >
                <Instagram className="h-5 w-5 text-[#C0C0C0] group-hover:text-black" />
              </a>
              <a
                href="https://www.facebook.com/ConnectMarketingEUA/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#151d2e] flex items-center justify-center hover:bg-[#00A3FF] transition-colors group border border-[#2a3a50]"
              >
                <Facebook className="h-5 w-5 text-[#C0C0C0] group-hover:text-black" />
              </a>
              <a
                href="https://wa.me/message/C2GKBHZHLXMCI1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#151d2e] flex items-center justify-center hover:bg-[#00A3FF] transition-colors group border border-[#2a3a50]"
              >
                <svg className="h-5 w-5 text-[#C0C0C0] group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#C0C0C0] text-sm font-['Roboto']">
                <Mail className="h-4 w-4 text-[#00A3FF]" />
                <span>contato@connect.com.br</span>
              </div>
              <div className="flex items-center gap-2 text-[#C0C0C0] text-sm font-['Roboto']">
                <Phone className="h-4 w-4 text-[#00A3FF]" />
                <span>+55 51 99458-6458</span>
              </div>
              <div className="flex items-center gap-2 text-[#C0C0C0] text-sm font-['Roboto']">
                <MapPin className="h-4 w-4 text-[#00A3FF]" />
                <span>Brasil e Internacional</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a2538] mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-[#8A8A8A] text-sm font-['Roboto']">
            © {new Date().getFullYear()} Connect. Todos os direitos reservados. |{" "}
            <a href="#" className="hover:text-[#00A3FF] transition-colors">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/message/C2GKBHZHLXMCI1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 group"
      aria-label="Contato via WhatsApp"
    >
      <svg
        className="w-7 h-7 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {/* Pulse animation */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />
    </a>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function ConnectLandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0c1222]">
      <Header />
      <HeroSection />
      <ClientsLogosSection />
      <StatsSection />
      <PainProcessWrapper>
        <PainSection />
        <ProcessSection />
      </PainProcessWrapper>
      <ServicesSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
