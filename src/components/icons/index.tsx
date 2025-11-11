import {SVGProps} from 'react';
import {IconProps} from './types';

import BookmarkSvg from '@/assets/icons/bookmark.svg';
import HeartSvg from '@/assets/icons/heart.svg';
import NotificationSvg from '@/assets/icons/notification.svg';
import TriangleDownSvg from '@/assets/icons/triangle-down.svg';
import TriangleUpSvg from '@/assets/icons/triangle-up.svg';
import ConfirmSvg from '@/assets/icons/confirm.svg';
import CancelSvg from '@/assets/icons/cancel.svg';

const getIconStyle = (size?: number | string) => {
    if (!size) return {};
    const sizeValue = typeof size === 'number' ? `${size}px` : size;
    return {width: sizeValue, height: sizeValue};
};

const createIcon = (
    SvgComponent: React.FC<SVGProps<SVGSVGElement>>,
    defaultClassName = 'text-current'
) => {
    return function Icon({
                             className = defaultClassName,
                             size = 20,
                             style,
                             ...props
                         }: IconProps) {
        return (
            <SvgComponent
                className={className}
                style={{...getIconStyle(size), ...style}}
                {...props}
            />
        );
    };
};

export const BookmarkIcon = createIcon(BookmarkSvg, 'text-blue-500');
export const HeartIcon = createIcon(HeartSvg, 'text-red-400');
export const NotificationIcon = createIcon(NotificationSvg, 'text-gray-600');
export const TriangleDownIcon = createIcon(TriangleDownSvg);
export const TriangleUpIcon = createIcon(TriangleUpSvg);
export const ConfirmIcon = createIcon(ConfirmSvg, 'text-white');
export const CancelIcon = createIcon(CancelSvg, 'text-white');

export type {IconProps};