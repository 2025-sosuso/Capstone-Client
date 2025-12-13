import { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
    className?: string;
    size?: number | string;
}