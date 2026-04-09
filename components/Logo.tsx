import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type LogoVariant = 'white' | 'black';
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  href?: string;
  priority?: boolean;
}

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 120, height: 36 },
  md: { width: 160, height: 48 },
  lg: { width: 200, height: 60 },
  xl: { width: 280, height: 84 },
};

export function Logo({
  variant = 'white',
  size = 'md',
  className,
  href = '/',
  priority = false,
}: LogoProps) {
  const logoSrc = variant === 'white'
    ? '/images/logo/PUXX-LOGO-LONG-WHITE.png'
    : '/images/logo/PUXX-LOGO-LONG-BLACK.png';

  const dimensions = sizeMap[size];

  const logoImage = (
    <Image
      src={logoSrc}
      alt="PUXX Ireland - Premium Nicotine Pouches"
      width={dimensions.width}
      height={dimensions.height}
      className={cn('object-contain', className)}
      priority={priority}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
