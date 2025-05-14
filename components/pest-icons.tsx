import Image from "next/image"

interface PestIconProps {
  type: "ant" | "bedbug" | "cockroach" | "mouse" | "spider" | "wasp"
  size?: number
  className?: string
}

export default function PestIcon({ type, size = 40, className = "" }: PestIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={`/images/pest-icons/${type}.png`}
        alt={`${type} icon`}
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  )
}
