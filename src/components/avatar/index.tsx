import { AVATAR_SIZES } from '@/constants'
import Image from 'next/image'
import styles from './avatar.module.css'
import { CameraIcon, UploadIcon } from 'react-line-awesome'

interface AvatarProps {
  size: keyof typeof AVATAR_SIZES;
  src?: string;
  name: string;
  className?: string;
  canUpload?: boolean;
}

const AVATAR_STYLES: Record<keyof typeof AVATAR_SIZES, string> = {
  big: styles.big,
  small: styles.small,
}

export const Avatar = ({ src, size, name, className, canUpload }: AvatarProps) => {
  return (<div className={`${styles.avatar} ${AVATAR_STYLES[size]} ${className || ''}`}>
    {canUpload && <div className={styles.uploader}><CameraIcon variant="solid" className={styles.uploaderIcon}/></div>}
    {src ? <Image src={src} alt={`${name} avatar`} width={AVATAR_SIZES[size]} height={AVATAR_SIZES[size]}/> :
    <p>{name[0].toUpperCase()}</p>}
  </div>)
}
