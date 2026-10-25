import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { ProjectDetail } from '@/components/portfolio';
export function generateStaticParams() { return projects.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) { const {slug}=await params;return { title: projects.find(p=>p.slug===slug)?.title ?? 'Project' }; }
export default async function Page({params}: {params: Promise<{slug:string}>}) { const {slug}=await params;const project=projects.find(p=>p.slug===slug);if(!project) notFound();return <ProjectDetail project={project}/>; }
