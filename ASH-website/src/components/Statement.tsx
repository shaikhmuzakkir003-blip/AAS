import { Words } from './Words'

type Props = {
  /** words wrapped in *asterisks* render as italic serif lime accents */
  text: string
  className?: string
}

/** The big mixed serif / grotesque statement, masked word by word. */
export function Statement({ text, className = '' }: Props) {
  return (
    <h2 className={`u-display statement ${className}`}>
      <Words text={text} step={26} />
    </h2>
  )
}
