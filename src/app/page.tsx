import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { GitHubCalendarBlock } from "@/components/github-calendar";
import { HackathonCard } from "@/components/hackathon-card";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getGithubProjects } from "@/data/github";
import { DATA } from "@/data/resume";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const firstName = DATA.name ? DATA.name.split(" ")[0] : "Rafael";
  const projects = await getGithubProjects();

  return (
    <main className="max-w-2xl mx-auto py-12 sm:py-24 px-6 flex flex-col min-h-dvh space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Olá, eu sou ${firstName} 👋`}
              />
              <BlurFadeText
                className="max-w-150 md:text-xl text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Link
                    href="/curriculo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium transition-transform active:scale-95 hover:opacity-90 shadow-xs"
                  >
                    <FileText className="size-4" />
                    Baixar Currículo
                  </Link>
                  <Link
                    href={`mailto:${DATA.contact.email}`}
                    className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <Mail className="size-4" />
                    Entrar em Contato
                  </Link>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials || "RM"}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">Sobre</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Experiência Profissional</h2>
          </BlurFade>
          {DATA.work?.map((work, id) => (
            <BlurFade
              key={`${work.company}-${id}`}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={`${work.company}-${id}`}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Educação</h2>
          </BlurFade>
          {DATA.education?.map((education, id) => (
            <BlurFade
              key={`${education.school}-${id}`}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={`${education.school}-${id}`}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      {DATA.certificates && DATA.certificates.length > 0 && (
        <section id="certificates">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Certificados & Cursos</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {DATA.certificates.map((cert, id) => (
                  <HackathonCard
                    key={`${cert.title}-${id}`}
                    title={cert.title}
                    description={cert.description}
                    location={cert.issuer}
                    dates={cert.dates}
                    image={cert.image}
                    links={cert.links}
                  />
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>
      )}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 className="text-xl font-bold">Habilidades</h2>
          </BlurFade>
          <div className="flex flex-col gap-y-3">
            {DATA.skillsByCategory ? (
              DATA.skillsByCategory.map((categoryGroup, catId) => (
                <BlurFade
                  key={categoryGroup.category}
                  delay={BLUR_FADE_DELAY * 11 + catId * 0.05}
                >
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {categoryGroup.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {categoryGroup.skills.map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              ))
            ) : (
              <div className="flex flex-wrap gap-1">
                {DATA.skills?.map((skill, id) => (
                  <BlurFade
                    key={`${skill}-${id}`}
                    delay={BLUR_FADE_DELAY * 11 + id * 0.05}
                  >
                    <Badge key={`${skill}-${id}`}>{skill}</Badge>
                  </BlurFade>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <section id="github-activity">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Atividade no GitHub</h2>
              <Link
                href="https://github.com/rafaelmm16"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:underline"
              >
                @rafaelmm16
              </Link>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <GitHubCalendarBlock username="rafaelmm16" />
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-medium">
                  Meus Projetos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Confira meus trabalhos recentes
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Trabalhei em diversos projetos, desde pequenas páginas web até aplicações completas. Aqui estão alguns dos meus favoritos.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-200 mx-auto">
            {projects?.map((project, id) => (
              <BlurFade
                key={`${project.title}-${id}`}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={`${project.title}-${id}`}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-medium">
                Contato
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Em um Clique
              </h2>
              <p className="mx-auto max-w-150 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Quer conversar ou fazer uma proposta? Me envie uma mensagem{" "}
                {DATA.contact?.social?.LinkedIn?.url ? (
                  <Link
                    href={DATA.contact.social.LinkedIn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    no LinkedIn
                  </Link>
                ) : (
                  <span>pelo email {DATA.contact?.email}</span>
                )}
                {" "}e respondo assim que possível.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
