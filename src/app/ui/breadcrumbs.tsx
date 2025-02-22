import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex text-lg">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className={breadcrumb.active ? 'text-gray-900' : 'text-gray-500'}>
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && <span className="mx-3">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
