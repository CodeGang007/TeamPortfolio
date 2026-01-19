import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.codegang.online';

  // Static routes
  const routes = [
    '',
    '/about',
    '/project',
    '/team',
    '/contactus',
    '/privacy',
    '/terms',
    '/cookies',
    '/license',
    '/project-templates',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Project Routes
  try {
    const projectsCol = collection(db, 'projects');
    const q = query(projectsCol, where('active', '==', true));
    const snapshot = await getDocs(q);

    const projectRoutes = snapshot.docs.map((doc) => ({
      url: `${baseUrl}/project/${doc.id}`,
      lastModified: new Date(), // Ideally use doc.updatedAt if available
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...routes, ...projectRoutes];
  } catch (error) {
    console.error('Error generating project sitemap:', error);
    return routes;
  }
}
