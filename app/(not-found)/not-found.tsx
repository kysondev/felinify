import NotFoundPage from './not-found-page';
 
export const metadata = {
  title: "Page Not Found | Clami",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};
 
export default function NotFound() {
  return <NotFoundPage />;
}